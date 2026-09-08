const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');
const { reportBreakdown } = require('../controllers/breakdown.controller');

router.post('/', requireAuth, reportBreakdown);

module.exports = router;
