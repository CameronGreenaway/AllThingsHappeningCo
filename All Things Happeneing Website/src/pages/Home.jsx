import { Link } from 'react-router-dom';
import AnimateIn from '../components/AnimateIn';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { SERVICES, FEATURED } from '../data/services';
import { PARTNERS } from '../data/partners';
import { SITE, HOW_IT_WORKS, TESTIMONIALS, VALUES } from '../data/site';

const DecoSVG = ({ className }) => (
  <svg className={`hero-deco ${className}`} viewBox="0 0 240 580" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#829672" strokeWidth="0.8">
      <path d="M120 560 C120 390 30 330 65 185 C85 110 145 75 120 15"/>
      <path d="M120 500 C145 420 215 365 178 262 C158 188 105 172 120 98"/>
      <ellipse cx="52" cy="285" rx="38" ry="13" transform="rotate(-28 52 285)" strokeWidth="0.7"/>
      <ellipse cx="185" cy="238" rx="33" ry="11" transform="rotate(22 185 238)" strokeWidth="0.7"/>
      <path d="M88 332 Q70 312 80 292 Q90 274 110 284"/>
      <path d="M165 402 Q185 382 180 358 Q174 338 156 346"/>
      <circle cx="67" cy="182" r="5.5" fill="#829672" fillOpacity="0.35" stroke="none"/>
      <circle cx="170" cy="138" r="3.5" fill="#D8959B" fillOpacity="0.35" stroke="none"/>
      <circle cx="122" cy="475" r="4" fill="#829672" fillOpacity="0.3" stroke="none"/>
    </g>
  </svg>
);

export default function Home() {
  const featured = FEATURED.map(id => SERVICES.find(s => s.id === id)).filter(Boolean);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <DecoSVG className="left" />
        <DecoSVG className="right" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-eyebrow">
            <span></span>Pittsburgh's Premier Event Rental Co.<span></span>
          </div>
          <h1 className="hero-h1">Creating Memories<br />That Last a Lifetime</h1>
          <p className="hero-sub">
            From stunning props to seamless setups — we provide everything your event needs so you can focus on celebrating.
          </p>
          <div className="btn-row">
            <Link to="/rentals" className="btn-solid">Explore Rentals</Link>
            <Link to="/contact" className="btn-ghost">Book Now</Link>
          </div>
          <div className="scroll-cue">
            <div className="scroll-line"></div>
            <span>Scroll</span>
          </div>
        </div>
      </section>

      {/* ── VALUES BAR ── */}
      <div className="values-bar">
        {VALUES.map(v => <span className="val-item" key={v}>{v}</span>)}
      </div>

      {/* ── FEATURED RENTALS ── */}
      <section className="sec">
        <div className="sec-inner">
          <AnimateIn>
            <div className="sec-eye">What We Offer</div>
            <h2 className="sec-title"><span className="script">Our Rentals</span></h2>
            <p className="sec-lead">Every prop, every detail, every moment — curated and delivered to your event with care and intention.</p>
          </AnimateIn>
          <div className="rentals-grid">
            {featured.map((s, i) => (
              <AnimateIn key={s.id} delay={i * 55}>
                <div className="r-card" style={{ height: '100%' }}>
                  <div className="r-card-img">
                    {s.mainImage || s.images?.length ? (
                      <img src={s.mainImage || s.images[0]} alt={s.name} className="card r-card-photo" style={s.mainImageStyle} />
                    ) : (
                      <ImagePlaceholder label={s.imageLabel} className="card" />
                    )}
                  </div>
                  <div className="r-card-body">
                    <div className="r-tag">{s.tag}</div>
                    <div className="r-name">{s.name}</div>
                    <p className="r-desc">{s.shortDesc}</p>
                    <div className="r-card-footer">
                      <div className="r-price">{s.startingFrom}</div>
                      {s.popular && <span className="popular-badge">Most Popular</span>}
                    </div>
                    <Link to={`/rentals#${s.id}`} className="btn-text" style={{ marginTop: '1.2rem', display: 'inline-flex' }}>
                      View Details →
                    </Link>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/rentals" className="btn-ghost">View All Rentals</Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-sec">
        <div className="sec-inner">
          <AnimateIn>
            <div className="sec-eye">Simple Process</div>
            <h2 className="sec-title"><span className="script">How It Works</span></h2>
            <p className="sec-lead">Booking your perfect event setup is easier than you think.</p>
          </AnimateIn>
          <div className="steps">
            {HOW_IT_WORKS.map((s, i) => (
              <AnimateIn key={s.n} delay={i * 100}>
                <div className="step-num">{s.n}</div>
                <div className="step-line"></div>
                <div className="step-title">{s.title}</div>
                <p className="step-desc">{s.desc}</p>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ── */}
      <section className="area-sec">
        <div className="area-inner">
          <AnimateIn>
            <div className="area-map">
              <div className="area-circle">
                <div className="area-dot"></div>
                <span className="area-label">50-Mile Radius</span>
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={100}>
            <div className="area-content">
              <div className="sec-eye" style={{ color: 'var(--rose)' }}>Where We Serve</div>
              <h2 className="sec-title" style={{ color: 'var(--cream)' }}>
                <span className="script" style={{ color: 'var(--rose)' }}>Pittsburgh & Beyond</span>
              </h2>
              <p className="sec-lead" style={{ color: 'rgba(244,243,241,0.6)' }}>
                Based in Pittsburgh, PA — we deliver, set up, and take down within a 50-mile radius. Events beyond the radius are welcome for an additional mileage fee.
              </p>
              <div className="area-stats">
                {[
                  { n: '50', l: 'Mile Radius' },
                  { n: '14+', l: 'Day Lead Time' },
                  { n: '1–2', l: 'Hr Setup Window' },
                  { n: '25%', l: 'Deposit to Book' },
                ].map(s => (
                  <div className="area-stat" key={s.l}>
                    <div className="area-stat-num">{s.n}</div>
                    <div className="area-stat-label">{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2.5rem' }}>
                <Link to="/contact#calendar" className="btn-solid">Check Availability</Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── PARTNERS PREVIEW ── */}
      <section className="sec">
        <div className="sec-inner">
          <AnimateIn>
            <div className="sec-eye">Extended Services</div>
            <h2 className="sec-title"><span className="script">Our Partners</span></h2>
            <p className="sec-lead">We work alongside Pittsburgh's best to offer a complete, full-circle event experience.</p>
          </AnimateIn>
          <div className="partners-grid">
            {PARTNERS.map((p, i) => (
              <AnimateIn key={p.id} delay={i * 100}>
                <div className="p-card">
                  <div className="p-card-img">
                    {p.image ? (
                      <img src={p.image} alt={p.name} style={{ objectFit: 'contain', objectPosition: p.imagePosition || 'center', width: '100%', height: '100%', display: 'block' }} />
                    ) : (
                      <ImagePlaceholder label={p.imageLabel} />
                    )}
                  </div>
                  <div className="p-card-body">
                    <div className="p-badge">{p.badge}</div>
                    <div className="p-name">{p.name}</div>
                    <div className="p-tagline">{p.tagline}</div>
                    <p className="p-desc">{p.desc}</p>
                    <Link to="/partners" className="btn-text">Learn More →</Link>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM ── */}
      <section className="insta-sec">
        <div className="sec-inner">
          <AnimateIn>
            <div className="sec-eye centered">Follow Along</div>
            <h2 className="sec-title centered">
              <span className="script">@allthingshappeningco</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={80}>
            <div className="insta-grid">
              {[...Array(8)].map((_, i) => (
                <div className="insta-tile" key={i}>
                  <ImagePlaceholder label={`Instagram Post ${i + 1}`} />
                </div>
              ))}
            </div>
          </AnimateIn>
          <div className="insta-cta">
            <p>See our latest setups, behind-the-scenes moments, and happy clients.</p>
            <a className="insta-handle" href={SITE.instagramUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"></path>
                <circle cx="17.5" cy="6.5" r="1.5" fill="white"></circle>
              </svg>
              Follow on Instagram →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="test-sec">
        <div className="sec-inner">
          <AnimateIn>
            <div className="sec-eye" style={{ color: 'var(--rose)', justifyContent: 'center' }}>Kind Words</div>
            <h2 className="sec-title" style={{ color: 'var(--cream)', textAlign: 'center' }}>
              <span className="script" style={{ color: 'var(--rose)' }}>Happy Clients</span>
            </h2>
          </AnimateIn>
          <div className="test-grid">
            {TESTIMONIALS.map((t, i) => (
              <AnimateIn key={i} delay={i * 80}>
                <div className="t-card">
                  <div className="t-mark">"</div>
                  <p className="t-text">{t.quote}</p>
                  <div className="t-author">{t.author}</div>
                  <div className="t-event">{t.event}</div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-sec">
        <AnimateIn>
          <div className="cta-script">Let's make it happen.</div>
          <p className="cta-sub">Ready to bring your event to life? Check availability and build your custom package.</p>
          <div className="btn-row">
            <Link to="/contact" className="btn-solid">Start Booking</Link>
            <Link to="/rentals" className="btn-ghost">Browse Rentals</Link>
          </div>
          <div className="cta-note">Serving Pittsburgh & Surroundings · 50-Mile Radius · Book 14 Days in Advance</div>
        </AnimateIn>
      </section>
    </>
  );
}
