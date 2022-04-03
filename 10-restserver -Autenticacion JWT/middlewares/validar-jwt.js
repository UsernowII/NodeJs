const jwt = require ('jsonwebtoken');
const { response, request } = require('express');

const Usuario = require('../models/usuario');



//un middleware es una funcion
// tres parametros
//next continuar con otro middleware o controlador
const validarJWT = async ( req = request, res = response, next) =>{

    //nombre del header donde viene el token
    const token = req.header('x-token');

    if(! token){
        return res.status(401).json({
            msg : 'No hay token en la petición'
        });
    }


    try {

        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const uid = payload.uid;

        //leer el usuario corresponde al uid
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg : 'Token no valido - usuario no existe BD'
            });
        }


        // verificar si el uid tiene estado true
        if(!usuario.estado){
            return res.status(401).json({
                msg : 'Token no valido - usuario con estado false'
            });
        }

        req.usuario = usuario;
        req.uid = uid;

        next();
        
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg : 'Token no valido'
        });
    }

    
}


module.exports = {
    validarJWT
}