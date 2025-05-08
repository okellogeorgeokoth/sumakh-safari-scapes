// config/db.js
require('dotenv').config();

const { Pool } = require('pg');

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'safari_bookings',
  max: 20, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // how long to try connecting before timing out
};

// Create a new PostgreSQL pool
const pool = new Pool(dbConfig);

// Test the database connection
(async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL database');
    client.release();
  } catch (err) {
    console.error('Error connecting to PostgreSQL database:', err);
    process.exit(1); // Exit the process if database connection fails
  }
})();

// Log connection events
pool.on('connect', () => {
  console.log('New client connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Export the pool for use in models
module.exports = {
  query: (text, params) => {
    const start = Date.now();
    return pool.query(text, params)
      .then((res) => {
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
      })
      .catch((err) => {
        console.error('Error executing query', { text });
        throw err;
      });
  },
  getClient: () => {
    return pool.connect();
  },
  // For migrations and testing
  end: () => {
    return pool.end();
  }
};