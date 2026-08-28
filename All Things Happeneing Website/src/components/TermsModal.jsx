import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { POLICIES } from '../data/policies';

/* Terms pop-up for the booking form.

   Every policy is readable in place rather than behind a link, so
   agreeing does not depend on the customer having opened another tab.
   Each section also deep-links to /policies for a permanent copy. */
export default function TermsModal({ open, onClose, onAccept }) {
  const [openSection, setOpenSection] = useState(POLICIES[0]?.id ?? null);
  const [checked, setChecked] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Reopening after a decline should not remember the old tick
  useEffect(() => { if (!open) setChecked(false); }, [open]);

  if (!open) return null;

  return (
    <div
      className="terms-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Terms of service"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="terms-card">
        <div className="terms-head">
          <div>
            <div className="terms-eyebrow">Before You Book</div>
            <div className="terms-title">Terms of Service</div>
          </div>
          <button className="terms-x" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <p className="terms-lead">
          These are the terms for your booking. Open any section to read it in
          full — accepting below covers all of them.
        </p>

        <div className="terms-list" ref={panelRef}>
          {POLICIES.map(p => {
            const isOpen = openSection === p.id;
            return (
              <div className={`terms-item${isOpen ? ' open' : ''}`} key={p.id}>
                <button
                  type="button"
                  className="terms-item-head"
                  aria-expanded={isOpen}
                  onClick={() => setOpenSection(isOpen ? null : p.id)}
                >
                  <span>{p.title}</span>
                  <span className="terms-chev" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="terms-item-body">
                    {p.body}
                    <Link
                      to={`/policies#${p.id}`}
                      className="terms-permalink"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open this policy in a new tab →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <label className="terms-agree">
          <input
            type="checkbox"
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
          />
          <span>
            I have read and agree to all {POLICIES.length} policies above,
            including that the <strong>25% deposit is non-refundable</strong>
            {' '}after 48 hours.
          </span>
        </label>

        <div className="terms-actions">
          <button type="button" className="btn-ghost terms-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-solid terms-accept"
            disabled={!checked}
            onClick={() => { onAccept(); onClose(); }}
          >
            Accept &amp; Continue
          </button>
        </div>
      </div>
    </div>
  );
}
