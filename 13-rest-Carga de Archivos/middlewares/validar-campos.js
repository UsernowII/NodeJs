const { validationResult } = require("express-validator");

const validarCampos = ( req , res, next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
  }
  //next para ir al siguiente chek / middleware
  next();
}


module.exports = {
    validarCampos
}