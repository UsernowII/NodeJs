const { response } = require("express");
const { Categoria } = require('../models')



const getCategorias = async (req, res = response) =>{

    const {limite = 5, desde = 0} = req.query;
    const query = {estado : true};

    const [total , categorias] = await Promise.all([ 
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip( Number( desde))
            .limit( Number( limite))
    ]);

    res.json({
        total, 
        categorias

    });

}

const getCategoria = async (req, res = response) =>{

    const id = req.params.id;
    const categoria = await Categoria.findOne({id}).populate('usuario', 'nombre');


    return res.status(200).json(categoria);
}


const crearCategoria = async (req, res = response) =>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne ({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre}, ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre, 
        usuario : req.usuario._id
    }

    const categoria = new Categoria( data );

    //guardar BD
    await categoria.save();

    res.status(201).json(categoria);


}

const editarCategoria = async (req, res = response) =>{

    const {id}  = req.params;
    const { estado , usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;


    const categoria = await Categoria.findByIdAndUpdate(id, data, {new : true});

    return res.status(201).json(categoria);
}


const eliminarCategoria = async (req, res = response) =>{

    const {id}  = req.params;

    const categoriaDelete = await Categoria.findByIdAndUpdate(id, {estado : false}, {new : true});

     res.status(200).json(categoriaDelete);
}

module.exports = {
    crearCategoria,
    getCategoria,
    getCategorias,
    editarCategoria,
    eliminarCategoria
}