const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{


    constructor(){
        //cuando lance la instancia del servidor crear la pp de expres como propiedad
        this.app = express()
        this.port = process.env.PORT;

        
        // routes
        this.paths = {
            auth:           '/api/auth',
            buscar:         '/api/buscar',
            categorias :    '/api/categorias',
            productos :     '/api/productos',
            uploads :       '/api/uploads',
            usuarios :      '/api/usuarios'
        }

         //Conectar base de datos
         this.conectarDB();

        //Middlewares - Funciones que añaden otra funcion al web server
        this.middlewares();

        //Rutas
        this.routes();
    }


    async conectarDB(){
        await dbConnection();
    }


    middlewares(){
        // Se ejecutan antes de llegar a las rutas
        //CORS
        this.app.use ( cors() );

        // lectura y parseo del body
        this.app.use( express.json());

        // Servir Directorio Publico
        this.app.use( express.static('public')); // usa el localhost/ que es la raiz del proyecto
        
        // Manejar la carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp',
            createParentPath: true
        }));
        
    }


    routes(){
        
        this.app.use (this.paths.auth, require('../routes/auth.routes'));
        this.app.use (this.paths.buscar, require('../routes/buscar.routes'));
        this.app.use (this.paths.categorias, require('../routes/categorias.routes'));
        this.app.use (this.paths.productos, require('../routes/productos.routes'));
        this.app.use (this.paths.uploads, require('../routes/upload.routes'));
        this.app.use (this.paths.usuarios, require('../routes/usuarios.routes'));
    }


    listen(){
        this.app.listen( this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}


module.exports = Server;