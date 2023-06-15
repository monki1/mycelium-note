const { bookshelf, Note} = require('./bookshelf');
const Tag = require("./Tag");
// const User = require('./User');


Note.getObjectById = async (id) => {
    // console.log("getOBJ", (await Note.where({id}).fetch()).toJSON());
    const note = (await Note.where({id}).fetch()).toJSON();
    console.log("getOBJ", note);
    note.tags = await Tag.getObjByNoteId(id);
    return note;
}


module.exports = Note;
