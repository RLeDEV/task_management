const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();

var connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TABLE,
    port: process.env.DB_PORT,
    multipleStatements: true
});

module.exports = connection;