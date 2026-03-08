import { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { Sun, Moon, Menu, X } from 'lucide-react'

/* ici le navbar il va recevoir tous les props depuis App.jsx 
pour créer la navigation */
export default function Navbar({ page, setPage, theme, toggleTheme }) {
  /*contrôle l'ouverture/fermeture du menu mobile*/
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'products', label: 'Catalogue' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'compare', label: 'Comparateur' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ]

  /*change de page et ferme le menu mobile si ouvert*/
  const handleNav = (id) => {
    setPage(id)
    setMenuOpen(false)
  }

  return (
    <header
      className="navbar"
      style={{
        background: theme === 'dark'
          ? 'rgba(44,44,44,0.85)'
          : 'rgba(248,249,250,0.85)'
      }}
    >
      <div className="navbar-inner">

        {/*logo cliquable qui amène à la page des produits */}
        <div className="navbar-logo" onClick={() => handleNav('products')}>
          <div className="navbar-logo-icon">
            <img src={logo} alt="Logo" style={{ width: '100%', height: '100%' }} />
          </div>
          <span className="navbar-logo-text">Reviewly</span>
        </div>

        {/*nav desktop cachée sur mobile */}
        <div className="navbar-right navbar-desktop">
          <nav className="navbar-nav">
            {/*surlignage de la page qui est active */}
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`navbar-nav-btn${page === item.id ? ' active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/*affiche l'icône opposée au thème actuel */}
          <button
            className="navbar-theme-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        <div className="navbar-mobile-controls">
          <button className="navbar-theme-btn" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button className="navbar-theme-btn" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/*menu déroulant mobile visible uniquement quand menuOpen est true */}
      {menuOpen && (
        <div className="navbar-mobile-menu" style={{
          background: theme === 'dark' ? 'rgba(44,44,44,0.97)' : 'rgba(248,249,250,0.97)'
        }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`navbar-mobile-item${page === item.id ? ' active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

    </header>
  )
}