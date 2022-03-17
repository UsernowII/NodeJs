
// Un callback es una función que se ejecuta a travbes de otra funcion
// los callback no son sincronos


const getUser = (id , cb)=>{
    const user = {
        name : 'Jhon',
        id : id
    };

    cb(null, user);
}


getUser(1, (error, user) =>{
    if(error) return console.log(error);
    console.log(`Username is ${user.name}`)
    console.log(1 +1 );
});

console.log("========= Segundo Ejemplo=====");

const users = [
    {
        id : 1,
        name : "jhon"
    },
    {
        id:2,
        name: "Erick"
    },
    {
        id:3,
        name: 'Carlos'
    }
];

const emails = [
    {
        id:1,
        email: 'j@gmail.com'
    },
    {
        id:2,
        email: 'e@gmail.com'
    }
];


const getUser2 = (id, callback) =>{
    const user = users.find(usuario=>usuario.id==id);
    if(user == undefined) callback(`Not existe a user with id ${id}`);
    else callback(null, user);
    //console.log(user);
};


const getEmail = ( user , callback) => {
    const email = emails.find(e => e.id==user.id);
    if(!email) callback(`${user.name} hasn't email`);
    else callback(null, {
        id: user.id,
        name: user.name,
        email: email.email
    });
};


getUser2(2, (err, user)=> {
    if(err) console.log(err);
    getEmail(user, (error, response) =>{
        if(error) return console.log(error);
        console.log(response);
    } );
});