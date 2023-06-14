const assert = require('assert');
const TagType = require('../../../db/models/TagType');
const tagTypeString = 'Type aaB';
let tagTypeId;

describe('TagType', () => {
    describe('#getByString', () => {
        it('should return an object when given a string', async () => {
            const tagType = await TagType.getByString(tagTypeString);
            console.log(tagType); // Log the result for debugging
             // tagTypeId = tagType.id//{ id: 1, type: 'Type A' }
            assert.strictEqual(typeof tagType, 'object');
        });
        //should return the same object when given the same string
        // it('should return the same object when given the same string', async () => {
        //     const tagType = await TagType.getByString(tagTypeString);
        //     assert.strictEqual(tagType.id, tagTypeId);
        // });
        // //should return an object given id
        // it('should return an object when given an id', async () => {
        //     const tagType = await TagType.getById(tagTypeId);
        //     console.log(tagType); // Log the result for debugging
        //     assert.strictEqual(typeof tagType, 'object');
        // }
        // );

    });
});
