const { bookshelf } = require('./knexfile');
const Note = require('./Note');
const TagType = require('./TagType');

const Tag = bookshelf.model('Tag', {
  tableName: 'tags',
  note() {
    return this.belongsTo(Note, 'note_id');
  },
  tagType() {
    return this.belongsTo(TagType, 'tag_type_id');
  },
});

module.exports = Tag;
