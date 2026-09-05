// Real profile lookup, protected by requireAuth.
// Owner: Neha Bansal

const userModel = require('../models/user.model');

async function getProfile(req, res) {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'user not found' } });
  }
  res.json(user);
}
async function updateFarmerProfile(req, res) {
  try {
    const { landSize, primaryCrop, region } = req.body;
    const profile = await userModel.upsertFarmerProfile(req.user.id, { landSize, primaryCrop, region });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to update farmer profile' } });
  }
}
module.exports = { getProfile, updateFarmerProfile };
