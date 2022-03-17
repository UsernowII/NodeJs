

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


const getEmpleado = (id, callback) =>{

    const empleado = empelados.find( e => e.id == id);

    if(empleado){
        callback(null, empleado) ;
    } else{
        callback(`Empleado con id ${id} no existe`);
    }
    
};



const getSalario = (id, callback ) =>{

    const salario = salarios.find(s => s.id === id)?.salario;
    if(!salario) callback(`El salario con id ${id} no existe`);
    else callback(null, salario);
};

const id = 2;

getEmpleado(id, (err,  empleado) =>{
    if(err){
        console.log("!ERROR");
        return console.log(err);
    }
    
    console.log("Empleado existe!");
    console.log(empleado.nombre);
});

getSalario(id, (error, salario) =>{
    if(error) console.log(error);
    else console.log(salario);
});

