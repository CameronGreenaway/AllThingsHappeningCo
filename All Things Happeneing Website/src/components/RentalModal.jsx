import { useEffect } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

export default function RentalModal({ service, onClose }) {
  const open = !!service;

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <div
      className={`modal-overlay${open ? ' open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-drawer">
        <div className="modal-close">
          <button onClick={onClose}>← Back to Rentals</button>
          {service?.popular && <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)' }}>Most Popular</span>}
        </div>

        {service && (
          <>
            <ImagePlaceholder
              label={service.imageLabel}
              style={{ aspectRatio: '16/9', width: '100%' }}
            />
            <div className="modal-body">
              <div className="modal-tag">{service.tag}</div>
              <div className="modal-name">{service.name}</div>
              <p className="modal-desc">{service.fullDesc}</p>

              <div className="modal-section-head">What's Included</div>
              <ul className="modal-includes">
                {service.includes.map((item, i) => <li key={i}>{item}</li>)}
              </ul>

              <div className="modal-section-head">Pricing</div>
              <div className="modal-pricing">
                {service.pricing.map((p, i) => (
                  <div className="modal-pricing-row" key={i}>
                    <span>{p.label}</span>
                    <span className="price">{p.price}</span>
                  </div>
                ))}
              </div>

              <a
                href="/contact"
                className="btn-solid"
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                onClick={onClose}
              >
                Inquire About This
              </a>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.8rem', textAlign: 'center', letterSpacing: '0.05em' }}>
                25% deposit required at booking · Delivery included within 50 miles
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
