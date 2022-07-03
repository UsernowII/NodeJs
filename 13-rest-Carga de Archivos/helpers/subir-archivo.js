const path = require('path');
const {v4: uuidv4} = require('uuid');

const subirArchivo = ( files, extensionValidas = ['png', 'jgp', 'gif', 'jpeg'], carpeta = '' ) =>{

    return new Promise( (resolve, reject) =>{
        
        const {archivo} = files;

        const nombreCortado = archivo.name.split('.'); // devuelve un arreglo separado por comas
        const extension = nombreCortado[nombreCortado.length-1];

        //Validar Extension
        if(! extensionValidas.includes( extension)){
            return reject(`La extension ${extension} no es permitida - ${ extensionValidas}`);
     
        } 


        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath =  path.join( __dirname, '../uploads/', carpeta,  nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nombreTemp);
        });

    });

    

}


module.exports = {
    subirArchivo
}