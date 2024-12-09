function recomendar() {
    const genero = document.getElementById('genero').value;
    const anio = document.getElementById('anio').value;
    const actor = document.getElementById('actor').value;

    fetch('/recomendar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ genero, anio, actor })
    })
    .then(response => response.json())
    .then(peliculas => {
        const resultadosDiv = document.getElementById('resultados');
        resultadosDiv.innerHTML = ''; // Limpiamos resultados previos

        if (peliculas.length > 0) {
            peliculas.forEach(pelicula => {
                const div = document.createElement('div');
                div.classList.add('pelicula');
                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w500${pelicula.poster}`;
                const titulo = document.createElement('h3');
                titulo.textContent = pelicula.titulo;
                div.appendChild(img);
                div.appendChild(titulo);
                resultadosDiv.appendChild(div);
            });
        } else {
            resultadosDiv.innerHTML = '<p>No se encontraron películas.</p>';
        }
    });
}
