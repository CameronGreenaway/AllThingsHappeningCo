import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimateIn from '../components/AnimateIn';
import { SITE } from '../data/site';

const FAQ_GROUPS = [
  {
    title: 'Booking & Deposits',
    items: [
      {
        q: 'How far in advance do I need to book?',
        a: 'We require a minimum of 14 days advance notice for all bookings. For peak summer and fall dates (June–October), we strongly recommend booking 2–3 months in advance to secure your preferred date.',
      },
      {
        q: 'How much is the deposit to reserve my date?',
        a: 'A 25% deposit of your total order is required at the time of booking to secure your date. The remaining balance is due prior to your event.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept credit cards, PayPal, and Venmo for deposits and final payments.',
      },
      {
        q: 'Can I book multiple items together for a discount?',
        a: 'Yes! We love putting together custom packages. Contact us with the items you\'re interested in and your event details and we\'ll build a custom quote.',
      },
      {
        q: 'What happens after I submit an inquiry?',
        a: 'We respond to all inquiries within 24 hours. Once we confirm availability for your date, we\'ll send a detailed quote and booking agreement to finalize your reservation.',
      },
      {
        q: 'Can I change my booking after it\'s confirmed?',
        a: 'Date changes are subject to availability and must be requested as early as possible. Item changes can generally be accommodated with enough notice — contact us and we\'ll work with you.',
      },
    ],
  },
  {
    title: 'Delivery & Setup',
    items: [
      {
        q: 'Do you charge for delivery?',
        a: 'Delivery is included with all rentals within our 50-mile radius of Pittsburgh. Events beyond 50 miles are available for an additional mileage fee — contact us for a quote.',
      },
      {
        q: 'How long does setup take?',
        a: 'We arrive 1–2 hours before your event start time for setup. Takedown is included and typically takes 30–60 minutes after your event concludes.',
      },
      {
        q: 'Do I need to be present for setup?',
        a: 'We recommend having someone from your party present during setup to confirm item placement and review any personalization details. We\'ll handle everything else.',
      },
      {
        q: 'What is your full service area?',
        a: 'We serve Pittsburgh and the surrounding region within a 50-mile radius — including North Hills, South Hills, East End, West End, Cranberry Township, Monroeville, and beyond. Not sure if you\'re in range? Just ask.',
      },
      {
        q: 'What if my venue has restrictions?',
        a: 'Let us know about any venue-specific requirements when you book. We\'ll work with your venue\'s setup windows and any restrictions to ensure a smooth experience.',
      },
    ],
  },
  {
    title: 'Services & Customization',
    items: [
      {
        q: 'What events do you service?',
        a: 'We service all types of events — weddings, baby showers, bridal showers, graduations, birthday parties, corporate events, holiday parties, gender reveals, anniversaries, and more.',
      },
      {
        q: 'How customized can my rental be?',
        a: 'Fully customized. From the name and date on your phone booth mirror to the custom designs for the vending machine inserts — personalization is at the core of everything we offer. We\'ll work with you on every detail.',
      },
      {
        q: 'How does the audio guestbook phone booth work?',
        a: 'Guests pick up the vintage handset, wait for a tone, and record their message. Every message is captured automatically. After your event, you receive a complete audio file containing every recorded message.',
      },
      {
        q: 'What tattoos/stickers go in the vending machine?',
        a: 'Everything in the vending machine is custom-designed for your event. We\'ll work with you to create designs that match your theme, colors, and aesthetic. Quarters are included.',
      },
      {
        q: 'Can I see photos of previous setups?',
        a: <>Yes — visit our Gallery page to browse real event photos. You can also follow us on <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'inherit', textDecoration: 'underline' }}><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"></path><circle cx="17.5" cy="6.5" r="1.5" fill="white"></circle></svg>{SITE.instagram}</a> for our most recent work.</>,
      },
      {
        q: 'Do you offer items not listed on your Rentals page?',
        a: 'We may be able to accommodate custom requests. Contact us and describe what you\'re looking for — we\'re always happy to discuss options.',
      },
    ],
  },
  {
    title: 'Pricing & Packages',
    items: [
      {
        q: 'Where can I find your full pricing?',
        a: 'Pricing is listed on each rental\'s detail card on our Rentals page. Click "View Details" on any item to see all pricing tiers. Items marked "Inquire" are quoted custom based on your needs.',
      },
      {
        q: 'Do you offer packages or bundles?',
        a: 'Yes — booking multiple items often qualifies for custom package pricing. Reach out through our Contact page with your event details and we\'ll put together a personalized quote.',
      },
      {
        q: 'Is there a minimum spend?',
        a: 'There is no minimum order. You can rent a single table for $20 or put together a full multi-piece setup — we accommodate all sizes and budgets.',
      },
      {
        q: 'Can I add items to my order after booking?',
        a: 'Yes, additions can be made subject to availability. We\'ll update your quote and collect the additional deposit amount for any new items.',
      },
    ],
  },
  {
    title: 'Partners',
    items: [
      {
        q: 'How does booking a partner service work?',
        a: 'Tow & Toast and pgh360photo are independent businesses — they handle their own bookings, pricing, and operations. We can make introductions and help coordinate timing, but their booking is separate from ours.',
      },
      {
        q: 'Can I book All Things Happening Co and a partner in the same inquiry?',
        a: 'Absolutely. Let us know in your inquiry that you\'re interested in partner services too. We\'ll help facilitate the connection and make sure everyone is coordinated for your event date.',
      },
    ],
  },
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState(new Set());

  const toggle = (id) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <>
      <div className="page-header">
        <div className="page-header-bg">FAQ</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="sec-eye centered">Questions & Answers</div>
          <h1 className="sec-title centered"><span className="script">Frequently Asked</span></h1>
          <p className="sec-lead centered">Everything you need to know about booking, delivery, and working with us.</p>
        </div>
      </div>

      <section className="sec">
        <div className="sec-tight">
          {FAQ_GROUPS.map((group, gi) => (
            <AnimateIn key={group.title} delay={gi * 60}>
              <div className="faq-group">
                <div className="faq-group-title">{group.title}</div>
                {group.items.map((item, ii) => {
                  const id = `${gi}-${ii}`;
                  const open = openItems.has(id);
                  return (
                    <div className="faq-item" key={id}>
                      <button
                        className={`faq-q${open ? ' open' : ''}`}
                        onClick={() => toggle(id)}
                        aria-expanded={open}
                      >
                        {item.q}
                        <span className="faq-q-icon">+</span>
                      </button>
                      <div className={`faq-a${open ? ' open' : ''}`}>
                        {item.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimateIn>
          ))}

          {/* Still have questions */}
          <AnimateIn>
            <div style={{
              textAlign: 'center', padding: '3rem 2rem',
              background: 'var(--blush)',
              marginTop: '2rem',
            }}>
              <div style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: 'var(--forest)', marginBottom: '0.5rem' }}>
                Still have questions?
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                We're happy to help. Send us a message and we'll get back to you within 24 hours.
              </p>
              <Link to="/contact" className="btn-solid">Contact Us</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
