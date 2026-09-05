// Real DB queries for insurance claims and documents.
// Owner: Neha Bansal

const pool = require('../config/db');

async function create({ farmerId, crop, incidentDate, latitude, longitude, damageDescription }) {
  const result = await pool.query(
    `INSERT INTO insurance_claims (farmer_id, crop, incident_date, latitude, longitude, damage_description)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, farmer_id, crop, incident_date, latitude, longitude, damage_description, status`,
    [farmerId, crop, incidentDate, latitude || null, longitude || null, damageDescription || null]
  );
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(`SELECT * FROM insurance_claims WHERE id = $1`, [id]);
  return result.rows[0] || null;
}

async function addDocument(claimId, fileUrl) {
  const result = await pool.query(
    `INSERT INTO claim_documents (claim_id, file_url) VALUES ($1, $2)
     RETURNING id, claim_id, file_url, uploaded_at`,
    [claimId, fileUrl]
  );
  return result.rows[0];
}

async function updateStatus(id, status) {
  const result = await pool.query(
    `UPDATE insurance_claims SET status = $2 WHERE id = $1 RETURNING *`,
    [id, status]
  );
  return result.rows[0] || null;
}

module.exports = { create, findById, addDocument, updateStatus };