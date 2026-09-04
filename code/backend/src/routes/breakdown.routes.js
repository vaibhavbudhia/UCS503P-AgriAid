const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');
const { reportBreakdown, listMyReports } = require('../controllers/breakdown.controller');

router.get('/', requireAuth, listMyReports);
router.post('/', requireAuth, reportBreakdown);

module.exports = router;