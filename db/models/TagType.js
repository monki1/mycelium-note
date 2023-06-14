const { bookshelf } = require('./bookshelf');

const TagType = bookshelf.model('TagType', {
    tableName: 'tag_types',
    tags() {
        return this.hasMany('Tag');
    },
});

module.exports = TagType;
