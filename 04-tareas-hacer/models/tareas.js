const Tarea = require("./tarea");


class Tareas{

    _listado = {};

    get listadoArray(){

        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            //console.log(key, 'key');
            const tarea = this._listado[key];
            listado.push( tarea);
        } );

        return listado;
    }


    constructor(){
        
        this._listado = {};// _ indica que es una propiedad privada

    }

    cargarTareasFromArray( tareas = []){
        const obj = tareas.forEach( tarea =>{
            this._listado[tarea.id] = tarea;
        });
        
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea; // guarda esa clave en el objeto con id unico
    }

    listadoCompleto(){
        
        let index = 1;
        console.log();
        this.listadoArray.forEach( item =>{
            const {desc, completadoEn} = item;
            const indexString = `${index +1}`.green;
            const estado = completadoEn 
                ? 'Completada'.green
                : 'Pendiente'.red;
            
            console.log(`${indexString} ${desc} :: ${estado}`);
        });

    }
}

module.exports = Tareas;