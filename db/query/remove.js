const Note = require('../models/Note');

function remove(id) {
   const s =  Note.where('id', id).tags().toJSON();
console.log("tags",s);


    return Note.where('id', id)
        .destroy();
}

module.exports = remove;