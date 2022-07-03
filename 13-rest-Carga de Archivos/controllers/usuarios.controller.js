const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response) => {
    
    //  extraer parametros opcionales de la query "?"
    //const {nombre, apikey} = req.query;
    const {limite = 5, desde =0} = req.query;  
    const activos = {estado : true}

    // se desestructura en orden que se resuelven las promesas
    const [usuarios, total] = await Promise.all([ // ejecuta varias promesas en simultaneo
      //primera promesa
      Usuario.find(activos)
      .skip( Number(desde) )
      .limit( Number(limite) ),
      //segunda promesa
      Usuario.countDocuments(activos)
    ])


    res.json({
      total,
      usuarios
    }); 
    
}


const usuariosPut = async (req, res) => {

    const id = req.params.id;
    const {_id, password, google, ...resto} = req.body;

    // si quiere actualizar contraseña volvemos a hashear
    if(password){
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync( password, salt);
    }
    //Envio id mas el objeto con los datos actualizar
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);

}


const usuariosPost = async (req, res) => {

  
    
    const { nombre, correo, password, rol} = req.body; // desestructurando body

    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar correo
    
    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    //guardar en bd
    await usuario.save();
    
    res.json({
        usuario
    });

}

const usuariosDelete = async (req, res) => {

    const {id} = req.params;

    //Borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete( id);

    const uid = req.uid;

    const usuario = await Usuario.findByIdAndUpdate( id, {estado : false})
    const usuarioAuth = req.usuario;
    
    
    res.json(usuario);

}

const usuariosPatch = (req, res) => {
    res.status(202).json({
      msg: "patch API  - controller",
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}