//Referencias nuevo-ticket.HTML 

const btnCrear = document.querySelector('#btnCrear');
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');


const socket = io();



socket.on('connect', () => {
    btnCrear.disable = false;

});

socket.on('disconnect', () => {
    btnCrear.disable = true;  
});

socket.on('ultimo-ticket', (ticketUltimo) => {
    lblNuevoTicket.innerText = 'Ticket #' +  ticketUltimo;
});



btnCrear.addEventListener( 'click', () => {

    
    socket.emit( 'siguiente-ticket', null, ( ticket) => {
        lblNuevoTicket.innerText =  ticket;
    });

});

