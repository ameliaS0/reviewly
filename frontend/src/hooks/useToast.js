import { useState, useCallback } from 'react'

/*Hook personnalisé qui centralise la logique des notif
 utilisé dans App.jsx pour gérer toutes les notifications de l'application */
export function useToast() {
  const [toasts, setToasts] = useState([])

  {/*useCallback évite de recréer la fonction à chaque render */}
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
  }, [])

  {/*supprime la notif apres les 3sec */}
  const removeToast = useCallback((id) => {
    setToasts(t => t.filter(toast => toast.id !== id))
  }, [])

  return { toasts, addToast, removeToast }
}