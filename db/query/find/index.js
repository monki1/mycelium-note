const Note = require("../../models/Note");
module.exports.idsByTagEq = require('./findNoteIdsByTagEquality');
module.exports.idsByTagConditionSingle = require('./findNoteIDsByTagConditionSingle');
module.exports.idsByTagConditionsIntersection = require('./findNoteIDsByTagConditionsIntersection');
module.exports.idsByTagConditionsUnion = require('./findNoteIDsByTagConditionsUnion');

module.exports.byIntersection = async (tagConditions, userId) => {
    const ids = await module.exports.idsByTagConditionsIntersection(tagConditions, userId);
    return await Promise.all(ids.map(async (id) => await Note.getObjectById(id)));
}

module.exports.byUnion = async (tagConditions, userId) => {
    const ids = await module.exports.idsByTagConditionsUnion(tagConditions, userId);
    return await Promise.all(ids.map(async (id) => await Note.getObjectById(id)));
}

