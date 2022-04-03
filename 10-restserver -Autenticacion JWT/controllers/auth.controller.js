const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario')


const login = async (req, res = response) =>{

    const { correo, password} = req.body;

    try{
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo : correo});
        if(!usuario){
            return res.status(400).json({
                mensaje: 'Usuario / Password no son correctos  -- correo'
            });
        }
        
        //SI el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                mensaje: 'Usuario / Password no son correctos  -- estado: false'
            });
        }

        //verirficar contraseña
        const validPassword = bcryptjs.compareSync( password , usuario.password);
        if(!validPassword){
            return res.status(400).json({
                mensaje: 'Usuario / Password no son correctos  -- password'
            });
        }

        // Genera JWT
        const token = await generarJWT (usuario.id);    

        res.json({
            usuario,
            token
        })
    
    }catch(error){
        console.error(error);
        return res.status(500).json({
            msg : 'Hable con el administrador'
        });
    }


}



module.exports = {
    login
}