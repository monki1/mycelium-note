const client = require('../../../app/db/client'); // Create a PostgreSQL client instance

const notes = require('../../../app/db/tables/tables').notes;

async function runNotesTests() {
    try {

        // Test the notes functionality
        const createdNoteId = await notes.create(client, 'Sample Note');
        console.log('Created Note ID:', createdNoteId);

        const retrievedNote = await notes.get(client, createdNoteId);
        console.log('Retrieved Note:', retrievedNote);

        await notes.update(client, createdNoteId, 'Updated Note');
        console.log('Note updated');

        const updatedNote = await notes.get(client, createdNoteId);
        console.log('Updated Note:', updatedNote);

        await notes.remove(client, createdNoteId);
        console.log('Note removed successfully');
    } catch (error) {
        console.error('Error running notes tests:', error);
    } finally {
        // await client.end(); // Close the PostgreSQL client connection
    }
}

async function runTests() {
    await runNotesTests();
}

runTests();


