const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);

const { response } = require("express");
const { request } = require("express");
const { subirArchivo } = require("../helpers");

const {Usuario, Producto} = require('../models');



const cargarArchivos = async ( req = request, res = response) =>{


    try{
        //const nombreArchivo = await  subirArchivo (req.files, ['txt', 'md'], 'textos');
        const nombreArchivo = await  subirArchivo (req.files, undefined, 'img');
        res.json({nombre: nombreArchivo});
    }catch( msg){
        res.status(400).json({msg : "archivo no valido"} );
    }

    
}


const actualizarImagen = async (req = request, res = response) =>{

    const {id, coleccion} = req.params;
    

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo){
                return res.status(400).json({
                    msg : `No existe un usuario con el id ${id}`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo){
                return res.status(400).json({
                    msg : `No existe un producto con el id ${id}`
                })
            }
        break;
        
        default:
            return res.status(500).json({msg : 'Se me olvido validar esto'});
    }

    //limpiar imagenes anteriores
    if( modelo.img){
        //borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync( pathImagen)){ // comprueba si existe retrona un boleado
            fs.unlinkSync ( pathImagen); // elimina el file
        }
    }


    const nombreArchivo = await  subirArchivo (req.files, undefined, coleccion);
    console.log(nombreArchivo);
    modelo.img = nombreArchivo;

    await modelo.save();

    res.json(modelo);

}


const mostrarImagen = async (req = request, res = response) =>{

    const {id, coleccion} = req.params;
    

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo){
                return res.status(400).json({
                    msg : `No existe un usuario con el id ${id}-- 404 ERROR`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo){
                return res.status(400).json({
                    msg : `No existe un producto con el id ${id}-- 404 ERROR`
                })
            }
        break;
        
        default:
            return res.status(500).json({msg : 'Se me olvido validar esto'});
    }

    //limpiar imagenes anteriores
    if( modelo.img){
        //borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync( pathImagen)){ // comprueba si existe retrona un boleado
            return res.sendFile( pathImagen);
        }
    }

    const pathErrorImg = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile( pathErrorImg );

}


const actualizarImagenCloudinary = async (req = request, res = response) =>{

    const {id, coleccion} = req.params;
    

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo){
                return res.status(400).json({
                    msg : `No existe un usuario con el id ${id}`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo){
                return res.status(400).json({
                    msg : `No existe un producto con el id ${id}`
                })
            }
        break;
        
        default:
            return res.status(500).json({msg : 'Se me olvido validar esto'});
    }

    //limpiar imagenes anteriores cloudinary en nuestro backend
    if( modelo.img){
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[ nombreArr.lenght -1];
        const [ public_id ] = nombre.split('.');
        // elminar archivos subidos a cloudinary
        await cloudinary.uploader.destroy ( public_id);
    }

    const {tempFilePath } = req.files.archivo;
    // sube el archivo que viene en la peticion a cloduinary
    const { secure_url} = await cloudinary.uploader.upload( tempFilePath );
    

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);

}

module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}