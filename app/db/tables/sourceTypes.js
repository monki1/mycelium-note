/**
 * Retrieves the ID of a source type. If the source type doesn't exist, creates a new one and returns its ID.
 * @param {import('pg').Client} client - The PostgreSQL client instance.
 * @param {string} type - The name of the source type.
 * @returns {number} The ID of the retrieved or created source type.
 * @throws {Error} If there is an error getting or creating the source type.
 */
async function get(client, type) {
    try {
        const query = 'SELECT id FROM source_types WHERE name = $1';
        const values = [type];
        const result = await client.query(query, values);

        if (result.rows.length > 0) {
            return result.rows[0].id;
        } else {
            return await create(client, type);
        }
    } catch (error) {
        console.error('Error getting source type:', error);
        throw error;
    }
}

/**
 * Creates a new source type and returns its ID.
 * @param {import('pg').Client} client - The PostgreSQL client instance.
 * @param {string} type - The name of the source type.
 * @returns {number} The ID of the created source type.
 * @throws {Error} If there is an error creating the source type.
 */
async function create(client, type) {
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

/**
 * Removes a source type by its name if it is not referenced in any source.
 * @param {import('pg').Client} client - The PostgreSQL client instance.
 * @param {string} type - The name of the source type to remove.
 * @throws {Error} If there is an error removing the source type or if it is referenced in a source.
 */
async function remove(client, type) {
    try {
        const checkQuery = 'SELECT COUNT(*) FROM sources WHERE source_type_id = (SELECT id FROM source_types WHERE name = $1)';
        const checkValues = [type];
        const checkResult = await client.query(checkQuery, checkValues);
        const sourceCount = parseInt(checkResult.rows[0].count, 10);

        if (sourceCount > 0) {
            throw new Error('Source type is referenced in one or more sources and cannot be removed.');
        }

        const removeQuery = 'DELETE FROM source_types WHERE name = $1';
        const removeValues = [type];
        await client.query(removeQuery, removeValues);

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
