const {bookshelf} = require('./bookshelf');

const User = bookshelf.model('User', {
    tableName: 'users',
    notes() {
        return this.hasMany('Note');
    },
    tags() {
        return this.hasMany('Tag');
    },
});

module.exports = User;
