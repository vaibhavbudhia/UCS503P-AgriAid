const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');
const { requireAdmin } = require('../middleware/requireAdmin');
const { manageSchemes, createScheme } = require('../controllers/admin.controller');

router.use(requireAuth);
router.use(requireAdmin);

router.get('/schemes', manageSchemes);
router.post('/schemes', createScheme);

module.exports = router;