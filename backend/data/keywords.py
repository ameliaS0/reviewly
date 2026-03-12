STOP_WORDS = {
    # Français
    'le','la','les','de','du','des','un','une','et','en','est','que','qui',
    'il','elle','je','tu','nous','vous','ils','on','pas','ne','se','sa','son',
    'mais','ou','donc','car','ni','or','ce','cet','cette','ces','mon','ton',
    'leur','très','plus','bien','avec','pour','par','sur','dans','au','aux',
    'été','avoir','être','fait','tout','aussi','comme','quand','même','peu',
    'trop','ça','si','lui','après','avant','sans','sous','entre','pendant',
    'depuis','vers','chez','dont','cela','celui','celle','ceux','moi','soi',
    'eux','ici','là','puis','déjà','encore','toujours','jamais','rien','tout',
    'chaque','autre','même','plusieurs','certain','certaine','certains',
    'globalement','notamment','vraiment','parfois','souvent','assez',
    'malgré','selon','entre','plutôt','lors','dès','via','afin','non',
    'peu','dès','lors','fait','quel','quelle','quels','quelles','avoir',
    # Anglais
    'the','a','an','is','it','to','of','in','and','this','for','not','with',
    'very','my','i','was','are','be','has','have','been','do','did','its',
    'at','but','so','if','or','that','they','we','he','she','all','no','can',
    'just','from','on','by','about','as','would','when','there','their','what',
    'which','than','then','some','me','too','got','get','also','really','even',
    'much','more','any','were','will','one','had','use','used','only','after',
    'before','other','our','your','his','her','its','quite','rather','overall',
    'sometimes','often','always','never','quite','almost','every','each',
    'few','many','most','both','while','though','although','however','still',
}

SYNONYMS = {

    # Batterie / Autonomie
    'battery': 'batterie', 'batteries': 'batterie',
    'batterie': 'batterie', 'autonomie': 'batterie',
    'décharge': 'batterie', 'discharge': 'batterie',
    'endurance': 'batterie',

    # Surchauffe
    'chauffe': 'surchauffe', 'surchauffe': 'surchauffe',
    'overheat': 'surchauffe', 'overheating': 'surchauffe',
    'chaud': 'surchauffe', 'heat': 'surchauffe',
    'heating': 'surchauffe', 'température': 'surchauffe',
    'warm': 'surchauffe', 'hot': 'surchauffe',

    # Performance
    'slow': 'performance', 'speed': 'performance',
    'lent': 'performance', 'lente': 'performance',
    'lag': 'performance', 'laggy': 'performance',
    'rame': 'performance', 'gelé': 'performance',
    'vitesse': 'performance', 'réactivité': 'performance',
    'responsive': 'performance', 'fluide': 'performance',

    # Bug / Crash
    'bug': 'bug', 'bugs': 'bug', 'crash': 'bug',
    'crashes': 'bug', 'crashed': 'bug', 'error': 'bug',
    'erreur': 'bug', 'plante': 'bug', 'plantage': 'bug',
    'glitch': 'bug', 'glitches': 'bug',
    'redémarre': 'bug', 'restart': 'bug', 'reboot': 'bug',

    # Logiciel / OS
    'logiciel': 'logiciel', 'software': 'logiciel',
    'driver': 'logiciel', 'drivers': 'logiciel',
    'update': 'logiciel', 'updates': 'logiciel',
    'firmware': 'logiciel', 'pilote': 'logiciel',
    'compatibilité': 'logiciel', 'compatibility': 'logiciel',
    'installation': 'logiciel', 'install': 'logiciel',

    # Écran
    'screen': 'écran', 'display': 'écran',
    'écran': 'écran', 'fatiguant': 'écran',
    'éblouissant': 'écran', 'luminosité': 'écran',
    'brightness': 'écran', 'glare': 'écran',
    'flicker': 'écran', 'résolution': 'écran',
    'resolution': 'écran', 'pixel': 'écran',
    'pixels': 'écran', 'dalle': 'écran',

    # Clavier / Souris
    'keyboard': 'clavier', 'clavier': 'clavier',
    'touches': 'clavier', 'pavé': 'clavier',
    'keys': 'clavier', 'typing': 'clavier',
    'rigide': 'clavier', 'rigid': 'clavier',
    'stiff': 'clavier', 'rétroéclairage': 'clavier',
    'backlit': 'clavier', 'souris': 'clavier',
    'mouse': 'clavier', 'trackpad': 'clavier',

    # Caméra / Webcam
    'webcam': 'caméra', 'camera': 'caméra',
    'caméra': 'caméra', 'déclenche': 'caméra',
    'photo': 'caméra', 'video': 'caméra',
    'focus': 'caméra', 'autofocus': 'caméra',
    'objectif': 'caméra', 'lens': 'caméra',
    'zoom': 'caméra', 'flash': 'caméra',

    # Bruit / Ventilateur
    'ventilateur': 'bruit', 'fan': 'bruit',
    'bruit': 'bruit', 'bruyant': 'bruit',
    'loud': 'bruit', 'silencieux': 'bruit',
    'souffle': 'bruit', 'turbine': 'bruit',
    'cooling': 'bruit',

    # Connexion / Réseau
    'connection': 'connexion', 'bluetooth': 'connexion',
    'wifi': 'connexion', 'connect': 'connexion',
    'déconnecte': 'connexion', 'instable': 'connexion',
    'disconnects': 'connexion', 'réseau': 'connexion',
    'network': 'connexion', 'signal': 'connexion',
    'pairing': 'connexion', 'appairage': 'connexion',
    'latence': 'connexion', 'latency': 'connexion',
    'ping': 'connexion',

    # Charge / Ports
    'charging': 'charge', 'charger': 'charge',
    'chargeur': 'charge', 'recharge': 'charge',
    'charge': 'charge', 'câble': 'charge',
    'cable': 'charge', 'usb': 'charge',
    'port': 'charge', 'watt': 'charge',
    'wireless': 'charge', 'induction': 'charge',

    # Son / Qualité audio
    'sound': 'son', 'audio': 'son',
    'son': 'son', 'noise': 'son',
    'speaker': 'son', 'speakers': 'son',
    'haut-parleur': 'son', 'casque': 'son',
    'headphone': 'son', 'headphones': 'son',
    'earphone': 'son', 'earphones': 'son',
    'écouteur': 'son', 'écouteurs': 'son',
    'enceinte': 'son', 'basses': 'son',
    'bass': 'son', 'aigus': 'son',
    'treble': 'son', 'volume': 'son',
    'stéréo': 'son', 'surround': 'son',
    'equalizer': 'son', 'égaliseur': 'son',
    'distortion': 'son', 'distorsion': 'son',
    'saturation': 'son', 'clarity': 'son',
    'clarté': 'son',

    # Micro
    'micro': 'micro', 'microphone': 'micro',
    'mic': 'micro', 'recording': 'micro',
    'enregistrement': 'micro', 'voix': 'micro',
    'voice': 'micro', 'bruit': 'micro',
    'background': 'micro', 'noise': 'micro',

    # Isolation / Réduction de bruit
    'isolation': 'isolation', 'anc': 'isolation',
    'noise-cancelling': 'isolation', 'réduction': 'isolation',
    'passive': 'isolation', 'active': 'isolation',
    'seal': 'isolation', 'joint': 'isolation',

    # Confort / Maintien
    'comfort': 'confort', 'comfortable': 'confort',
    'uncomfortable': 'confort', 'inconfortable': 'confort',
    'ergonomie': 'confort', 'ergonomic': 'confort',
    'douleur': 'confort', 'pain': 'confort',
    'fatigue': 'confort', 'tired': 'confort',
    'maintien': 'confort', 'support': 'confort',
    'coussin': 'confort', 'cushion': 'confort',
    'semelle': 'confort', 'sole': 'confort',
    'amorti': 'confort', 'amortissement': 'confort',
    'cushioning': 'confort', 'fit': 'confort',
    'ajustement': 'confort', 'serrage': 'confort',

    # Résistance / Endurance
    'waterproof': 'résistance', 'étanche': 'résistance',
    'splash': 'résistance', 'sweat': 'résistance',
    'transpiration': 'résistance', 'résistant': 'résistance',
    'resistant': 'résistance', 'durable': 'résistance',
    'robuste': 'résistance', 'robust': 'résistance',
    'outdoor': 'résistance', 'weather': 'résistance',

    # Capteurs / Tracking
    'capteur': 'capteur', 'sensor': 'capteur',
    'gps': 'capteur', 'tracking': 'capteur',
    'précision': 'capteur', 'accuracy': 'capteur',
    'fréquence': 'capteur', 'cardiaque': 'capteur',
    'heart': 'capteur', 'steps': 'capteur',
    'pas': 'capteur', 'calories': 'capteur',
    'mesure': 'capteur', 'données': 'capteur',
    'data': 'capteur', 'sleep': 'capteur',
    'sommeil': 'capteur',

    # Taille / Coupe (sport et mode)
    'size': 'taille', 'sizing': 'taille',
    'taille': 'taille', 'petit': 'taille',
    'petite': 'taille', 'grand': 'taille',
    'grande': 'taille', 'big': 'taille',
    'small': 'taille', 'large': 'taille',
    'coupe': 'taille', 'cut': 'taille',
    'fit': 'taille', 'ajusté': 'taille',
    'loose': 'taille', 'tight': 'taille',
    'serré': 'taille', 'large': 'taille',
    'slim': 'taille', 'oversized': 'taille',

    # Tissu / Matière
    'tissu': 'matière', 'fabric': 'matière',
    'matière': 'matière', 'material': 'matière',
    'coton': 'matière', 'cotton': 'matière',
    'polyester': 'matière', 'laine': 'matière',
    'wool': 'matière', 'soie': 'matière',
    'silk': 'matière', 'cuir': 'matière',
    'leather': 'matière', 'synthétique': 'matière',
    'synthetic': 'matière', 'qualité': 'matière',
    'gratte': 'matière', 'scratchy': 'matière',
    'doux': 'matière', 'soft': 'matière',
    'rèche': 'matière', 'rough': 'matière',
    'pique': 'matière', 'itchy': 'matière',

    # Couleur / Délavage
    'couleur': 'couleur', 'color': 'couleur',
    'colour': 'couleur', 'déteint': 'couleur',
    'fading': 'couleur', 'fade': 'couleur',
    'délave': 'couleur', 'washed': 'couleur',
    'teinte': 'couleur', 'tint': 'couleur',
    'nuance': 'couleur',

    # Coutures / Finitions
    'couture': 'couture', 'seam': 'couture',
    'seams': 'couture', 'coutures': 'couture',
    'fil': 'couture', 'thread': 'couture',
    'finition': 'couture', 'finish': 'couture',
    'broderie': 'couture', 'embroidery': 'couture',
    'zip': 'couture', 'zipper': 'couture',
    'fermeture': 'couture', 'bouton': 'couture',
    'button': 'couture', 'boutons': 'couture',

    # Lavage / Entretien
    'lavage': 'entretien', 'washing': 'entretien',
    'wash': 'entretien', 'rétrécit': 'entretien',
    'shrinks': 'entretien', 'shrink': 'entretien',
    'entretien': 'entretien', 'care': 'entretien',
    'sèche': 'entretien', 'dry': 'entretien',
    'repassage': 'entretien', 'iron': 'entretien',

    # Montage / Installation
    'montage': 'montage', 'assembly': 'montage',
    'assemblage': 'montage', 'installation': 'montage',
    'install': 'montage', 'notice': 'montage',
    'instructions': 'montage', 'manual': 'montage',
    'difficile': 'montage', 'difficult': 'montage',
    'compliqué': 'montage', 'complicated': 'montage',
    'visserie': 'montage', 'vis': 'montage',
    'screw': 'montage', 'screws': 'montage',
    'pièces': 'montage', 'parts': 'montage',

    # Solidité / Stabilité
    'stabilité': 'solidité', 'stability': 'solidité',
    'stable': 'solidité', 'unstable': 'solidité',
    'solide': 'solidité', 'solid': 'solidité',
    'branlant': 'solidité', 'wobble': 'solidité',
    'wobbly': 'solidité', 'fragile': 'solidité',
    'cassé': 'solidité', 'broken': 'solidité',
    'fissure': 'solidité', 'crack': 'solidité',
    'creak': 'solidité', 'grince': 'solidité',

    # Nettoyage / Entretien maison
    'nettoyage': 'nettoyage', 'cleaning': 'nettoyage',
    'clean': 'nettoyage', 'nettoyer': 'nettoyage',
    'lavable': 'nettoyage', 'washable': 'nettoyage',
    'tache': 'nettoyage', 'stain': 'nettoyage',
    'taches': 'nettoyage', 'stains': 'nettoyage',
    'entretien': 'nettoyage', 'maintenance': 'nettoyage',

    # Dimensions / Encombrement
    'encombrant': 'dimensions', 'bulky': 'dimensions',
    'compact': 'dimensions', 'dimensions': 'dimensions',
    'espace': 'dimensions', 'space': 'dimensions',
    'place': 'dimensions', 'room': 'dimensions',
    'grand': 'dimensions', 'petit': 'dimensions',

    # Odeur / Matériaux maison
    'odeur': 'odeur', 'smell': 'odeur',
    'smells': 'odeur', 'toxic': 'odeur',
    'toxique': 'odeur', 'chimique': 'odeur',
    'chemical': 'odeur', 'plastique': 'odeur',

    # Qualité générale
    'quality': 'qualité', 'mauvais': 'qualité',
    'mauvaise': 'qualité', 'nul': 'qualité',
    'nulle': 'qualité', 'médiocre': 'qualité',
    'poor': 'qualité', 'bad': 'qualité',
    'décevant': 'qualité', 'disappointing': 'qualité',
    'décevante': 'qualité', 'horrible': 'qualité',

    # Prix
    'price': 'prix', 'expensive': 'prix',
    'cheap': 'prix', 'costly': 'prix',
    'cher': 'prix', 'chère': 'prix',
    'coût': 'prix', 'coûte': 'prix',
    'overpriced': 'prix', 'tarif': 'prix',
    'rapport': 'prix', 'valeur': 'prix',
    'value': 'prix',

    # Livraison
    'delivery': 'livraison', 'shipping': 'livraison',
    'shipped': 'livraison', 'colis': 'livraison',
    'délai': 'livraison', 'retard': 'livraison',
    'delay': 'livraison', 'late': 'livraison',

    # Emballage
    'packaging': 'emballage', 'package': 'emballage',
    'box': 'emballage', 'boîte': 'emballage',
    'carton': 'emballage', 'protection': 'emballage',
    'abîmé': 'emballage',

    # Service client
    'sav': 'service', 'after-sales': 'service',
    'remboursement': 'service', 'refund': 'service',
    'return': 'service', 'retour': 'service',
    'réponse': 'service', 'response': 'service',
    'vendeur': 'service', 'seller': 'service',

    # Durabilité
    'durability': 'durabilité', 'lasting': 'durabilité',
    'broke': 'durabilité', 'breaking': 'durabilité',
    'cassée': 'durabilité', 'abîmée': 'durabilité',
    'casse': 'durabilité', 'rayure': 'durabilité',
    'scratch': 'durabilité', 'scratches': 'durabilité',

    # Design / Aspect
    'design': 'design', 'look': 'design',
    'looks': 'design', 'style': 'design',
    'esthétique': 'design', 'aesthetic': 'design',
    'plastique': 'design', 'métal': 'design',
    'metal': 'design',

    # Poids
    'weight': 'poids', 'heavy': 'poids',
    'lourd': 'poids', 'lourde': 'poids',
    'léger': 'poids', 'légère': 'poids',
    'poids': 'poids',

    # Garantie
    'warranty': 'garantie', 'garantie': 'garantie',
    'guarantee': 'garantie',

    # Notice / Documentation
    'guide': 'notice', 'documentation': 'notice',
    'doc': 'notice', 'tutoriel': 'notice',
    'tutorial': 'notice',
}

RECOMMENDATIONS_MAP = {
    # Informatique
    'batterie':     'Améliorer la durée de vie de la batterie',
    'surchauffe':   'Améliorer le système de refroidissement',
    'performance':  'Optimiser les performances générales',
    'bug':          'Corriger les bugs et crashs',
    'logiciel':     'Améliorer la stabilité logicielle et les mises à jour',
    'écran':        "Réduire la fatigue visuelle et améliorer l'affichage",
    'clavier':      "Améliorer l'ergonomie et la réactivité du clavier",
    'caméra':       'Améliorer la qualité et la fiabilité de la caméra',
    'bruit':        'Réduire le bruit du ventilateur',
    'connexion':    'Améliorer la stabilité de la connexion',
    'charge':       'Améliorer le système de charge',

    # Audio
    'son':          'Améliorer la qualité audio et la fidélité du son',
    'micro':        'Améliorer la qualité et la clarté du microphone',
    'isolation':    'Améliorer l\'isolation phonique et la réduction de bruit',

    # Sport
    'confort':      "Améliorer le confort, le maintien et l'amorti",
    'résistance':   "Améliorer la résistance à l'eau et à la transpiration",
    'capteur':      'Améliorer la précision des capteurs et du tracking',

    # Mode
    'matière':      'Améliorer la qualité et le confort des matières utilisées',
    'couleur':      'Améliorer la tenue des couleurs au lavage',
    'couture':      'Améliorer la qualité des coutures et des finitions',
    'entretien':    "Faciliter l'entretien et améliorer la résistance au lavage",
    'taille':       'Revoir le guide des tailles et la coupe des vêtements',

    # Maison
    'montage':      'Simplifier le montage et améliorer la notice',
    'solidité':     'Améliorer la solidité et la stabilité du produit',
    'nettoyage':    "Faciliter le nettoyage et l'entretien",
    'dimensions':   'Revoir les dimensions et l\'encombrement du produit',

    # Commun
    'qualité':      'Revoir la qualité générale du produit',
    'prix':         'Revoir la politique tarifaire et le rapport qualité-prix',
    'livraison':    'Optimiser les délais et conditions de livraison',
    'emballage':    "Améliorer la qualité de l'emballage et la protection",
    'service':      'Améliorer le service client et le SAV',
    'durabilité':   'Améliorer la robustesse et la durabilité du produit',
    'design':       'Retravailler le design et les finitions',
    'poids':        'Réduire le poids du produit',
    'garantie':     'Revoir la politique de garantie',
    'notice':       'Améliorer la documentation et la notice',
    'odeur':        'Résoudre les problèmes de matériaux et d\'odeur',
}