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

fetch('https://api.hypere.app/engines/text-davinci-003/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'fg-UQU2FOUK4SXODI8ZJIUWP2USIA2HB2R74JS5579N'
    },
    // body: '{\n      "prompt": "Roses are red, "\n   }',
    body: JSON.stringify({
        'prompt': 'Roses are red, '
    })
});