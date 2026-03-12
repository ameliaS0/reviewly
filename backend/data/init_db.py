import os
import sys
import subprocess
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

#l'URL est stockée dans le .env pour ne pas exposer le mot de passe dans le code

#ne pas oublié de changer le "VOTRE_MOT_DE_PASSE" dans l'URL pour la connection
#si on sait pas ou trouver le mot de passe ou oublié
#changer le dans postgresql avec: ALTER USER postgres WITH PASSWORD 'VOTRE_MOT_DE_PASSE';
DATABASE_URL = os.getenv('DATABASE_URL')

#si la variable est absente du .env on arrête tout de suite le script
#plutôt que d'avoir une erreur cryptique plus loin
if not DATABASE_URL:
    print('DATABASE_URL manquant dans .env')
    sys.exit(1)

#séparer la partie connexion du nom de la base
base_url, db_name = DATABASE_URL.rsplit('/', 1)
#connection à la base système 'postgres' qui existe toujours par défaut
# AUTOCOMMIT est obligatoire ici car CREATE DATABASE ne peut pas
#s'exécuter dans une transaction (voir plus dans les règles de PostgreSQL)
engine_root = create_engine(f'{base_url}/postgres', isolation_level='AUTOCOMMIT')
with engine_root.connect() as conn:
    #pg_database est une table interne qui liste toutes les bases du serveur
    exists = conn.execute(text("SELECT 1 FROM pg_database WHERE datname = :name"), {"name": db_name}).fetchone()
    if not exists:
        conn.execute(text(f'CREATE DATABASE {db_name}'))
        print(f'Base "{db_name}" créée')
    else:
        print(f'Base "{db_name}" existante')

#création des tables et insertion des données de démonstration

#init_db.py est dans un sous-dossier /data/init_db.py
#on doit remontee d'un niveau pour accéder à app.py et models.py qui sont à la racine
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import app, db
from models import Product

#app_context() est obligatoire pour utiliser SQLAlchemy en dehors d'une requête Flask
#deplus db.create_all() ne sait pas quelle application utiliser
with app.app_context():
    db.create_all()
    print('tables créées')

    #seulement si la base est vide  éviter d'insérer les données de démo plusieurs fois
    if Product.query.count() > 0:
        print('Données déjà présentes, aucune insertion')
    else:
        print('Insertion des données de démonstration...')
        #refait chemin pour que le script fonctionne peu importe depuis où il est lancé
        seed_path = os.path.join(os.path.dirname(__file__), 'seed.sql')
        with open(seed_path, 'r', encoding='utf-8') as f:
            sql_content = f.read()

        #connexion cette fois sur notre vraie base pas 'postgres'
        engine = create_engine(DATABASE_URL)
        with engine.connect() as conn:
            #le fichier SQL contient plusieurs instructions séparées par des ";"
            #découpe sur ";" pour obtenir une liste d'instructions individuelles
            #if s.strip() ignore les morceaux vides ex: après le dernier ";"
            statements = [s.strip() for s in sql_content.split(';') if s.strip()]
            for statement in statements:
                conn.execute(text(statement))
            conn.commit()

print('\nBase de données prete')