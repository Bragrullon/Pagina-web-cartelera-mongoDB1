// ====================================================================================
// Mantener datos en la tabla 
// ====================================================================================

function mostrarDatosTabla() {

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/api/trailers");
  xhr.onload = () => {
    const trailers = JSON.parse(xhr.responseText);
    const tabla = document.querySelector("tbody");
    const busqueda=document.getElementById("busqueda");
   
    busqueda.value="";
    tabla.innerHTML = "";
    tabla.innerHTML += `
    <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Director</th>
            <tr>
            </thead>
    `
    
    trailers.forEach((trailer) => {
    
      tabla.innerHTML += `
      <tr>
      <td>${trailer._id}</td>
      <td>${trailer.title}</td>
      <td>${trailer.director}</td>
      </tr>
        `;
      
    });
  };
 xhr.send();
}
 
mostrarDatosTabla();


const btnQuitar = document.getElementById("btnquitar");
btnQuitar.addEventListener("click", (e) => {
  e.preventDefault();
mostrarDatosTabla();
});




const btnBuscar = document.getElementById("btnbuscar");
btnBuscar.addEventListener("click", (e) => {
  e.preventDefault();
 
  let title = document.getElementById("busqueda").value;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:3000/api/trailers/title/${title}`);
  xhr.onload = () => {
    console.log(xhr.responseText);
    const datos = JSON.parse(xhr.responseText);
    const tabla = document.getElementById("tabla");
    datos.forEach(datos => {
      
    tabla.innerHTML = ""
    tabla.innerHTML += `
    <tr>
    <th>ID</th>
    <th>Título</th>
    <th>Director</th>
    <tr>
    <tr>
    <td>${datos._id}</td>
    <td>${datos.title}</td>
    <td>${datos.director}</td>
    </tr>
    `;
  });
  }
  
  xhr.send();
});

    

// ====================================================================================
// agregar un trailer a la base de datos
// ====================================================================================
const btnAgregar = document.getElementById("btnadd");
btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  let title = document.getElementById("title");
  let year = document.getElementById("year");
  let director = document.getElementById("director");
  let actors = document.getElementById("actors");
  let review = document.getElementById("review");
  let img = document.getElementById("img");
  let trailer = document.getElementById("trailer");
  xhr.open("POST", "http://localhost:3000/api/trailers");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    console.log(xhr.responseText);
  }

  if(title.value == "" || year.value == "" || director.value == "" || actors.value == "" || review.value == "" || img.value == "" || trailer.value == ""){
    alert("Todos los campos son obligatorios");
  }
  else{
  const trailerGuardado = {
    title: title.value,
    year: year.value,
    director: director.value,
    actors: actors.value,
    review: review.value,
    img: img.value,
    trailer: trailer.value
  }

  xhr.send(JSON.stringify(trailerGuardado));
  mostrarDatosTabla();
}
title.value = "";
year.value = "";
director.value = "";
actors.value = "";
review.value = "";
img.value = "";
trailer.value = "";


});


// ====================================================================================
// Eliminar un trailer de la base de datos
// ====================================================================================

const btnEliminar = document.getElementById("btndelete");
btnEliminar.addEventListener("click", (e) => {
  e.preventDefault();
  let id = document.getElementById("id");
  if(id == ""){
    alert("El campo ID es obligatorio");
  }
  else{
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `http://localhost:3000/api/trailers/${id.value}`);
  xhr.onload = () => {
    console.log(xhr.responseText);
  }
 

  xhr.send();
}
id.value = "";
mostrarDatosTabla();

});

// ====================================================================================
// taer un trailer de la base de datos
// ====================================================================================

const btnTraer = document.getElementById("datosid");
btnTraer.addEventListener("click", (e) => {
  e.preventDefault();
  let id = document.getElementById("id2");
  const title = document.getElementById("title2");
  const year = document.getElementById("year2");
  const director = document.getElementById("director2");
  const actors = document.getElementById("actors2");
  const review = document.getElementById("review2");
  const img = document.getElementById("img2");
  const trailer = document.getElementById("trailer2");

  if(id == ""){
    alert("El campo ID es obligatorio");
  }
  else{
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:3000/api/trailers/${id.value}`);
  xhr.onload = () => {
    console.log(xhr.responseText);
  
    const datos = JSON.parse(xhr.responseText);
    title.value = datos.title;
    year.value = datos.year;
    director.value = datos.director;
    actors.value = datos.actors;
    review.value = datos.review;
    img.value = datos.img;
    trailer.value = datos.trailer;

  }

 
  xhr.send();
}

}
);

// ====================================================================================
// Actualizar un trailer de la base de datos
// ====================================================================================
const btnActualizar = document.getElementById("btnupdate");
btnActualizar.addEventListener("click", (e) => {
 
  e.preventDefault();
  const id = document.getElementById("id2");
  const title = document.getElementById("title2");
  const year = document.getElementById("year2");
  const director = document.getElementById("director2");
  const actors = document.getElementById("actors2");
  const review = document.getElementById("review2");
  const img = document.getElementById("img2");
  const trailer = document.getElementById("trailer2");

  if(title == "" || year == "" || director == "" || actors == "" || review == "" || img == "" || trailer == ""){
    alert("Todos los campos son obligatorios");
  }
  else{
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `http://localhost:3000/api/trailers/${id.value}`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    console.log(xhr.responseText);
  }
  const trailerActualizado = {
    title: title.value,
    year: year.value,
    director: director.value,
    actors: actors.value,
    review: review.value,
    img: img.value,
    trailer: trailer.value
  }


  xhr.send(JSON.stringify(trailerActualizado));

}
id.value = "";
title.value = "";
year.value = "";
director.value = "";
actors.value = "";
review.value = "";
img.value = "";
trailer.value = "";
mostrarDatosTabla();
});

