import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimateIn from '../components/AnimateIn';
import { POLICIES } from '../data/policies';


export default function Policies() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.slice(1);
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          const offset = 120;
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <>
      <div className="page-header">
        <div className="page-header-bg">Policies</div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="sec-eye centered">Legal & Policies</div>
          <h1 className="sec-title centered"><span className="script">Our Policies</span></h1>
          <p className="sec-lead centered">Clear, fair, and straightforward — here's everything you need to know before booking.</p>
        </div>
      </div>

      <section className="sec">
        <div className="sec-tight">
          {POLICIES.map((p, i) => (
            <AnimateIn key={p.id} delay={i * 50}>
              <div className="policy-block" id={p.id}>
                <div className="policy-title">{p.title}</div>
                <div className="policy-body">{p.body}</div>
              </div>
            </AnimateIn>
          ))}

          <AnimateIn>
            <div style={{
              background: 'var(--blush)', padding: '2.5rem',
              textAlign: 'center', marginTop: '3rem',
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
                Questions about any of our policies? We're happy to clarify anything before you book.
              </p>
              <Link to="/contact" className="btn-solid">Contact Us</Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
