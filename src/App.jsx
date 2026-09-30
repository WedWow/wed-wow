import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Home from './Home.jsx';
import Gallery from './Gallery.jsx';
import Products from './Products.jsx';
import TermsAndConditions from './TermsAndConditions.jsx';
import PrivacyPolicy from './PrivacyPolicy.jsx';
import Footer from './Footer.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) return;

    const updateScroll = () => setScrolled(window.scrollY > 32);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome || !menuOpen) return;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isHome, menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`site-nav${isHome ? ` site-nav--home${scrolled ? ' site-nav--scrolled' : ''}${menuOpen ? ' site-nav--open' : ''}` : ''}`}>
      <Link to="/" className="site-logo" onClick={closeMenu}>
        WED<span>WOW</span>
      </Link>

      <div className="desktop-nav">
  <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
  <a href="/#occasions">Occasions</a>
  <a href="/#how">How It Works</a>
  <a href="/#enquiry">Enquiry Form</a>
  <span className="nav-divider">|</span>
  <Link to="/gallery">Gallery</Link>
  <Link to="/products">Products</Link>
</div>

      <a href="/#enquiry" className="site-nav-cta" onClick={isHome ? closeMenu : undefined}>
        Get a Quote
      </a>

      <button
        ref={menuButtonRef}
        className="mobile-menu-button"
        type="button"
        onClick={() => setMenuOpen((current) => !current)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls={menuOpen ? 'site-mobile-navigation' : undefined}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div className="mobile-nav-menu" id="site-mobile-navigation">
          <Link to="/" onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); closeMenu(); }}>
            Home
          </Link>
          <a href="/#occasions" onClick={closeMenu}>
            Occasions
          </a>
          <a href="/#how" onClick={closeMenu}>
            How It Works
          </a>
          <a href="/#enquiry" onClick={closeMenu}>
            Enquiry Form
          </a>
          <Link to="/gallery" onClick={closeMenu}>
            Gallery
          </Link>
          <Link to="/products" onClick={closeMenu}>
            Products
          </Link>
        </div>
      )}
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/products" element={<Products />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>

      <Footer />
      <Analytics />
    </BrowserRouter>
  );
}
