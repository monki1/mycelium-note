const { bookshelf } = require('./bookshelf');
// const Note = require('./Note');
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

async function createTag(tagString, valueString, userId, noteId) {
  let tagType;
  try {
    tagType = await TagType.getByString(tagString);
  } catch (error) {
    // Handle error
    throw Error("Error getting tag type")
  }
    try {
    console.log(tagType);
    const tagObj = {
      value: valueString,
      user_id: userId,
      note_id: noteId,
      tag_type_id: tagType.id,
    };
    console.log(tagObj);
    return (await Tag.forge(tagObj).save()).toJSON();
  } catch (error) {
    // Handle error
    throw Error("Error creating tag")
  }
}

module.exports.createTag = createTag;

async function getByNoteId(noteId) {
  let result = (await Tag.where({ note_id: noteId }).fetchAll()).toJSON();
  // console.log(result);
  let returnArray = [];
  for(let i = 0; i < result.length; i++){
    // console.log(result[i].tag_type_id);
    // console.log(await TagType.getById(result[i].tag_type_id));
    const type = (await TagType.getById(result[i].tag_type_id)).toJSON().type;
    returnArray.push({
      id: result[i].id,
      value: result[i].value,
      type: type,
    });
  }
  return returnArray;
}

module.exports.getByNoteId = getByNoteId;

async function deleteTagById(tagId) {
  try {
    const tag = await Tag.where({ id: tagId }).fetch();
    if (tag) {
      await tag.destroy();
      return true;
    } else {
      throw new Error('Tag not found');
    }
  } catch (error) {
    // Handle error
    throw new Error('Error deleting tag');
  }
}

module.exports.deleteTagById = deleteTagById;
