from flask import Flask
from flask_cors import CORS
from models import db
from routes.products import products_bp
from routes.reviews import reviews_bp
from routes.stats import stats_bp
from routes.models import models_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# pour envoyer les données à l'API
#blueprint sert à mieux organiser tous les chemins pour mieux si retrouver
app.register_blueprint(products_bp, url_prefix='/api/products')
app.register_blueprint(reviews_bp, url_prefix='/api/reviews')
app.register_blueprint(stats_bp, url_prefix='/api/stats')
app.register_blueprint(models_bp, url_prefix='/api/models')

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)