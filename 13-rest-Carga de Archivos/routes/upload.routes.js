const { Router} = require('express');
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen, 
    mostrarImagen, actualizarImagenCloudinary } = require('../controllers/upload.controller');
const { coleccionesPermitidas } = require('../helpers');


const {validarCampos, validarArchivoSubir} = require('../middlewares/index');


const router = Router();


router.post('/',validarArchivoSubir, cargarArchivos);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos']) ),
    validarCampos
],actualizarImagen);
//],actualizarImagenCloudinary);

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos']) ),
    validarCampos
], mostrarImagen);




module.exports = router;