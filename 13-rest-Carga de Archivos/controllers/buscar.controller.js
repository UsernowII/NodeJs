const { response, request } = require("express");
const { ObjectId} = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require("../models");


const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async ( parametro = '', res = response) =>{

    //validar si es un Id de Mongo
    const esMOngoID = ObjectId.isValid( parametro ); // true o false

    if( esMOngoID){
        const usuario = await Usuario.findById(parametro);
        return res.json({
            results : (usuario) ?  [usuario] : []
        });
    }

    const regex = new RegExp( parametro, 'i');// busqueda 'i' insensible mayus

    //const usuarios = await Usuario.find({nombre : regex});
    //query de usuarios por nombre o correo  y estado activo
    const usuarios = await Usuario.find({
        $or : [{ nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });
    
    return res.json({
        results : usuarios
    });
}


const buscarCategorias = async ( parametro = '', res = response) =>{

    //validar si es un Id de Mongo
    const esMOngoID = ObjectId.isValid( parametro ); // true o false

    if( esMOngoID){
        const categoria = await Categoria.findById(parametro);
        return res.json({
            results : (categoria) ?  [categoria] : []
        });
    }

    const regex = new RegExp( parametro, 'i');// busqueda 'i' insensible mayus

    const categorias = await Categoria.find({ nombre : regex, estado: true});
    
    return res.json({
        results : categorias
    });
}

const buscarProductos = async ( parametro = '', res = response) =>{

    const esMOngoID = ObjectId.isValid( parametro ); // true o false

    if( esMOngoID){
        const producto = await Producto.findById(parametro).populate('categoria', 'nombre');
        return res.json({
            results : (producto) ?  [producto] : []
        });
    }

    const regex = new RegExp( parametro, 'i');// busqueda 'i' insensible mayus

    const productos = await Producto.find({ nombre : regex, estado: true})
                                    .populate('categoria', 'nombre');
    
    return res.json({
        results : productos
    });
}

const buscar = (req = request, res = response) =>{

    //como se definio el nombre en los query params
    const { coleccion, parametro} = req.params;

    if ( !coleccionesPermitidas.includes( coleccion)){
        return res.status(400).json({
            msg : `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }


    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(parametro, res);
            break;
        case 'categorias':
            buscarCategorias(parametro, res);
            break;
        case 'productos':
            buscarProductos(parametro, res);
            break;
    
        default:
            res.status(500).json({
                msg : 'Esta busqueda no esta validada'
            })
            break;
    }

}


module.exports = {
    buscar
}