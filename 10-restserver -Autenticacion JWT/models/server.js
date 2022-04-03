const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{


    constructor(){
        //cuando lance la instancia del servidor crear la pp de expres como propiedad
        this.app = express()
        this.port = process.env.PORT;

        //Conectar base de datos
        this.conectarDB();
        
        // routes
        this.usauriosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Middlewares - Funciones que añaden otra funcion al web server
        this.middlewares();

        //Rutas
        this.routes();
    }


    async conectarDB(){
        await dbConnection();
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
        
        this.app.use (this.authPath, require('../routes/auth.routes'));
        this.app.use (this.usauriosPath, require('../routes/usuarios.routes'));
    }


    listen(){
        this.app.listen( this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}


module.exports = Server;