const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/socket');

class Server{


    constructor(){
        //cuando lance la instancia del servidor crear la pp de expres como propiedad
        this.app = express()
        this.port = process.env.PORT;

        //Sockets
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);
        
        // routes
        this.paths = { };

        //Middlewares - Funciones que añaden otra funcion al web server
        this.middlewares();

        //Rutas
        this.routes();

        // Sockets
        this.sockets();
    }


    async conectarDB(){
        await dbConnection();
    }


    middlewares(){
        // Se ejecutan antes de llegar a las rutas
        //CORS
        this.app.use ( cors() );

        // Servir Directorio Publico
        this.app.use( express.static('public') ); // usa el localhost/ que es la raiz del proyecto
        
    }


    routes(){
        
        //this.app.use (this.paths.auth, require('../routes/auth.routes'));
    }


    sockets(){
        this.io.on('connection', socketController );
  
    }

    listen(){ // levantamos el server del http no express
        this.server.listen( this.port, () =>{
            console.log('Servidor corriendo en puerto', this.port);
        });
    }


}


module.exports = Server;