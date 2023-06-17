
require('dotenv').config();
const { Client } = require('pg');
const { runTask } = require('./runSQL.ts');
function createDatabaseClient(username=process.env.DB_USER, password=process.env.DB_PASS) {
    const connectionString = process.env.DATABASE_URL || `postgresql://${username}:${password}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    const client = new Client({
        connectionString: connectionString
    });
    client.connect();
    // console.log("Connecting to ${connectionString}");
    return client;
}

const runInitDB = async (client) => {
    await runTask(client, ['./psql/initialize', ], "Initialization")
}
const runResetDB = async (client) => {
    await runTask(client, ['./psql/drop','./psql/create', "./psql/seeds"], "Reset")
}
const runRemoveDB = async (client) => {
    await runTask(client, ['./psql/teardown'], "Remove")
}


// if no flag, run reset
runResetDB(createDatabaseClient()).then(r => process.exit(0)).catch(e => process.exit(1));

// const initFlag = process.argv.includes('--init');


