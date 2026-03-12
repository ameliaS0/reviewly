#jeu de données de test pour les modèles de sentiment
#générer par IA

TEST_CASES = [

    # ─────────────────────────────────────────────
    # FRANÇAIS — Avis clairement positifs
    # ─────────────────────────────────────────────
    {
        "id": 1,
        "text": "Produit absolument parfait, je suis très satisfait de mon achat !",
        "lang": "FR",
        "expected": "positif",
        "note": "Positif explicite FR — devrait fonctionner sur tous les modèles FR"
    },
    {
        "id": 2,
        "text": "Excellente qualité, livraison rapide, je recommande vivement.",
        "lang": "FR",
        "expected": "positif",
        "note": "Positif FR avec plusieurs signaux forts"
    },
    {
        "id": 3,
        "text": "La batterie tient toute la journée, vraiment impressionnant pour le prix.",
        "lang": "FR",
        "expected": "positif",
        "note": "Positif FR avec contexte technique (batterie)"
    },

    # ─────────────────────────────────────────────
    # FRANÇAIS — Avis clairement négatifs
    # ─────────────────────────────────────────────
    {
        "id": 4,
        "text": "Produit inutilisable, il est tombé en panne après deux jours. Très déçu.",
        "lang": "FR",
        "expected": "négatif",
        "note": "Négatif fort FR — panne + déception explicite"
    },
    {
        "id": 5,
        "text": "La qualité est catastrophique, rien ne correspond à la description.",
        "lang": "FR",
        "expected": "négatif",
        "note": "Négatif FR — vocabulaire fort"
    },
    {
        "id": 6,
        "text": "Il chauffe énormément, le ventilateur est très bruyant, impossible à utiliser.",
        "lang": "FR",
        "expected": "négatif",
        "note": "Négatif FR technique — surchauffe + bruit"
    },

    # ─────────────────────────────────────────────
    # FRANÇAIS — Avis ambigus / mitigés
    # Cas difficiles : mélange positif + négatif
    # Les modèles ont souvent du mal avec ces cas
    # ─────────────────────────────────────────────
    {
        "id": 7,
        "text": "Bonne qualité sonore mais la batterie se décharge trop vite.",
        "lang": "FR",
        "expected": "neutre",
        "note": "Ambigu FR — positif + négatif dans la même phrase"
    },
    {
        "id": 8,
        "text": "Correct pour le prix mais je m'attendais à mieux honnêtement.",
        "lang": "FR",
        "expected": "neutre",
        "note": "Ambigu FR — attente non comblée mais pas de catastrophe"
    },
    {
        "id": 9,
        "text": "Pas mal, sans plus.",
        "lang": "FR",
        "expected": "neutre",
        "note": "Neutre FR très court — expression typiquement française difficile à classifier"
    },

    # ─────────────────────────────────────────────
    # FRANÇAIS — Avis avec ironie / sarcasme
    # Les modèles BERT gèrent très mal l'ironie
    # ─────────────────────────────────────────────
    {
        "id": 10,
        "text": "Bravo, ça a duré exactement 3 jours avant de tomber en panne. Chapeau.",
        "lang": "FR",
        "expected": "négatif",
        "note": "Ironique FR — les mots 'Bravo' et 'Chapeau' peuvent tromper le modèle"
    },
    {
        "id": 11,
        "text": "Super produit si on aime les articles qui cassent en deux semaines.",
        "lang": "FR",
        "expected": "négatif",
        "note": "Ironique FR — 'Super' au début peut induire en erreur"
    },

    # ─────────────────────────────────────────────
    # FRANÇAIS — Avis avec langage familier / argot
    # ─────────────────────────────────────────────
    {
        "id": 12,
        "text": "Franchement c'est de la daube, à éviter absolument.",
        "lang": "FR",
        "expected": "négatif",
        "note": "Argot FR — 'daube' est un mot familier négatif fort"
    },
    {
        "id": 13,
        "text": "Trop bien ce produit, j'adore vraiment, gg au fabricant !",
        "lang": "FR",
        "expected": "positif",
        "note": "Argot jeune FR — 'trop bien', 'gg' sont des signaux positifs informels"
    },

    # ─────────────────────────────────────────────
    # ANGLAIS — Avis clairement positifs
    # ─────────────────────────────────────────────
    {
        "id": 14,
        "text": "Absolutely love this product, best purchase I've made this year!",
        "lang": "EN",
        "expected": "positif",
        "note": "Positif fort EN — devrait scorer très haut sur distilbert et roberta"
    },
    {
        "id": 15,
        "text": "Great sound quality, comfortable fit, highly recommended.",
        "lang": "EN",
        "expected": "positif",
        "note": "Positif EN classique avec plusieurs signaux"
    },

    # ─────────────────────────────────────────────
    # ANGLAIS — Avis clairement négatifs
    # ─────────────────────────────────────────────
    {
        "id": 16,
        "text": "Terrible product, broke after one week. Complete waste of money.",
        "lang": "EN",
        "expected": "négatif",
        "note": "Négatif fort EN — vocabulaire explicitement négatif"
    },
    {
        "id": 17,
        "text": "Overheats constantly, the fan noise is unbearable.",
        "lang": "EN",
        "expected": "négatif",
        "note": "Négatif EN technique — surchauffe + bruit (même cas que ID 6 en FR)"
    },

    # ─────────────────────────────────────────────
    # ANGLAIS — Avis ambigus / mitigés
    # ─────────────────────────────────────────────
    {
        "id": 18,
        "text": "Good sound but the battery life is disappointing for the price.",
        "lang": "EN",
        "expected": "neutre",
        "note": "Ambigu EN — même structure que ID 7 en FR pour comparer les modèles"
    },
    {
        "id": 19,
        "text": "It does the job, nothing more nothing less.",
        "lang": "EN",
        "expected": "neutre",
        "note": "Neutre EN — expression idiomatique de neutralité"
    },

    # ─────────────────────────────────────────────
    # ANGLAIS — Ironie / sarcasme
    # ─────────────────────────────────────────────
    {
        "id": 20,
        "text": "Wow, lasted a whole 3 days before breaking. Amazing quality.",
        "lang": "EN",
        "expected": "négatif",
        "note": "Ironique EN — 'Amazing' positif mais contexte négatif"
    },

    # ─────────────────────────────────────────────
    # CAS LIMITES — Avis très courts
    # Les modèles ont du mal avec peu de contexte
    # ─────────────────────────────────────────────
    {
        "id": 21,
        "text": "Parfait.",
        "lang": "FR",
        "expected": "positif",
        "note": "Très court FR — un seul mot, peu de contexte pour le modèle"
    },
    {
        "id": 22,
        "text": "Nul.",
        "lang": "FR",
        "expected": "négatif",
        "note": "Très court FR négatif — un seul mot"
    },
    {
        "id": 23,
        "text": "Perfect.",
        "lang": "EN",
        "expected": "positif",
        "note": "Très court EN — comparer avec ID 21 pour voir si la langue change le score"
    },

    # ─────────────────────────────────────────────
    # CAS LIMITES — Avis très longs (> 512 tokens)
    # Le modèle tronque au-delà de 512 tokens
    # Ce cas teste si la troncature biaise le résultat
    # ─────────────────────────────────────────────
    {
        "id": 24,
        "text": (
            "J'utilise ce produit depuis plusieurs mois maintenant et je voulais donner un avis détaillé. "
            "Au niveau de la qualité sonore, c'est vraiment excellent, les basses sont profondes et les aigus clairs. "
            "Le confort est aussi au rendez-vous, je peux le porter pendant des heures sans douleur. "
            "La connexion Bluetooth est stable et le range est impressionnant. "
            "Par contre, la batterie est vraiment décevante pour ce prix, elle tient à peine 6 heures. "
            "Le micro est correct pour les appels mais pas terrible pour les réunions importantes. "
            "L'application compagnon est boguée et plante régulièrement sur Android. "
            "En résumé, un produit avec de très bons points mais qui a encore des progrès à faire sur l'autonomie et le logiciel. "
            "Je le recommande si vous cherchez avant tout de la qualité sonore, mais gérez vos attentes sur le reste. "
            "Note finale : 3.5/5. " * 10  # Répété pour forcer la longueur > 512 tokens
        ),
        "lang": "FR",
        "expected": "neutre",
        "note": "Avis très long FR — teste la troncature à 512 tokens, début positif / fin mitigée"
    },
]