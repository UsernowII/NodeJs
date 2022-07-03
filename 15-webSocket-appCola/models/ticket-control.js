const path = require('path');
const fs = require('fs');


class Ticket{
    constructor( numero , escritorio){
        this.numero = numero;
        this.escritorio = escritorio;

    }
}


class TicketControl {

    constructor(){
        this.ultimo     = 0;
        this.hoy        = new Date().getDate();
        this.tickets    = [];
        this.ultimos4   = [];

        this.init();
    
    }

    get toJson(){
        return {
            ultimo: this.ultimo,
            hoy : this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }
    }


    init(){
        //leyendo base de datos ( JSON )
        const {hoy, tickets, ultimo, ultimos4} = require('../db/data.json');
        if(hoy === this.hoy){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else{
            //Es otro día
            this.guardarDB();
        }
    }


    guardarDB(){

        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson) );
    }

    siguiente(){
        this.ultimo +=1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push( ticket);

        this.guardarDB();
        return 'Ticket ' + this.ultimo;
    }


    atenderTicket (escritorio){

        //No tenemos tickets
        if(this.tickets.length === 0){
            return null;
        }
        
        //remueve primer elemento del arreglo y lo retorna
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;
        // Agrega elemento al inicio del arreglo
        this.ultimos4.unshift( ticket);

        if(this.ultimos4.length >4 ){
            this.ultimos4.splice(-1,1); // desde el ultimo y corte uno
        }

        this.guardarDB();

        return ticket;
         
    }
}


module.exports = TicketControl;