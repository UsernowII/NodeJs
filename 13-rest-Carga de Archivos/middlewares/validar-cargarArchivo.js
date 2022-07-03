const { response } = require("express");
const req = require("express/lib/request");


//middlewares se disparan con req, resp y luego el cb (next)
const validarArchivoSubir = (req, res = response, next) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({ 
            msg : 'No hay archivos que subir - Validar Archivo Subir'
        });
    }

    next();
}


module.exports = {
    validarArchivoSubir
}