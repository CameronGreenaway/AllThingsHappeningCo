import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimateIn from '../components/AnimateIn';
import ImagePlaceholder from '../components/ImagePlaceholder';
import RentalModal from '../components/RentalModal';
import { SERVICES, CATEGORIES } from '../data/services';

export default function Rentals() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);

  const filtered = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  return (
    <>
      <div className="page-header">
        <div className="page-header-bg">Rentals</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="sec-eye centered">Full Catalog</div>
          <h1 className="sec-title centered"><span className="script">Our Rentals</span></h1>
          <p className="sec-lead centered">Every prop, every detail — curated, personalized, and delivered to your event.</p>
        </div>
      </div>

      <section className="sec" style={{ paddingTop: '2.5rem' }}>
        <div className="sec-inner">

          {/* Filter tabs */}
          <div className="filter-row">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`filter-btn${activeCategory === c.id ? ' active' : ''}`}
                onClick={() => setActiveCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="rentals-grid">
            {filtered.map((s, i) => (
              <AnimateIn key={s.id} delay={i * 45}>
                <div className="r-card" style={{ height: '100%' }}>
                  <div className="r-card-img">
                    <ImagePlaceholder label={s.imageLabel} className="card" />
                  </div>
                  <div className="r-card-body">
                    <div className="r-tag">{s.tag}</div>
                    <div className="r-name">{s.name}</div>
                    <p className="r-desc">{s.shortDesc}</p>
                    <div className="r-card-footer">
                      <div className="r-price">{s.startingFrom}</div>
                      {s.popular && <span className="popular-badge">Most Popular</span>}
                    </div>
                    <button
                      className="btn-text"
                      style={{ marginTop: '1.2rem', display: 'inline-flex' }}
                      onClick={() => setSelectedService(s)}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--text-muted)' }}>
              Nothing in this category yet — check back soon.
            </div>
          )}
        </div>
      </section>

      {/* Trust bar */}
      <div className="trust-bar">
        {[
          '25% Deposit to Book',
          'Delivery Included',
          'Setup & Takedown Included',
          '50-Mile Radius',
          '4-Week Lead Time',
          'Custom Packages Available',
        ].map(t => (
          <div className="trust-item" key={t}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" style={{ color: 'var(--sage)' }}>
              <circle cx="4" cy="4" r="4"/>
            </svg>
            {t}
          </div>
        ))}
      </div>

      {/* Package CTA */}
      <section className="cta-sec" style={{ padding: '5rem 2rem' }}>
        <AnimateIn>
          <div className="cta-script" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Can't find what you need?
          </div>
          <p className="cta-sub">We love custom packages. Tell us about your event and we'll build a quote around it.</p>
          <div className="btn-row">
            <Link to="/contact" className="btn-solid">Request a Custom Package</Link>
          </div>
        </AnimateIn>
      </section>

      {/* Detail modal */}
      <RentalModal service={selectedService} onClose={() => setSelectedService(null)} />
    </>
  );
}
