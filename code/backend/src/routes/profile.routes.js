const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');
const { getProfile, updateFarmerProfile } = require('../controllers/profile.controller');

router.get('/', requireAuth, getProfile);
router.put('/farmer', requireAuth, updateFarmerProfile);

module.exports = router;