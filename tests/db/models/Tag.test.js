const assert = require('assert');
const Tag = require('../../../db/models/Tag');
const TagType = require('../../../db/models/TagType');

describe('Tag', () => {
    describe('#createTag', () => {
        it('should insert a new tag with correct properties and foreign key', async () => {
            const tagString = 'Type Abc';
            const valueString = 'Value 123';
            const userId = 1;
            const noteId = 2;


            // Call createTag function
            const createdTag = await Tag.createTag(tagString, valueString, userId, noteId);
            const tagTypeId = (await TagType.getByString(tagString)).id;
            // console.log(createdTag.toJSON()); // Log the result for debugging
            console.log(createdTag);

            // Assertions
            assert.strictEqual(createdTag.value, valueString);
            assert.strictEqual(createdTag.user_id, userId);
            assert.strictEqual(createdTag.note_id, noteId);
            assert.strictEqual(createdTag.tag_type_id, tagTypeId); // The mocked TagType id

        });
    });

    describe('#getObjByNoteId', () => {
        it('should return an array of tags', async () => {
            const noteId = 1;
            const tags = await Tag.getObjByNoteId(noteId);
            console.log(tags); // Log the result for debugging
            assert.strictEqual(Array.isArray(tags), true);
        });

    });
});

