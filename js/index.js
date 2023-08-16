// ====================================================================================
// Mostrar las miniaturas de los trailers
// ====================================================================================
const containerCards = document.getElementById("container-cards");

function mostrarTrailersMiniatura() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/api/trailers");
  xhr.onload = () => {
    const trailers = JSON.parse(xhr.responseText);

    trailers.forEach((trailer) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.id = trailer._id;
      card.innerHTML = `
      <div class="card-img">
        <img src="${trailer.img}" alt="card-img" />
      </div>

      <div class="card-title">
        <h3>${trailer.title}</h3>
      </div>

      <div class="card-desc">
        <p>${trailer.director}</p>
        <p>${trailer.year}</p>
        <button class="btnTrailer" id="btnTrailer">Ver Trailer</button>
      </div>
        `;
      containerCards.appendChild(card);
    });
  };
 xhr.send();
}
mostrarTrailersMiniatura();

// ====================================================================================
// Mostrar los detalles de un trailer
// ====================================================================================

// Obtener el id del trailer
containerCards.addEventListener("click", (e) => {
  if (e.target.classList.contains("btnTrailer")) {
    const id = e.target.parentElement.parentElement.id;
    console.log(id);
    mostrarTrailer(id);
  }
});

// Funcion para mostrar el trailer

function mostrarTrailer(id) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `http://localhost:3000/api/trailers/${id}`);
  xhr.onload = () => {
    const trailer = JSON.parse(xhr.responseText);

    const containerTrailers = document.getElementById("container-trailer");
    containerTrailers.style.display = "block";
    const card = document.createElement("div");
    card.classList.add("videoCard");
    containerCards.innerHTML = "";
    card.innerHTML = `
      <div class="video">
        <iframe
          src="${trailer.trailer}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen=""
        ></iframe>
      </div>

      <div class="video-title">
        <h3>${trailer.title}</h3>
      </div>
      <div class="info">
          <p>Director: ${trailer.director}</p>
          <br>
          <p>Lanzamiento: ${trailer.year}</p>
          <br>
          <p>Actors: ${trailer.actors}</p>
          <br>
          <details>
          <summary>Resena</summary>
          <p>${trailer.review}</p>
          </details>
          </div>
   `;

    containerTrailers.appendChild(card);
  };

  xhr.send();
}
