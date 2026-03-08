import { useEffect, useState } from 'react'
import './Toast.css'

/*fonction pour crée notification temporaire qui 
apparaît et disparaît automatiquement pour nous informer des actions*/
export function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    /*3sec pour disparaître */
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, 3000)
    /*annule le timer si il a été intérompu pendan
    changement de page, forcer fermeture de la notif... */
    return () => clearTimeout(timer)
  }, [])

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  }

  return (
    <div className={`toast toast-${type} ${visible ? 'toast-in' : 'toast-out'}`}>
      <span className="toast-icon">{icons[type]}</span>
      <span className="toast-message">{message}</span>
    </div>
  )
}

/*affiche tous les toasts actifs empilés en bas de l'écran
 - toasts: tableau des toasts actifs géré dans App.jsx via useToast()
 - removeToast: supprimer un toast par son id */
export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  )
}