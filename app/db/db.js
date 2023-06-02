//notes(note) -> id
//delete(id)
//update(id, note)
//read(id) -> note
//query() -> [notes]

const notes = require('./tables/notes');
const sources = require('./tables/sources');
const sourceTypes = require('./tables/sourceTypes');

module.exports = { notes, sources, sourceTypes}
