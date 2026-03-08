import { useEffect, useState } from 'react'
import axios from 'axios'
import './ModelSwitcher.css'

const API = axios.create({ baseURL: 'http://localhost:5000/api' })

export default function ModelSwitcher() {
  const [models, setModels] = useState([])
  const [current, setCurrent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  /*récuperation depuis le backend */
  const fetchModels = async () => {
    const res = await API.get('/models/')
    setModels(res.data.available)
    setCurrent(res.data.current)
  }

  /*récupération des modèles pour le tout premier montage de l'application */
  useEffect(() => { fetchModels() }, [])

  /*clique sur un modèle dans la liste */
  const handleSwitch = async (key) => {
    if (key === current?.key) return /*si le modèles est le même alors rien */
    setLoading(true)
    /*envoyer la demande pour charger un autre modèle au backend 
    qui va le charger depuis Hugging face */
    try {
      const res = await API.post('/models/switch', { model_key: key })
      setCurrent(res.data.current)
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  /*affiche rien si le modèle n'est pas encore chargé */
  if (!current) return null

  return (
    <div className="model-switcher">
      {/*panneau déroulant */}
      {expanded && (
        <div className="card model-switcher-panel">
          <p className="model-switcher-panel-title">AI Model</p>
          <div className="model-switcher-list">
            {models.map(m => (
              <button
                key={m.key}
                onClick={() => handleSwitch(m.key)}
                disabled={loading}
                className={`model-switcher-item${m.key === current.key ? ' active' : ''}`}
                style={{ opacity: loading && m.key !== current.key ? 0.5 : 1 }}
              >
                <div>
                  {/*language supporter*/}
                  <p className="model-switcher-item-name">{m.name}</p>
                  <p className="model-switcher-item-lang">{m.lang}</p>
                </div>
                {/*un point vert pour monter le model actif  */}
                {m.key === current.key && <span className="model-switcher-dot" />}
              </button>
            ))}
          </div>
          {loading && <p className="model-switcher-loading">Loading model... this may take a moment</p>}
        </div>
      )}

      <button className="model-switcher-toggle" onClick={() => setExpanded(v => !v)}>
        <span className="model-switcher-toggle-dot" />
        {current.name}
        {/*flèche */}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
    </div>
  )
}