const express = require('express');
const router = express.Router();
const { register, login, profile } = require('../controllers/auth.controller');
const { requireAuth } = require('../middleware/auth.middleware');
const catchAsync = require('../middleware/catchAsync');

router.post('/register', catchAsync(register));
router.post('/login', catchAsync(login));
router.get('/profile', requireAuth, catchAsync(profile));

module.exports = router;
