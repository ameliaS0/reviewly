# Tests Comparaison des modèles de sentiment

Ce dossier permet de tester et comparer les 4 modèles IA de Reviewly sur un jeu d'avis représentatifs, sans avoir besoin de lancer l'application.

---

## Lancement

```bash
# Depuis le dossier backend/
cd backend

# Tester tous les modèles sur tous les cas
python tests/test_models.py

# Tester un seul modèle
python tests/test_models.py --model camembert
python tests/test_models.py --model distilbert
python tests/test_models.py --model multilingual
python tests/test_models.py --model roberta

# Tester uniquement les avis en français
python tests/test_models.py --lang FR

# Tester uniquement les avis en anglais
python tests/test_models.py --lang EN

# Tester des cas précis par ID
python tests/test_models.py --id 7 10 20

# Combiner les filtres : un modèle + une langue
python tests/test_models.py --model camembert --lang FR
```

---

## Cas de test couverts

| Catégorie | IDs | Ce que ça teste |
|---|---|---|
| Positif FR | 1, 2, 3 | Avis positifs clairs en français |
| Négatif FR | 4, 5, 6 | Avis négatifs clairs en français |
| Ambigu FR | 7, 8, 9 | Mélange positif + négatif, attente déçue |
| Ironique FR | 10, 11 | Sarcasme — point faible des modèles BERT |
| Argot FR | 12, 13 | Langage familier / jeune |
| Positif EN | 14, 15 | Avis positifs clairs en anglais |
| Négatif EN | 16, 17 | Avis négatifs clairs en anglais |
| Ambigu EN | 18, 19 | Mêmes cas qu'en FR pour comparer |
| Ironique EN | 20 | Sarcasme en anglais |
| Très courts | 21, 22, 23 | Un seul mot — peu de contexte |
| Très long | 24 | Teste la troncature à 512 tokens |

---

## Exemple de sortie

```
  Modèle : DistilCamemBERT (FR)
  FR — optimisé pour le français
  HuggingFace : cmarkea/distilcamembert-base-sentiment
  Chargement du modèle...
  Chargé en 0.8s

    [ID 01] Produit absolument parfait, je suis très satisfait de mon ac...
    Langue : FR  |  Note : Positif explicite FR — devrait fonctionner sur tous les modèles FR
    Label brut : 5 stars                        Score : 0.9216  (41ms)
    Résultat : positif      correct

    [ID 07] Bonne qualité sonore mais la batterie se décharge trop vite.
    Langue : FR  |  Note : Ambigu FR — positif + négatif dans la même phrase
    Label brut : 3 stars                        Score : 0.6378  (11ms)
    Résultat : neutre       correct

    [ID 11] Super produit si on aime les articles qui cassent en deux se...
    Langue : FR  |  Note : Ironique FR — 'Super' au début peut induire en erreur
    Label brut : 4 stars                        Score : 0.3255  (9ms)
    Résultat : positif      attendu : négatif

    Résultats DistilCamemBERT (FR)
    Total: 19/24 correct → 79%
    FR : 14/16 → 88%
    EN : 5/8 → 62%

COMPARAISON FINALE DES MODÈLES
  Modèle                           Global       FR       EN
  🥇 Multilingual BERT                88%     94%     75%
  🥈 DistilCamemBERT (FR)             79%     88%     62%
  🥉 DistilBERT (EN)                  54%     50%     62%
     Twitter RoBERTa (EN)             50%     44%     62%
```

---

## Limites connues des modèles BERT

- **Ironie / sarcasme** — tous les modèles ont du mal, c'est une limite fondamentale du NLP actuel
- **Avis très courts** — peu de contexte = moins de confiance dans le label
- **Avis longs** — tronqués à 512 tokens, le début de l'avis pèse plus que la fin
- **Mélange positif/négatif** — le modèle retourne le sentiment dominant, pas une moyenne

---

## Ajouter des cas de test

Modifier `test_cases.py` en suivant cette structure :

```python
{
    "id": 25,                         # ID unique
    "text": "Votre avis ici...",
    "lang": "FR",                     # FR ou EN
    "expected": "positif",            # positif, négatif ou neutre
    "note": "Description du cas"      # Ce que ce cas teste spécifiquement
}
```