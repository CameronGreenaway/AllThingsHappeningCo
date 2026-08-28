import { useEffect, useRef, useState } from 'react';
import { PAYPAL_CONFIG } from '../data/site';
import { money } from '../data/quote';

const SDK_ID = 'paypal-sdk';

/* Loads the PayPal SDK once and resolves when window.paypal is ready. */
function loadPayPal(clientId, currency) {
  if (window.paypal) return Promise.resolve(window.paypal);
  const existing = document.getElementById(SDK_ID);
  if (existing) {
    return new Promise((res, rej) => {
      existing.addEventListener('load', () => res(window.paypal));
      existing.addEventListener('error', rej);
    });
  }
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.id = SDK_ID;
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}` +
            `&currency=${currency}&enable-funding=venmo&disable-funding=credit`;
    s.onload = () => res(window.paypal);
    s.onerror = rej;
    document.head.appendChild(s);
  });
}

export default function BookingPayment({ quote, amount, setAmount, onPaid, disabled, validate }) {
  const holder = useRef(null);
  const amountRef = useRef(amount);
  const [sdkError, setSdkError] = useState('');
  // Dev falls back to the sandbox credential; the built site never does,
  // so test money and real money cannot cross over.
  const clientId = import.meta.env.DEV
    ? (PAYPAL_CONFIG.sandboxClientId || PAYPAL_CONFIG.clientId)
    : PAYPAL_CONFIG.clientId;
  const configured = !!clientId && clientId !== 'YOUR_PAYPAL_CLIENT_ID';

  // Buttons are rendered once; createOrder reads the live amount from
  // this ref so dragging the slider never tears down the iframe.
  useEffect(() => { amountRef.current = amount; }, [amount]);

  useEffect(() => {
    if (!configured || !quote.payable || disabled || !holder.current) return;
    let cancelled = false;
    loadPayPal(clientId, PAYPAL_CONFIG.currency)
      .then(paypal => {
        if (cancelled || !holder.current) return;
        holder.current.innerHTML = '';
        paypal.Buttons({
          // Blocks checkout until the surrounding form is filled in, so a
          // payment can never arrive without a name and email attached.
          onClick: (_d, actions) =>
            (!validate || validate()) ? actions.resolve() : actions.reject(),
          createOrder: (_d, actions) => actions.order.create({
            purchase_units: [{
              amount: { value: amountRef.current.toFixed(2) },
              description: 'All Things Happening Co — booking payment',
            }],
          }),
          onApprove: (_d, actions) => actions.order.capture().then(onPaid),
          onError: () => setSdkError('PayPal could not complete that payment. Please try again.'),
        }).render(holder.current);
      })
      .catch(() => setSdkError('PayPal could not load. Check your connection and try again.'));
    return () => { cancelled = true; };
  }, [configured, clientId, quote.payable, disabled, onPaid, validate]);

  if (!quote.lines.length && !quote.blockers.length) return null;

  const min = quote.minDue;
  const max = quote.total;
  const canSlide = max - min > 0.01;

  return (
    <div className="pay-box">
      <div className="pay-head">Your Booking Total</div>

      {quote.lines.map(l => (
        <div className="pay-row" key={l.key}>
          <span>
            {l.label}
            {l.detail && <em className="pay-detail">{l.detail}</em>}
          </span>
          <span>{money(l.amount)}</span>
        </div>
      ))}

      {quote.shipping && (
        <div className="pay-row">
          <span>
            Shipping
            <em className="pay-detail">
              USPS Ground Advantage · zone {quote.shipping.zone}
            </em>
          </span>
          <span>{money(quote.shipCost)}</span>
        </div>
      )}

      {quote.lines.length > 0 && (
        <div className="pay-row pay-total">
          <span>Order total</span>
          <span>{money(quote.total)}</span>
        </div>
      )}

      {quote.blockers.length > 0 ? (
        <div className="pay-note">
          {quote.quoteOnly ? (
            <>
              <strong>This booking is quote-based.</strong>
              <ul>{quote.blockers.map(b => <li key={b.text}>{b.text}</li>)}</ul>
              <p>
                Send it through as an inquiry and we'll price it on a quick call,
                then send a payment link for the deposit.
              </p>
            </>
          ) : (
            <>
              {/* Everything selected can be priced — the customer just has
                  not chosen yet, so nothing about a quote belongs here. */}
              <strong>Please Select an Option</strong>
              {quote.blockers.length > 1 && (
                <ul>{quote.blockers.map(b => <li key={b.text}>{b.text}</li>)}</ul>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="pay-amount">
            <div className="pay-amount-head">
              <label className="form-label" htmlFor="payAmount">Amount to pay today</label>
              <span className="pay-amount-value">{money(amount)}</span>
            </div>

            {canSlide && (
              <input
                id="payAmount"
                className="pay-slider"
                type="range"
                min={min}
                max={max}
                step="1"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
              />
            )}

            {canSlide && (
            <div className="pay-scale">
              <button type="button" onClick={() => setAmount(min)}>
                {quote.hasPayInFull ? 'Minimum due' : `Deposit (${Math.round(quote.depositRate * 100)}%)`}
                <em>{money(min)}</em>
              </button>
              <button type="button" onClick={() => setAmount(max)}>
                Pay in full<em>{money(max)}</em>
              </button>
            </div>
            )}

            {quote.hasPayInFull && (
              <p className="pay-fineprint">
                Shipped items are charged in full, so the minimum above includes
                them plus shipping.
              </p>
            )}
            {!quote.hasPayInFull && (
              <p className="pay-fineprint">
                {Math.round(quote.depositRate * 100)}% secures your date. The
                balance is due before the event.
              </p>
            )}
          </div>

          {sdkError && <div className="form-error">{sdkError}</div>}

          {configured ? (
            <div ref={holder} className="pay-buttons" />
          ) : (
            <div className="pay-placeholder">
              <strong>PayPal not connected yet.</strong>
              <p>
                Add your Business Client ID to <code>PAYPAL_CONFIG</code> in
                <code>src/data/site.js</code> and the PayPal, Venmo and card
                buttons appear here. Until then this form submits as a normal
                booking request.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
