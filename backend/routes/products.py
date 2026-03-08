'''
Tous les chemin API liés aux produits:
 - allowed_file(): fonction pour vérifier que le fichier est une image
 - /api/products/: list de tous les produits
 - /api/products/<id>: mise à jour d'un produit
 - /api/products/<id>: suppression d'un produit
'''

import os
import base64
from flask import Blueprint, request, jsonify
from models import db, Product

products_bp = Blueprint('products', __name__)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

#fonction pour vérifier que le fichier est une image 
#pour pas avoir des erreurs lors de l'upload d'un fichier qui n'est pas au bon format
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#liste de tous les produits avec leurs détails et statistiques d'avis
@products_bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.order_by(Product.created_at.desc()).all() #order by ancien
    result = []
    for p in products:
        d = p.to_dict()
        reviews = p.reviews
        if reviews:
            #calcul des statistiques d'avis pour chaque produit
            d['review_count'] = len(reviews)
            d['average_rating'] = round(sum(r.rating for r in reviews) / len(reviews), 1)
            sentiments = {'positif': 0, 'neutre': 0, 'négatif': 0}
            for r in reviews:
                if r.sentiment in sentiments:
                    sentiments[r.sentiment] += 1
            d['sentiments'] = sentiments
        else:
            d['review_count'] = 0
            d['average_rating'] = None
            d['sentiments'] = {'positif': 0, 'neutre': 0, 'négatif': 0}
        result.append(d)
    return jsonify(result)

#creation d'un nouveau produit
@products_bp.route('/', methods=['POST'])
def create_product():
    name = request.form.get('name')
    category = request.form.get('category')
    if not name or not category:
        return jsonify({'error': 'Nom et catégorie requis'}), 400

    image_data = None
    image_type = None
    #verif extention
    if 'image' in request.files:
        file = request.files['image']
        if file and file.filename and allowed_file(file.filename):
            ext = file.filename.rsplit('.', 1)[1].lower()
            image_type = 'jpeg' if ext == 'jpg' else ext
            image_data = base64.b64encode(file.read()).decode('utf-8')

    product = Product(name=name, category=category, image_data=image_data, image_type=image_type)
    #ajout dans la base de donnée LOCAL
    db.session.add(product)
    db.session.commit()
    return jsonify(product.to_dict()), 201

#supprimer n produit
@products_bp.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Produit supprimé'})

#editer un produit
@products_bp.route('/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    name = request.form.get('name')
    category = request.form.get('category')
    remove_image = request.form.get('remove_image')

    if name: product.name = name
    if category: product.category = category

    if remove_image == 'true':
        product.image_data = None
        product.image_type = None
    elif 'image' in request.files:
        file = request.files['image']
        if file and file.filename and allowed_file(file.filename):
            ext = file.filename.rsplit('.', 1)[1].lower()
            product.image_type = 'jpeg' if ext == 'jpg' else ext
            product.image_data = base64.b64encode(file.read()).decode('utf-8')

    db.session.commit()
    return jsonify(product.to_dict())