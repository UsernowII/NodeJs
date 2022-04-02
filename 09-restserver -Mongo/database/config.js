const mongoose = require('mongoose');


const dbConnection = async () =>{

    try{
        await mongoose.connect( process.env.MONGODB, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
           
        });

        console.log("base de datos online");
    }catch (err){
        console.error(err);
        throw new Error ('Error a la hora de iniciar la Base de Datos')
    }


}



module.exports = {
    dbConnection
}