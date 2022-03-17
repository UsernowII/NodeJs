require('colors');
const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value : '1',
                name : '1.'.green + ' Crear tarea' 
            },
            {
                value : '2',
                name : '2.'.green + ' Listar tareas' 
            },
            {
                value : '3',
                name : '3.'.green + ' Listar tareas completadas' 
            },
            {
                value : '4',
                name : '4.'.green + ' Listar tareas pendientes'
            },
            {
                value : '5',
                name : '5.'.green + ' Completar tarea(s)' 
            },
            {
                value : '6',
                name : '6.'.green + ' Borrar tarea' 
            },
            {
                value : '0',
                name : '0.'.green + ' Salir' 
            }                  
                ]

    }
];


const inquirerMenu = async () =>{
    console.clear();
    console.log('========================'.green);
    console.log(' Seleccione una opción'.white);
    console.log('========================\n'.green);

    const {opcion} = await inquirer.prompt(questions);
    return opcion; // es el valor del name en questions

}

const pausa = async () =>{
    const continuar = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`,
        }
    ];
    console.log('\n');
    return await inquirer.prompt(continuar);
}

const leerInput = async (mensaje) =>{
     
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value){
                if(value.lenght === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc}= await inquirer.prompt(question);
    
    return desc;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput
}