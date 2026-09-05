// Owner: neha Bansal

const labourModel = require('../models/labour.model');

const VALID_WORK_TYPES = ['harvesting', 'sowing', 'weeding', 'spraying', 'irrigation', 'general'];

async function createLabourRequest(req, res) {
  try {
    const { workType, workersNeeded, workDate, durationDays, latitude, longitude } = req.body;

    if (!workType || !workersNeeded || !workDate || !durationDays) {
      return res.status(400).json({ error: { code: 'MISSING_FIELDS', message: 'workType, workersNeeded, workDate, and durationDays are required' } });
    }
    if (workersNeeded <= 0 || durationDays <= 0) {
      return res.status(400).json({ error: { code: 'BAD_VALUE', message: 'workersNeeded and durationDays must be positive numbers' } });
    }

    const request = await labourModel.create({
      farmerId: req.user.id,
      workType,
      workersNeeded,
      workDate,
      durationDays,
      latitude,
      longitude,
    });

    res.status(201).json(request);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to create labour request' } });
  }
}

async function matchNearbyWorkers(req, res) {
  try {
    const { lat, lng } = req.query;
    const latitude = lat ? parseFloat(lat) : null;
    const longitude = lng ? parseFloat(lng) : null;

    const requests = await labourModel.findNearby(latitude, longitude);
    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to fetch nearby labour requests' } });
  }
}

module.exports = { createLabourRequest, matchNearbyWorkers, VALID_WORK_TYPES };