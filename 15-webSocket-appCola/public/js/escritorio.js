// Referencias escriotrio.HTML

const lblEscritorio = document.querySelector('#titulo');// por id
const btnAtender = document.querySelector('button');
const lblTicket = document.querySelector('small');  // sin definir el pimero que encuentra
const divAlerta = document.querySelector('.alert'); //. para las clases
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams( window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error ('El escritorio es obligatorio');
}


const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;
divAlerta.style.display = 'none'


const socket = io();



socket.on('connect', () => {
    btnAtender.disable = false;

});

socket.on('disconnect', () => {
    btnAtender.disable = true;  
});

socket.on('tickets-pendientes', (colaTickets) =>{
    if( colaTickets === 0){
        lblPendientes.style.display = 'none';
    }else{
        lblPendientes.style.display = '';
        lblPendientes.innerText = colaTickets;    
    }
    
});

btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', {escritorio}, ({ ok, ticket, msg})=>{
        if(!ok){
            lblTicket.innerText = 'Nadie, Fuera de Servicio';
            return divAlerta.style.display = '';
        }

        lblTicket.innerText = `Ticket ${ticket.numero}`;
    });

    
  /*   socket.emit( 'siguiente-ticket', null, ( ticket) => {
        lblNuevoTicket.innerText =  ticket;
    }); */

});