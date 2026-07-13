import { useState, useEffect } from 'react';
import AnimateIn from '../components/AnimateIn';
import ImagePlaceholder from '../components/ImagePlaceholder';
import { SITE } from '../data/site';

const GALLERY_ITEMS = [
  { id: 1, label: "Audio Guest Book Phone Booth — Wedding", layout: "tall", filter: "weddings", image: "/images/phone1.JPG" },
  { id: 2, label: "Tattoo Vending Machine — Graduation Party", layout: "", filter: "graduations", image: "/images/tattoo1.JPG" },
  { id: 3, label: "Drapery Backdrop — Wedding Ceremony", layout: "", filter: "weddings", image: "/images/backdrop1.JPG" },
  { id: 4, label: "Custom Mirror Display — Bridal Shower", layout: "", filter: "weddings", image: "/images/custom1.JPG" },
  { id: 5, label: "Baby Shower Onesie Station Full Setup", layout: "wide", filter: "weddings", image: "/images/phone2.JPG" },
  { id: 6, label: "Build-A-Bear Station — Kids Birthday", layout: "", filter: "birthdays", image: "/images/phone3.JPG" },
  { id: 8, label: "Custom Linen Signage — Wedding Reception", layout: "tall", filter: "weddings", image: "/images/sign1.JPG" },
  { id: 9, label: "Phone Booth Detail Shot — Baby Shower", layout: "", filter: "weddings", image: "/images/phone6.JPG" },
  { id: 10, label: "Tattoo Machine Close-Up — Birthday Party", layout: "", filter: "birthdays", image: "/images/phone7.JPG" },
  { id: 12, label: "Drapery Backdrop — Graduation Celebration", layout: "", filter: ["graduations", "corporate"], image: "/images/backdrop3.JPG" },
  { id: 13, label: "Custom Cups & Napkins Flat Lay — Wedding", layout: "", filter: "weddings", image: "/images/custom2.JPG" },
  { id: 14, label: "Phone Booth — Birthday Party Setup", layout: "", filter: "birthdays", image: "/images/sign2.JPG" },
  { id: 15, label: "Baby Shower Station Table Display", layout: "", filter: "weddings", image: "/images/custom3.JPG" },
  { id: 16, label: "Build-A-Bear Hosted Session", layout: "", filter: "birthdays", image: "/images/backdrop1.JPG" },
  { id: 17, label: "Baby Shower Onesie Decorating Demo", layout: "", filter: "baby-showers", image: "/images/Baby1.png" },
  { id: 18, label: "Guests Creating at Baby Shower Station", layout: "", filter: "baby-showers", image: "/images/Baby2.png" },
  { id: 19, label: "Baby Shower Crafting in Progress", layout: "", filter: "baby-showers", image: "/images/Baby3.png" },
  { id: 20, label: "Baby Shower Station Video Walkthrough", layout: "", filter: "baby-showers", image: "/images/CineBaby.mp4" },
  { id: 21, label: "High-Top Tables Setup — Reception", layout: "", filter: "weddings", image: "/images/Tables1.png" },
  { id: 22, label: "Modern Table Rental Display", layout: "", filter: "weddings", image: "/images/Tables2.png" },
  { id: 23, label: "Tattoo Vending Machine — Event Setup", layout: "", filter: "graduations", image: "/images/tattoo2.jpg" },
  { id: 24, label: "Custom Linen Signage — Elegant Display", layout: "", filter: "weddings", image: "/images/sign3.JPG" },
  { id: 25, label: "Custom Signage — Welcome Sign", layout: "", filter: "weddings", image: "/images/sign4.JPG" },
  { id: 26, label: "Custom Party Accessories — Detailed Setup", layout: "", filter: "weddings", image: "/images/custom4.JPG" },
];

const FILTERS = [
  { id: "all", label: "All Events" },
  { id: "weddings", label: "Weddings" },
  { id: "baby-showers", label: "Baby Showers" },
  { id: "birthdays", label: "Birthdays" },
  { id: "graduations", label: "Graduations" },
  { id: "corporate", label: "Corporate" },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(g => {
      const filters = Array.isArray(g.filter) ? g.filter : [g.filter];
      return filters.includes(activeFilter);
    });

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % filtered.length);
      if (e.key === 'ArrowLeft') setLightbox(i => (i - 1 + filtered.length) % filtered.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, filtered.length]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  return (
    <>
      <div className="page-header">
        <div className="page-header-bg">Gallery</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="sec-eye centered">Our Work</div>
          <h1 className="sec-title centered"><span className="script">Event Gallery</span></h1>
          <p className="sec-lead centered">Real setups, real moments, real memories — browse our work below.</p>
        </div>
      </div>

      <section className="sec" style={{ paddingTop: '2.5rem' }}>
        <div className="sec-inner">
          {/* Filters */}
          <div className="filter-row">
            {FILTERS.map(f => (
              <button
                key={f.id}
                className={`filter-btn${activeFilter === f.id ? ' active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="gallery-grid">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className={`gallery-item${item.layout === 'tall' ? ' tall' : item.layout === 'wide' ? ' wide' : ''}`}
                onClick={() => setLightbox(i)}
              >
                {item.image ? (
                  item.image.endsWith('.mp4') ? (
                    <>
                      <video src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div className="gallery-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '3rem', color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>▶</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <img src={item.image} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      <div className="gallery-overlay">
                        <span className="gallery-zoom">+</span>
                      </div>
                    </>
                  )
                ) : (
                  <ImagePlaceholder label={item.label} style={{ height: '100%', minHeight: 220 }} />
                )}
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <div style={{ textAlign: 'center', marginTop: '3.5rem', borderTop: '1px solid rgba(130,150,114,0.15)', paddingTop: '3rem' }}>
            <div className="sec-eye centered">Stay Updated</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1.5rem', marginTop: '0.5rem' }}>
              Our gallery is updated regularly. Follow us on Instagram for the latest setups and behind-the-scenes content.
            </p>
            <a href={SITE.instagramUrl} target="_blank" rel="noreferrer" className="btn-solid" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="white"></path>
                <circle cx="17.5" cy="6.5" r="1.5" fill="white"></circle>
              </svg>
              Follow {SITE.instagram}
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div
        className={`lightbox${lightbox !== null ? ' open' : ''}`}
        onClick={e => { if (e.target === e.currentTarget) setLightbox(null); }}
      >
        {lightbox !== null && filtered[lightbox] && (
          <div className="lightbox-inner">
            <div className="lightbox-img">
              {filtered[lightbox].image ? (
                filtered[lightbox].image.endsWith('.mp4') ? (
                  <video src={filtered[lightbox].image} style={{ width: '100%', height: 'auto', display: 'block' }} controls autoPlay muted loop />
                ) : (
                  <img src={filtered[lightbox].image} alt={filtered[lightbox].label} style={{ width: '100%', height: 'auto', display: 'block' }} />
                )
              ) : (
                <ImagePlaceholder label={filtered[lightbox].label} className="card" />
              )}
            </div>
            <div className="lightbox-label">{filtered[lightbox].label}</div>
            <div className="lightbox-nav">
              <button
                className="lightbox-btn"
                onClick={() => setLightbox(i => (i - 1 + filtered.length) % filtered.length)}
              >
                ← Prev
              </button>
              <button className="lightbox-close-btn" onClick={() => setLightbox(null)}>
                Close ✕
              </button>
              <button
                className="lightbox-btn"
                onClick={() => setLightbox(i => (i + 1) % filtered.length)}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
