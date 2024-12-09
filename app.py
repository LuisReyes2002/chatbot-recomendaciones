from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

# Carga las variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__)

# Obtiene la clave API desde la variable de entorno
API_KEY = os.getenv('API_KEY')  # La clave de la API es 'API_KEY' en el archivo .env
BASE_URL = "https://api.themoviedb.org/3"

def obtener_id_actor(actor_nombre):
    """Obtiene el ID del actor basado en el nombre."""
    url = f"{BASE_URL}/search/person"
    params = {
        'api_key': API_KEY,
        'query': actor_nombre,
        'language': 'es-ES'
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        personas = response.json().get('results', [])
        if personas:
            return personas[0]['id']  # Devolvemos el ID del primer actor encontrado
    return None

def obtener_recomendaciones(genero, anio, actor_id=None):
    """Obtiene las recomendaciones filtradas por género, año y actor."""
    url = f"{BASE_URL}/discover/movie"
    params = {
        'api_key': API_KEY,
        'language': 'es-ES',
        'sort_by': 'popularity.desc',
        'with_genres': genero,
        'year': anio
    }
    if actor_id:
        params['with_cast'] = actor_id  # Filtro por actor

    response = requests.get(url, params=params)
    if response.status_code == 200:
        peliculas = response.json().get('results', [])
        return [{'titulo': p['title'], 'poster': p['poster_path']} for p in peliculas[:5]]
    else:
        return []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recomendar', methods=['POST'])
def recomendar():
    data = request.json
    genero = data.get('genero', '')
    anio = data.get('anio', '')
    actor_nombre = data.get('actor', '')

    actor_id = None
    if actor_nombre:
        actor_id = obtener_id_actor(actor_nombre)

    peliculas = obtener_recomendaciones(genero, anio, actor_id)
    return jsonify(peliculas)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
