const {v4: uuidV4} = require('uuid');


class Tarea{
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc){
        this.desc = desc;
        this.id = uuidV4();

    }


}

module.exports = Tarea;