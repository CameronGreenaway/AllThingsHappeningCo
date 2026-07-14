import { Link } from 'react-router-dom';
import AnimateIn from '../components/AnimateIn';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { PARTNERS } from '../data/partners';

export default function Partners() {
  return (
    <>
      <div className="page-header">
        <div className="page-header-bg">Partners</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="sec-eye centered">Extended Services</div>
          <h1 className="sec-title centered"><span className="script">Our Partners</span></h1>
          <p className="sec-lead centered">
            We work alongside Pittsburgh's finest to offer a complete, full-circle event experience — all coordinated through one point of contact.
          </p>
        </div>
      </div>

      {/* ── PARTNER CARDS ── */}
      <section className="sec">
        <div className="sec-inner">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {PARTNERS.map((p, i) => (
              <AnimateIn key={p.id} delay={i * 80}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid rgba(130,150,114,0.15)', overflow: 'hidden', background: '#fff' }}>
                  <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                    {p.image ? (
                      <img src={p.image} alt={p.name} loading="lazy" decoding="async" style={{ aspectRatio: '4/3', width: '100%', height: '100%', objectFit: 'contain', objectPosition: p.imagePosition || 'center', display: 'block' }} />
                    ) : (
                      <ImagePlaceholder label={p.imageLabel} style={{ aspectRatio: '4/3', width: '100%' }} />
                    )}
                  </div>
                  <div style={{ padding: '3rem 3rem 3rem 2.5rem', order: i % 2 === 0 ? 1 : 0 }}>
                    <div className="p-badge">{p.badge}</div>
                    <div className="p-name">{p.name}</div>
                    <div className="p-tagline">{p.tagline}</div>
                    <p className="p-desc">{p.desc}</p>
                    <div className="p-services">
                      {p.services.map(s => <span className="p-service-tag" key={s}>{s}</span>)}
                    </div>
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-solid"
                      style={{ display: 'inline-block', textDecoration: 'none' }}
                    >
                      Visit {p.url} →
                    </a>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP MODEL ── */}
      <section style={{ background: 'var(--blush)', padding: '6rem 2rem' }}>
        <div className="sec-inner" style={{ maxWidth: '800px' }}>
          <AnimateIn>
            <div className="sec-eye">How It Works</div>
            <h2 className="sec-title"><span className="script">Coordinated for You</span></h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '1.5rem' }}>
              Tow &amp; Toast and pgh360photo are independent businesses — they handle their own operations, pricing, and booking. Our relationship is built on mutual trust and a shared commitment to making Pittsburgh events exceptional.
            </p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2rem' }}>
              When you book through All Things Happening Co and want to add partner services, just let us know. We'll facilitate introductions and help coordinate timing — so your event runs seamlessly.
            </p>
            <Link to="/contact" className="btn-solid">Inquire About a Full Package</Link>
          </AnimateIn>
        </div>
      </section>

      {/* ── MORE COMING SOON ── */}
      <section className="sec">
        <div className="sec-inner" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <AnimateIn>
            <div className="sec-eye centered">Growing Network</div>
            <h2 className="sec-title centered">
              <span className="script">More Partners Coming Soon</span>
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2rem' }}>
              We're always building relationships with exceptional vendors across Pittsburgh. If you're a vendor interested in partnering with All Things Happening Co, we'd love to hear from you.
            </p>
            <Link to="/contact" className="btn-ghost">Get In Touch</Link>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
