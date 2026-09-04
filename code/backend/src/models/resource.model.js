// Real DB queries for resources.
// Owner: Neha Bansal

const pool = require('../config/db');

const VALID_TYPES = ['tractor', 'harvester', 'pump', 'rotavator', 'trailer', 'service'];

async function create({ providerId, type, description, usageCharge, latitude, longitude }) {
  const result = await pool.query(
    `INSERT INTO resources (provider_id, type, description, usage_charge, latitude, longitude)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, provider_id, type, description, usage_charge, latitude, longitude, created_at`,
    [providerId, type, description || null, usageCharge, latitude || null, longitude || null]
  );
  return result.rows[0];
}

async function list({ type } = {}) {
  const params = [];
  let query = `
    SELECT r.id, r.type, r.description, r.usage_charge, r.latitude, r.longitude, r.created_at,
           u.id AS provider_id, u.name AS provider_name, u.region AS provider_region
    FROM resources r
    JOIN users u ON u.id = r.provider_id
  `;
  if (type) {
    params.push(type);
    query += ` WHERE r.type = $1`;
  }
  query += ` ORDER BY r.created_at DESC`;

  const result = await pool.query(query, params);
  return result.rows;
}

async function findById(id) {
  const result = await pool.query(
    `SELECT r.*, u.name AS provider_name FROM resources r
     JOIN users u ON u.id = r.provider_id
     WHERE r.id = $1`,
    [id]
  );
  return result.rows[0] || null;
}

module.exports = { create, list, findById, VALID_TYPES };
