// Real DB queries for bookings, including conflict detection.
// Owner: Neha Bansal

const pool = require('../config/db');

async function hasConflict(resourceId, startTime, endTime, client = pool) {
  const result = await client.query(
    `SELECT id FROM bookings
     WHERE resource_id = $1
       AND status = 'accepted'
       AND start_time < $3
       AND end_time > $2
     LIMIT 1`,
    [resourceId, startTime, endTime]
  );
  return result.rows.length > 0;
}

async function create({ resourceId, farmerId, startTime, endTime, isGroupBooking }) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Lock existing accepted bookings for this resource to prevent race conditions
    await client.query(
      `SELECT id FROM bookings WHERE resource_id = $1 AND status = 'accepted' FOR UPDATE`,
      [resourceId]
    );

    const conflict = await hasConflict(resourceId, startTime, endTime, client);
    if (conflict) {
      await client.query('ROLLBACK');
      return { conflict: true };
    }

    const result = await client.query(
      `INSERT INTO bookings (resource_id, farmer_id, start_time, end_time, is_group_booking)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, resource_id, farmer_id, status, start_time, end_time, is_group_booking, created_at`,
      [resourceId, farmerId, startTime, endTime, !!isGroupBooking]
    );

    await client.query('COMMIT');
    return { conflict: false, booking: result.rows[0] };
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

async function findById(id) {
  const result = await pool.query(`SELECT * FROM bookings WHERE id = $1`, [id]);
  return result.rows[0] || null;
}

async function updateStatus(id, status) {
  const result = await pool.query(
    `UPDATE bookings SET status = $2 WHERE id = $1
     RETURNING id, resource_id, farmer_id, status, start_time, end_time, is_group_booking, created_at`,
    [id, status]
  );
  return result.rows[0] || null;
}

async function listForFarmer(farmerId) {
  const result = await pool.query(
    `SELECT b.*, r.type AS resource_type, r.description AS resource_description
     FROM bookings b
     JOIN resources r ON r.id = b.resource_id
     WHERE b.farmer_id = $1
     ORDER BY b.created_at DESC`,
    [farmerId]
  );
  return result.rows;
}

async function listForProvider(providerId) {
  const result = await pool.query(
    `SELECT b.*, r.type AS resource_type, u.name AS farmer_name
     FROM bookings b
     JOIN resources r ON r.id = b.resource_id
     JOIN users u ON u.id = b.farmer_id
     WHERE r.provider_id = $1
     ORDER BY b.created_at DESC`,
    [providerId]
  );
  return result.rows;
}

module.exports = { create, findById, updateStatus, listForFarmer, listForProvider, hasConflict };