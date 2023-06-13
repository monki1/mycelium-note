const { bookshelf } = require('./knexfile');

const TagType = bookshelf.model('TagType', {
    tableName: 'tag_types',
});

module.exports = TagType;
