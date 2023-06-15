const { insert } = require('../../../db/query/upsert');
const { idsByTagEq, idsByTagConditionSingle, byIntersection, all } = require('../../../db/query/find');
const assert = require('assert');
// const Tag = require('../../../db/models/Tag');

function randomNumber() {
    return Math.floor(Math.random() * 100000000000000).toString();
}

const content = Date.now().toString();
const userId = 1;
let insertedNoteId;
let testType = 'testType';
let testValue = 'testValue';
let testType2 = 'testType2';
let testValue2 = 'testValue2';
testType = randomNumber();
testValue = randomNumber();
testType2 = randomNumber();
testValue2 = randomNumber();

const exampleNote = {
    content: content,
    tags: [
        { type: testType, value: testValue },
        { type: testType2, value: testValue2 },
    ],
};

describe('find', () => {
    before('create note', async () => {

        const insertedNote = await insert(exampleNote, userId);
        insertedNoteId = insertedNote.id;
        // console.log(await Tag.getObjByNoteId(insertedNoteId));
    });

    it('should find note by exact tag match', async () => {
        // await setTimeout(() => {
        // }, 1000);
        const result = await idsByTagEq(testType, testValue, userId);
        console.log("result", result);
        assert.strictEqual(result[0], insertedNoteId);
    });

    it('should find note by tag condition', async () => {
        const operator = '=';
        const result = await idsByTagConditionSingle(testType, testValue, operator, userId);
        console.log("result", result);
        assert.strictEqual(result[0], insertedNoteId);
    });

    it('should retrieve notes by intersection', async () => {
        const conditions = [
            { type: testType, value: testValue, operator: '=' },
            { type: testType2, value: testValue2, operator: '=' },
        ];
        const result = await byIntersection(conditions, userId);
        console.log("result", result);
        for (const tag of result[0].tags) {
            console.log("tag", tag);
        }
        assert.strictEqual(result[0].id, insertedNoteId);
        assert.strictEqual(result[0].content, content);
        assert.strictEqual(result[0].tags[0].type, testType);
        assert.strictEqual(result[0].tags[0].value, testValue);
        assert.strictEqual(result[0].tags[1].type, testType2);
        assert.strictEqual(result[0].tags[1].value, testValue2);


    });

    it('should retrieve all notes', async () => {
        const result = await all(userId);
        // console.log("result", result);
        assert.strictEqual(result.length > 0, true);

    });

});
