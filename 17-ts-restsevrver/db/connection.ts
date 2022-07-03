import { Sequelize } from 'sequelize';


const db = new Sequelize('node', 'root', '', {
    host: 'localhost',
    dialect : 'mysql',
    logging : false // VER TODO LA SETENCIA SQL EN CONSOLA
});


export default db;