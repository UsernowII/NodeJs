require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



const main = async() =>{
    
    let option = '';
    const tareas = new Tareas();
    
    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray( tareasDB );
    }


    do {
        //Imprimir el menu
        option = await inquirerMenu();

        switch (option) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            default:
                break;
        }




        guardarDB( tareas.listadoArray);
         
        
        await pausa();
        
    } while (option !== '0');
    


    
}

main();