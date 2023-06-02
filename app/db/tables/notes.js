/**
 * Creates a new note with the provided content.
 * @param {import('pg').Client} client - The PostgreSQL client instance.
 * @param {string} content - The content of the note.
 * @returns {number} The ID of the created note.
 * @throws {Error} If there is an error creating the note.
 */
async function create(client, content) {
    try {
        const query = 'INSERT INTO notes (content) VALUES ($1) RETURNING id';
        const params = [content];

        const result = await client.query(query, params);
        const createdNoteId = result.rows[0].id;

        return createdNoteId;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
}

/**
 * Removes a note with the specified ID.
 * @param {Client} client - The PostgreSQL client instance.
 * @param {number} noteId - The ID of the note to remove.
 * @throws {Error} If there is an error deleting the note.
 */
async function remove(client, noteId) {
    try {
        const query = 'DELETE FROM notes WHERE id = $1';
        const params = [noteId];

        await client.query(query, params);
        console.log(`Note with ID ${noteId} has been deleted.`);
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
}

/**
 * Updates the content of a note with the specified ID.
 * @param {Client} client - The PostgreSQL client instance.
 * @param {number} noteId - The ID of the note to update.
 * @param {string} newContent - The new content of the note.
 * @throws {Error} If there is an error updating the note.
 */

async function update(client, noteId, newContent) {
    try {
        const query = 'UPDATE notes SET content = $1 WHERE id = $2';
        const params = [newContent, noteId];

        const result = await client.query(query, params);
        console.log(`Note with ID ${noteId} has been updated.`);
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
}


/**
 * Retrieves a note with the specified ID.
 * @param {Client} client - The PostgreSQL client instance.
 * @param {number} noteId - The ID of the note to retrieve.
 * @returns {Object} The retrieved note.
 * @throws {Error} If there is an error retrieving the note.
 */
async function get(client, noteId) {
    try {
        const query = 'SELECT * FROM notes WHERE id = $1';
        const params = [noteId];

        const result = await client.query(query, params);
        const note = result.rows[0];

        return note;
    } catch (error) {
        console.error('Error retrieving note:', error);
        throw error;
    }
}


module.exports = { create, remove, get, update };
