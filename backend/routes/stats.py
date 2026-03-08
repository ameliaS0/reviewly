'''
Tous les chemin API liés aux statistiques:
 - /api/stats/<id>: détail des statistiques pour un produit
 - /api/stats/global: statistiques globales
 - /api/stats/compare/<id1>/<id2>: comparaison de 2 produits

'''

from flask import Blueprint, jsonify
from models import Review, Product
from collections import Counter
from data.keywords import STOP_WORDS, SYNONYMS, RECOMMENDATIONS_MAP
import re

stats_bp = Blueprint('stats', __name__)

#detail des stats avis d'un produit
@stats_bp.route('/<int:product_id>', methods=['GET'])
def get_stats(product_id):
    Product.query.get_or_404(product_id)
    reviews = Review.query.filter_by(product_id=product_id).all()

    if not reviews:
        return jsonify({
            'total': 0,
            'average_rating': 0,
            'sentiments': {'positif': 0, 'neutre': 0, 'négatif': 0},
            'recommendations': [],
            'negative_keywords': []
        })

    total = len(reviews)
    avg_rating = round(sum(r.rating for r in reviews) / total, 2)

    sentiments = {'positif': 0, 'neutre': 0, 'négatif': 0}
    for r in reviews:
        if r.sentiment in sentiments:
            sentiments[r.sentiment] += 1

    #extraire mots des avis négatifs
    negative_texts = [r.text.lower() for r in reviews if r.sentiment == 'négatif']

    print(f'\n{'='*50}')
    print(f'  STATS — {total} reviews, {len(negative_texts)} négatifs')
    print(f'{'='*50}')

    all_words = []
    for text in negative_texts:
        words = re.findall(r'\b[a-zA-ZÀ-ÿ]{3,}\b', text)
        for w in words:
            if w not in STOP_WORDS:
                normalized = SYNONYMS.get(w, w)
                all_words.append(normalized)
                print(f'  mot: "{w}" → "{normalized}"')

    word_counts = Counter(all_words).most_common(20)
    print(f'\n  top mots: {word_counts[:10]}')

    #générer recommandations
    recommendations = []
    seen_recs = set()
    for word, count in word_counts:
        rec = RECOMMENDATIONS_MAP.get(word)
        if rec and rec not in seen_recs:
            recommendations.append({
                'keyword': word,
                'count': count,
                'action': rec
            })
            seen_recs.add(rec)
        if len(recommendations) >= 5:
            break

    #recommandations génériques si pas assez
    generics = [
        'Analyser en détail les retours négatifs clients',
        'Mettre en place un suivi qualité renforcé',
        'Contacter les clients insatisfaits pour mieux comprendre leurs besoins',
    ]
    for g in generics:
        if g not in seen_recs and len(recommendations) < 3:
            recommendations.append({'keyword': '-', 'count': 0, 'action': g})

    print(f'  recommandations: {[r['action'] for r in recommendations]}')
    print(f'{'='*50}\n')

    return jsonify({
        'total': total,
        'average_rating': avg_rating,
        'sentiments': sentiments,
        'recommendations': recommendations,
        'negative_keywords': [{'word': w, 'count': c} for w, c in word_counts[:10]]
    })

#stats de tous les avis pour dashboard
@stats_bp.route('/global', methods=['GET'])
def get_global_stats():
    products = Product.query.all()
    if not products:
        return jsonify({
            'total_products': 0,
            'total_reviews': 0,
            'average_rating': 0,
            'satisfaction': 0,
            'sentiments': {'positif': 0, 'neutre': 0, 'négatif': 0},
            'products': []
        })

    all_reviews = Review.query.all()
    total_reviews = len(all_reviews)
    
    sentiments = {'positif': 0, 'neutre': 0, 'négatif': 0}
    for r in all_reviews:
        if r.sentiment in sentiments:
            sentiments[r.sentiment] += 1

    avg_rating = round(sum(r.rating for r in all_reviews) / total_reviews, 2) if total_reviews else 0
    satisfaction = round((sentiments['positif'] / total_reviews) * 100) if total_reviews else 0

    products_stats = []
    for p in products:
        reviews = Review.query.filter_by(product_id=p.id).all()
        count = len(reviews)
        if count == 0:
            continue
        p_sentiments = {'positif': 0, 'neutre': 0, 'négatif': 0}
        for r in reviews:
            if r.sentiment in p_sentiments:
                p_sentiments[r.sentiment] += 1
        p_avg = round(sum(r.rating for r in reviews) / count, 2)
        p_satisfaction = round((p_sentiments['positif'] / count) * 100)
        products_stats.append({
            'id': p.id,
            'name': p.name,
            'category': p.category,
            'image': p.to_dict().get('image'),
            'review_count': count,
            'average_rating': p_avg,
            'satisfaction': p_satisfaction,
            'sentiments': p_sentiments,
        })

    products_stats.sort(key=lambda x: x['satisfaction'], reverse=True)

    return jsonify({
        'total_products': len(products),
        'total_reviews': total_reviews,
        'average_rating': avg_rating,
        'satisfaction': satisfaction,
        'sentiments': sentiments,
        'products': products_stats
    })

#comparer stats avis de 2 produits pour fonction comparaison
@stats_bp.route('/compare/<int:id1>/<int:id2>', methods=['GET'])
def compare_products(id1, id2):
    def get_product_data(product_id):
        product = Product.query.get_or_404(product_id)
        reviews = Review.query.filter_by(product_id=product_id).all()
        count = len(reviews)
        if count == 0:
            return {
                'id': product.id,
                'name': product.name,
                'category': product.category,
                'image': product.to_dict().get('image'),
                'review_count': 0,
                'average_rating': 0,
                'satisfaction': 0,
                'sentiments': {'positif': 0, 'neutre': 0, 'négatif': 0},
                'negative_keywords': [],
                'recommendations': [],
            }

        sentiments = {'positif': 0, 'neutre': 0, 'négatif': 0}
        for r in reviews:
            if r.sentiment in sentiments:
                sentiments[r.sentiment] += 1

        avg = round(sum(r.rating for r in reviews) / count, 2)
        satisfaction = round((sentiments['positif'] / count) * 100)

        #keywords négatifs
        negative_texts = [r.text.lower() for r in reviews if r.sentiment == 'négatif']
        all_words = []
        for text in negative_texts:
            words = re.findall(r'\b[a-zA-ZÀ-ÿ]{3,}\b', text)
            for w in words:
                if w not in STOP_WORDS:
                    normalized = SYNONYMS.get(w, w)
                    all_words.append(normalized)

        word_counts = Counter(all_words).most_common(5)

        #recommandations
        recommendations = []
        seen = set()
        for word, count_w in word_counts:
            rec = RECOMMENDATIONS_MAP.get(word)
            if rec and rec not in seen:
                recommendations.append({'keyword': word, 'count': count_w, 'action': rec})
                seen.add(rec)

        return {
            'id': product.id,
            'name': product.name,
            'category': product.category,
            'image': product.to_dict().get('image'),
            'review_count': count,
            'average_rating': avg,
            'satisfaction': satisfaction,
            'sentiments': sentiments,
            'negative_keywords': [{'word': w, 'count': c} for w, c in word_counts],
            'recommendations': recommendations,
        }

    return jsonify({
        'product1': get_product_data(id1),
        'product2': get_product_data(id2),
    })