

const client = require('../../../app/db/client'); // Create a PostgreSQL client instance
const sources = require('../../../app/db/tables/sources')

async function runSourcesTests() {
    try {
        // Test the sources functionality
        const createdSourceId = await sources.create(client, 1, 'Sample Value', 1);
        console.log('Created Source ID:', createdSourceId);

        await sources.remove(client, 1, 1, 'Sample Value');
        console.log('Source removed successfully');
        const createdSourceId2 = await sources.create(client, 1, 'Sample Value', 1);
        console.log('Created Source ID:', createdSourceId2);
        await sources.removeID(client, createdSourceId2);
        console.log('Source removed by ID successfully');
    } catch (error) {
        console.error('Error running sources tests:', error);
    } finally {
        // await client.end(); // Close the PostgreSQL client connection
    }
}

async function runTests() {
    await runSourcesTests();
}

runTests();
