const Note = require('../../models/Note');
async function findAllNoteIDs(userId) {
    const result = await Note.where({ user_id: userId }).fetchAll();
    return result.map((note) => note.toJSON().id);
}

module.exports = findAllNoteIDs;