const fs = require("fs");
const chalk = require("kleur");
const { Client } = require("pg");

const runSQLFile = async (client, fn, directory) => {
    try {
        const sql = fs.readFileSync(`${directory}/${fn}`, 'utf8');
        console.log(`\t-> Running ${chalk.green(fn)}`);
        await client.query(sql);
    } catch (err) {
        console.log(`\t-> Error running ${chalk.red(fn)} - ${err}`);
    }
};

const runSQLDirectory = async (client, directory) => {
    console.log(chalk.cyan(`-> Loading ${directory} Files ...`));
    const filenames = fs.readdirSync(directory);

    for (const fn of filenames) {
        await runSQLFile(client, fn, directory);
    }
};

const runTask = async (client, dirArr, taskName = "") => {
    try {
        // await client.connect();
        // console.log(``);
        for (const element of dirArr) {
            await runSQLDirectory(client, element);
        }
        await client.end();
        console.log(chalk.green?.(`-> ${taskName} completed successfully.`));
        process.exit();
    } catch (err) {
        console.error(chalk.red?.(`${taskName} Failed due to error: ${err}`));
        process.exit(1);
    }
};

module.exports = {
    runTask: runTask,
};
