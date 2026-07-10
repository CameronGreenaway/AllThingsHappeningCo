import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Rentals from './pages/Rentals';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import FAQ from './pages/FAQ';
import Policies from './pages/Policies';

function RedirectHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.search.startsWith('?/')) {
      const redirectPath = '/' + location.search.slice(3).replace(/~and~/g, '&');
      window.history.replaceState(null, '', redirectPath);
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <RedirectHandler />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/policies" element={<Policies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
