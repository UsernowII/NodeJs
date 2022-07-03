const {response, request} = require('express');
const Producto = require('../models/producto');



const obtenerProductos = async (req = request, res = response) => {
    
    const {limite = 5, desde =0} = req.query;  
    const activos = {estado : true}

    // se desestructura en orden que se resuelven las promesas
    const [productos, total] = await Promise.all([ // ejecuta varias promesas en simultaneo
      //primera promesa
      Producto.find(activos)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip( Number(desde) )
        .limit( Number(limite) ),
      //segunda promesa
      Producto.countDocuments(activos)
    ]);


    res.json({
      total,
      productos
    }); 
    
}

const obtenerProducto = async (req = request, res = response) => {
    
  const { id } = req.params;
  const producto = await Producto.findById( id)
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre');

  res.status(200).json(producto); 
  
}

const crearProducto = async (req = request, res = response) => {

  const { estado, usuario, ...body} = req.body;
  const nombre = body.nombre; 
  
  const productoDB = await Producto.findOne({nombre});

  if(productoDB){
    return res.status(400).json({
      msg: `El producto ${nombre}, ya existe`
  });
  }
  
  const data = {
    ...body,
    nombre : nombre.toUpperCase(),
    usuario : req.usuario._id
  }

  const newProduct = new Producto(data);
  await newProduct.save()

  res.status(201).json(newProduct);

}


const actualizarProducto = async (req = request, res = response) => {

    const id = req.params.id;
    const { estado, usuario, ...data} = req.body;

    if(data.nombre){
      data.nombre  = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new : true});

    res.status(200).json(producto);

}


const borrarProducto = async (req = request, res = response) => {

    const {id} = req.params;


    const productoBorrado = await Producto.findByIdAndUpdate( id, {estado : false}, {new : true});

    
    res.status(200).json(productoBorrado);

}


module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
}