<div align="center">
  <img src="frontend/src/assets/logo.png" alt="Reviewly Logo" width="100" />

  # Reviewly

  **AI-Powered Product Review Analyzer**

  Analysez automatiquement le sentiment de vos avis clients grâce à l'IA
  et générez des recommandations concrètes pour améliorer vos produits.

  ![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
  ![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat&logo=flask)
  ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat&logo=postgresql)
  ![HuggingFace](https://img.shields.io/badge/Hugging%20Face-Transformers-FFD21E?style=flat&logo=huggingface)
  ![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python)
  ![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)

</div>

---

## Présentation

**Reviewly** est une application web full-stack qui centralise les avis clients par produit, analyse automatiquement leur sentiment (positif / neutre / négatif) via des modèles Hugging Face Transformers, et génère des recommandations d'amélioration basées sur les retours négatifs récurrents.

---

## Stack technique

### Frontend
| Technologie | Usage |
|---|---|
| React 18 + Vite | Framework UI + bundler |
| Tailwind CSS | Utilitaires CSS |
| Recharts | Graphiques (PieChart, BarChart) |
| Axios | Appels API |
| react-easy-crop | Recadrage d'images |

### Backend
| Technologie | Usage |
|---|---|
| Python 3.11+ | Runtime |
| Flask | Serveur web |
| SQLAlchemy | ORM |
| PostgreSQL | Base de données |
| Hugging Face Transformers | Analyse de sentiment IA |
| PyTorch | Moteur d'inférence |

---

## Structure du projet

```
reviewly/
├── .gitignore
├── .env.example
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── requirements.txt
│   ├── .env
│   ├── data/
│   │   ├── keywords.py         # Synonymes + recommandations par catégorie
│   │   ├── init_db.py          # Script d'initialisation de la base
│   │   └── seed.sql            # Données de la démo
│   ├── routes/
│   │   ├── products.py
│   │   ├── reviews.py
│   │   ├── stats.py
│   │   └── models.py           # Switcher de modèle IA
│   └── services/
│       └── sentiment.py
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── index.css
        ├── api.js
        ├── hooks/
        │   └── useToast.js
        ├── components/
        │   ├── Navbar/
        │   ├── ConfirmModal/
        │   ├── Toast/
        │   └── ModelSwitcher/
        └── pages/
            ├── Home/
            ├── Products/
            ├── ProductDetail/
            ├── Dashboard/
            ├── Compare/
            ├── About/
            └── Contact/
```

---

## Installation rapide

### Prérequis
- [Node.js 18+](https://nodejs.org/en/download/current)
- [Python 3.11+](https://www.python.org/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)

### 1. Cloner le projet

```bash
git clone https://github.com/ameliaS0/Reviewly.git
cd reviewly
```

### 2. Configurer le backend

```bash
cd backend
python -m venv env
source env/bin/activate      # Windows: env\Scripts\activate
pip install -r requirements.txt
pip install sentencepiece     # Requis pour CamemBERT
```

Copier et remplir le fichier `.env` :
```bash
cp .env.example .env
```

```env
DATABASE_URL=postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/reviewly
SENTIMENT_MODEL=cmarkea/distilcamembert-base-sentiment
```

### 3. Initialiser la base de données

```bash
python data/init_db.py
```

Le script crée automatiquement la base, les tables et insère les données de démonstration. Si la base existe déjà avec des données, rien n'est écrasé.

### 4. Installer le frontend

```bash
cd ../frontend
npm install
npm install react-easy-crop
```

---

## Lancement

```bash
# Terminal 1 — Backend
cd backend && python app.py

# Terminal 2 — Frontend
cd frontend && npm run dev
```

- Frontend : http://localhost:5173
- Backend : http://localhost:5000

---

## Fonctionnalités

### Pages
- **Accueil** — Home page avec stats dynamiques (produits, avis, satisfaction globale) et présentation des fonctionnalités
- **Catalogue** — Grille de produits avec filtres par catégorie, tri et recherche en temps réel
- **Détail produit** — KPIs, barre de sentiment, graphiques analytiques, formulaire d'avis et liste paginée
- **Dashboard** — Vue globale : stats totales, répartition des sentiments, classement des produits par satisfaction, meilleur et pire produit
- **Comparateur** — Comparaison côte à côte de deux produits de la même catégorie (stats, sentiments, recommandations, verdict)
- **About** — Présentation du développeur
- **Contact** — Formulaire mailto + liens GitHub / LinkedIn

### Catalogue & Produits
- Ajout, modification et suppression de produits
- Upload d'image avec recadrage interactif 4:3 (zoom slider, drag & drop)
- Filtres par catégorie — Audio, Sport, Maison, Informatique, Mode, Autre
- Tri par date, rating ou nombre d'avis
- Recherche en temps réel sur le nom et la catégorie avec bouton effacer
- Badges catégorie + rating sur les cartes
- Mini barre de sentiment par produit (vert / jaune / rouge)

### Analyse IA
- Analyse automatique du sentiment à chaque soumission d'avis
- Labels normalisés : `positif`, `neutre`, `négatif`
- Changement de modèle sans redémarrage (widget ModelSwitcher)
- Système de synonymes FR/EN pour normaliser les mots-clés négatifs
- Génération de recommandations basées sur les mots-clés récurrents
- Couverture multi-catégories : Informatique, Audio, Sport, Mode, Maison

### UI / UX
- Thème sombre / clair
- Toast notifications pour toutes les actions (ajout, modification, suppression)
- Design responsive mobile-first
- Animations fade-up sur les cards
- ConfirmModal personnalisé pour les suppressions
- Widget ModelSwitcher flottant (bas-droite)
- Logo personnalisés

---

## Modèles IA

| Clé | Modèle | Langue |
|---|---|---|
| `distilbert` | distilbert-base-uncased-finetuned-sst-2-english | 🇬🇧 EN |
| `camembert` | cmarkea/distilcamembert-base-sentiment | 🇫🇷 FR |
| `multilingual` | nlptown/bert-base-multilingual-uncased-sentiment | 🇫🇷/🇬🇧 FR+EN |
| `roberta` | cardiffnlp/twitter-roberta-base-sentiment-latest | 🇬🇧 EN |

> `sentencepiece` est requis pour CamemBERT — `pip install sentencepiece`

---

## API Backend

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/products/` | Liste tous les produits avec stats |
| POST | `/api/products/` | Crée un produit (multipart/form-data) |
| PUT | `/api/products/<id>` | Modifie un produit |
| DELETE | `/api/products/<id>` | Supprime un produit et ses avis |
| GET | `/api/reviews/<product_id>` | Liste les avis d'un produit |
| POST | `/api/reviews/<product_id>` | Ajoute un avis + analyse IA |
| DELETE | `/api/reviews/delete/<id>` | Supprime un avis |
| GET | `/api/stats/<product_id>` | Stats, sentiments, recommandations, keywords |
| GET | `/api/stats/global` | Stats globales de tous les produits |
| GET | `/api/stats/compare/<id1>/<id2>` | Comparaison de deux produits |
| GET | `/api/models/` | Liste les modèles disponibles |
| POST | `/api/models/switch` | Change le modèle à chaud |

---

## Système de mots-clés

Le fichier `backend/data/keywords.py` centralise tout le vocabulaire d'analyse en trois sections.

**`STOP_WORDS`** — mots ignorés dans l'analyse (articles, pronoms, adverbes en FR et EN).

**`SYNONYMS`** — normalise les variantes vers une clé commune :
```
'chauffe'  → 'surchauffe'
'webcam'   → 'caméra'
'gratte'   → 'matière'
'branlant' → 'solidité'
```

Couverture par catégorie :
- **Informatique** — batterie, surchauffe, performance, bug, logiciel, écran, clavier, caméra, bruit, connexion, charge
- **Audio** — qualité sonore, micro, isolation phonique / ANC
- **Sport** — confort/maintien/amorti, résistance eau & transpiration, capteurs GPS/cardio
- **Mode** — tissu/matière, couleur, coutures, lavage, taille/coupe
- **Maison** — montage, solidité, nettoyage, dimensions, odeur
- **Commun** — qualité, prix, livraison, emballage, service client, durabilité, design, poids, garantie

**`RECOMMENDATIONS_MAP`** — une action concrète par clé :
```
'surchauffe' → 'Améliorer le système de refroidissement'
'matière'    → 'Améliorer la qualité et le confort des matières utilisées'
'connexion'  → 'Améliorer la stabilité de la connexion'
```

---


Projet réalisé pour un cours "Crée un site internet pour application IA".  
Stack : React · Flask · PostgreSQL · Hugging Face Transformers