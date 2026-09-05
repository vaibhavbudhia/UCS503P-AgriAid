// Owner: Lovish Bansal

const resourceModel = require('../models/resource.model');

async function listResources(req, res) {
  try {
    const { type } = req.query;
    if (type && !resourceModel.VALID_TYPES.includes(type)) {
      return res.status(400).json({ error: { code: 'BAD_TYPE', message: `type must be one of: ${resourceModel.VALID_TYPES.join(', ')}` } });
    }
    const resources = await resourceModel.list({ type });
    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to list resources' } });
  }
}

async function createResource(req, res) {
  try {
    const { type, description, usageCharge, latitude, longitude } = req.body;

    if (!type || !resourceModel.VALID_TYPES.includes(type)) {
      return res.status(400).json({ error: { code: 'BAD_TYPE', message: `type must be one of: ${resourceModel.VALID_TYPES.join(', ')}` } });
    }
    if (usageCharge === undefined || usageCharge === null || isNaN(usageCharge)) {
      return res.status(400).json({ error: { code: 'BAD_CHARGE', message: 'usageCharge is required and must be a number' } });
    }

    const resource = await resourceModel.create({
      providerId: req.user.id,
      type,
      description,
      usageCharge,
      latitude,
      longitude,
    });

    res.status(201).json(resource);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to create resource' } });
  }
}

module.exports = { listResources, createResource };