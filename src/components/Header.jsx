import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + sectionId);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`header-area ${isSticky ? 'header-sticky' : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  className="logoimage"
                  src="/assets/logo.png"
                  alt="Kafe Affair Logo"
                  style={{
                    height: isSticky ? '44px' : '76px',
                    maxHeight: isSticky ? '44px' : '76px',
                    width: 'auto',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    objectFit: 'contain',
                  }}
                />
              </Link>
              
              <ul className={`nav ${mobileMenuOpen ? 'active' : ''}`} style={{ display: mobileMenuOpen ? 'flex' : undefined }}>
                <li>
                  <Link to="/" className={isActive('/') && !location.hash ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={isActive('/about') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                    About
                  </Link>
                </li>
                <li>
                  <a href="#menu" className={location.hash === '#menu' ? 'active' : ''} onClick={(e) => { e.preventDefault(); handleNavClick('menu'); }}>
                    Menu
                  </a>
                </li>
                <li>
                  <Link to="/contact" className={isActive('/contact') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                    Contact Us
                  </Link>
                </li>

              </ul>

              <a
                className={`menu-trigger ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{ cursor: 'pointer' }}
                aria-label="Toggle navigation"
              >
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
