// Real DB queries for farm ledger entries.
// Owner: Neha Bansal

const pool = require('../config/db');

const VALID_CATEGORIES = ['seeds', 'fertilizer', 'labour', 'fuel', 'machinery', 'transport', 'produce_sale'];

async function create({ farmerId, entryType, category, amount, cropCycle, entryDate }) {
  const result = await pool.query(
    `INSERT INTO ledger_entries (farmer_id, entry_type, category, amount, crop_cycle, entry_date)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, farmer_id, entry_type, category, amount, crop_cycle, entry_date`,
    [farmerId, entryType, category, amount, cropCycle || null, entryDate]
  );
  return result.rows[0];
}

async function getSummary(farmerId, cropCycle) {
  const params = [farmerId];
  let query = `
    SELECT entry_type, COALESCE(SUM(amount), 0) AS total
    FROM ledger_entries
    WHERE farmer_id = $1
  `;
  if (cropCycle) {
    params.push(cropCycle);
    query += ` AND crop_cycle = $2`;
  }
  query += ` GROUP BY entry_type`;

  const result = await pool.query(query, params);

  const summary = { expense: 0, revenue: 0 };
  result.rows.forEach((row) => {
    summary[row.entry_type] = parseFloat(row.total);
  });
  summary.net = summary.revenue - summary.expense;
  return summary;
}

async function listEntries(farmerId, cropCycle) {
  const params = [farmerId];
  let query = `SELECT * FROM ledger_entries WHERE farmer_id = $1`;
  if (cropCycle) {
    params.push(cropCycle);
    query += ` AND crop_cycle = $2`;
  }
  query += ` ORDER BY entry_date DESC`;

  const result = await pool.query(query, params);
  return result.rows;
}

module.exports = { create, getSummary, listEntries, VALID_CATEGORIES };