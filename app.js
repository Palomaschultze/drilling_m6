//importaciones de librerias
const express = require("express");
const cors = require ("cors");
const path = require("path");
const { create } = require("express-handlebars");
const exp = require("constants");

//instancia de express
let app = express();

//crear instancia de handlebars
const hbs = create({
    partialsDir: ["views/partials/"]
});

//Configuración de express-handlebars como motor de plantilla del proyecto para renderizar vistas
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", __dirname+"/views");

//activar middlewares
app.use(cors());
app.use(express.json());

//publicamos carpeta dist de boostrap
app.use("/bootstrap", express.static(__dirname+"/node_modules/bootstrap/dist/"));

// Configura Express para servir archivos estáticos
app.use(express.static('public'));

//exportacion del módulo
module.exports = app;
