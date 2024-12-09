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
    let currentSlide = 0;

const fondoImagens = [
    "fondo1.jpg", "fondo2.jpg", "fondo3.jpg", "fondo4.jpg", "fondo5.jpeg"
];

// Función para mover el carrusel
function moveCarousel() {
    const carousel = document.getElementById("carouselItems");
    currentSlide = (currentSlide + 1) % fondoImagens.length;
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Función para recomendar películas
function recomendar() {
    const genero = document.getElementById("genero").value;
    const anio = document.getElementById("anio").value;
    const actor = document.getElementById("actor").value;

    const url = `/recomendar?genero=${genero}&anio=${anio}&actor=${actor}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Mostrar las películas recomendadas
            const resultadosDiv = document.getElementById("resultados");
            resultadosDiv.innerHTML = data.map(pelicula => `
                <div>
                    <h3>${pelicula.titulo}</h3>
                    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster}" alt="${pelicula.titulo}">
                </div>
            `).join("");
        });

    // Reemplazar las imágenes del fondo del carrusel
    const carouselItems = document.getElementById("carouselItems");
    carouselItems.innerHTML = fondoImagens.map(fondo => `
        <div class="carousel-item">
            <img src="${fondo}" alt="Fondo">
        </div>
    `).join("");

    setInterval(moveCarousel, 3000); // Mover el carrousel cada 3 segundos
}

moveCarousel(); // Iniciar el movimiento al cargar la página

}
