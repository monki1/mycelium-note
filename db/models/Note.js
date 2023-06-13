const { bookshelf } = require('./knexfile');

const Note = bookshelf.model('Note', {
    tableName: 'notes',
});

module.exports = Note;
