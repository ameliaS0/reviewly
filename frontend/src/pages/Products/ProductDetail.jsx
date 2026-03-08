import { useEffect, useState } from 'react'
import { getReviews, getStats, createReview, deleteReview } from '../../api'
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { ChevronDown } from 'lucide-react'
import './ProductDetail.css'

const CATEGORY_COLORS = {
  Audio: '#6ee7b7', Sport: '#60a5fa', Maison: '#f9a8d4',
  Informatique: '#a78bfa', Mode: '#fbbf24', Autre: '#94a3b8'
}
const BADGE_CLASS = { positif: 'badge badge-pos', neutre: 'badge badge-neu', 'négatif': 'badge badge-neg' }
const BADGE_LABEL = { positif: 'Positive', neutre: 'Neutral', 'négatif': 'Negative' }
const SENTIMENT_COLORS = { positif: '#4ade80', neutre: '#fbbf24', 'négatif': '#f87171' }

/*nmbr d'avis affichés par défaut sinon "load more*/
const REVIEWS_PER_PAGE = 5

/*composant de sélection d'étoiles
onChange c'est just pour la lecture/visuel
onClick changer la note*/
function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="star-rating">
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button"
          onMouseEnter={() => onChange && setHovered(n)}
          onMouseLeave={() => onChange && setHovered(0)}
          onClick={() => onChange && onChange(n)}
          className={`star-btn${n <= (hovered || value) ? ' active' : ''}`}
          style={{ cursor: onChange ? 'pointer' : 'default' }}
        >★</button>
      ))}
    </div>
  )
}

/*tooltip pour les graphs*/
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      {label && <p className="chart-tooltip-label">{label}</p>}
      <p className="chart-tooltip-value">{payload[0].value}</p>
    </div>
  )
}

/*on ale produit sélectionné depuis la page Catalogue
et la fonction pour afficher les notifications Toasts
pour avoir toute la page du produit en question*/
export default function ProductDetail({ product, addToast }) {
  const [reviews, setReviews] = useState([])
  const [stats, setStats] = useState(null)
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [visibleCount, setVisibleCount] = useState(REVIEWS_PER_PAGE)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const accentColor = CATEGORY_COLORS[product.category] || '#94a3b8'

  /*chargement des avis+stas en parallel pour pas avoir 2 appel séquentiel
  jutse pure performance */
  const fetchAll = async () => {
    const [r, s] = await Promise.all([getReviews(product.id), getStats(product.id)])
    setReviews(r.data)
    setStats(s.data)
  }

  /*recharge tout et remet la pagination à zéro quand on change de produit*/
  useEffect(() => { fetchAll(); setVisibleCount(REVIEWS_PER_PAGE) }, [product])

  /*envoie l'avis au backend qui l'analyse automatiquement avec le modèle IA actif*/
  const handleSubmit = async () => {
    if (!text.trim()) return setError('Le texte est requis.')
    setLoading(true); setError('')
    try {
      await createReview(product.id, { text, rating })
      setText(''); setRating(5); fetchAll()
      addToast('Avis ajouté et analysé ✓')
    } catch(e) {
      console.error(e)
      setError("Erreur lors de l'ajout.")
      addToast("Erreur lors de l'ajout", 'error')
    }
    setLoading(false)
  }

  const handleDeleteConfirmed = async () => {
    try {
      await deleteReview(confirmDelete.id)
      setConfirmDelete(null); fetchAll()
      addToast('Avis supprimé', 'error')
    } catch(e) {
      console.error(e)
      addToast('Erreur lors de la suppression', 'error')
    }
  }

  const positivePct = stats && stats.total > 0
    ? Math.round((stats.sentiments.positif / stats.total) * 100) : 0

  /*données pour le PieChart des sentiments*/
  const pieData = stats
    ? Object.entries(stats.sentiments).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }))
    : []

  /*données pour le BarChart des mots-clés négatifs récurrents*/
  const barData = stats ? stats.negative_keywords.map(k => ({ name: k.word, value: k.count })) : []

  const visibleReviews = reviews.slice(0, visibleCount)
  const hasMore = visibleCount < reviews.length

  return (
    <div className="product-detail-page">

      {/*adapte selon la présence ou non d'une image */}
      <div className="product-detail-hero"
        style={{ gridTemplateColumns: product.image ? 'minmax(0,1fr) minmax(0,1.6fr)' : '1fr' }}>
        {product.image && (
          <div className="product-detail-hero-image">
            <img src={product.image} alt={product.name} />
          </div>
        )}

        <div>
          <div className="product-detail-meta">
            <span className="product-detail-category-badge" style={{
              color: accentColor,
              background: `${accentColor}15`,
              border: `1px solid ${accentColor}30`,
            }}>{product.category}</span>
            <span className="mono product-detail-date">
              Added {new Date(product.created_at).toLocaleDateString('fr-FR')}
            </span>
          </div>

          <h1 className="display product-detail-title">{product.name}</h1>

          {/* KPIs + barre de sentiment */}
          {stats && stats.total > 0 && (
            <>
              <div className="product-detail-kpis">
                {[
                  { label: 'Reviews', value: stats.total, color: 'var(--text)' },
                  { label: 'Avg. Rating', value: `${stats.average_rating}/5`, color: 'var(--yellow)' },
                  { label: 'Satisfaction', value: `${positivePct}%`, color: 'var(--green)' },
                ].map((s, i) => (
                  <div key={i} className="product-detail-kpi">
                    <p className="product-detail-kpi-value" style={{ color: s.color }}>{s.value}</p>
                    <p className="product-detail-kpi-label">{s.label}</p>
                  </div>
                ))}
              </div>

              {/*barre des 3 sentiments */}
              <div className="sentiment-bar-wrapper">
                <div className="sentiment-bar">
                  {stats.sentiments.positif > 0 && <div className="sentiment-bar-segment" style={{ flex: stats.sentiments.positif, background: 'var(--green)' }} />}
                  {stats.sentiments.neutre > 0 && <div className="sentiment-bar-segment" style={{ flex: stats.sentiments.neutre, background: 'var(--yellow)' }} />}
                  {stats.sentiments['négatif'] > 0 && <div className="sentiment-bar-segment" style={{ flex: stats.sentiments['négatif'], background: 'var(--red)' }} />}
                </div>
                <div className="sentiment-bar-legend">
                  {[
                    { label: 'Positive', count: stats.sentiments.positif, color: 'var(--green)' },
                    { label: 'Neutral', count: stats.sentiments.neutre, color: 'var(--yellow)' },
                    { label: 'Negative', count: stats.sentiments['négatif'], color: 'var(--red)' },
                  ].map(s => (
                    <span key={s.label} className="sentiment-bar-legend-item">
                      <span className="sentiment-bar-dot" style={{ background: s.color }} />
                      {s.label} ({s.count})
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/*afficher masquer les analyses */}
          {stats && stats.total > 0 && (
            <button onClick={() => setShowAnalytics(v => !v)} className="btn btn-ghost" style={{ fontSize: '13px' }}>
              {showAnalytics ? 'Hide Analytics' : 'View Analytics'}
              <ChevronDown
                size={12}
                style={{ marginLeft: '6px', transform: showAnalytics ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
              />
            </button>
          )}
        </div>
      </div>

      {/*PieChart sentiments + BarChart mots-clés + recommandations */}
      {showAnalytics && stats && stats.total > 0 && (
        <div className="analytics-section fade-up">
          <p className="analytics-section-title">Analytics</p>

          <div className="analytics-charts-grid"
            style={{ gridTemplateColumns: barData.length > 0 ? '1fr 1fr' : '1fr' }}>

            {/* Graphique en anneau des sentiments */}
            <div className="card analytics-chart-card">
              <p className="analytics-chart-title">Sentiment Distribution</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                    outerRadius={75} innerRadius={35} strokeWidth={0} paddingAngle={3}>
                    {pieData.map(entry => <Cell key={entry.name} fill={SENTIMENT_COLORS[entry.name]} />)}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="analytics-pie-legend">
                {pieData.map(entry => (
                  <span key={entry.name} className="analytics-pie-legend-item">
                    <span className="analytics-pie-dot" style={{ background: SENTIMENT_COLORS[entry.name] }} />
                    {entry.name} ({entry.value})
                  </span>
                ))}
              </div>
            </div>

            {/*hraph en barres des mots négatifs*/}
            {barData.length > 0 && (
              <div className="card analytics-chart-card">
                <p className="analytics-chart-title">Negative Keywords</p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData} barSize={18}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: 'var(--text-3)', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--text-3)', fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
                    <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--surface-2)' }} />
                    <Bar dataKey="value" fill="var(--red)" radius={[4,4,0,0]} fillOpacity={0.75} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/*recommandations générées à partir des mots-clés négatifs récurrents */}
          {stats.recommendations.length > 0 && (
            <div className="card analytics-chart-card">
              <p className="analytics-chart-title">Improvement Recommendations</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {stats.recommendations.map((rec, i) => (
                  <div key={i} className="rec-item">
                    <div className="rec-number">{i + 1}</div>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: '14px', color: 'var(--text)' }}>{rec.action}</p>
                      {rec.keyword !== '-' && (
                        <p style={{ fontSize: '12px', color: 'var(--text-3)', marginTop: '3px' }}>
                          Keyword: <span className="mono" style={{ color: 'var(--accent)' }}>"{rec.keyword}"</span> — {rec.count} occurrence{rec.count !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/*formulaire de soumission d'un avis
      + envoie le texte et le rating au backend */}
      <div className="card review-form-card">
        <p className="review-form-title">Submit a Review</p>
        <textarea placeholder="Share your experience with this product..."
          value={text} onChange={e => setText(e.target.value)}
          className="input" style={{ marginBottom: '14px' }} />
        <div className="review-form-footer">
          <div className="review-form-rating-row">
            <span className="review-form-rating-label">Rating</span>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <button onClick={handleSubmit} disabled={loading} className="btn btn-accent">
            {loading ? 'Analyzing...' : 'Submit Review'}
          </button>
        </div>
        {error && <p style={{ color: 'var(--red)', fontSize: '12px', marginTop: '10px' }}>{error}</p>}
      </div>

      {/*liste des avis*/}
      <p className="reviews-list-title">Reviews ({reviews.length})</p>

      {reviews.length === 0 ? (
        <div className="empty" style={{ padding: '48px' }}>
          No reviews yet. Be the first to review this product.
        </div>
      ) : (
        <>
          <div className="reviews-list">
            {visibleReviews.map((r, i) => (
              <div key={r.id} className="card review-card fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="review-card-header">
                  <div className="review-card-left">
                    <StarRating value={r.rating} />
                    <span className={BADGE_CLASS[r.sentiment]}>
                      {BADGE_LABEL[r.sentiment]} · {Math.round(r.sentiment_score * 100)}%
                    </span>
                  </div>
                  <div className="review-card-right">
                    <span className="mono review-card-date">
                      {new Date(r.created_at).toLocaleDateString('fr-FR')}
                    </span>
                    <button onClick={() => setConfirmDelete(r)} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </div>
                <p className="review-card-text">{r.text}</p>
              </div>
            ))}
          </div>

          {/*bouton pour charger plus avis sans recharger la page */}
          {hasMore && (
            <div className="load-more-wrapper">
              <button onClick={() => setVisibleCount(v => v + REVIEWS_PER_PAGE)} className="btn btn-ghost" style={{ fontSize: '13px' }}>
                Load more reviews ({reviews.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {/*confirmation suppression définitive*/}
      {confirmDelete && (
        <ConfirmModal
          message="Delete this review permanently?"
          onConfirm={handleDeleteConfirmed}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  )
}