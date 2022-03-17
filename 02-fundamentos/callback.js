

setTimeout( function(){
    console.log('hola mundo');
}, 1000);

const getUsuarioById = (id) =>{

    const usuario = {
        id : id,
        nombre: 'fernando'
    };

    setTimeout( () =>{
        console.log(usuario);
    },1500);
}

getUsuarioById(10);