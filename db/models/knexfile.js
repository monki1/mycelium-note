require('dotenv').config();

const knexConfig = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            ssl: process.env.DB_SSL === 'true' ? true : false,
        },
    },
};

const knex = require('knex')(knexConfig.development);
const bookshelf = require('bookshelf')(knex);

module.exports = { bookshelf };