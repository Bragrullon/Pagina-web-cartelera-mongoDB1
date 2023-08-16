const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// ====================================================================================
// Conexión a la base de datos
// ====================================================================================
const url ="mongodb+srv://mr:ivGFHW8DsBb5FguL@proyectofinal.dpfgjhe.mongodb.net/proyectoFinal";

// ====================================================================================
// Modelos y Esquemas de la base de datos
// ====================================================================================

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.log("Error al conectar a la base de datos", err));

const trailerSchema = (mongoose.Schemas = {
  title: String,
  year: String,
  director: String,
  actors: String,
  review: String,
  img: String,
  trailer: String,
});


const TrailersModel = mongoose.model("Trailers", trailerSchema);

const userSchema = (mongoose.Schemas = {
  username: String,
  password: String,
});

const UserModel = mongoose.model("Users", userSchema);


// ====================================================================================
// Rutas api para trailers
// ====================================================================================

app.use(cors());
app.use(bodyParser.json());
app.get("/api/trailers", async (req, res) => {
  try {
    const trailers = await TrailersModel.find();
    res.json(trailers);
  } catch (error) {
    res.status(500).send("Error al obtener los trailers");
  }
});

app.get("/api/trailers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const trailer = await TrailersModel.findById(id);
        res.json(trailer);
    } catch (error) {
        res.status(500).send("Error al obtener el trailer");
    }
});


app.get("/api/trailers/title/:title", async (req, res) => {
    try {
        const title = req.params.title;
        const trailer = await TrailersModel.find({title: title});
        res.json(trailer);
    } catch (error) {
        res.status(500).send("Error al obtener el trailer");
    }
});

app.post("/api/trailers", async (req, res) => {
  try {
    const trailerNuevo= new TrailersModel(req.body);

    const trailerGuardado = await trailerNuevo.save();
    res.json(trailerGuardado);
  
  } catch (error) {
    res.status(500).send("Error al guardar el trailer");
  }
});

app.delete("/api/trailers/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const trailerEliminar = await TrailersModel.findByIdAndDelete(id);
    res.json(trailerEliminar);
  } catch (error) {
    res.status(500).send("Error al eliminar el trailer");
  }
});

app.put("/api/trailers/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const trailerActualizado = {
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      actors: req.body.actors,
      review: req.body.review,
      img: req.body.img,
      trailer: req.body.trailer,
    };

    const resultado = await TrailersModel.findByIdAndUpdate(id, trailerActualizado, {
      new: true, 
    });

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar el trailer");
  }
});

// =========================================================================
// Rutas api para usuarios
// =========================================================================

app.get("/api/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).send("Error al obtener los trailers");
  }
});

// =========================================================================
// Iniciando el servidor
// =========================================================================

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
