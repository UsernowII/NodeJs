

const deadpool = {
    nombre: 'wade',
    apellido: 'Winton',
    poder : "Regeneración",
    //edad : 50,
    getNombre() {
        return `${this.nombre} ${this.apellido} ${this.poder}`
    }

}

console.log (deadpool.getNombre() );

//const nombre = deadpool.nombre;
//const apellido = deadpool.apellido;
//const poder = deadpool.poder;


function imprimeHeroe({nombre, apellido, poder, edad = 0}) {
    console.log(nombre, apellido, poder, edad);
}


imprimeHeroe(deadpool);
//const {nombre, apellido, poder, edad = 0} = deadpool;

//console.log(nombre, apellido, poder, edad);


const heroes = ['Deadpool', 'Superman', 'Batman'];

//const h1 = heroes[0];
//const h2 = heroes[1];
//const h3 = heroes[2];

const [ , h2, h3] = heroes; // dejo el espacio vacio si no quiero ese elemento


console.log( h2, h3);
