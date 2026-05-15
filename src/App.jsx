import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './Home.jsx';
import Gallery from './Gallery.jsx';
import Products from './Products.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-nav">
      <Link to="/" className="site-logo" onClick={closeMenu}>
        WED<span>WOW</span>
      </Link>

      <div className="desktop-nav">
  <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
  <a href="/#occasions">Occasions</a>
  <a href="/#how">How It Works</a>
  <a href="/#enquiry">Bulk Pricing</a>
  <span className="nav-divider">|</span>
  <Link to="/gallery">Gallery</Link>
  <Link to="/products">Products</Link>
</div>

      <a href="/#enquiry" className="site-nav-cta">
        Get a Quote
      </a>

      <button
        className="mobile-menu-button"
        type="button"
        onClick={() => setMenuOpen((current) => !current)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div className="mobile-nav-menu">
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
            Bulk Pricing
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
      </Routes>
    </BrowserRouter>
  );
}
