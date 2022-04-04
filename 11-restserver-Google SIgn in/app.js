//Importanciones propias de Node
require('dotenv').config();
//Importanciones terceros

const Server = require('./models/server')

//Importanciones propias
const server = new Server();


server.listen();



