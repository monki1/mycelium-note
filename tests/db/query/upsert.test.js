const { insert, update } = require('../../../db/query/upsert');
const assert = require('assert');
const Tag = require('../../../db/models/Tag');
const Note = require('../../../db/models/Note');

const content = Date.now().toString();
const userId = 1;
let insertedNoteId;

const exampleNote = {
    content: content,
    tags: [
        { type: 'tag2', value: 'value2' },
    ],
};

describe('Insert', () => {
    it('should insert a new item in notes table', async () => {
        const insertedNote = await insert(exampleNote, userId);
        insertedNoteId = insertedNote.id;

        assert.strictEqual(insertedNote.content, content);
        assert.strictEqual(insertedNote.user_id, userId);
    });

    it('should insert a new item in tags table', async () => {
        const tags = await Tag.getObjByNoteId(insertedNoteId);

        assert.strictEqual(tags[0].value, exampleNote.tags[0].value);
        assert.strictEqual(tags[0].type, exampleNote.tags[0].type);
    });
});

describe('Update', () => {
    beforeEach(async () => {
        // Create a new note for testing
        const insertedNote = await insert(exampleNote, userId);
        insertedNoteId = insertedNote.id;
    });

    // afterEach(async () => {
    //     // Clean up the test data
    //     await Note.where({ id: insertedNoteId }).destroy();
    // });

    it('should update the note content and handle tags', async () => {
        const updatedNote = {
            content: 'Updated content',
            tags: [
                { type: 'Tag 2', value: 'Value 2' },
                { type: 'Tag 3', value: 'Value 3' },
            ],
        };

        const result = await update(updatedNote, userId, insertedNoteId);

        assert.strictEqual(result.content, updatedNote.content);

        const tags = await Tag.getObjByNoteId(insertedNoteId);
        assert.strictEqual(tags.length, updatedNote.tags.length);
        for (let i = 0; i < tags.length; i++) {
            assert.strictEqual(tags[i].type, updatedNote.tags[i].type);
            assert.strictEqual(tags[i].value, updatedNote.tags[i].value);
        }

    });
});
