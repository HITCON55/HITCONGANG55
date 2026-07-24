import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon.jsx';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Report Problem', path: '/report' },
  { label: 'Community Issues', path: '/issues' },
  { label: 'Dashboard', path: '/dashboard' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('smart-community-theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme);
      return;
    }
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('smart-community-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <NavLink to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span className="brand__mark">SC</span>
          <span>Smart Community</span>
        </NavLink>

        <nav className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" className="button button--ghost button--small theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} width={18} height={18} />
          </button>
          <NavLink to="/auth" className="button button--ghost button--small">
            Login
          </NavLink>
          <NavLink to="/auth" className="button button--secondary button--small">
            Register
          </NavLink>
        </div>

        <button
          type="button"
          className="mobile-toggle"
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={menuOpen ? 'mobile-menu open container' : 'mobile-menu container'}>
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        <div className="nav-actions">
          <button type="button" className="button button--ghost button--small theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} width={18} height={18} />
          </button>
          <NavLink to="/auth" className="button button--ghost button--small" onClick={() => setMenuOpen(false)}>
            Login
          </NavLink>
          <NavLink to="/auth" className="button button--secondary button--small" onClick={() => setMenuOpen(false)}>
            Register
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
