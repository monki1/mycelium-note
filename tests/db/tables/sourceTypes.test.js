const { Client } = require('pg');

const client = require('../../../app/db/client'); // Create a PostgreSQL client instance
const sourceTypes = require('../../../app/db/tables/tables').sourceTypes;

async function runSourceTypesTests() {
    try {
        // Test the source types functionality
        const existingTypeId = await sourceTypes.get(client, 'Existing Type');
        console.log('Existing Type ID:', existingTypeId);

        const newTypeId = await sourceTypes.get(client, 'New Type');
        console.log('New Type ID:', newTypeId);

        await sourceTypes.remove(client, 'Existing Type');
        console.log('Existing Type removed successfully');

        await sourceTypes.remove(client, 'New Type');
        console.log('New Type removed successfully');

        await sourceTypes.remove(client, 'Created Type');
        console.log('Created Type removed successfully');
    } catch (error) {
        console.error('Error running source types tests:', error);
    } finally {
        // await client.end(); // Close the PostgreSQL client connection
    }
}

async function runTests() {
    await runSourceTypesTests();
}

runTests();
