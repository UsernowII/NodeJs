
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

const id = 3;

// getEmpleado(id)
//     .then( empleado => console.log(empleado))
//     .catch(err => console.log(err));

// getSalario(id)
//     .then( salario => console.log(salario))
//     .catch(err => console.log(err));

let nombre;

getEmpleado(id) // como el then retorna una promesa podemos encadenar otra promesa
    .then( empleado =>  {
        nombre = empleado;
        return getSalario(id)
    }) // ya se encadena con el producto de la promesa getSalario
    .then( salario => console.log( "El empleado:", nombre, "tiene un salario de:", salario))
    .catch(err => console.log(err));