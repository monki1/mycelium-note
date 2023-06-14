const { bookshelf } = require('./bookshelf');
const Note = require('./Note');
const User = require('./User');
const TagType = require('./TagType');

const Tag = bookshelf.model('Tag', {
  tableName: 'tags',
  note() {
    return this.belongsTo(Note);
  },
  tagType() {
    return this.belongsTo(TagType);
  },
  user() {
    return this.belongsTo(User);
  },
});

module.exports = Tag;
