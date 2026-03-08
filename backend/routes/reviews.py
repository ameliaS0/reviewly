'''
Tous les chemin API liés aux avis:
 - /api/reviews/<id>: liste des avis sur un poduit
 - /api/reviews/delete/<id>: suppression d'un avis
'''

from flask import Blueprint, request, jsonify
from models import db, Review, Product
from services.sentiment import analyze_sentiment

reviews_bp = Blueprint('reviews', __name__)

#list de tous les avis pour un produit donné
@reviews_bp.route('/<int:product_id>', methods=['GET'])
def get_reviews(product_id):
    Product.query.get_or_404(product_id)
    reviews = Review.query.filter_by(product_id=product_id).order_by(Review.created_at.desc()).all()
    return jsonify([r.to_dict() for r in reviews])

#crér un avis
@reviews_bp.route('/<int:product_id>', methods=['POST'])
def create_review(product_id):
    Product.query.get_or_404(product_id)
    data = request.json

    if not data.get('text') or not data.get('rating'):
        return jsonify({'error': 'Texte et note requis'}), 400

    rating = int(data['rating'])
    if rating < 1 or rating > 5:
        return jsonify({'error': 'Note entre 1 et 5'}), 400

    sentiment, score = analyze_sentiment(data['text'])

    review = Review(
        product_id=product_id,
        text=data['text'],
        rating=rating,
        sentiment=sentiment,
        sentiment_score=score
    )
    db.session.add(review)
    db.session.commit()
    return jsonify(review.to_dict()), 201

#supprimer un avis
@reviews_bp.route('/delete/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Avis supprimé'})