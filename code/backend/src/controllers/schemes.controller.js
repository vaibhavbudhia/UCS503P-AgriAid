// Owner: Lovish Bansal

const schemeModel = require('../models/scheme.model');

async function getEligibleSchemes(req, res) {
  try {
    const schemes = await schemeModel.getEligibleForFarmer(req.user.id);
    res.json(schemes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to get eligible schemes' } });
  }
}

module.exports = { getEligibleSchemes };