const fs = require('fs');

const path = './database/data.json';


const guardarDB = (data) =>{
    fs.writeFileSync(path, JSON.stringify(data) );

}

const leerDB = () =>{
    if(!fs.existsSync(path)){
        return null;
    }

    const info = fs.readFileSync(path, { encoding: 'utf-8'}); // lee el string
    const data = JSON.parse( info );

    return data;
    
}

module.exports = {
    guardarDB : guardarDB,
    leerDB
}