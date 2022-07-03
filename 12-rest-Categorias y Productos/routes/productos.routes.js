
const { Router} = require('express');
const { check } = require('express-validator');


const { validarCampos,
        validarJWT,
        esAdminRole } = require('../middlewares/index');

const { obtenerProductos, 
        crearProducto, 
        obtenerProducto,
        actualizarProducto,
        borrarProducto} = require('../controllers/productos.controller ');

const { existeProductoPorId, existeCategoria } = require('../helpers/db-validators');



const router = Router();


router.get("/", obtenerProductos);

router.get("/:id", [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeProductoPorId ), // funcion flecha simplificada
    validarCampos
],obtenerProducto);

router.post("/", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo válido').isMongoId(),
    check('categoria').custom( id => existeCategoria(id)),
    validarCampos
] , crearProducto);

router.put("/:id", [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( id => existeProductoPorId(id)),
    validarCampos
], actualizarProducto);

router.delete("/:id",[
    validarJWT,
    esAdminRole, 
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(id => existeProductoPorId(id)),
    validarCampos
], borrarProducto);



module.exports = router;