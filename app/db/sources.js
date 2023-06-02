const client = require('./client');

// Create a source associated with a note and return its ID
async function create(sourceTypeId, value, noteId) {
    try {
        const query =
            'INSERT INTO sources (note_id, source_type_id, value) VALUES ($1, $2, $3) RETURNING id';
        const values = [noteId, sourceTypeId, value];
        const result = await client.query(query, values);
        return result.rows[0].id;
    } catch (error) {
        console.error('Error creating source:', error);
        throw error;
    }
}

// Remove a source by its ID
async function remove(id) {
    try {
        const query = 'DELETE FROM sources WHERE id = $1';
        const values = [id];
        await client.query(query, values);
        console.log('Source removed successfully');
    } catch (error) {
        console.error('Error removing source:', error);
        throw error;
    }
}

// Query sources based on type, value, and noteID
async function query(typeID = null, valueCondition = null, noteID = null) {
    try {
        let query = 'SELECT * FROM sources'; // Base query to select all columns from the sources table
        const values = []; // Array to store the query parameter values
        let paramIndex = 1; // Index to track parameter positions in the query

        if (typeID !== null) {
            query += ` WHERE source_type_id = $${paramIndex}`; // Add a WHERE clause to filter sources by source_type_id
            values.push(typeID); // Add the typeID value to the parameter values array
            paramIndex++; // Increment the parameter index
        }

        if (valueCondition !== null) {
            query += ' AND value ' + valueCondition; // Add the valueCondition to the WHERE clause
        }

        if (noteID !== null) {
            query += ` AND note_id = $${paramIndex}`; // Add an additional condition to filter sources by note_id
            values.push(noteID); // Add the noteID value to the parameter values array
        }

        const result = await client.query(query, values); // Execute the query with the parameter values
        return result.rows; // Return the rows from the query result
    } catch (error) {
        console.error('Error querying sources:', error);
        throw error;
    }
}


module.exports = {
    create,
    remove,
    query,
};
