import { useEffect, useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder';

export default function RentalModal({ service, onClose }) {
  const open = !!service;
  const [zoomed, setZoomed] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      // Esc closes the enlarged photo first, then the modal itself
      if (zoomed) setZoomed(null);
      else onClose();
    };
    if (open) document.addEventListener('keydown', onKey);
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, zoomed]);

  // Reset the enlarged photo whenever the modal closes
  useEffect(() => { if (!open) setZoomed(null); }, [open]);

  return (
    <>
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
            <div className="modal-gallery">
              {service.images?.length ? (
                service.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${service.name} — photo ${i + 1}`}
                    className="modal-gallery-img"
                    onClick={() => setZoomed(src)}
                  />
                ))
              ) : (
                <ImagePlaceholder label={service.imageLabel} />
              )}
            </div>
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

      {/* Full-size photo viewer — click any gallery image to open */}
      {zoomed && (
        <div className="photo-viewer" onClick={() => setZoomed(null)}>
          <button className="photo-viewer-close" onClick={() => setZoomed(null)} aria-label="Close">✕</button>
          <img src={zoomed} alt="" className="photo-viewer-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}
