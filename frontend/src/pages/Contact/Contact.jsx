import { useState } from 'react'
import './Contact.css'

/*form de contact clasique */
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = () => {
    {/*valider tous les champs pour l'envoie */}
    if (!form.name.trim() || !form.email.trim() || !form.message.trim())
      return setError('Tous les champs sont requis.')
    if (!form.email.includes('@'))
      return setError('Adresse email invalide.')
    {/*ouvre le client mail de l'utilisateur avec le sujet et le message pré-remplis */}
    const subject = encodeURIComponent(`Message de ${form.name} — Product Advisor`)
    const body = encodeURIComponent(form.message)
    window.location.href = `mailto:ton@email.com?subject=${subject}&body=${body}`
    setSent(true); setError('')
  }

  return (
    <div className="contact-page">
      <h1 className="display contact-title">Me contacter</h1>
      <p className="contact-subtitle">Une question, une suggestion ? Écris-moi directement.</p>

      {/*confiramtion affichée après l'envoi */}
      {sent ? (
        <div className="contact-sent">
          <p className="contact-sent-title">Message envoyé</p>
          <p className="contact-sent-subtitle">Ton client mail s'est ouvert avec le message pré-rempli.</p>
          <button
            onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
            className="btn btn-ghost" style={{ marginTop: '16px', fontSize: '13px' }}>
            Envoyer un autre message
          </button>
        </div>
      ) : (
        /*formulaire de contact */
        <div className="card contact-form-card">
          <div className="contact-form-fields">
            <div className="contact-field">
              <label className="contact-field-label">Nom</label>
              <input type="text" placeholder="Ton nom" value={form.name}
                onChange={handleChange('name')} className="input" />
            </div>
            <div className="contact-field">
              <label className="contact-field-label">Email</label>
              <input type="email" placeholder="ton@email.com" value={form.email}
                onChange={handleChange('email')} className="input" />
            </div>
            <div className="contact-field">
              <label className="contact-field-label">Message</label>
              <textarea placeholder="Ton message..." value={form.message}
                onChange={handleChange('message')} className="input" rows={5} />
            </div>
            {error && <p className="contact-error">{error}</p>}
            <div className="contact-submit-row">
              <button onClick={handleSubmit} className="btn btn-accent">Envoyer</button>
            </div>
          </div>
        </div>
      )}

      <div className="divider" style={{ margin: '40px 0' }} />
      
      {/*liens vers les réseaux et email */}
      <div className="contact-links">
        {[
          { label: 'GitHub', href: 'https://github.com/ameliaS0' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/amélia-saliev-8155232b7' },
          { label: 'ameliasa31@gmail.com', href: 'mailto:ameliasa31@gmail.com' },
        ].map(link => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
            className="btn btn-ghost contact-link">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  )
}