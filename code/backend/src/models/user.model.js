// Real query functions backing the users table.
// Owner: Neha Bansal 

const db = require('../config/db');

async function findByPhone(phone) {
  const { rows } = await db.query('SELECT * FROM users WHERE phone = $1', [phone]);
  return rows[0] || null;
}

async function findById(id) {
  const { rows } = await db.query('SELECT id, name, phone, email, role, region, created_at FROM users WHERE id = $1', [id]);
  return rows[0] || null;
}

async function create({ name, phone, email, passwordHash, role, region }) {
  const { rows } = await db.query(
    `INSERT INTO users (name, phone, email, password_hash, role, region)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, phone, role, region, created_at`,
    [name, phone, email || null, passwordHash, role, region || null]
  );
  return rows[0];
}
async function upsertFarmerProfile(userId, { landSize, primaryCrop, region }) {
  const { rows } = await db.query(
    `INSERT INTO farmer_profiles (user_id, land_size, primary_crop, region)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id) DO UPDATE
     SET land_size = EXCLUDED.land_size,
         primary_crop = EXCLUDED.primary_crop,
         region = EXCLUDED.region
     RETURNING user_id, land_size, primary_crop, region`,
    [userId, landSize || null, primaryCrop || null, region || null]
  );
  return rows[0];
}

module.exports = { findByPhone, findById, create, upsertFarmerProfile };