const Tag = require('../../../db/models/Tag');

/**
 * Finds distinct note IDs that match the specified conditions.
 *
 * @param {string} type - The tag type to match.
 * @param {string} value - The tag value to match.
 * @param {string} operator - The comparison operator for the value. (e.g., '=', '>', '<', etc.)
 * @param {number} userId - The user ID to filter the tags.
 * @returns {Array<number>} An array of distinct note IDs that match the conditions.
 */
async function findNoteIDsByTagConditionSingle(type, value, operator, userId){
    const tags = await Tag.query()
        .where('user_id', userId)
        .where('value', operator, value)
        .whereIn('tag_type_id', (qb) => {
            qb.select('id').from('tag_types').where('type', type);
        });

    const noteIds = tags.map((tag) => tag.note_id);

    const distinctNoteIds = [...new Set(noteIds)];

    return distinctNoteIds;
}

module.exports = findNoteIDsByTagConditionSingle;
