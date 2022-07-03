const jwt = require('jsonwebtoken');


//creando promesa manual
const generarJWT = (uid = '') =>{

    return new Promise( (resolve , reject)=>{

        const payload = {uid};
        //payload - secretKey - opciones - callback
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn : '4h'
        }, (err, token)  =>{

            if(err){
                console.error(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }


        });



    });
}



module.exports = {
    generarJWT
}