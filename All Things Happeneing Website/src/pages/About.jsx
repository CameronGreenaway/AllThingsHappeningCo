import { Link } from 'react-router-dom';
import AnimateIn from '../components/AnimateIn';
import ImagePlaceholder from '../components/ImagePlaceholder';

const BRAND_VALUES = [
  {
    icon: '◇',
    title: 'Attention to Detail',
    desc: 'Every element of your setup is carefully considered. From the placement of each drapery panel to the custom details on your mirror — nothing is left to chance.',
  },
  {
    icon: '✦',
    title: 'Customization',
    desc: 'No two events are alike because no two clients are alike. Every rental is personalized to your theme, colors, and vision — down to the smallest detail.',
  },
  {
    icon: '○',
    title: 'Eco-Friendly',
    desc: 'We\'re committed to sustainable practices. Our pieces are built to last and reused across events, minimizing waste without compromising quality.',
  },
  {
    icon: '♡',
    title: 'Creating Fond Memories',
    desc: 'Events aren\'t about things — they\'re about the moments between people. We create the environment that makes those moments possible.',
  },
  {
    icon: '⬡',
    title: 'Ease of Planning',
    desc: 'One vendor. One quote. One point of contact. We handle coordination so you can focus entirely on celebrating with the people you love.',
  },
];

export default function About() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg">About</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="sec-eye centered">Our Story</div>
          <h1 className="sec-title centered">
            <span className="script">All Things Happening Co</span>
          </h1>
          <p className="sec-lead centered">A Pittsburgh-based event rental company built on the belief that every event deserves to be unforgettable.</p>
        </div>
      </div>

      {/* ── BRAND STORY ── */}
      <section className="sec">
        <div className="sec-inner">
          <div className="about-split">
            <AnimateIn>
              <ImagePlaceholder
                label="All Things Happening Co — Brand Photo"
                className="tall"
                style={{ aspectRatio: '3/4', maxWidth: '480px' }}
              />
            </AnimateIn>
            <AnimateIn delay={120}>
              <div className="sec-eye">Who We Are</div>
              <h2 className="sec-title">More than rentals —<br />
                <span className="script" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>an experience.</span>
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.2rem' }}>
                All Things Happening Co is a Pittsburgh-based event rental company dedicated to providing fun, memorable, and fully customized rental experiences for weddings, baby showers, graduations, birthdays, corporate events, and more.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.2rem' }}>
                We believe that the details make the event. A personalized mirror, a vintage phone booth where guests leave voice messages, a tattoo vending machine that has everyone talking — these aren't just rentals. They're the moments your guests will bring up years from now.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2rem' }}>
                Through our partnerships with Tow & Toast and pgh360photo, we can help coordinate a truly full-circle event experience — all from one point of contact.
              </p>
              <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                <Link to="/rentals" className="btn-solid">Browse Our Rentals</Link>
                <Link to="/contact" className="btn-ghost">Work With Us</Link>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="sec" style={{ background: 'var(--blush)', paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="sec-inner">
          <AnimateIn>
            <div className="sec-eye">What Drives Us</div>
            <h2 className="sec-title"><span className="script">Our Values</span></h2>
          </AnimateIn>
          <div className="values-grid">
            {BRAND_VALUES.map((v, i) => (
              <AnimateIn key={v.title} delay={i * 70}>
                <div className="val-card">
                  <div className="val-card-icon">{v.icon}</div>
                  <div className="val-card-title">{v.title}</div>
                  <p className="val-card-desc">{v.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="sec">
        <div className="sec-inner">
          <AnimateIn>
            <div className="sec-eye">The Team</div>
            <h2 className="sec-title"><span className="script">Meet Allie</span></h2>
            <p className="sec-lead">Owner, operator, and the creative mind behind every setup.</p>
          </AnimateIn>
          <AnimateIn delay={80}>
            <div className="team-card">
              <div className="team-photo">
                <ImagePlaceholder label="Allie — Owner" className="square" />
              </div>
              <div>
                <div className="team-name">Allie</div>
                <div className="team-role">Founder & Owner</div>
                <p className="team-bio">
                  Allie launched All Things Happening Co out of a passion for creating memorable event experiences and a belief that every celebration — big or small — deserves something special. With a team of four, she personally oversees every booking, every setup, and every detail to ensure your event exceeds expectations.
                </p>
                <p className="team-bio" style={{ marginTop: '0.8rem' }}>
                  Based in Pittsburgh and serving a 50-mile radius, Allie brings energy, creativity, and an obsessive attention to detail to every event she touches.
                </p>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── ECO COMMITMENT ── */}
      <section style={{ background: 'var(--forest)', padding: '6rem 2rem' }}>
        <div className="sec-inner">
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <AnimateIn>
              <div className="sec-eye" style={{ color: 'var(--rose)', justifyContent: 'center' }}>Sustainability</div>
              <h2 className="sec-title" style={{ color: 'var(--cream)', textAlign: 'center' }}>
                <span className="script" style={{ color: 'var(--rose)' }}>Eco-Friendly Events</span>
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic', fontWeight: 300, color: 'rgba(244,243,241,0.7)', lineHeight: 1.85, marginBottom: '2rem' }}>
                We're committed to being an eco-conscious vendor. Our pieces are built to last — reused beautifully across hundreds of events rather than discarded after one. From minimizing packaging waste to making thoughtful sourcing decisions, sustainability is woven into how we operate, not added as an afterthought.
              </p>
              <Link to="/contact" className="btn-ghost light">Book an Eco-Friendly Event</Link>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec">
        <AnimateIn>
          <div className="cta-script">Ready to work together?</div>
          <p className="cta-sub">Let's build something beautiful for your event. Check availability and get a custom quote.</p>
          <div className="btn-row">
            <Link to="/contact" className="btn-solid">Start a Booking</Link>
            <Link to="/gallery" className="btn-ghost">See Our Work</Link>
          </div>
        </AnimateIn>
      </section>
    </>
  );
}
