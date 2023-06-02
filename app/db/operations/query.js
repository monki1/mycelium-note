/**
 * Retrieves notes based on the specified source conditions.
 * @param {import('pg').Client} client - The PostgreSQL client instance.
 * @param {Array} conditions - An array of conditions to filter the notes.
 * Each condition object should have the following properties:
 * - sourceTypeName: The name of the source type.
 * - sourceValue: The value of the source.
 * - operator: The comparison operator for the source value (e.g., '=', '>', '<').
 * @returns {Array} An array of retrieved notes that match the source conditions.
 * @throws {Error} If there is an error retrieving the notes.
 *
 * @example
 * const conditions = [
 *   { sourceTypeName: 'Type1', sourceValue: 'Value1', operator: '=' },
 *   { sourceTypeName: 'Type2', sourceValue: 'Value2', operator: '>' },
 * ];
 * const notes = await query(client, conditions);
 * console.log(notes);
 */
async function query(client, conditions) {
    try {
        // Build the SQL query based on the conditions
        let query = `
      SELECT notes.*
      FROM notes
      JOIN sources ON notes.id = sources.note_id
      JOIN source_types ON sources.source_type_id = source_types.id
      WHERE `;
        const params = [];
        conditions.forEach((condition, index) => {
            const { sourceTypeName, sourceValue, operator } = condition;
            const paramName = `param_${index}`;
            query += `source_types.name = $${paramName} AND sources.value ${operator} $${paramName}`;
            params.push(sourceTypeName, sourceValue);
            if (index < conditions.length - 1) {
                query += ' AND ';
            }
        });

        // Execute the query
        const result = await client.query(query, params);

        // Return the retrieved notes
        return result.rows;
    } catch (error) {
        console.error('Error retrieving notes:', error);
        throw error;
    }
}

module.exports = query;
