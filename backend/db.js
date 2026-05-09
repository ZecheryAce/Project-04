// Load environment variables
require("dotenv").config();

// Import mysql2
const mysql = require("mysql2");

// Create connection pool using .env values
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Convert to promise-based so we can use async/await
const promisePool = pool.promise();

module.exports = promisePool;
