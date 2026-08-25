const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');
const { listResources, createResource } = require('../controllers/resources.controller');

router.get('/', listResources);
router.post('/', requireAuth, createResource);

module.exports = router;
