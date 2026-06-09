import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from './AnnouncementBar';
import Nav from './Nav';
import Footer from './Footer';
import FloatingCTA from './FloatingCTA';
import ScrollToTop from './ScrollToTop';

const BAR_H = 44;
const NAV_H = 72;

export default function Layout() {
  const [barVisible, setBarVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('ath_bar_dismissed')) setBarVisible(false);
  }, []);

  const topOffset = barVisible ? BAR_H : 0;
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
