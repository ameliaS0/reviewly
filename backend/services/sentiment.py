from transformers import pipeline

AVAILABLE_MODELS = {
    'distilbert': {
        'name': 'DistilBERT (EN)',
        'model_id': 'distilbert-base-uncased-finetuned-sst-2-english',
        'lang': 'English'
    },
    'camembert': {
        'name': 'DistilCamemBERT (FR)',
        'model_id': 'cmarkea/distilcamembert-base-sentiment',
        'lang': 'French'
    },
    'multilingual': {
        'name': 'Multilingual BERT (FR/EN)',
        'model_id': 'nlptown/bert-base-multilingual-uncased-sentiment',
        'lang': 'French & English'
    },
    'roberta': {
        'name': 'Twitter RoBERTa (EN)',
        'model_id': 'cardiffnlp/twitter-roberta-base-sentiment-latest',
        'lang': 'English'
    },
}

#default au démarrage
current_model_key = 'distilbert'
sentiment_pipeline = None

#charger les modèles avec transformers
def load_model(model_key):
    #'global' permet de modifier les variables définies en dehors de la fonction
    #sans ce mot-clé, Python créerait des variables locales à la fonction
    global sentiment_pipeline, current_model_key
    #vérif
    if model_key not in AVAILABLE_MODELS:
        raise ValueError(f'Modèle inconnu : {model_key}')
    print(f'Chargement du modèle : {AVAILABLE_MODELS[model_key]['name']}...')
    #pipeline() télécharge le modèle depuis HuggingFace si pas en cache
    #puis le charge en mémoire RAM/VRAM
    #'text-classification' indique la tâche: classer un texte dans une catégorie
    sentiment_pipeline = pipeline(
        'text-classification',
        model=AVAILABLE_MODELS[model_key]['model_id']
    )
    current_model_key = model_key
    print('Modèle chargé !')

#info sur le modèle
def get_current_model_info():
    #'**' décompresse le dictionnaire AVAILABLE_MODELS[current_model_key]
    return {
        'key': current_model_key,
        **AVAILABLE_MODELS[current_model_key]
    }

#liste des modèles disponibles
def get_available_models():
    #transforme le dictionnaire AVAILABLE_MODELS en liste de dicts
    #en ajoutant la clé à chaque entrée pour l'identifier
    return [{'key': k, **v} for k, v in AVAILABLE_MODELS.items()]

#analyser le sentiment des avis avec le modèle
def analyze_sentiment(text):
    #si aucun modèle n'est en mémoire,
    #on charge le modèle par défaut avant la première analyse
    if sentiment_pipeline is None:
        load_model(current_model_key)
    #visuel a chaque nouveau avis déclanchement du modèle
    print(f'AI SENTIMENT ANALYSIS:')
    print(f'Model: {AVAILABLE_MODELS[current_model_key]['name']}')
    #visibiliter dans le terminal pour pas que sa soit trop long
    print(f'Text: {text[:80]}{'...' if len(text) > 80 else ''}')

    #on limite à 512 tokens car c'est la limite maximale
    #de la plupart des modèles BERT (au-delà le texte est ignoré ou plante)
    # [0] récupère le premier et seul résultat retourné
    result = sentiment_pipeline(text[:512])[0]
    label = result['label'].upper() #catégorie
    score = result['score'] #niv de confiance

    print(f'Raw label : {result['label']}')
    print(f'Raw score : {result['score']:.4f}')

    #normalisation des labels pour les differents modèles
    #étoiles interprétation
    if 'STAR' in label:
        if any(x in label for x in ['4', '5']):
            sentiment = 'positif'
        elif any(x in label for x in ['1', '2']):
            sentiment = 'négatif'
        else:
            sentiment = 'neutre'
    elif any(x in label for x in ['POS', 'POSITIVE']):
        sentiment = 'positif'
    elif any(x in label for x in ['NEG', 'NEGATIVE']):
        sentiment = 'négatif'
    else:
        sentiment = 'neutre'

    print(f'Result: {sentiment.upper()} ({round(score * 100, 1)}% confidence)')

    return sentiment, round(score, 4)


#fichier est importé par app.py le modèle par défaut est
#immédiatement chargé en mémoire pour que la première analyse
#soit instantanée donc pas d'attente au premier appe
load_model(current_model_key)