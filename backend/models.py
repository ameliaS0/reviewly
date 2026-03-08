from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

#creation table Products + image
class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    image_data = db.Column(db.Text, nullable=True)
    image_type = db.Column(db.String(10), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    reviews = db.relationship('Review', backref='product', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category,
            'image': f"data:image/{self.image_type};base64,{self.image_data}" if self.image_data else None,
            'created_at': self.created_at.isoformat()
        }

#creation table des avis
class Review(db.Model):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    sentiment = db.Column(db.String(20))
    sentiment_score = db.Column(db.Float)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'text': self.text,
            'rating': self.rating,
            'sentiment': self.sentiment,
            'sentiment_score': self.sentiment_score,
            'created_at': self.created_at.isoformat()
        }