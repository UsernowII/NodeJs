const validaCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');


module.exports = {
    ...validaCampos, // todo lo que exporta esta importacion
    ...validaJWT,
    ...validaRoles

}