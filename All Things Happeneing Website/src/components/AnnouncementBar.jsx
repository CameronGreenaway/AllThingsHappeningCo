import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────────────────────
   POSTER ANNOUNCEMENT — optional, off by default.

   While enabled, a full-image pop-up shows on every screen size and
   BOTH the desktop banner and the mobile announcement pop-up are
   suppressed. Use it for launches, sales, or seasonal announcements.
   With it off, the normal announcement runs everywhere.

   To run a new campaign:
     1. Drop the artwork in public/images/
     2. Point `src` at it and rewrite `alt` to describe it
     3. Give `id` a NEW value
     4. Set enabled: true

   Step 3 is the one that bites. Dismissals are stored against the id,
   so a new id shows the poster again to everyone who closed the last
   one. Reuse an old id and returning visitors never see the new
   poster — the campaign would run to new visitors only.

   `alt` is not decoration: everything the artwork says should be in
   there, or the announcement does not exist for screen readers.

   Layout.jsx reads POSTER_ACTIVE so the nav spacing follows.
   ───────────────────────────────────────────────────────────── */
export const POSTER = {
  enabled: false,
  id: 'launch-2026',
  src: '/images/launch-poster.png',
  alt: 'Welcome to the official launch of All Things Happening Co. Summer and Fall 2026 booking now open — reserve your date today. Pittsburgh and 50-mile radius. Instagram: allthingshappeningco. Email: allthingshappeningco@gmail.com.',
};

export const POSTER_ACTIVE = POSTER.enabled;

// Scoped to the poster id so each campaign is dismissed independently.
const POSTER_KEY = `ath_poster_${POSTER.id}_dismissed`;

const BAR_KEY = 'ath_bar_dismissed';
const FOLD_AT = 60;
const MOBILE_AT = 768;

export default function AnnouncementBar({ onDismiss }) {
  return POSTER_ACTIVE
    ? <PosterAnnouncement onDismiss={onDismiss} />
    : <StandardAnnouncement onDismiss={onDismiss} />;
}

/* ── Poster pop-up (mobile + desktop) ── */
function PosterAnnouncement({ onDismiss }) {
  // Start hidden so returning visitors never get a flash of the poster
  // before localStorage is read.
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem(POSTER_KEY)) setDismissed(false);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    localStorage.setItem(POSTER_KEY, '1');
    onDismiss?.();
  };

  useEffect(() => {
    if (dismissed) return;
    const onKey = (e) => { if (e.key === 'Escape') dismiss(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className="launch-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Official launch announcement"
      onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
    >
      <div className="launch-card">
        <button className="launch-close" onClick={dismiss} aria-label="Close announcement">✕</button>
        <img
          className="launch-poster"
          src={POSTER.src}
          alt={POSTER.alt}
        />
        <button className="btn-solid launch-enter" onClick={dismiss}>Continue to Site</button>
      </div>
    </div>
  );
}

/* ── Normal announcement: desktop banner + mobile pop-up ── */
function StandardAnnouncement({ onDismiss }) {
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
