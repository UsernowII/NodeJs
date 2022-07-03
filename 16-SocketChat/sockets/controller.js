const { Socket} = require('socket.io');
const { comprobarJWT } = require('../helpers');

const ChatMensajes = require('../models/chat-mensajes');


const chatMensajes = new ChatMensajes();

const socketController = async ( socket , io) =>{

    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
    if(!usuario ){
        return socket.disconnect();
    }

    //Agregar el usuario conectado
    chatMensajes.conectarUsuario( usuario);
    io.emit('usuarios-activos', chatMensajes.usuariosArr );
    socket.emit('recibir-mensajes', chatMensajes.ultimos10);

    //socket.to(socket.id).emit(); configuracion para enviar mensaje a un id del socket

    //conectarlo a una sala especial
    socket.join( usuario.id ); // global, socket.id // usuario.id tres salas por conexion


    //limpiar cuando alguien se desconecta
    socket.on('disconnect', () =>{
        chatMensajes.desconectarUsuario(usuario.id); 
        io.emit('usuarios-activos', chatMensajes.usuariosArr );
    });

    socket.on('enviar-mensaje', ({ uid, mensaje }) =>{

        if( uid){
            // mensaje privado
            socket.to( uid ).emit('mensaje-privado', { de: usuario.nombre, mensaje});
        }else{
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensajes', chatMensajes.ultimos10)
        } 

    });

}

module.exports = {
    socketController
}