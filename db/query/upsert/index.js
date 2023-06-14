//expect a note object and a user id

//returns a note object

const insert = require('./insert');
const update = require('./update');

const upsert = async (note, userId, noteId=null) => {
    if(noteId){
        return await update(note, userId, noteId);
    }
    return await insert(note, userId);
}

module.exports = {insert, update, upsert};