params = new URLSearchParams(window.location.search);

const nombre = params.get('nombre');
const sala = params.get('sala');


//Referencias Html jQuery
let divUsuarios = $('#divUsuarios');
let formEnviar = $('#formEnviar');
let txtMensaje = $('#txtMensaje');
let divChatbox = $('#divChatbox');



// Funciones para renderizar usuarios
function renderizarUsuarios( personas ){ // [{},{},{}]
    console.log(personas)

    let html = `
    <li>
       <a href="javascript:void(0)" class="active"> Chat de <span>${params.get('sala')}</span></a>
    </li>
    `;

    for (const element of personas) {
        
        html+= `<li>
                    <a data-id="${element.id}" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>${element.nombre} <small class="text-success">online</small></span></a>
                </li>`;
            
    }
    
    divUsuarios.html( html);

}


function renderizarMensajes( mensaje, iam ){
    const fecha = new Date(mensaje.fecha);
    const hora = fecha.getHours() + ':' + fecha.getMinutes();
    
    let adminClass = 'info';
    let html = '';

    if(mensaje.nombre === 'Administrador'){
        adminClass = 'danger';
    }

    if(iam){
        html = `
        <li class="reverse">
            <div class="chat-content">
                <h5>${mensaje.nombre}</h5>
                <div class="box bg-light-inverse">${mensaje.mensaje}.</div>
            </div>
            <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>
            <div class="chat-time">${hora}</div>
        </li>`;
    }else{
        html = `
        <li class="animated fadeIn">`;
        if( mensaje.nombre !== 'Administrador'){
            html +=`<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>`;
        }
        
        html +=`<div class="chat-content">
                <h5>${mensaje.nombre}</h5>
                <div class="box bg-light-${adminClass}">${mensaje.mensaje}</div>
            </div>
            <div class="chat-time">${hora}</div>
        </li>`;

    }


    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    const newMessage = divChatbox.children('li:last-child');

    // heights
    const clientHeight = divChatbox.prop('clientHeight');
    const scrollTop = divChatbox.prop('scrollTop');
    const scrollHeight = divChatbox.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//Listeners
divUsuarios.on('click', 'a', function (){
    let id = $(this).data('id');
    
    if (id){
        console.log(id);
    }
});

formEnviar.on('submit', function(e){
    e.preventDefault();

    if(txtMensaje.val().trim().length === 0){
        return;
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    },  function(mensaje) {
            console.log(mensaje);
            txtMensaje.val('').focus();
            renderizarMensajes(mensaje, true);
            scrollBottom();
    });

});
