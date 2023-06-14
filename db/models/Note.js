const { bookshelf } = require('./bookshelf');
const User = require('./User');

const Note = bookshelf.model('Note', {
    tableName: 'notes',
    user() {
        return this.belongsTo(User);
    },
    tags() {
        return this.hasMany('Tag');
    },
});

module.exports = Note;
