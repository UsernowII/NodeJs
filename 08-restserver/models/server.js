const express = require('express')
const cors = require('cors');

class Server{


    constructor(){
        //cuando lance la instancia del servidor crear la pp de expres como propiedad
        this.app = express()
        this.port = process.env.PORT;

        // routes
        this.usauriosPath = '/api/usuarios';

        //Middlewares - Funciones que añaden otra funcion al web server
        this.middlewares();

        //Rutas
        this.routes();
    }


    middlewares(){
        //CORS
        this.app.use ( cors() );

        // lectura y parseo del body
        this.app.use( express.json());

        // Servir Directorio Publico
        this.app.use( express.static('public')); // usa el localhost/ que es la raiz del proyecto
        
        
    }


    routes(){
        
        this.app.use (this.usauriosPath, require('../routes/usuarios.routes'))
    }


    listen(){
        this.app.listen( this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}


module.exports = Server;