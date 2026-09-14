import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from './ImagePlaceholder';

/* Collects packages into their `group` buckets while preserving the order
   they are declared in, so the data file controls how the modal reads. */
function groupPackages(packages = []) {
  const groups = [];
  for (const pkg of packages) {
    const key = pkg.group || '';
    let bucket = groups.find(g => g.key === key);
    if (!bucket) { bucket = { key, items: [] }; groups.push(bucket); }
    bucket.items.push(pkg);
  }
  return groups;
}

export default function RentalModal({ service, onClose }) {
  const open = !!service;
  const [zoomed, setZoomed] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  // Track mobile state on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
                  src.endsWith('.mp4') ? (
                    <video
                      key={i}
                      src={src}
                      poster={src.replace(/\.mp4$/i, '-poster.jpg')}
                      alt={`${service.name} — video ${i + 1}`}
                      className="modal-gallery-img"
                      style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
                      controls
                      autoPlay={!isMobile}
                      loop
                      muted
                    />
                  ) : (
                    <img
                      key={i}
                      src={src}
                      alt={`${service.name} — photo ${i + 1}`}
                      className={`modal-gallery-img${service.imageFit === 'contain' ? ' contain-photo' : ''}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                        display: 'block',
                        objectPosition: service.imagePositions?.[i] || service.mainImageStyle?.['--img-pos'] || 'center',
                      }}
                      onClick={() => setZoomed(src)}
                    />
                  )
                ))
              ) : (
                <ImagePlaceholder label={service.imageLabel} />
              )}
            </div>
            <div className="modal-body">
              <div className="modal-tag">{service.tag}</div>
              <div className="modal-name">{service.name}</div>
              <p className="modal-desc">{service.fullDesc}</p>

              {service.packages && service.packages.length > 0 ? (
                <>
                  <div className="modal-section-head">Package Options</div>
                  {/* Grouped by what is actually being rented, so a listing
                      covering several products reads as a short menu of
                      choices rather than one long run of similar cards.
                      Packages with no `group` fall into a single unlabelled
                      block, which is how every other listing still renders. */}
                  {groupPackages(service.packages).map(group => (
                    <div key={group.key || 'ungrouped'}>
                      {group.key && <div className="pkg-group-head">{group.key}</div>}
                      <div className="pkg-grid">
                        {group.items.map((pkg) => (
                          <div key={pkg.id} className="pkg-card">
                            <div className="pkg-name">{pkg.name}</div>
                            <div className="pkg-price">{pkg.price}</div>
                            <ul className="pkg-items">
                              {pkg.items.map((item, i) => {
                                // An item is either a plain string or
                                // { text, mark } — `mark: "x"` marks something
                                // the package deliberately does not include.
                                const text = typeof item === 'string' ? item : item.text;
                                const excluded = typeof item !== 'string' && item.mark === 'x';
                                return (
                                  <li key={i}>
                                    <span className="pkg-mark" aria-hidden="true">
                                      {excluded ? '✗' : '✓'}
                                    </span>
                                    <span className="sr-only">
                                      {excluded ? 'Not included:' : 'Included:'}
                                    </span>
                                    {' '}{text}
                                  </li>
                                );
                              })}
                            </ul>
                            {pkg.note && <p className="pkg-note">{pkg.note}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
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
                </>
              )}

              <Link
                to={`/contact?serviceId=${service.id}`}
                className="btn-solid"
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                onClick={onClose}
              >
                Inquire About This
              </Link>
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
