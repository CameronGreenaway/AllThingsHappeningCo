import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../data/site';

export default function Nav({ topOffset = 44 }) {
  const [pinned, setPinned] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setPinned(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const goBook = () => { close(); navigate('/contact'); };

  return (
    <>
      <nav
        className={`nav${pinned ? ' pinned' : ''}`}
        style={{ top: pinned ? 0 : topOffset }}
      >
        <Link className="nav-logo" to="/" onClick={close}>All Things Happening Co</Link>

        <ul className="nav-links">
          {NAV_LINKS.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button className="nav-cta" onClick={goBook}>Book Now</button>

        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`} style={{ paddingTop: pinned ? 60 : topOffset + 72 }}>
        {NAV_LINKS.map(l => (
          <NavLink key={l.to} to={l.to} onClick={close}>{l.label}</NavLink>
        ))}
        <button className="nav-cta" onClick={goBook}>Book Now</button>
      </div>
    </>
  );
}
