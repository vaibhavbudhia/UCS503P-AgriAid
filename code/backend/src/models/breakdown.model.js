// Real DB queries for breakdown reports and nearby-mechanic matching.
// Owner: Neha Bansal

const pool = require('../config/db');

async function create({ farmerId, equipmentType, description, latitude, longitude }) {
  const result = await pool.query(
    `INSERT INTO breakdown_reports (farmer_id, equipment_type, description, latitude, longitude)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, farmer_id, equipment_type, description, latitude, longitude, status, created_at`,
    [farmerId, equipmentType, description || null, latitude || null, longitude || null]
  );
  return result.rows[0];
}

// Simple straight-line distance in km using the haversine formula.
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

async function findNearbyMechanics(latitude, longitude, maxKm = 50) {
  const result = await pool.query(
    `SELECT r.id, r.description, r.usage_charge, r.latitude, r.longitude,
            u.name AS provider_name, u.region AS provider_region
     FROM resources r
     JOIN users u ON u.id = r.provider_id
     WHERE r.type = 'service' AND r.latitude IS NOT NULL AND r.longitude IS NOT NULL`
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

async function listForFarmer(farmerId) {
  const result = await pool.query(
    `SELECT * FROM breakdown_reports WHERE farmer_id = $1 ORDER BY created_at DESC`,
    [farmerId]
  );
  return result.rows;
}

module.exports = { create, findNearbyMechanics, listForFarmer };