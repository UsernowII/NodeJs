const empelados = [
    {
        id : 1,
        nombre: 'fernando'
    },
    {
        id : 2,
        nombre: 'linda'
    },
    {
        id:3,
        nombre: 'Karen'
    }
];

const salarios = [
    {
        id : 1,
        salario: 1000
    },
    {
        id : 2,
        salario: 1500
    }

];

const getEmpleado = (id) =>{

    return new Promise( (resolve, reject)=>{
        const empleado = empelados.find( e => e.id == id)?.nombre;
        (empleado)
            ? resolve(empleado)
            : reject(`No existe empleado con id ${id}`);

    });

};

const getSalario = (id) =>{

    return new Promise((resolve, reject)=>{
        const salario = salarios.find( s => s.id === id)?.salario;
        (salario)
            ? resolve(salario)
            : reject(`No existe salario con id ${id}`);
    });
};


const getInfoUsuario = async(id) =>{
    
    try{
        const empelado = await getEmpleado(id);
        const salario = await getSalario(id);
        return `El salario del empelado: ${empelado} es de ${salario}`;
    }catch(error){
        throw error;
    }
        
    
};

const id = 3;

getInfoUsuario(id)
    .then( msg => console.log(msg))
    .catch( err => {
        console.log("TODO MALIO SAL!");
        console.log( err);
    });

