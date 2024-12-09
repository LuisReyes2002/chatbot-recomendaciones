async function recomendar() {
    const genero = document.getElementById('genero').value;
    const actor = document.getElementById('actor').value;
    const payload = { genero, actor };
    const resultados = document.getElementById('resultados');

    resultados.innerHTML = 'Cargando...';

    try {
        const response = await fetch('/recomendar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const peliculas = await response.json();
        resultados.innerHTML = '';

        if (peliculas.length > 0) {
            peliculas.forEach(pelicula => {
                const img = document.createElement('img');
                img.src = pelicula.poster 
                    ? `https://image.tmdb.org/t/p/w500${pelicula.poster}` 
                    : 'https://via.placeholder.com/150';
                img.alt = pelicula.titulo;
                resultados.appendChild(img);
            });
        } else {
            resultados.innerHTML = '<p>No se encontraron resultados.</p>';
        }
    } catch (error) {
        resultados.innerHTML = '<p>Hubo un error al obtener las recomendaciones.</p>';
        console.error(error);
    }
}
