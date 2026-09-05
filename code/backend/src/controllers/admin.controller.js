// Owner: Neha Bansal

const schemeModel = require('../models/scheme.model');

async function manageSchemes(req, res) {
  try {
    if (req.method === 'GET') {
      const schemes = await schemeModel.listAll();
      return res.json(schemes);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to manage schemes' } });
  }
}

async function createScheme(req, res) {
  try {
    const { name, eligibilityRules, requiredDocuments } = req.body;

    if (!name || !eligibilityRules) {
      return res.status(400).json({ error: { code: 'MISSING_FIELDS', message: 'name and eligibilityRules are required' } });
    }

    const scheme = await schemeModel.create({
      name,
      eligibilityRules,
      requiredDocuments,
      createdBy: req.user.id,
    });

    res.status(201).json(scheme);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to create scheme' } });
  }
}

module.exports = { manageSchemes, createScheme };