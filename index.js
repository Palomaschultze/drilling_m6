//Importaciones 
const app = require("./app");
const Anime = require("./controllers/controls.js");

//Se indica  el puerto por el cual el servidor escuchará las peticiones
const PORT = 3000;
let server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
});

//RUTAS DE LAS VISTAS
//Inicio
app.get(["/", "/home"], (req, res) => {
    res.render("home")
});

//Acerca 
app.get("/about", (req, res) => {
    res.render("about")
});

//Muestra todos los animes
app.get("/animes", async (req, res) => {
    try {
        let todos = new Anime
        let final = await todos.findAll();
        res.render("allAnimes", {
            target: final
        })
    } catch (error) {
        res.render("allAnimes", {
            error
        });
    };
});

//Muestra por id
app.get("/animes/:id", async (req, res) => {
    try {
        let id = req.params.id
        let todos = new Anime
        let final = await todos.findById(id);
        res.render("anime", {
            target: [final]
        })
    } catch (error) {
        res.render("anime", {
            error
        });
    };
});

//Muestra por nombre
app.get("/animes/nombre/:nombre", async (req, res) => {
    try {
        let nombre = req.params.nombre
        let todos = new Anime
        let final = await todos.findByName(nombre);
        res.render("anime", {
            target: [final]
        })
    } catch (error) {
        res.render("anime", {
            error
        });
    };
});


//RUTAS ENDPOINT
//Crea un nuevo anime 
app.post("/animes", async (req, res) => {
    try {
        let { nombre, genero, año, autor } = req.body;
        console.log(nombre, genero, año, autor)
        let newAnime = new Anime(nombre, genero, año, autor);
        let respuesta = await newAnime.create();
        res.status(201).send({
            code: 201,
            message: respuesta
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            code: 500,
            message: 'error al guardar el anime'
        })
    }
});

//Modifica un  anime
app.put('/animes', async (req, res) => {
    try {
        let { id, nombre, genero, año, autor } = req.body;
        let newUser = new Anime(nombre, genero, año, autor);
        let respuesta = await newUser.update(id);
        console.log(respuesta)
        if (respuesta) {
            res.status(200).send({ code: 200, message: 'Anime actualizado de manera exitosa' })
        } else {
            res.status(500).send({
                code: 500,
                message: 'No se pudo actualizar el anime'
            })
        }
    } catch (error) {
        console.log(error)
    }
})


//Elimina un anime
app.delete("/animes/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let eliminar = new Anime;
        await eliminar.delete(id);
        res.send({
            message: "Eliminado con éxito"
        })
    } catch (error) {
        res.status(500).send({
            message: error
        })
    }
});


app.all("*", (req, res) => {
    res.status(200).send(`Ruta ${req.method} no encontrada.`);
});

module.exports = server;