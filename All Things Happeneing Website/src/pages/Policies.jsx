import { Link } from 'react-router-dom';
import AnimateIn from '../components/AnimateIn';

const POLICIES = [
  {
    id: 'booking',
    title: 'Booking Policy',
    body: (
      <>
        <p>All bookings require a <strong>25% non-refundable deposit</strong> of the total order to secure your date. The remaining balance is due prior to the event date as outlined in your booking agreement.</p>
        <p>We require a minimum of <strong>14 days advance notice</strong> for all bookings. For peak season dates (June–October), we strongly recommend booking 1–2 months in advance.</p>
        <p>A booking is not confirmed until the deposit is received and a booking confirmation is sent via email. Inquiries and quotes do not hold dates.</p>
        <ul>
          <li>Deposits are accepted via credit card, PayPal, or Venmo</li>
          <li>Booking confirmation is sent to the email provided at time of booking</li>
          <li>All orders are subject to availability — we will confirm within 24 hours of inquiry</li>
          <li>Custom and personalized items require additional lead time — details provided at booking</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cancellation',
    title: 'Cancellation Policy',
    body: (
      <>
        <p>We understand that plans change. Our cancellation policy is as follows:</p>
        <ul>
          <li><strong>48 hours post booking:</strong> Full deposit is returned</li>
          <li><strong>After 48 hours of booking the event:</strong> Deposit is forfeited</li>
          <li><strong>Day of cancellation:</strong> Full balance for all custom design is due</li>
        </ul>
        <p>Date changes are treated as a cancellation and rebooking, subject to availability. If your requested new date is available, your deposit may be applied to the new booking at our discretion.</p>
        <p>We recommend event insurance for added protection against unforeseen circumstances. All Things Happening Co is not responsible for losses due to weather, venue issues, or other external factors.</p>
      </>
    ),
  },
  {
    id: 'damage',
    title: 'Damage Liability',
    body: (
      <>
        <p>The customer is responsible for all damage to rental items during their event. This includes damage caused by guests, venue conditions, weather, or misuse of equipment.</p>
        <p>All items are inspected before delivery and after pickup. Any damage identified after your event will be billed at <strong>replacement cost</strong>.</p>
        <ul>
          <li>Do not move rental items once placed by our team without permission</li>
          <li>Keep all electrical items away from water unless specifically rated for outdoor use</li>
          <li>Ensure your venue is a safe and appropriate environment for all rented items</li>
          <li>Report any accidental damage immediately — early reporting may reduce liability</li>
        </ul>
        <p>Excessive cleaning required beyond normal use may incur an additional cleaning fee.</p>
      </>
    ),
  },
  {
    id: 'delivery',
    title: 'Delivery & Setup',
    body: (
      <>
        <p><strong>Delivery is included</strong> with all rentals within a 50-mile radius of Pittsburgh, PA. Events beyond 50 miles are available for an additional mileage fee — contact us for a quote prior to booking.</p>
        <p>Our team arrives <strong>1–2 hours before your event start time</strong> for setup. This window is built into your booking and requires no additional fee. Takedown is included and occurs after your event concludes.</p>
        <ul>
          <li>Please ensure venue access is available during the agreed setup window</li>
          <li>Parking for our vehicle(s) must be accommodated near the setup area</li>
          <li>Early setup beyond the 1–2 hour window may incur an additional fee</li>
          <li>Extended rental periods beyond standard event hours must be arranged at booking</li>
        </ul>
        <p>Please notify us of any venue-specific restrictions (elevator access, noise restrictions, loading dock requirements) at least one week before your event.</p>
      </>
    ),
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    body: (
      <>
        <p>All Things Happening Co collects personal information (name, email, phone number, event details) solely for the purpose of processing bookings and communicating with clients.</p>
        <ul>
          <li>We do not sell, rent, or share your personal information with third parties</li>
          <li>Your contact information may be used to send booking confirmations, reminders, and follow-up communications</li>
          <li>Photos from your event may be used for marketing purposes (Instagram, website) unless you opt out in writing at the time of booking</li>
          <li>You may request removal of your data at any time by emailing us</li>
        </ul>
        <p>Our website may use basic analytics tools (such as page view tracking) to improve user experience. No personally identifiable information is collected through analytics.</p>
        <p>By submitting an inquiry or booking form on this website, you consent to being contacted by All Things Happening Co regarding your inquiry.</p>
        <p style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
          Last updated: Summer 2026 · For questions, contact <a href="mailto:contact@allthingshappening.com" style={{ color: 'var(--sage)' }}>contact@allthingshappening.com</a>
        </p>
      </>
    ),
  },
];

export default function Policies() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg">Policies</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="sec-eye centered">Legal & Policies</div>
          <h1 className="sec-title centered"><span className="script">Our Policies</span></h1>
          <p className="sec-lead centered">Clear, fair, and straightforward — here's everything you need to know before booking.</p>
        </div>
      </div>

      <section className="sec">
        <div className="sec-tight">
          {POLICIES.map((p, i) => (
            <AnimateIn key={p.id} delay={i * 50}>
              <div className="policy-block" id={p.id}>
                <div className="policy-title">{p.title}</div>
                <div className="policy-body">{p.body}</div>
              </div>
            </AnimateIn>
          ))}

          <AnimateIn>
            <div style={{
              background: 'var(--blush)', padding: '2.5rem',
              textAlign: 'center', marginTop: '3rem',
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                Questions about any of our policies? We're happy to clarify anything before you book.
              </p>
              <Link to="/contact" className="btn-solid">Contact Us</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
