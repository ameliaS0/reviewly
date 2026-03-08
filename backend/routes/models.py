'''
Tous les chemin API liés aux modèles de sentiment analysis:
 - /api/models/: list de tous les modèles + celui utilisé actuellement
 - /api/models/switch: action pour changer de modèle
'''


from flask import Blueprint, jsonify, request
from services.sentiment import (
    load_model, get_current_model_info,
    get_available_models, AVAILABLE_MODELS
)

models_bp = Blueprint('models', __name__)

#liste des models disponibles er celui utiliser actuellement
#depuis services/sentiment.py
@models_bp.route('/', methods=['GET'])
def list_models():
    return jsonify({
        'available': get_available_models(),
        'current': get_current_model_info()
    })

#action pour changer de modèles 
#nécessaire pour le frontend et pour tester en differentes langues
@models_bp.route('/switch', methods=['POST'])
def switch_model():
    data = request.json
    model_key = data.get('model_key')

    if not model_key:
        return jsonify({'error': 'model_key requis'}), 400

    if model_key not in AVAILABLE_MODELS:
        return jsonify({'error': f'Modèle inconnu : {model_key}'}), 400

    try:
        load_model(model_key)
        return jsonify({
            'message': f'Modèle switché avec succès',
            'current': get_current_model_info()
        })
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500