import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Nav from './Nav';
import Footer from './Footer';
import FloatingCTA from './FloatingCTA';
import ScrollToTop from './ScrollToTop';

const BAR_H = 44;
const NAV_H = 72;
const MOBILE_AT = 768;

export default function Layout() {
  const [barVisible, setBarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_AT);

  useEffect(() => {
    if (localStorage.getItem('ath_bar_dismissed')) setBarVisible(false);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_AT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // On mobile the bar is replaced by a pop-up (doesn't push content down),
  // so the nav shouldn't reserve space for it the way it does on desktop.
  const topOffset = (barVisible && !isMobile) ? BAR_H : 0;
  const mainPad = topOffset + NAV_H;

  return (
    <>
      <ScrollToTop />
      <AnnouncementBar onDismiss={() => setBarVisible(false)} />
      <Nav topOffset={topOffset} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
