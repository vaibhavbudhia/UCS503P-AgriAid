// Tiny migration runner: applies any .sql file in this folder that hasn't
// already run, in filename order, tracked in a schema_migrations table.
// No framework — deliberately simple so it's easy to read end to end.
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

async function migrate() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename    TEXT PRIMARY KEY,
      applied_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  const dir = __dirname;
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  const { rows } = await pool.query('SELECT filename FROM schema_migrations');
  const applied = new Set(rows.map((r) => r.filename));

  let ran = 0;
  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file]);
      await client.query('COMMIT');
      console.log(`applied ${file}`);
      ran += 1;
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`failed on ${file}:`, err.message);
      await pool.end();
      process.exit(1);
    } finally {
      client.release();
    }
  }

  console.log(ran === 0 ? 'nothing to do, already up to date' : `${ran} migration(s) applied`);
  await pool.end();
}

migrate();
