//Importaciones iniciales
const fs = require("fs");
const { v4: uuid } = require("uuid");
const { leerArchivo, escribirArchivo } = require("./utils.js");

//Crear la clase y métodos
class Anime {
    constructor(nombre, genero, año, autor) {
        this.nombre = nombre;
        this.genero = genero;
        this.año = año;
        this.autor = autor;
    }

    //ver todos lo anime
    async findAll() {
        let data = await leerArchivo("anime.json");
        if(data){
            return data
        }else{
            alert("Base de dato sin datos")
        }
        
        
    };

    //encuentra un anime por id
    async findById(id) {
        let todos = await this.findAll()
        if (id) {
            let result = todos.find(anime => anime.id == id)
            return result
        } else {
            
            return false
        }
    }

    //encuentra un anime por nombre
    async findByName(nombre) {
        let todos = await this.findAll()
        if (nombre) {
            let result = todos.find(anime => anime.nombre.toLowerCase().includes(nombre.toLowerCase()))
            return result
        } else {
            
            return false
        }
    }




    //Crear un anime nuevo
    async create() {
        let todos = await this.findAll()
        let id = uuid().slice(0, 4);
        let nuevoAnime = {
            id: id,
            nombre: this.nombre,
            genero: this.genero,
            año: this.año,
            autor: this.autor
        }
        todos.push(nuevoAnime);
        await escribirArchivo("anime.json", todos);
        return nuevoAnime;
    };

    //Crear metodo eliminar
    async delete(id) {
        let todos = await this.findAll()
        todos = todos.filter(anime => anime.id != id);
        escribirArchivo('anime.json', todos);
        return todos
    };

    //modificar un anime
    async update(id) {
        let identificador = id || this.id;
        let todos = await this.findAll()
        let newAnime = todos.find(anime => anime.id == identificador);

        if (newAnime) {
            newAnime.nombre = this.nombre;
            newAnime.genero = this.genero;
            newAnime.año = this.año;
            newAnime.autor = this.autor;
            await escribirArchivo('anime.json', todos);
            return newAnime;
        } else {
            return false
        }
    }
};

module.exports = Anime;