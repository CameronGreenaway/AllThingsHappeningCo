import { useState, useEffect } from 'react';

const BAR_KEY = 'ath_bar_dismissed';
const FOLD_AT = 60;

export default function AnnouncementBar({ onDismiss }) {
  const [dismissed, setDismissed] = useState(false);
  const [folded, setFolded] = useState(false);

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

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem(BAR_KEY, '1');
    onDismiss?.();
  };

  if (dismissed) return null;

  return (
    <>
      {/* Full bar — shown at top of page */}
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

      {/* Compact tab — slides down from under nav when scrolled */}
      <div className={`ann-tab${folded ? ' visible' : ''}`} aria-hidden={!folded}>
        <span className="ann-tab-dot" />
        Summer 2026 Bookings Open
      </div>
    </>
  );
}
