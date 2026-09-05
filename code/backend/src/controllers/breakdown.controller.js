// Owner: Lovish Bansal

const breakdownModel = require('../models/breakdown.model');

async function reportBreakdown(req, res) {
  try {
    const { equipmentType, description, latitude, longitude } = req.body;

    if (!equipmentType) {
      return res.status(400).json({ error: { code: 'MISSING_FIELDS', message: 'equipmentType is required' } });
    }

    const report = await breakdownModel.create({
      farmerId: req.user.id,
      equipmentType,
      description,
      latitude,
      longitude,
    });

    const mechanics = await breakdownModel.findNearbyMechanics(latitude, longitude);

    res.status(201).json({ report, nearbyMechanics: mechanics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to report breakdown' } });
  }
}

async function listMyReports(req, res) {
  try {
    const reports = await breakdownModel.listForFarmer(req.user.id);
    res.json(reports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to list reports' } });
  }
}

module.exports = { reportBreakdown, listMyReports };