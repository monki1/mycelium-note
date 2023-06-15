require('dotenv').config();
const fs = require('fs');
const chalk = require('kleur');
const { Client } = require('pg');
// const chalk = require("chalk");
// import chalk from 'chalk';

// PG connection setup
const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const client = new Client({
    connectionString: connectionString
});

// Loads the drop files from psql/drop directory
const runDropFiles = async () => {
    console.log(chalk.cyan(`-> Loading Drop Files ...`));
    const dropFilenames = fs.readdirSync('./psql/drop');

    for (const fn of dropFilenames) {
        try {
            const sql = fs.readFileSync(`./psql/drop/${fn}`, 'utf8');
            console.log(`\t-> Running ${chalk.green(fn)}`);
            await client.query(sql);
        } catch (err) {
            console.log(`\t-> Error running ${chalk.red(fn)} - ${err}`);
        }
    }
};

// Loads the create files from psql/create directory
const runCreateFiles = async () => {
    console.log(chalk.cyan(`-> Loading Create Files ...`));
    const createFilenames = fs.readdirSync('./psql/create');

    for (const fn of createFilenames) {
        try {
            const sql = fs.readFileSync(`./psql/create/${fn}`, 'utf8');
            console.log(`\t-> Running ${chalk.green(fn)}`);
            await client.query(sql);
        } catch (err) {
            console.log(`\t-> Error running ${chalk.red(fn)} - ${err}`);
        }
    }
};

const runSeedFile = async () => {
    console.log(chalk.cyan(`-> Loading Seeds ...`));
    const seedFile = fs.readFileSync('./psql/seeds.sql', 'utf8');

    console.log(`\t-> Running ${chalk.green('seeds.sql')}`);
    await client.query(seedFile);
};

const runResetDB = async () => {
    try {
        await client.connect();
        console.log(`-> Connected to PostgreSQL on ${process.env.DB_HOST} as ${process.env.DB_USER}...`);

        await runDropFiles();
        await runCreateFiles();
        await runSeedFile();

        await client.end();
        console.log(chalk.green('-> Reset completed successfully.'));
        process.exit();
    } catch (err) {
        console.error(chalk.red(`Failed due to error: ${err}`));
        process.exit(1);
    }
};

runResetDB();
