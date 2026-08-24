/* ─────────────────────────────────────────────────────────────────
   BOOKING QUOTE + DEPOSIT ENGINE

   Turns the contact form's selections into a payable total. The rule
   that matters: nothing is charged unless every selected item has a
   definite price. Custom work is quoted after a consultation, so a
   booking containing it is inquiry-only and shows no payment box.
   ───────────────────────────────────────────────────────────────── */
import { SERVICES } from './services';
import { estimateShipping } from './shipping';

export const DEPOSIT_RATE = 0.25;

// Paid in full up front rather than by deposit — it ships, so there is
// no date to hold and the goods leave the building.
export const PAY_IN_FULL_OPTIONS = ['DIY Box'];

/* Services priced only on consultation. Selecting any of these turns
   the whole booking into an inquiry. */
export const QUOTE_ONLY_SERVICES = ['custom-mirrors', 'custom-signage', 'custom-accessories'];

/* Rented per day, so they need a quantity and a number of days rather
   than a single package price. */
export const PER_DAY_SERVICES = ['tables'];

/* "$500" → 500. Anything without a plain dollar figure ("Inquire",
   "$125/hr", "+$70") returns null and is treated as not payable. */
export function parsePrice(str) {
  if (typeof str !== 'string') return null;
  if (/inquire/i.test(str)) return null;
  if (/\/\s*(hr|hour|day)/i.test(str)) return null; // rate, not a total
  if (/^\s*\+/.test(str)) return null;              // add-on, quoted later
  const m = str.match(/\$\s*([\d,]+(?:\.\d{2})?)/);
  return m ? parseFloat(m[1].replace(/,/g, '')) : null;
}

/* Per-day rate: "$25/day" → 25 */
export function parseDayRate(str) {
  const m = typeof str === 'string' && str.match(/\$\s*([\d,]+(?:\.\d{2})?)\s*\/\s*day/i);
  return m ? parseFloat(m[1].replace(/,/g, '')) : null;
}

/* The options a customer can actually pick and pay for, per service.
   Falls back from `packages` to `pricing` since services use both. */
export function payableOptions(service) {
  if (!service) return [];
  const raw = service.packages?.length ? service.packages : (service.pricing || []);
  return raw
    .map(o => ({
      id: o.id || o.label,
      label: o.name || o.label,
      priceLabel: o.price,
      amount: parsePrice(o.price),
      dayRate: parseDayRate(o.price),
    }))
    .filter(o => o.amount !== null || o.dayRate !== null);
}

export function serviceByName(name) {
  return SERVICES.find(s => s.name === name);
}

/* Builds the full quote from form state.

   selections: { [serviceId]: { option, qty, days } }
   Returns line items, totals, and why a booking is inquiry-only. */
export function buildQuote(itemNames, selections, shipZip) {
  const lines = [];
  const blockers = [];
  let needsShipping = false;

  for (const name of itemNames) {
    const service = serviceByName(name);
    if (!service) continue;

    if (QUOTE_ONLY_SERVICES.includes(service.id)) {
      blockers.push(`${service.name} is priced after a consultation`);
      continue;
    }

    const sel = selections[service.id] || {};
    const options = payableOptions(service);
    const chosen = options.find(o => o.id === sel.option);

    if (!chosen) {
      blockers.push(`Choose an option for ${service.name}`);
      continue;
    }

    if (PER_DAY_SERVICES.includes(service.id)) {
      const qty = Math.max(1, parseInt(sel.qty, 10) || 1);
      const days = Math.max(1, parseInt(sel.days, 10) || 1);
      const rate = chosen.dayRate ?? chosen.amount;
      lines.push({
        key: service.id,
        label: `${service.name} — ${chosen.label}`,
        detail: `${qty} × ${days} day${days > 1 ? 's' : ''} @ $${rate}/day`,
        amount: rate * qty * days,
      });
      continue;
    }

    if (PAY_IN_FULL_OPTIONS.includes(chosen.label)) needsShipping = true;

    // Only surface the raw label when it says more than the number does
    // (e.g. "$300 + shipping"), otherwise it just repeats the amount.
    const plainPrice = /^\s*\$\s*[\d,]+(\.\d{2})?\s*$/.test(chosen.priceLabel);
    lines.push({
      key: service.id,
      label: `${service.name} — ${chosen.label}`,
      detail: plainPrice ? '' : chosen.priceLabel,
      amount: chosen.amount,
      payInFull: PAY_IN_FULL_OPTIONS.includes(chosen.label),
    });
  }

  const shipping = needsShipping ? estimateShipping(shipZip) : null;
  if (needsShipping && !shipping) blockers.push('Enter a ZIP code for shipping');

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const shipCost = shipping ? shipping.total : 0;
  const total = subtotal + shipCost;

  // Items that ship are due in full; the rest only need the deposit.
  const fullDue = lines.filter(l => l.payInFull).reduce((s, l) => s + l.amount, 0) + shipCost;
  const depositable = lines.filter(l => !l.payInFull).reduce((s, l) => s + l.amount, 0);
  const minDue = fullDue + depositable * DEPOSIT_RATE;

  const payable = itemNames.length > 0 && blockers.length === 0 && total > 0;

  return {
    lines,
    shipping,
    subtotal: round(subtotal),
    shipCost: round(shipCost),
    total: round(total),
    minDue: round(minDue),
    depositRate: DEPOSIT_RATE,
    hasPayInFull: fullDue > 0,
    payable,
    blockers,
  };
}

const round = n => Math.round(n * 100) / 100;
export const money = n =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
