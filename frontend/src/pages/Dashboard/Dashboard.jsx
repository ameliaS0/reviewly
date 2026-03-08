import { useEffect, useState } from 'react'
import { getGlobalStats } from '../../api'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import './Dashboard.css'

const CATEGORY_COLORS = {
  Audio: '#6ee7b7', Sport: '#60a5fa', Maison: '#f9a8d4',
  Informatique: '#a78bfa', Mode: '#fbbf24', Autre: '#94a3b8'
}

const SENTIMENT_COLORS = { positif: '#4ade80', neutre: '#fbbf24', 'négatif': '#f87171' }

/*Tooltip personnalisé affiché au survol du graphique camembert
   Recharts passe automatiquement active et payload en props */
const ChartTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="dash-tooltip">
      <p className="dash-tooltip-label">{payload[0].name}</p>
      <p className="dash-tooltip-value">{payload[0].value} avis</p>
    </div>
  )
}

export default function Dashboard({ onDetail }) {
  /*stats globales retournées par l'endpoint /api/stats/global*/
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  /*chargement des stats une seule fois
     finally() garantit que loading passe à false même si l'appel échoue */
  useEffect(() => {
    getGlobalStats()
      .then(res => setStats(res.data))
      .finally(() => setLoading(false))
  }, [])

  /*écrans de remplacement pendant le chargement ou si la base est vide */
  if (loading) return (
    <div className="dashboard-page">
      <div className="empty"><div className="empty-icon">⏳</div>Chargement...</div>
    </div>
  )

  if (!stats || stats.total_products === 0) return (
    <div className="dashboard-page">
      <div className="empty"><div className="empty-icon">📊</div>Aucune donnée disponible.</div>
    </div>
  )

  /*filtre les sentiments à 0 pour ne pas afficher de tranches vides dans le camembert */
  const pieData = Object.entries(stats.sentiments)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }))

  /*produits arrivent déjà triés par satisfaction décroissante depuis le backend */
  const best = stats.products[0]
  const worst = stats.products[stats.products.length - 1]

  return (
    <div className="dashboard-page">

      {/*nbr de produits et d'avis analysés */}
      <div className="dashboard-header">
        <div>
          <p className="mono" style={{ color: 'var(--accent)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Vue globale</p>
          <h1 className="display dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">{stats.total_products} produits · {stats.total_reviews} avis analysés</p>
        </div>
      </div>

      {/*4 KPIs principaux générés depuis un tableau pour éviter la répétition */}
      <div className="dashboard-kpis">
        {[
          { label: 'Produits', value: stats.total_products, color: 'var(--text)' },
          { label: 'Avis total', value: stats.total_reviews, color: 'var(--accent)' },
          { label: 'Note moyenne', value: `${stats.average_rating}/5`, color: 'var(--yellow)' },
          { label: 'Satisfaction', value: `${stats.satisfaction}%`, color: 'var(--green)' },
        ].map((k, i) => (
          <div key={i} className="card dashboard-kpi">
            <p className="dashboard-kpi-value" style={{ color: k.color }}>{k.value}</p>
            <p className="dashboard-kpi-label">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">

        {/*graph camembert + répartition globale des sentiments sur tous les produits */}
        <div className="card dashboard-chart-card">
          <p className="dashboard-section-title">Sentiments globaux</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name"
                cx="50%" cy="50%" outerRadius={80} innerRadius={45}
                strokeWidth={0} paddingAngle={3}>
                {/*chaque tranche reçoit la couleur correspondant à son sentiment */}
                {pieData.map(entry => (
                  <Cell key={entry.name} fill={SENTIMENT_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/*legende manuelle sous le graphique car Recharts ne la gère pas bien sur mobile */}
          <div className="dashboard-pie-legend">
            {pieData.map(entry => (
              <span key={entry.name} className="dashboard-pie-legend-item">
                <span className="dashboard-pie-dot" style={{ background: SENTIMENT_COLORS[entry.name] }} />
                {entry.name} ({entry.value})
              </span>
            ))}
          </div>
        </div>

        {/*spotlight meilleur / pire produit + cliquable pour aller au détail */}
        <div className="dashboard-spotlight">
          {[
            { label: '🏆 Meilleur produit', product: best, color: 'var(--green)', borderColor: 'var(--green-border)', bg: 'var(--green-dim)' },
            { label: '⚠️ À améliorer', product: worst, color: 'var(--red)', borderColor: 'var(--red-border)', bg: 'var(--red-dim)' },
          ].map(({ label, product, color, borderColor, bg }) => (
            <div key={label} className="card dashboard-spotlight-card"
              style={{ borderColor, background: bg }}
              onClick={() => onDetail(product)}>
              <p className="dashboard-spotlight-label" style={{ color }}>{label}</p>
              <div className="dashboard-spotlight-content">
                {product.image && (
                  <img src={product.image} alt={product.name} className="dashboard-spotlight-img" />
                )}
                <div>
                  <p className="dashboard-spotlight-name">{product.name}</p>
                  <p className="dashboard-spotlight-meta">
                    <span style={{ color: 'var(--yellow)' }}>★</span> {product.average_rating} ·&nbsp;
                    <span style={{ color }}> {product.satisfaction}%</span> ·&nbsp;
                    {product.review_count} avis
                  </p>
                  {/*barre de sentiment proportionnelle au nbr d'avis de chaque type */}
                  <div className="dashboard-spotlight-bar">
                    {product.sentiments.positif > 0 && <div style={{ flex: product.sentiments.positif, background: 'var(--green)', borderRadius: '2px' }} />}
                    {product.sentiments.neutre > 0 && <div style={{ flex: product.sentiments.neutre, background: 'var(--yellow)', borderRadius: '2px' }} />}
                    {product.sentiments['négatif'] > 0 && <div style={{ flex: product.sentiments['négatif'], background: 'var(--red)', borderRadius: '2px' }} />}
                  </div>
                </div>
              </div>
              <p className="dashboard-spotlight-hint" style={{ color }}>Cliquer pour voir le détail →</p>
            </div>
          ))}
        </div>
      </div>

      {/*tab de classement complet  trié par satisfaction décroissante
         Chaque ligne est cliquable pour naviguer vers le détail du produit */}
      <div className="card dashboard-table-card">
        <p className="dashboard-section-title">Classement par satisfaction</p>
        <div className="dashboard-table">
          <div className="dashboard-table-header">
            <span>#</span>
            <span>Produit</span>
            <span>Catégorie</span>
            <span>Avis</span>
            <span>Note</span>
            <span>Satisfaction</span>
            <span>Sentiments</span>
          </div>
          {stats.products.map((p, i) => {
            const catColor = CATEGORY_COLORS[p.category] || '#94a3b8'
            return (
              <div key={p.id} className="dashboard-table-row" onClick={() => onDetail(p)}>
                {/*médailles pour le top 3, numéro simple pour le reste */}
                <span className="dashboard-table-rank" style={{
                  color: i === 0 ? 'var(--yellow)' : i === 1 ? 'var(--text-2)' : i === 2 ? '#cd7f32' : 'var(--text-3)'
                }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                </span>
                <span className="dashboard-table-name">{p.name}</span>
                <span>
                  <span className="dashboard-table-category" style={{ color: catColor, background: `${catColor}15`, border: `1px solid ${catColor}30` }}>
                    {p.category}
                  </span>
                </span>
                <span className="dashboard-table-meta">{p.review_count}</span>
                <span className="dashboard-table-meta">
                  <span style={{ color: 'var(--yellow)' }}>★</span> {p.average_rating}
                </span>
                <span className="dashboard-table-satisfaction" style={{
                  color: p.satisfaction >= 70 ? 'var(--green)' : p.satisfaction >= 40 ? 'var(--yellow)' : 'var(--red)'
                }}>
                  {p.satisfaction}%
                </span>
                <span className="dashboard-table-bar">
                  {p.sentiments.positif > 0 && <div style={{ flex: p.sentiments.positif, background: 'var(--green)' }} />}
                  {p.sentiments.neutre > 0 && <div style={{ flex: p.sentiments.neutre, background: 'var(--yellow)' }} />}
                  {p.sentiments['négatif'] > 0 && <div style={{ flex: p.sentiments['négatif'], background: 'var(--red)' }} />}
                </span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}