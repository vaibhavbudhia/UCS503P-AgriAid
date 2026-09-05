// Real DB queries for labour requests.
// Owner: Neha Bansal

const pool = require('../config/db');

async function create({ farmerId, workType, workersNeeded, workDate, durationDays, latitude, longitude }) {
  const result = await pool.query(
    `INSERT INTO labour_requests (farmer_id, work_type, workers_needed, work_date, duration_days, latitude, longitude)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, farmer_id, work_type, workers_needed, work_date, duration_days, latitude, longitude, status`,
    [farmerId, workType, workersNeeded, workDate, durationDays, latitude || null, longitude || null]
  );
  return result.rows[0];
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function findNearby(latitude, longitude, maxKm = 50) {
  const result = await pool.query(
    `SELECT lr.*, u.name AS farmer_name, u.region AS farmer_region
     FROM labour_requests lr
     JOIN users u ON u.id = lr.farmer_id
     WHERE lr.status = 'open' AND lr.latitude IS NOT NULL AND lr.longitude IS NOT NULL
     ORDER BY lr.work_date ASC`
  );

  if (latitude == null || longitude == null) {
    return result.rows;
  }

  return result.rows
    .map((row) => ({
      ...row,
      distance_km: Math.round(distanceKm(latitude, longitude, row.latitude, row.longitude) * 10) / 10,
    }))
    .filter((row) => row.distance_km <= maxKm)
    .sort((a, b) => a.distance_km - b.distance_km);
}

async function findById(id) {
  const result = await pool.query(`SELECT * FROM labour_requests WHERE id = $1`, [id]);
  return result.rows[0] || null;
}

async function updateStatus(id, status) {
  const result = await pool.query(
    `UPDATE labour_requests SET status = $2 WHERE id = $1 RETURNING *`,
    [id, status]
  );
  return result.rows[0] || null;
}

module.exports = { create, findNearby, findById, updateStatus };