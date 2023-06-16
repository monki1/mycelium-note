// const Note = require('../../models/Note');
const Tag = require('../../models/Tag');

const findEquality = async (type, value, userId) => {
    const tags = await Tag.query()
        .where('user_id', userId)
        .where('value', value)
        .whereIn('tag_type_id', (qb) => {
            qb.select('id').from('tag_types').where('type', type);
        });

    const noteIds = tags.map((tag) => tag.note_id);
    console.log("noteIds", noteIds);

    // only useful when identical tags in same note
    const distinctNoteIds = [...new Set(noteIds)];
    console.log("distinctNoteIds", distinctNoteIds);
    return distinctNoteIds;
};

module.exports = findEquality;
