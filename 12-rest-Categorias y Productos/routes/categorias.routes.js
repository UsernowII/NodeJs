const { Router} = require('express');
const { check } = require('express-validator');


const {validarCampos, validarJWT, esAdminRole } = require('../middlewares/index');
const { crearCategoria, 
        getCategoria, 
        getCategorias,
        editarCategoria,
        eliminarCategoria } = require('../controllers/categorias.controller')

const { existeCategoria } = require('../helpers/db-validators');

const router = Router();



//Obtener todaslas categorias // publico
router.get('/', getCategorias);

// Obtener una categoria por id
router.get('/:id', [
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom( id => existeCategoria(id)),
    validarCampos
], getCategoria);

// Crear categoria privado - cualquier con token valido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
] , crearCategoria );

// Actualizar categoria privado - cualquier con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un id de Mongo valido').isMongoId(),
    validarCampos,
], editarCategoria);

// Borrar categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    validarCampos,
    check('id').custom( id => existeCategoria(id)),
    validarCampos,  
], eliminarCategoria);



module.exports = router;