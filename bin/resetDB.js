require('dotenv').config();
const fs = require('fs');
const chalk = require('chalk');
const { Client } = require('pg');

// PG connection setup
const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const client = new Client({
    connectionString: connectionString
});

// Loads the schema files from db/schema
const runSchemaFiles = async () => {
    console.log(chalk.cyan(`-> Loading Schema Files ...`));
    const schemaFilenames = fs.readdirSync('./db/schema');

    for (const fn of schemaFilenames) {
        const sql = fs.readFileSync(`./db/schema/${fn}`, 'utf8');
        console.log(`\t-> Running ${chalk.green(fn)}`);
        await client.query(sql);
    }
};

const runSeedFiles = async () => {
    console.log(chalk.cyan(`-> Loading Seeds ...`));
    const seedFilenames = fs.readdirSync('./db/seeds');

    for (const fn of seedFilenames) {
        const sql = fs.readFileSync(`./db/seeds/${fn}`, 'utf8');
        console.log(`\t-> Running ${chalk.green(fn)}`);
        await client.query(sql);
    }
};

const runResetDB = async () => {
    try {
        await client.connect();
        console.log(`-> Connected to PostgreSQL on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

        await runSchemaFiles();
        await runSeedFiles();

        await client.end();
        console.log(chalk.green('-> Reset completed successfully.'));
        process.exit();
    } catch (err) {
        console.error(chalk.red(`Failed due to error: ${err}`));
        process.exit(1);
    }
};

runResetDB();
