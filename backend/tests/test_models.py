"""
test_models.py — Compare les 4 modèles de sentiment sur le jeu de données test_cases.py

Usage :
    cd backend
    python tests/test_models.py                  # Teste tous les modèles
    python tests/test_models.py --model camembert # Teste un seul modèle
    python tests/test_models.py --id 7 10 20      # Teste des cas précis par ID
    python tests/test_models.py --lang FR         # Filtre par langue (FR ou EN)
"""

import sys
import os
import argparse
import time

#accéder à services/sentiment.py
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from transformers import pipeline
from tests.test_cases import TEST_CASES

MODELS = {
    'distilbert': {
        'name': 'DistilBERT (EN)',
        'model_id': 'distilbert-base-uncased-finetuned-sst-2-english',
        'lang': 'EN — optimisé pour l\'anglais'
    },
    'camembert': {
        'name': 'DistilCamemBERT (FR)',
        'model_id': 'cmarkea/distilcamembert-base-sentiment',
        'lang': 'FR — optimisé pour le français'
    },
    'multilingual': {
        'name': 'Multilingual BERT',
        'model_id': 'nlptown/bert-base-multilingual-uncased-sentiment',
        'lang': 'FR + EN — supporte plusieurs langues'
    },
    'roberta': {
        'name': 'Twitter RoBERTa (EN)',
        'model_id': 'cardiffnlp/twitter-roberta-base-sentiment-latest',
        'lang': 'EN — entraîné sur des tweets'
    },
}


#normalisations pareil que dans sentiment.py

def normalize_label(label: str) -> str:
    label = label.upper()

    if 'STAR' in label:
        if any(x in label for x in ['4', '5']):
            return 'positif'
        elif any(x in label for x in ['1', '2']):
            return 'négatif'
        else:
            return 'neutre'

    if any(x in label for x in ['POS', 'POSITIVE']):
        return 'positif'
    if any(x in label for x in ['NEG', 'NEGATIVE']):
        return 'négatif'

    return 'neutre'

#juste pour mieux visualiser dans le terminal sinon on se retrouvve pas
GREEN  = '\033[92m'
RED    = '\033[91m'
YELLOW = '\033[93m'
BLUE   = '\033[94m'
BOLD   = '\033[1m'
RESET  = '\033[0m'

def color_sentiment(sentiment: str) -> str:
    colors = {'positif': GREEN, 'négatif': RED, 'neutre': YELLOW}
    return f"{colors.get(sentiment, RESET)}{sentiment}{RESET}"

def color_match(got: str, expected: str) -> str:
    if got == expected:
        return f"{GREEN} correct{RESET}"
    else:
        return f"{RED} attendu : {expected}{RESET}"


#tester un model sur tous les cas dans test_cases?py
def test_model(model_key: str, cases: list) -> dict:
    config = MODELS[model_key]

    print(f"{BOLD}  Modèle : {config['name']}{RESET}")
    print(f"  {config['lang']}")
    print(f"  HuggingFace : {config['model_id']}")
    print(f"  Chargement du modèle...")

    start_load = time.time()
    nlp = pipeline('text-classification', model=config['model_id'])
    load_time = time.time() - start_load
    print(f"  Chargé en {load_time:.1f}s\n")

    results = []
    correct = 0

    for case in cases:
        text = case['text']

        start = time.time()
        raw = nlp(text[:512])[0]
        elapsed = time.time() - start

        label_raw  = raw['label']
        score      = raw['score']
        normalized = normalize_label(label_raw)
        is_correct = normalized == case['expected']

        if is_correct:
            correct += 1

        #texte tronqué à 60 caractères pour la lisibilité
        preview = text[:60] + ('...' if len(text) > 60 else '')

        print(f"[{BLUE}ID {case['id']:02d}{RESET}] {preview}")
        print(f"Langue : {case['lang']}  |  Note : {case['note']}")
        print(f"Label brut : {label_raw:<30} Score : {score:.4f}  ({elapsed*1000:.0f}ms)")
        print(f"Résultat : {color_sentiment(normalized):<20} {color_match(normalized, case['expected'])}")
        print()

        results.append({
            'id': case['id'],
            'correct': is_correct,
            'got': normalized,
            'expected': case['expected'],
            'score': score,
            'lang': case['lang'],
        })

    #summary
    total    = len(cases)
    accuracy = correct / total * 100 if total > 0 else 0

    #precision du langue pour voir si le modèle est plus performant en FR ou EN
    fr_cases = [r for r in results if r['lang'] == 'FR']
    en_cases = [r for r in results if r['lang'] == 'EN']
    fr_acc = sum(r['correct'] for r in fr_cases) / len(fr_cases) * 100 if fr_cases else 0
    en_acc = sum(r['correct'] for r in en_cases) / len(en_cases) * 100 if en_cases else 0

    print(f"{BOLD}Résultats {config['name']}{RESET}")
    print(f"Total: {correct}/{total} correct → {BOLD}{accuracy:.0f}%{RESET}")
    if fr_cases:
        print(f"FR : {sum(r['correct'] for r in fr_cases)}/{len(fr_cases)} → {fr_acc:.0f}%")
    if en_cases:
        print(f"EN : {sum(r['correct'] for r in en_cases)}/{len(en_cases)} → {en_acc:.0f}%")

    return {
        'model_key': model_key,
        'model_name': config['name'],
        'accuracy': accuracy,
        'correct': correct,
        'total': total,
        'fr_accuracy': fr_acc,
        'en_accuracy': en_acc,
        'results': results,
    }


#tab final summary comparatif
def print_summary(all_results: list):
    print(f"{BOLD}  COMPARAISON FINALE DES MODÈLES{RESET}")
    print(f"  {'Modèle':<30} {'Global':>8} {'FR':>8} {'EN':>8}")

    #trie par précision globale décroissante
    sorted_results = sorted(all_results, key=lambda x: x['accuracy'], reverse=True)

    for i, r in enumerate(sorted_results):
        medal = ['🥇', '🥈', '🥉', '  '][min(i, 3)]
        fr = f"{r['fr_accuracy']:.0f}%" if r['fr_accuracy'] > 0 else ' —'
        en = f"{r['en_accuracy']:.0f}%" if r['en_accuracy'] > 0 else ' —'
        print(f"  {medal} {r['model_name']:<28} {r['accuracy']:>6.0f}%  {fr:>6}  {en:>6}")

    print(f"\n{YELLOW}Rappel :{RESET}")
    print(f"• distilbert → meilleur pour l'anglais formel")
    print(f"• camembert → meilleur pour le français")
    print(f"• multilingual → bon compromis FR/EN mais moins précis")
    print(f"• roberta → meilleur pour l'anglais informel / réseaux sociaux")
    print(f"\n{YELLOW}Note :{RESET} Les avis ironiques et très courts sont difficiles")
    print(f" pour tous les modèles BERT — c'est une limite connue du NLP.")

#config script comande
def main():
    parser = argparse.ArgumentParser(description='Compare les modèles de sentiment Reviewly')
    parser.add_argument('--model', choices=MODELS.keys(), help='Tester un seul modèle')
    parser.add_argument('--id', nargs='+', type=int, help='IDs des cas à tester (ex: --id 7 10 20)')
    parser.add_argument('--lang', choices=['FR', 'EN'], help='Filtrer par langue')
    args = parser.parse_args()

    #filtre les cas selon les arguments
    cases = TEST_CASES

    if args.id:
        cases = [c for c in cases if c['id'] in args.id]
        if not cases:
            print(f"{RED}Aucun cas trouvé pour les IDs : {args.id}{RESET}")
            sys.exit(1)

    if args.lang:
        cases = [c for c in cases if c['lang'] == args.lang]

    print(f"\n{BOLD}  REVIEWLY — Test des modèles de sentiment IA{RESET}")
    print(f"  {len(cases)} cas de test  |  {len([c for c in cases if c['lang'] == 'FR'])} FR  |  {len([c for c in cases if c['lang'] == 'EN'])} EN")

    #sélectionne les modèles à tester
    models_to_test = [args.model] if args.model else list(MODELS.keys())

    all_results = []
    for model_key in models_to_test:
        result = test_model(model_key, cases)
        all_results.append(result)

    #tab comparatif uniquement si plusieurs modèles testés
    if len(all_results) > 1:
        print_summary(all_results)


if __name__ == '__main__':
    main()