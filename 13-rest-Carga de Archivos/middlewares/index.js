const validaCampos    = require('../middlewares/validar-campos');
const validaJWT       = require('../middlewares/validar-jwt');
const validaRoles     = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validar-cargarArchivo');

module.exports = {
    ...validaCampos, // todo lo que exporta esta importacion
    ...validaJWT,
    ...validaRoles,
    ...validarArchivoSubir

}