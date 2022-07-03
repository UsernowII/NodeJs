const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');


const esRolValido = async (rol = '') =>{
    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error (`El rol ${rol} no esta registrado en la BD`);
    }
}

const existeEmail = async ( correo) =>{
    const email = await Usuario.findOne({correo : correo});
    if(email){
        throw new Error (`Ya existe un usuario con el correo ${correo}`);
    }
}

const existeUsuarioPorId = async (id) =>{
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error (`No existe un usuario con el id ${id}`);
    }
}

/*
* Validaciones APi Categorias
*/
const existeCategoria = async ( id ) =>{
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error (`No existe una categoria con el id ${id}`);
    }
}


/*
* Validaciones APi productos
*/

const existeProductoPorId = async ( id ) =>{
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error (`No existe un producto con el id ${id}`);
    }
}


module.exports ={
    esRolValido,
    existeEmail,
    existeCategoria,
    existeUsuarioPorId,
    existeProductoPorId
}