import './ConfirmModal.css'

/*feature qui permet de confirmer si l'utilisateur veut supprimer un produit/avis */
export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div
      className="confirm-modal-overlay"
      onClick={e => e.target === e.currentTarget && onCancel()}
    >
      <div className="card confirm-modal-box">
        <p className="confirm-modal-title">Confirmer la suppression</p>
        <p className="confirm-modal-message">{message}</p>
        <div className="confirm-modal-actions">
          <button onClick={onCancel} className="btn btn-ghost">Annuler</button>
          <button onClick={onConfirm} className="btn btn-danger">Supprimer</button>
        </div>
      </div>
    </div>
  )
}