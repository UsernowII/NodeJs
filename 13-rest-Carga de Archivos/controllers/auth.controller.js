const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
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


const googleSingIn = async (req, res = response) =>{

    const {id_token} = req.body;

    try {
        
        const { nombre, img, correo} = await googleVerify(id_token);

        //verificar existencia del correo
        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            //tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google : true,
                
            };

            usuario = new Usuario( data);
            await usuario.save();
        }

        // si el usuario en BD es false
        if(!usuario.estado){
            return res.status(401).json({
                msg : 'Hable con el administrador, usuario bloqueado'
            });
        }

        //generar el jwt
        const token = await generarJWT ( usuario.id);
        

        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            msg : 'El token de google no se pudo verificar'
        })
    }


    

}

module.exports = {
    login,
    googleSingIn
}