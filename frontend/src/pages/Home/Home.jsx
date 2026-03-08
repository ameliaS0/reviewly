import { useEffect, useState } from 'react'
import { getGlobalStats } from '../../api'
import logo from '../../assets/logo.png'
import './Home.css'

import { Bot, FileChartColumnIncreasing, NotebookText, FileStack, FolderCheck, GitCompareArrows, ArrowRight } from 'lucide-react'

export default function Home({ onStart }) {
  const [stats, setStats] = useState(null)

  /*Récupère les stats au chargement de la page pour les afficher dynamiquement */
  useEffect(() => {
    getGlobalStats().then(res => setStats(res.data)).catch(() => {})
  }, [])

  return (
    <div className="home-page">

      {/*hero */}
      <div className="home-hero">
        <div className="home-hero-badge">
          <span className="home-hero-dot" />
          L'IA qui lit les avis que personne ne lit.
        </div>

        <img src={logo} alt="Reviewly" className="home-logo-img" />

        <h1 className="display home-title">
          Comprenez mieux<br />
          <span className="home-title-accent">vos clients</span>.
        </h1>

        <p className="home-subtitle">
          Reviewly analyse automatiquement le sentiment de vos avis clients
          grâce à l'IA et génère des recommandations concrètes pour améliorer vos produits.
        </p>

        {/*boutons d'action principaux */}
        <div className="home-actions">
          <button onClick={onStart} className="btn btn-accent home-cta">
            Voir le catalogue
            <ArrowRight />
          </button>
          <a href="#features" className="btn btn-ghost">En savoir plus</a>
        </div>

        {/*stats rapides */}
        <div className="home-stats">
          {[
            {
              value: stats ? stats.total_products : '—',
              label: 'Produits analysés'
            },
            {
              value: stats ? stats.total_reviews : '—',
              label: 'Avis traités'
            },
            {
              value: stats ? `${stats.satisfaction}%` : '—',
              label: 'Satisfaction globale'
            },
          ].map((s, i) => (
            <div key={i} className="home-stat">
              <p className="home-stat-value">{s.value}</p>
              <p className="home-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/*features, grill de 6 fonctions principales*/}
      <div className="home-features" id="features">
        <p className="home-section-label">Fonctionnalités</p>
        <h2 className="display home-section-title">Tout ce dont vous avez besoin</h2>

        <div className="home-features-grid">
          {[
            {
              icon: (
                <Bot />
              ),
              title: 'Analyse de sentiment IA',
              desc: 'Chaque avis est automatiquement classé en positif, neutre ou négatif grâce à des modèles Hugging Face.',
              color: 'var(--accent)',
            },
            {
              icon: (
                <FileChartColumnIncreasing />
              ),
              title: 'Dashboard analytique',
              desc: 'Visualisez la répartition des sentiments, les mots-clés négatifs récurrents et l\'évolution dans le temps.',
              color: '#B39CD0',
            },
            {
              icon: (
                <NotebookText />
              ),
              title: 'Recommandations concrètes',
              desc: 'L\'app génère automatiquement des actions d\'amélioration basées sur les retours négatifs récurrents.',
              color: '#FFC1CC',
            },
            {
              icon: (
                <FileStack />
              ),
              title: 'Multi-modèles',
              desc: 'Changez de modèle IA à la volée — DistilBERT, CamemBERT, RoBERTa ou Multilingual selon vos besoins.',
              color: 'var(--yellow)',
            },
            {
              icon: (
                <FolderCheck />
              ),
              title: 'Gestion de catalogue',
              desc: 'Ajoutez, éditez et organisez vos produits par catégorie avec photos, notes et filtres avancés.',
              color: 'var(--green)',
            },
            {
              icon: (
                <GitCompareArrows />
              ),
              title: 'Comparateur de produits',
              desc: 'Comparez deux produits côte à côte — sentiments, ratings, mots-clés et recommandations.',
              color: '#A8DADC',
            },
          ].map((f, i) => (
            <div key={i} className="home-feature-card card">
              <div className="home-feature-icon" style={{ color: f.color, background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                {f.icon}
              </div>
              <h3 className="home-feature-title">{f.title}</h3>
              <p className="home-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="home-cta-section">
        <h2 className="display home-cta-title">Prêt à analyser vos avis ?</h2>
        <p className="home-cta-subtitle">Commencez dès maintenant, c'est gratuit.</p>
        <button onClick={onStart} className="btn btn-accent home-cta">
          Accéder au catalogue
          <ArrowRight />
        </button>
      </div>

    </div>
  )
}