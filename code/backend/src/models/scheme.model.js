// Real DB queries for schemes and eligibility matching.
// Owner: Neha Bansal

const pool = require('../config/db');

async function listAll() {
  const result = await pool.query(`SELECT * FROM schemes`);
  return result.rows;
}

// Simple rule matching against a farmer's profile.
// eligibility_rules JSONB shape expected: { minLandSize, maxLandSize, crops: [], regions: [] }
function matchesEligibility(rules, profile) {
  if (!rules) return true;
  if (rules.minLandSize != null && (!profile.land_size || profile.land_size < rules.minLandSize)) return false;
  if (rules.maxLandSize != null && (!profile.land_size || profile.land_size > rules.maxLandSize)) return false;
  if (rules.crops && rules.crops.length && !rules.crops.includes(profile.primary_crop)) return false;
  if (rules.regions && rules.regions.length && !rules.regions.includes(profile.region)) return false;
  return true;
}

async function getFarmerProfile(farmerId) {
  const result = await pool.query(
    `SELECT fp.land_size, fp.primary_crop, fp.region
     FROM farmer_profiles fp WHERE fp.user_id = $1`,
    [farmerId]
  );
  return result.rows[0] || { land_size: null, primary_crop: null, region: null };
}

async function getEligibleForFarmer(farmerId) {
  const [schemes, profile] = await Promise.all([listAll(), getFarmerProfile(farmerId)]);
  return schemes.filter((s) => matchesEligibility(s.eligibility_rules, profile));
}

module.exports = { listAll, getEligibleForFarmer, matchesEligibility, getFarmerProfile };