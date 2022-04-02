const { Schema, model} = require('mongoose');


const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },
  img: String,
  rol: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
    //enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: true,
  }
});

//sobreescribir el metodo toJSON
UsuarioSchema.methods.toJSON = function (){
  const { __v, password, ...usuario} = this.toObject();
  return usuario;
}


module.exports = model ('Usuario', UsuarioSchema);