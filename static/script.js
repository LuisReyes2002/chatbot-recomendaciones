async function recomendar() {
    const genero = document.getElementById('genero').value;
    const response = await fetch('/recomendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genero: genero })
    });
    const peliculas = await response.json();
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = peliculas.map(p => `
        <div>
            <h3>${p.titulo}</h3>
            <img src="https://image.tmdb.org/t/p/w200${p.poster}" alt="${p.titulo}">
        </div>
    `).join('');
}
