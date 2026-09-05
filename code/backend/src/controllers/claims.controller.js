// Owner: Lovish Bansal

const claimModel = require('../models/claim.model');

async function createClaim(req, res) {
  try {
    const { crop, incidentDate, latitude, longitude, damageDescription } = req.body;

    if (!crop || !incidentDate) {
      return res.status(400).json({ error: { code: 'MISSING_FIELDS', message: 'crop and incidentDate are required' } });
    }

    const claim = await claimModel.create({
      farmerId: req.user.id,
      crop,
      incidentDate,
      latitude,
      longitude,
      damageDescription,
    });

    res.status(201).json(claim);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to create claim' } });
  }
}

async function uploadClaimDocument(req, res) {
  try {
    const { id } = req.params;
    const { fileUrl } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ error: { code: 'MISSING_FIELDS', message: 'fileUrl is required' } });
    }

    const claim = await claimModel.findById(id);
    if (!claim) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'claim not found' } });
    }
    if (claim.farmer_id !== req.user.id) {
      return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'not your claim' } });
    }

    const doc = await claimModel.addDocument(id, fileUrl);
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to upload document' } });
  }
}

module.exports = { createClaim, uploadClaimDocument };