const assert = require('assert');
const remove = require('../../../db/query/remove'); // Replace with the actual path to the remove function
const Note = require('../../../db/models/Note');
const {upsert} = require('../../../db/query/upsert');


describe('Remove', () => {
    let noteId;

    beforeEach(async () => {
        // Create a new note for testing
        const newNote = await upsert({content: 'Test note',
        tags: [{type: "sereefv", value: "dzsffg"}]}, 1)

        noteId = newNote.id;


    });

    it('should remove a note by ID', async () => {
        console.log((await Note.where({ id: noteId }).fetch()).tags().toJSON());
        console.log((await Note.where({ id: noteId }).fetch()).toJSON());
        await remove(noteId);
        let deleted = false;
        try {
        const deletedNote = await Note.where({ id: noteId }).fetch();
        } catch (e) {
            // console.log(e);
            deleted = true;
        }
        assert.strictEqual(deleted, true);
    });
});
