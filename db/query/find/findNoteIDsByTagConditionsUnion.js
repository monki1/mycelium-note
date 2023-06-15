const singleCondition = require('./findNoteIDsByTagConditionSingle');

async function findNoteIDsByTagConditionsUnion(tagConditions, userId) {
    const noteIdsSet = new Set();

    await Promise.all(
        tagConditions.map(async (condition) => {
            const { type, value, operator } = condition;
            const noteIds = await singleCondition(type, value, operator, userId);

            for (const noteId of noteIds) {
                noteIdsSet.add(noteId);
            }
        })
    );

    return Array.from(noteIdsSet);
}
module.exports = findNoteIDsByTagConditionsUnion;
