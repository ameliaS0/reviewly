import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import ModelSwitcher from './components/ModelSwitcher/ModelSwitcher'
import { ToastContainer } from './components/Toast/Toast'
import { useToast } from './hooks/useToast'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import ProductDetail from './pages/Products/ProductDetail'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Dashboard from './pages/Dashboard/Dashboard'
import Compare from './pages/Compare/Compare'

/*pour le théme sombre ou clair*/
const THEMES = {
  dark: {
    '--bg': '#2C2C2C',
    '--surface': '#333333',
    '--surface-2': '#3a3a3a',
    '--border': 'rgba(255,255,255,0.07)',
    '--border-hover': 'rgba(255,255,255,0.15)',
    '--text': '#E4E4E4',
    '--text-2': 'rgba(228,228,228,0.55)',
    '--text-3': 'rgba(228,228,228,0.30)',
    '--accent': '#A8DADC',
    '--accent-dim': 'rgba(168,218,220,0.12)',
    '--accent-border': 'rgba(168,218,220,0.25)',
    '--red': '#f87171',
    '--red-dim': 'rgba(248,113,113,0.1)',
    '--red-border': 'rgba(248,113,113,0.2)',
    '--yellow': '#fbbf24',
    '--yellow-dim': 'rgba(251,191,36,0.1)',
    '--green': '#4ade80',
    '--green-dim': 'rgba(74,222,128,0.1)',
    '--green-border': 'rgba(74,222,128,0.2)',
    '--btn': '#B39CD0',
    '--btn-text': '#1a1a2e',
    '--radius': '10px',
  },
  light: {
    '--bg': '#f8f9fa',
    '--surface': '#ffffff',
    '--surface-2': '#f1f3f5',
    '--border': 'rgba(0,0,0,0.08)',
    '--border-hover': 'rgba(0,0,0,0.18)',
    '--text': '#0a0a0b',
    '--text-2': 'rgba(10,10,11,0.55)',
    '--text-3': 'rgba(10,10,11,0.35)',
    '--accent': '#059669',
    '--accent-dim': 'rgba(5,150,105,0.1)',
    '--accent-border': 'rgba(5,150,105,0.25)',
    '--red': '#dc2626',
    '--red-dim': 'rgba(220,38,38,0.08)',
    '--red-border': 'rgba(220,38,38,0.2)',
    '--yellow': '#d97706',
    '--yellow-dim': 'rgba(217,119,6,0.1)',
    '--green': '#16a34a',
    '--green-dim': 'rgba(22,163,74,0.1)',
    '--green-border': 'rgba(22,163,74,0.2)',
    '--btn': '#7c3aed',
    '--btn-text': '#ffffff',
    '--radius': '10px',
  }
}

function applyTheme(theme) {
  const root = document.documentElement
  Object.entries(THEMES[theme]).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
  document.body.style.background = THEMES[theme]['--bg']
  document.body.style.color = THEMES[theme]['--text']
}

/*les pages principales du site */
export default function App() {
  const [page, setPage] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const { toasts, addToast, removeToast } = useToast()
  /*appliquer theme */
  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  /*basculer entre les themes */
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  /*page pour les details d'un produit lorsqu'on clique dessus */
  const goToDetail = (product) => {
    setSelectedProduct(product)
    setPage('detail')
  }

  /*visuel final de la structure du site*/
  return (
    <div className="app-root">
      <Navbar page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
      <div>
        {page === 'home'     && <Home onStart={() => setPage('products')} />}
        {page === 'products' && <Products onDetail={goToDetail} addToast={addToast} />}
        {page === 'detail'   && <ProductDetail product={selectedProduct} addToast={addToast} />}
        {page === 'dashboard' && <Dashboard onDetail={goToDetail} addToast={addToast} />}
        {page === 'compare' && <Compare />}
        {page === 'about'    && <About />}
        {page === 'contact'  && <Contact addToast={addToast} />}
      </div>
      <ModelSwitcher />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}