const singleCondition = require('./findNoteIDsByTagConditionSingle');

async function findNoteIDsByTagConditionsIntersection(tagConditions, userId) {

    //TODO - change to using the tagCondition with the smallest COUNT of tags
    // then use the noteIds to get the note objects
    // like await Note.getObjectById(noteId)
    //TODO then filter the note objects by the other tagConditions
    // Note object look like this:
    //   {
    //     id: 205,
    //     user_id: 1,
    //     content: '1686852635223',
    //     updated_at: 2023-06-15T18:10:35.243Z,
    //     tags: [ { id: 284, value: '78555814604877', type: '64540980737343' }, { id: 285, value: '84993958961181', type: '10530417730983' } ]
    //   }




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
