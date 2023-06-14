// /**
//  * Retrieves notes based on the specified tag conditions.
//  * @param {Array} conditions - An array of conditions to filter the notes.
//  * Each condition object should have the following properties:
//  * - type: The name of the tag type.
//  * - value: The value of the tag.
//  * - operator: The comparison operator for the tag value (e.g., '=', '>', '<').
//  * @returns {Array} An array of retrieved notes that match the tag conditions.
//  * @throws {Error} If there is an error retrieving the notes.
//  *
//  * @example
//  * const conditions = [
//  *   { type: 'Type1', value: 'Value1', operator: '=' },
//  *   { type: 'Type2', value: 'Value2', operator: '>' },
//  * ];
//  * const notes = await findNotesByTags(conditions);
//  * console.log(notes); -> all notes that have all the valid tags specified in the conditions
//  */
//
// // Import the required models
// const Note = require('../models/Note');
// const TagType = require('../models/TagType');
//
// async function findNotesByTags(conditions) {
//     try {
//         // Start constructing the query using the query builder
//         const notes = await Note.query((qb) => {
//             qb.select('notes.*')
//                 .join('tags', 'tags.note_id', 'notes.id')
//                 .join('tag_types', 'tag_types.id', 'tags.tag_type_id');
//
//             // Iterate over the tag conditions
//             conditions.forEach((condition, index) => {
//                 const { type, value, operator } = condition;
//
//                 // Create an alias for each tag condition to join the tags table multiple times
//                 const alias = `tag_${index}`;
//
//                 // Join the tags table using the alias and apply the tag condition
//                 qb.join(`tags AS ${alias}`, (join) => {
//                     join.on(`${alias}.note_id`, 'notes.id')
//                         .andOn(`${alias}.tag_type_id`, '=', TagType.query().select('id').where('type', type))
//                         .andOn(`${alias}.value`, operator, value);
//                 });
//             });
//         });
//
//         // Return the retrieved notes as JSON
//         return notes.toJSON();
//     } catch (error) {
//         // Throw an error if there is an error retrieving the notes
//         throw new Error('Error retrieving notes.');
//     }
// }
