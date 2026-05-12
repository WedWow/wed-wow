import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import Gallery from './Gallery.jsx';
import Products from './Products.jsx';

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
  <a href="/#products">Products</a>
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
          <a href="/#products" onClick={closeMenu}>
            Products
          </a>
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
            Products Page
          </Link>
        </div>
      )}
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}