const singleCondition = require('./findNoteIDsByTagConditionSingle');

async function findNoteIDsByTagConditionsIntersection(tagConditions, userId) {
    const noteIdsByCondition = await Promise.all(
        tagConditions.map(async (condition) => {
            const { type, value, operator } = condition;
            const noteIds = await singleCondition(type, value, operator, userId);
            return noteIds;
        })
    );

    // Find intersection of noteIds for all tagConditions
    const intersection = noteIdsByCondition.reduce((result, noteIds) =>
        result.filter((noteId) => noteIds.includes(noteId))
    );

    return intersection;
}

module.exports = findNoteIDsByTagConditionsIntersection;
