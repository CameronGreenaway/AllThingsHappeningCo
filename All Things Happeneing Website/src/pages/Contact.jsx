/*
  ══════════════════════════════════════════════════════════════════
  EMAILJS SETUP INSTRUCTIONS (one-time — takes ~10 minutes)
  ──────────────────────────────────────────────────────────────────
  1. Go to https://www.emailjs.com → create a free account (200 emails/mo)
  2. Add Email Service:
     Dashboard → Email Services → Add New Service → Gmail
     Connect contact@allthingshappening.com → copy the Service ID
  3. Create Email Template:
     Dashboard → Email Templates → Create New Template
     Subject line: {{subject_prefix}} — {{inquiry_type}} from {{from_name}}
     Body fields to include: from_name, from_email, phone, event_date,
       event_type, items, message
     Reply-To: {{from_email}}
     Copy the Template ID
  4. Get Public Key:
     Dashboard → Account → API Keys → copy Public Key
  5. Paste all three into src/data/site.js:
     serviceId, templateId, publicKey
  ──────────────────────────────────────────────────────────────────
  GMAIL AUTO-LABEL ROUTING SETUP (routes incoming emails into folders)
  ──────────────────────────────────────────────────────────────────
  In Gmail → Settings (gear) → See All Settings → Filters & Blocked Addresses
  → Create a new filter for each:
    Subject contains "[BOOKING]"  → Apply label: Bookings
    Subject contains "[QUESTION]" → Apply label: Questions
    Subject contains "[SUPPORT]"  → Apply label: Support
    Subject contains "[REVIEW]"   → Apply label: Reviews
  ══════════════════════════════════════════════════════════════════
  GOOGLE CALENDAR SETUP (show your availability on the site)
  ──────────────────────────────────────────────────────────────────
  1. Open Google Calendar → find your booking calendar in the left sidebar
  2. Click the three dots ⋮ next to the calendar name → Settings and sharing
  3. Under "Access permissions," check "Make available to public"
  4. Scroll down to "Integrate calendar" → copy the Embed code (<iframe>)
  5. In this file, replace the <div className="calendar-embed"> block below
     with the copied <iframe> code (add width="100%" style="border:0")
  ══════════════════════════════════════════════════════════════════
*/

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import AnimateIn from '../components/AnimateIn';
import { SITE, INQUIRY_TYPES, EVENT_TYPES, EMAILJS_CONFIG } from '../data/site';
import { SERVICES } from '../data/services';

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  eventDate: '',
  eventType: '',
  items: [],
  message: '',
};

export default function Contact() {
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const isConfigured = EMAILJS_CONFIG.serviceId !== 'YOUR_EMAILJS_SERVICE_ID';

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const toggleItem = (name) => {
    setForm(f => ({
      ...f,
      items: f.items.includes(name)
        ? f.items.filter(i => i !== name)
        : [...f.items, name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const params = {
      subject_prefix: inquiryType.prefix,
      inquiry_type: inquiryType.label,
      from_name: form.name,
      from_email: form.email,
      phone: form.phone || 'Not provided',
      event_date: form.eventDate || 'N/A',
      event_type: form.eventType || 'N/A',
      items: form.items.length ? form.items.join(', ') : 'None specified',
      message: form.message,
    };

    if (!isConfigured) {
      const subject = `${inquiryType.prefix} — ${inquiryType.label} from ${form.name}`;
      const body = Object.entries(params).map(([k, v]) => `${k}: ${v}`).join('\n');
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        params,
        EMAILJS_CONFIG.publicKey
      );
      setSent(true);
      setForm(INITIAL_FORM);
    } catch {
      setError('Something went wrong. Please email us directly at ' + SITE.email);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-bg">Contact</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="sec-eye centered">Get In Touch</div>
          <h1 className="sec-title centered"><span className="script">Let's Work Together</span></h1>
          <p className="sec-lead centered">Ready to book, have a question, or just want to say hi? We'd love to hear from you.</p>
        </div>
      </div>

      {/* Trust bar */}
      <div className="trust-bar">
        {['Pittsburgh-Based', '50-Mile Radius', '24-Hr Response Time', '25% Deposit to Book', 'Delivery Included', '4-Week Lead Time'].map(t => (
          <div className="trust-item" key={t}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" style={{ color: 'var(--sage)' }}><circle cx="4" cy="4" r="4"/></svg>
            {t}
          </div>
        ))}
      </div>

      {/* ── CONTACT SECTION ── */}
      <section className="sec">
        <div className="sec-inner">
          <div className="contact-layout">

            {/* Left: info */}
            <AnimateIn>
              <div className="sec-eye">Reach Us</div>
              <h2 className="sec-title" style={{ marginBottom: '2rem' }}>
                <span className="script" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Say Hello</span>
              </h2>

              <div className="contact-info-block">
                <div className="contact-info-label">Email</div>
                <div className="contact-info-value">
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </div>
              </div>

              <div className="contact-info-block">
                <div className="contact-info-label">Instagram</div>
                <div className="contact-info-value">
                  <a href={SITE.instagramUrl} target="_blank" rel="noreferrer">{SITE.instagram}</a>
                </div>
              </div>

              <div className="contact-info-block">
                <div className="contact-info-label">Service Area</div>
                <div className="contact-info-value">{SITE.serviceArea}</div>
              </div>

              <div className="contact-info-block">
                <div className="contact-info-label">Booking Lead Time</div>
                <div className="contact-info-value">Minimum 4 weeks in advance</div>
              </div>

              <div className="contact-info-block">
                <div className="contact-info-label">Response Time</div>
                <div className="contact-info-value">Within 24 hours</div>
              </div>

              <div style={{ marginTop: '2.5rem', padding: '1.8rem', background: 'rgba(130,150,114,0.06)', border: '1px solid rgba(130,150,114,0.18)' }}>
                <div className="contact-info-label" style={{ marginBottom: '0.6rem' }}>Booking Snapshot</div>
                <ul style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 2 }}>
                  <li>— 25% deposit secures your date</li>
                  <li>— Delivery included within 50 miles</li>
                  <li>— Full deposit returned with 48-hr cancellation</li>
                  <li>— Setup &amp; takedown always included</li>
                  <li>— Custom packages available</li>
                </ul>
              </div>
            </AnimateIn>

            {/* Right: form */}
            <AnimateIn delay={100}>
              {sent ? (
                <div className="form-success">
                  <div className="form-success-title">Message Received!</div>
                  <p>Thank you for reaching out. We'll be in touch within 24 hours.</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--sage)', letterSpacing: '0.1em' }}>
                    — All Things Happening Co
                  </p>
                  <button
                    className="btn-solid"
                    style={{ marginTop: '1.5rem' }}
                    onClick={() => setSent(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Inquiry type tabs */}
                  <div className="inquiry-tabs">
                    {INQUIRY_TYPES.map(t => (
                      <button
                        key={t.value}
                        type="button"
                        className={`inquiry-tab${inquiryType.value === t.value ? ' active' : ''}`}
                        onClick={() => setInquiryType(t)}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Core fields */}
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Name *</label>
                      <input
                        className="form-input"
                        type="text"
                        required
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        className="form-input"
                        type="email"
                        required
                        value={form.email}
                        onChange={set('email')}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone (optional)</label>
                    <input
                      className="form-input"
                      type="tel"
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="(412) 000-0000"
                    />
                  </div>

                  {/* Booking-specific fields */}
                  {inquiryType.value === 'booking' && (
                    <>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Event Date *</label>
                          <input
                            className="form-input"
                            type="date"
                            required
                            value={form.eventDate}
                            onChange={set('eventDate')}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Event Type *</label>
                          <div className="form-select-wrap">
                            <select
                              className="form-select"
                              required
                              value={form.eventType}
                              onChange={set('eventType')}
                            >
                              <option value="">Select type…</option>
                              {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Items of Interest</label>
                        <div className="checkbox-grid" style={{ marginTop: '0.5rem' }}>
                          {SERVICES.map(s => (
                            <label className="checkbox-label" key={s.id}>
                              <input
                                type="checkbox"
                                checked={form.items.includes(s.name)}
                                onChange={() => toggleItem(s.name)}
                              />
                              {s.name}
                            </label>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Message */}
                  <div className="form-group">
                    <label className="form-label">
                      {inquiryType.value === 'review' ? 'Your Review *' : 'Message *'}
                    </label>
                    <textarea
                      className="form-textarea"
                      required
                      value={form.message}
                      onChange={set('message')}
                      placeholder={
                        inquiryType.value === 'review'
                          ? 'Tell us about your experience...'
                          : inquiryType.value === 'booking'
                          ? 'Tell us about your event, guest count, venue, and any other details...'
                          : 'How can we help?'
                      }
                      style={{ minHeight: inquiryType.value === 'review' ? 160 : 120 }}
                    />
                  </div>

                  {error && <div className="form-error">{error}</div>}

                  {!isConfigured && (
                    <div style={{ background: 'rgba(216,149,155,0.07)', border: '1px solid rgba(216,149,155,0.2)', padding: '0.8rem 1rem', marginBottom: '1rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      EmailJS not configured — submitting will open your email client instead. See setup instructions in Contact.jsx.
                    </div>
                  )}

                  <button
                    type="submit"
                    className="form-submit"
                    disabled={sending}
                  >
                    {sending ? 'Sending…' : `Send ${inquiryType.label}`}
                  </button>

                  <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '0.8rem', textAlign: 'center', letterSpacing: '0.05em' }}>
                    We respond to all inquiries within 24 hours.
                  </p>
                </form>
              )}
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── AVAILABILITY CALENDAR ── */}
      <section className="calendar-section">
        <div className="sec-inner">
          <AnimateIn>
            <div className="sec-eye">Availability</div>
            <h2 className="sec-title"><span className="script">Check Our Calendar</span></h2>
            <p className="sec-lead">Browse available dates before submitting your inquiry. Booked dates are marked — all others are open.</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <div className="calendar-embed">
              {/*
                ══════════════════════════════════════════════════════════
                REPLACE THIS BLOCK WITH YOUR GOOGLE CALENDAR EMBED:
                1. Google Calendar → your booking calendar → ⋮ → Settings
                2. Access permissions → Make available to public ✓
                3. Integrate calendar → copy the Embed code (<iframe>)
                4. Paste the <iframe> here, add: width="100%" style="border:0"
                ══════════════════════════════════════════════════════════
              */}
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="1.2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <div className="calendar-embed-note">Google Calendar — Coming Soon</div>
              <p>Once configured, your live availability calendar will appear here. Follow the setup instructions in Contact.jsx to connect your Google Calendar.</p>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
