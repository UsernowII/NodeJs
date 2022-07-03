
// Referencias del HTML
const lblOnline =  document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');




// usando socket io desde el link html
const socket = io();


socket.on('connect', () =>{

    console.log('Conectado');
    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

     
});



socket.on('disconnect', () =>{

    console.log('Desconectado');
    
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';

});


//escuchar evento del server
socket.on('enviar-mensaje', ( payload) =>{
    console.log(payload);

} )


//Crear mensaje hacia el server
btnEnviar.addEventListener( 'click', () =>{
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        fecha : new Date().getTime()
    }
    
    socket.emit('enviar-mensaje', payload, (id) =>{
        console.log('Desde el server', id);
    });

})