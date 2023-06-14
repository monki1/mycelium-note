const Note = require('../../models/note');
const Tag = require('../../models/Tag');

const update = async (note, userId, noteId) => {
    const { content, tags } = note;

    // Update the content with the new content and noteId
    const updatedNote = await Note.where({ id: noteId, user_id: userId }).save({ content }, { method: 'update' });

    // Get saved tags (getTagsByNoteId) => { type, value, id }
    const savedTags = await Tag.getByNoteId(noteId);

    // Compare the tags with the saved tags by type and value
    const tagsToDelete = savedTags.filter((savedTag) => {
        return !tags.some((tag) => tag.type === savedTag.type && tag.value === savedTag.value);
    });

    const tagsToInsert = tags.filter((tag) => {
        return !savedTags.some((savedTag) => savedTag.type === tag.type && savedTag.value === tag.value);
    });

    // Delete tags that are not in the new tags
    for (const tagToDelete of tagsToDelete) {
        await Tag.deleteTagById(tagToDelete.id);
    }

    // Insert tags that are not in the saved tags
    for (const tagToInsert of tagsToInsert) {
        await Tag.createTag(tagToInsert.type, tagToInsert.value, userId, noteId);
    }

    const updatedNoteObj = updatedNote.toJSON();
    console.log(updatedNoteObj);
    return updatedNoteObj;
};

module.exports = update;
