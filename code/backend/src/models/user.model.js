// users table: create/find helpers used by the auth controller.
// id, name, phone, email, password_hash, role ('farmer'|'provider'|'admin'), region, created_at
const db = require('../config/db');

const PUBLIC_COLUMNS = 'id, name, phone, email, role, region, created_at';

async function create({ name, phone, email, passwordHash, role, region }) {
  const { rows } = await db.query(
    `INSERT INTO users (name, phone, email, password_hash, role, region)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING ${PUBLIC_COLUMNS}`,
    [name, phone, email || null, passwordHash, role || 'farmer', region || null]
  );
  return rows[0];
}

async function findByPhone(phone) {
  const { rows } = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);
  return rows[0] || null;
}

async function findById(id) {
  const { rows } = await db.query(`SELECT ${PUBLIC_COLUMNS} FROM users WHERE id = $1`, [id]);
  return rows[0] || null;
}

module.exports = { create, findByPhone, findById };
