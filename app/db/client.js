const { Client } = require('pg');

// Database connection configuration
const connectionConfig = {
    user: 'mycelium',
    password: 'mycelium',
    database: 'mycelium',
    host: 'localhost',
    port: 5432, // Change the port if necessary
};

// Create a new PostgreSQL client instance
const client = new Client(connectionConfig);

// Connect to the database
client.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Connected to the database!');
        // You can start executing queries here
    }
});

module.exports = client;