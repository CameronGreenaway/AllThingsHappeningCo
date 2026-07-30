import { useState, useEffect } from 'react';

const BAR_KEY = 'ath_bar_dismissed';
const FOLD_AT = 60;
const MOBILE_AT = 768;

export default function AnnouncementBar({ onDismiss }) {
  const [dismissed, setDismissed] = useState(false);
  const [folded, setFolded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_AT);

  useEffect(() => {
    if (localStorage.getItem(BAR_KEY)) {
      setDismissed(true);
      return;
    }
    const onScroll = () => setFolded(window.scrollY > FOLD_AT);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_AT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock background scroll while the mobile popup is showing
  useEffect(() => {
    if (!dismissed && isMobile) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [dismissed, isMobile]);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem(BAR_KEY, '1');
    onDismiss?.();
  };

  if (dismissed) return null;

  return (
    <>
      {/* Full bar — shown at top of page (desktop/tablet) */}
      <div className={`ann-bar${folded ? ' folded' : ''}`}>
        <p>
          Summer &amp; Fall 2026 Bookings Now Open
          <span className="ann-dot">·</span>
          Reserve Your Date — 14 Day Minimum Lead Time
          <span className="ann-dot">·</span>
          Pittsburgh &amp; 50-Mile Radius
        </p>
        <button className="ann-close" onClick={dismiss} aria-label="Dismiss">✕</button>
      </div>

      {/* Compact tab — slides down from under nav when scrolled (desktop/tablet) */}
      <div className={`ann-tab${folded ? ' visible' : ''}`} aria-hidden={!folded}>
        <span className="ann-tab-dot" />
        Summer 2026 Bookings Open
      </div>

      {/* Announcement pop-up — mobile only */}
      <div
        className="ann-popup-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Booking announcement"
        onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
      >
        <div className="ann-popup">
          <button className="ann-popup-close" onClick={dismiss} aria-label="Dismiss">✕</button>
          <span className="ann-popup-dot" />
          <div className="ann-popup-eyebrow">Now Booking</div>
          <p className="ann-popup-line">
            <span className="ann-popup-highlight">Summer &amp; Fall 2026</span> bookings are now open
          </p>
          <p className="ann-popup-line">
            Reserve your date with a <span className="ann-popup-highlight">14 Day Minimum Lead Time</span>
          </p>
          <p className="ann-popup-line">
            Proudly serving <span className="ann-popup-highlight">Pittsburgh &amp; the 50-Mile Radius</span>
          </p>
          <button className="btn-ghost light ann-popup-btn" onClick={dismiss}>Got It</button>
        </div>
      </div>
    </>
  );
}
