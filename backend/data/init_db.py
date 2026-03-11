import os
import sys
import subprocess
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

#ne pas oublié de changer le "VOTRE_MOT_DE_PASSE" dans l'URL pour la connection
#si on sait pas ou trouver le mot de passe ou oublié
#changer le dans postgresql avec: ALTER USER postgres WITH PASSWORD 'VOTRE_MOT_DE_PASSE';
DATABASE_URL = os.getenv('DATABASE_URL')
if not DATABASE_URL:
    print('DATABASE_URL manquant dans .env')
    sys.exit(1)

#crée la base si elle n'existe pas
base_url, db_name = DATABASE_URL.rsplit('/', 1)
engine_root = create_engine(f'{base_url}/postgres', isolation_level='AUTOCOMMIT')
with engine_root.connect() as conn:
    exists = conn.execute(text("SELECT 1 FROM pg_database WHERE datname = :name"), {"name": db_name}).fetchone()
    if not exists:
        conn.execute(text(f'CREATE DATABASE {db_name}'))
        print(f'Base "{db_name}" créée')
    else:
        print(f'Base "{db_name}" existante')

#création des tables et insertion des données de démonstration
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import app, db
from models import Product

with app.app_context():
    db.create_all()
    print('tables créées')

    #seulement si la base est vide 
    if Product.query.count() > 0:
        print('Données déjà présentes, aucune insertion')
    else:
        print('Insertion des données de démonstration...')
        seed_path = os.path.join(os.path.dirname(__file__), 'seed.sql')
        password = DATABASE_URL.split(':')[2].split('@')[0]
        host = DATABASE_URL.split('@')[1].split(':')[0]

        result = subprocess.run(
            ['psql', '-U', 'postgres', '-h', host, '-d', db_name, '-f', seed_path],
            env={**os.environ, 'PGPASSWORD': password},
            capture_output=True, text=True
        )
        if result.returncode == 0:
            print('Données insérées depuis seed.sql')
        else:
            print(f'Erreur : {result.stderr}')

print('\nBase de données prete')