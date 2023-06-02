/**
 * Creates a source associated with a note and returns its ID.
 * @param {import('pg').Client} client - The PostgreSQL client instance.
 * @param {number} sourceTypeId - The ID of the source type.
 * @param {string} value - The value of the source.
 * @param {number} noteId - The ID of the associated note.
 * @returns {number} The ID of the created source.
 * @throws {Error} If there is an error creating the source.
 */
async function create(client, sourceTypeId, value, noteId) {
    try {
        // Prepare the SQL query
        const query = 'INSERT INTO sources (note_id, source_type_id, value) VALUES ($1, $2, $3) RETURNING id';
        const values = [noteId, sourceTypeId, value];

        // Execute the query and retrieve the ID of the created source
        const result = await client.query(query, values);
        return result.rows[0].id;
    } catch (error) {
        // Log and re-throw any errors that occur during the creation process
        console.error('Error creating source:', error);
        throw error;
    }
}

/**
 * Removes a source based on the note ID, source type ID, and value.
 * @param {import('pg').Client} client - The PostgreSQL client instance.
 * @param {number} noteId - The ID of the associated note.
 * @param {number} typeId - The ID of the source type.
 * @param {string} value - The value of the source.
 * @throws {Error} If there is an error removing the source.
 */
async function remove(client, noteId, typeId, value) {
    try {
        // Prepare the SQL query to delete the source with the specified note ID, source type ID, and value
        const query =
            'DELETE FROM sources WHERE note_id = $1 AND source_type_id = $2 AND value = $3';
        const values = [noteId, typeId, value];

        // Execute the query to remove the source
        await client.query(query, values);

        console.log(`Source with note ID ${noteId}, type ID ${typeId}, and value ${value} has been removed.`);
    } catch (error) {
        console.error('Error removing source:', error);
        throw error;
    }
}



// Export the functions to make them accessible to other modules
module.exports = {
    create,
    remove,
};
