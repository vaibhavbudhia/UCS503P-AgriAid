// PostgreSQL connection pool. Controllers/models import this and call
// `db.query(sql, params)` -- never talk to `pg` directly elsewhere.
require('dotenv').config();
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
  console.warn('DATABASE_URL is not set -- see .env.example');
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
