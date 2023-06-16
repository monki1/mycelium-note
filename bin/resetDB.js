require('dotenv').config();
const fs = require('fs');
const chalk = require('kleur');
const { Client } = require('pg');

const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASS;


const psqlDirectory = './psql/';
const dropTables = process.argv.includes('--drop');
const createTables = process.argv.includes('--create-tables');
const createUser = process.argv.includes('--create-user');
//TODO ^ check if create user is needed, should ask for superuser and password
// connection string should be ^
// based on input { -U user -P password }
// add file paths to filePaths array, loop through with runSQLFile


// PG connection setup
//
const connectionString = process.env.DATABASE_URL || `postgresql://${USER}:${PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const client = new Client({
    connectionString: connectionString
});
const runSQLFile = async (fn, directory) => {
        try {
            const sql = fs.readFileSync(`${directory}/${fn}`, 'utf8');
            console.log(`\t-> Running ${chalk.green(fn)}`);
            await client.query(sql);
        } catch (err) {
            console.log(`\t-> Error running ${chalk.red(fn)} - ${err}`);
        }
};
// Function to run SQL files from a directory
const runSQLFilesFromDirectory = async (directory) => {
    console.log(chalk.cyan(`-> Loading ${directory} Files ...`));
    const filenames = fs.readdirSync(directory);

    for (const fn of filenames) {
        await runSQLFile(fn, directory);
    }
};

// Function to reset the database
const runResetDB = async () => {
    try {
        await client.connect();
        console.log(`-> Connected to PostgreSQL on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

        await runSQLFilesFromDirectory('./psql/drop');
        await runSQLFilesFromDirectory('./psql/create');
        await runSQLFilesFromDirectory('./psql/seeds');
        await client.end();
        console.log(chalk.green('-> Reset completed successfully.'));
        process.exit();
    } catch (err) {
        console.error(chalk.red(`Failed due to error: ${err}`));
        process.exit(1);
    }
};

runResetDB();
