import { useEffect, useState } from 'react'
import { getProducts, compareProducts } from '../../api'
import './Compare.css'

const CATEGORY_COLORS = {
  Audio: '#6ee7b7', Sport: '#60a5fa', Maison: '#f9a8d4',
  Informatique: '#a78bfa', Mode: '#fbbf24', Autre: '#94a3b8'
}

/*affiche une ligne de comparaison entre deux valeurs
Affiche deux barres symétriques (gauche = produit A, droite = produit B)
Le gagnant est mis en évidence avec la couleur accent et un point lumineux*/
function StatBar({ value1, value2, max, color1, color2, label }) {
  /*calcule le pourcentage*/
  const pct1 = max > 0 ? (value1 / max) * 100 : 0
  const pct2 = max > 0 ? (value2 / max) * 100 : 0
  /*1 = produit A gagne, 2 = produit B gagne, 0 = égalité*/
  const winner = value1 > value2 ? 1 : value2 > value1 ? 2 : 0

  return (
    <div className="compare-stat-row">
      {/*valeur du produit A mise en accent si gagnant */}
      <div className="compare-stat-val" style={{ color: winner === 1 ? 'var(--accent)' : 'var(--text-2)' }}>
        {value1}
        {winner === 1 && <span className="compare-winner-dot" />}
      </div>

      <div className="compare-stat-bars">
        <p className="compare-stat-label">{label}</p>
        <div className="compare-stat-track">
          {/*produit A  se remplit de droite à gauche */}
          <div className="compare-bar-left">
            <div className="compare-bar-fill" style={{ width: `${pct1}%`, background: color1 }} />
          </div>
          {/*produit B se remplit de gauche à droite */}
          <div className="compare-bar-right">
            <div className="compare-bar-fill" style={{ width: `${pct2}%`, background: color2 }} />
          </div>
        </div>
      </div>

      {/*valeur du produit B mise en accent si gagnant */}
      <div className="compare-stat-val compare-stat-val-right" style={{ color: winner === 2 ? 'var(--accent)' : 'var(--text-2)' }}>
        {winner === 2 && <span className="compare-winner-dot" />}
        {value2}
      </div>
    </div>
  )
}

export default function Compare() {
  /*liste complète des produits */
  const [products, setProducts] = useState([])
  const [selected1, setSelected1] = useState('')
  const [selected2, setSelected2] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getProducts().then(res => setProducts(res.data))
  }, [])

  const product1 = products.find(p => p.id.toString() === selected1)

  /*filtre le menu B pour n'afficher que les produits de la même catégorie que A
    sinon comparer deux produits de catégories différentes va pas aider
    ex: casque vs canapé */
  const productsForB = product1
    ? products.filter(p => p.category === product1.category && p.id.toString() !== selected1)
    : []

  /*quand on change le produit A, on remet B et les résultats à zéro
    car la comparaison précédente n'est plus valide*/
  const handleSelect1 = (id) => {
    setSelected1(id)
    setSelected2('')
    setResult(null)
  }

  /*envoie les deux ids au backend qui retourne les stats complètes des deux produits*/
  const handleCompare = async () => {
    if (!selected1 || !selected2) return
    setLoading(true)
    try {
      const res = await compareProducts(selected1, selected2)
      setResult(res.data)
    } catch(e) { console.error(e) }
    setLoading(false)
  }

  /*raccourcis vers les données des deux produits dans le résultat*/
  const p1 = result?.product1
  const p2 = result?.product2
  const color1 = p1 ? (CATEGORY_COLORS[p1.category] || '#94a3b8') : '#A8DADC'
  const color2 = p2 ? (CATEGORY_COLORS[p2.category] || '#94a3b8') : '#B39CD0'

  return (
    <div className="compare-page">
      <div className="compare-header">
        <p className="mono" style={{ color: 'var(--accent)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Analyse</p>
        <h1 className="display compare-title">Comparateur</h1>
        <p className="compare-subtitle">Comparez deux produits de la même catégorie côte à côte</p>
      </div>

      {/*sélecteurs*/}
      <div className="card compare-selectors">
        {/*Menu A*/}
        <div className="compare-selector">
          <label className="compare-selector-label" style={{ color: color1 }}>Produit A</label>
          <select value={selected1} onChange={e => handleSelect1(e.target.value)} className="input">
            <option value="">Choisir un produit...</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>{p.name} — {p.category}</option>
            ))}
          </select>
        </div>

        <div className="compare-vs">VS</div>

        {/*Menu B filtré*/}
        <div className="compare-selector">
          <label className="compare-selector-label" style={{ color: color2 }}>Produit B</label>
          <select
            value={selected2}
            onChange={e => { setSelected2(e.target.value); setResult(null) }}
            className="input"
            disabled={!selected1}
          >
            <option value="">
              {!selected1
                ? "Choisissez d'abord le produit A"
                : productsForB.length === 0
                  ? 'Aucun autre produit dans cette catégorie'
                  : 'Choisir un produit...'}
            </option>
            {productsForB.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleCompare}
          disabled={!selected1 || !selected2 || loading}
          className="btn btn-accent compare-btn">
          {loading ? 'Analyse...' : 'Comparer'}
        </button>
      </div>

      {/*résultats affichés uniquement après une comparaison réussie */}
      {result && p1 && p2 && (
        <div className="compare-results fade-up">

          {/*deux produits avec image et badge catégorie a cote*/}
          <div className="compare-products-header">
            <div className="compare-product-card card" style={{ borderColor: `${color1}40` }}>
              {p1.image && <img src={p1.image} alt={p1.name} className="compare-product-img" />}
              <div>
                <p className="compare-product-name">{p1.name}</p>
                <span className="compare-product-category" style={{ color: color1, background: `${color1}15`, border: `1px solid ${color1}30` }}>
                  {p1.category}
                </span>
              </div>
            </div>

            <div className="compare-product-card card" style={{ borderColor: `${color2}40` }}>
              {p2.image && <img src={p2.image} alt={p2.name} className="compare-product-img" />}
              <div>
                <p className="compare-product-name">{p2.name}</p>
                <span className="compare-product-category" style={{ color: color2, background: `${color2}15`, border: `1px solid ${color2}30` }}>
                  {p2.category}
                </span>
              </div>
            </div>
          </div>

          {/*stas comparées chaque ligne utilise le composant StatBar */}
          <div className="card compare-stats-card">
            <p className="compare-section-title">Statistiques</p>
            <div className="compare-stats">
              <StatBar value1={p1.average_rating} value2={p2.average_rating} max={5} label="Note moyenne /5" color1={color1} color2={color2} />
              <StatBar value1={p1.satisfaction} value2={p2.satisfaction} max={100} label="Satisfaction %" color1={color1} color2={color2} />
              <StatBar value1={p1.review_count} value2={p2.review_count} max={Math.max(p1.review_count, p2.review_count, 1)} label="Nombre d'avis" color1={color1} color2={color2} />
              <StatBar value1={p1.sentiments.positif} value2={p2.sentiments.positif} max={Math.max(p1.sentiments.positif, p2.sentiments.positif, 1)} label="Avis positifs" color1={color1} color2={color2} />
              <StatBar value1={p1.sentiments['négatif']} value2={p2.sentiments['négatif']} max={Math.max(p1.sentiments['négatif'], p2.sentiments['négatif'], 1)} label="Avis négatifs" color1={color1} color2={color2} />
            </div>
          </div>

          {/*répartition visuelle des sentiments pour chaque produit */}
          <div className="compare-sentiment-grid">
            {[p1, p2].map((p, i) => {
              const color = i === 0 ? color1 : color2
              const total = p.sentiments.positif + p.sentiments.neutre + p.sentiments['négatif']
              return (
                <div key={p.id} className="card compare-sentiment-card">
                  <p className="compare-section-title" style={{ color }}>{p.name}</p>
                  {/*chaque segment a une largeur flex égale à son nombre d'avis */}
                  <div className="compare-sentiment-bar">
                    {p.sentiments.positif > 0 && <div style={{ flex: p.sentiments.positif, background: 'var(--green)' }} />}
                    {p.sentiments.neutre > 0 && <div style={{ flex: p.sentiments.neutre, background: 'var(--yellow)' }} />}
                    {p.sentiments['négatif'] > 0 && <div style={{ flex: p.sentiments['négatif'], background: 'var(--red)' }} />}
                  </div>
                  <div className="compare-sentiment-legend">
                    {[
                      { label: 'Positif', count: p.sentiments.positif, color: 'var(--green)' },
                      { label: 'Neutre', count: p.sentiments.neutre, color: 'var(--yellow)' },
                      { label: 'Négatif', count: p.sentiments['négatif'], color: 'var(--red)' },
                    ].map(s => (
                      <span key={s.label} className="compare-sentiment-item">
                        <span className="compare-sentiment-dot" style={{ background: s.color }} />
                        {/*affiche le pourcentage calculé sur le total des avis */}
                        {s.label} · {total > 0 ? Math.round((s.count / total) * 100) : 0}%
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/*recommandations genIA*/}
          <div className="compare-recs-grid">
            {[p1, p2].map((p, i) => {
              const color = i === 0 ? color1 : color2
              return (
                <div key={p.id} className="card compare-recs-card">
                  <p className="compare-section-title">
                    Recommandations — <span style={{ color }}>{p.name}</span>
                  </p>
                  {p.recommendations.length === 0 ? (
                    <p style={{ color: 'var(--text-3)', fontSize: '13px' }}>
                      Aucune recommandation — pas assez d'avis négatifs.
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {p.recommendations.map((rec, j) => (
                        <div key={j} className="rec-item">
                          <div className="rec-number" style={{ background: `${color}20`, borderColor: `${color}40`, color }}>{j + 1}</div>
                          <div>
                            <p style={{ fontWeight: 500, fontSize: '13px', color: 'var(--text)' }}>{rec.action}</p>
                            {/*mot-clé négatif détecté et nbr de fois qu'il apparaît dans les avis */}
                            <p style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '2px' }}>
                              Keyword: <span className="mono" style={{ color }}>{rec.keyword}</span> · {rec.count} occurrence{rec.count !== 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/*compare les taux de satisfaction des deux produits
              et désigne automatiquement le gagnant ou annonce une égalité */}
          {p1.review_count > 0 && p2.review_count > 0 && (
            <div className="card compare-verdict">
              <p className="compare-section-title">Verdict</p>
              {p1.satisfaction === p2.satisfaction ? (
                <p className="compare-verdict-text">
                  Les deux produits sont à égalité avec <strong>{p1.satisfaction}%</strong> de satisfaction.
                </p>
              ) : (
                <>
                  <p className="compare-verdict-text">
                    🏆 <strong style={{ color: p1.satisfaction > p2.satisfaction ? color1 : color2 }}>
                      {p1.satisfaction > p2.satisfaction ? p1.name : p2.name}
                    </strong> remporte la comparaison avec{' '}
                    <strong>{Math.max(p1.satisfaction, p2.satisfaction)}%</strong> de satisfaction
                    contre <strong>{Math.min(p1.satisfaction, p2.satisfaction)}%</strong>.
                  </p>
                  <p className="compare-verdict-sub">
                    Écart de satisfaction : <strong style={{ color: 'var(--accent)' }}>
                      {Math.abs(p1.satisfaction - p2.satisfaction)}%
                    </strong>
                  </p>
                </>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  )
}