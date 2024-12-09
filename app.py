from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

# Carga las variables de entorno desde el archivo .env
load_dotenv()

app = Flask(__name__)

# Obtiene la clave API desde la variable de entorno
API_KEY = os.getenv('API_KEY')
BASE_URL = "https://api.themoviedb.org/3"

def obtener_recomendaciones(genero):
    url = f"{BASE_URL}/discover/movie"
    params = {
        'api_key': API_KEY,
        'language': 'es-ES',
        'sort_by': 'popularity.desc',
        'with_genres': genero
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        peliculas = response.json().get('results', [])
        return [{'titulo': p['title'], 'poster': p['poster_path']} for p in peliculas[:5]]
    else:
        return []

def obtener_peliculas_por_actor(actor):
    url = f"{BASE_URL}/search/person"
    params = {
        'api_key': API_KEY,
        'language': 'es-ES',
        'query': actor
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        resultados = response.json().get('results', [])
        if resultados:
            peliculas = resultados[0].get('known_for', [])
            return [{'titulo': p['title'], 'poster': p['poster_path']} for p in peliculas if p.get('title')]
    return []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recomendar', methods=['POST'])
def recomendar():
    data = request.json
    genero = data.get('genero', '')
    actor = data.get('actor', '')
    if genero:
        peliculas = obtener_recomendaciones(genero)
    elif actor:
        peliculas = obtener_peliculas_por_actor(actor)
    else:
        peliculas = []
    return jsonify(peliculas)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
