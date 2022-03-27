const {response, request} = require('express');




const usuariosGet = (req = request, res = response) => {
    
    //  extraer parametros opcionales de la query "?"
    const {nombre, apikey} = req.query;  


    res.json({
      msg: "get API - controllador",
      nombre,
      apikey
    }); 
    
}


const usuariosPut = (req, res) => {

    const id = req.params.id;


    res.status(400).json({
      msg: "put API - controller",
      id
    });

}


const usuariosPost = (req, res) => {
    
    const { nombre, edad} = req.body; // desestructurando body
    
    res.json({
      msg: "post API - controller",
      nombre,
      edad
    });

}

const usuariosDelete = (req, res) => {
    res.status(202).json({
      msg: "delete API -controller",
    });

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