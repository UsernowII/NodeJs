const {response} = require('express');


const usuariosGet = (req, res = response) => {
    
    res.json({
      msg: "get API - controllador",
    }); 
    
}


const usuariosPut = (req, res) => {
    res.status(400).json({
      msg: "put API - controller",
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