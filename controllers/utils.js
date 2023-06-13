//invocar fs
const fs = require("fs");

//Se crea función de lectura
const leerArchivo = (archivo)=>{
    return new Promise((res, rej)=>{
        fs.readFile(`./db/${archivo}`, "utf-8", (error, data)=>{
            if(error){
                console.log(error);
                rej("error al leer el archivo");
            }
            res(JSON.parse(data));
        });
    });
};

//Se crea función de escritura
const escribirArchivo = (archivo, data)=>{
    return new Promise((resolve, reject)=>{
        fs.writeFile(`./db/${archivo}`, JSON.stringify(data, null, 4), "utf-8", (error)=>{
            if(error){
                console.log(error);
                reject("Error al escrbir el archivo");
            }
            resolve("Se ha guardado el archivo con éxito");
        });
    });
};


module.exports = {
    leerArchivo, escribirArchivo
};