
const { Router} = require('express');
const { check } = require('express-validator');
const {validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet, usuariosPut, usuariosPost,
      usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();



router.get("/", usuariosGet);

router.put("/:id", [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId), // funcion flecha simplificada
    check('rol').custom( rol => esRolValido(rol)),
    validarCampos
],usuariosPut );

//el segundo argumetno es un middleware de validaciones
router.post("/", [
    //correo es el campo del body
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe tener mas de 6 letras').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( correo => existeEmail(correo)),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( rol => esRolValido(rol)),
    //check('rol').custom( esRolValido), forma resumida
    
    validarCampos
] ,usuariosPost);
 
router.delete("/:id",[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch("/", usuariosPatch );




module.exports = router;