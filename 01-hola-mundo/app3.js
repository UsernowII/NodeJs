
console.log('Inicio de programa'); // 1 :: 1

setTimeout( () =>{
    console.log('Primer TimeOut'); // 5 :: 5
}, 3000);

setTimeout( () =>{
    console.log('Segundo TimeOut'); // 2 :: 3
}, 0);

setTimeout( () =>{
    console.log('Tecer TimeOut');   //3 :: 4
}, 0);

console.log('FIn de programa');    // 4 :: 2 