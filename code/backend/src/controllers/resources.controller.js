<<<<<<< HEAD
// Resource listing/discovery logic. Not implemented — Phase 3.
=======
// Owner: Neha Bansal

const resourceModel = require('../models/resource.model');
>>>>>>> origin/frontend

async function listResources(req, res) {
  // TODO: query resources table, filter by type/location/availability from req.query
  res.status(501).json({ error: 'not implemented' });
}

async function createResource(req, res) {
  // TODO: insert into resources table using req.user.id as provider_id
  res.status(501).json({ error: 'not implemented' });
}

module.exports = { listResources, createResource };
