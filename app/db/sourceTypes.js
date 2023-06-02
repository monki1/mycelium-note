const client = require('./client');

// Get the ID of a source type
async function get(type) {
    try {
        const query = 'SELECT id FROM source_types WHERE name = $1';
        const values = [type];
        const result = await client.query(query, values);

        if (result.rows.length > 0) {
            return result.rows[0].id;
        } else {
            return await create(type);
        }
    } catch (error) {
        console.error('Error getting source type:', error);
        throw error;
    }
}

// Create a new source type and return its ID
async function create(type) {
    try {
        const query = 'INSERT INTO source_types (name) VALUES ($1) RETURNING id';
        const values = [type];
        const result = await client.query(query, values);
        return result.rows[0].id;
    } catch (error) {
        console.error('Error creating source type:', error);
        throw error;
    }
}

// Remove a source type by its ID
async function remove(id) {
    try {
        const query = 'DELETE FROM source_types WHERE id = $1';
        const values = [id];
        await client.query(query, values);
        console.log('Source type removed successfully');
    } catch (error) {
        console.error('Error removing source type:', error);
        throw error;
    }
}



module.exports = {
    get,
    remove,
};
