const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');
const { createBooking, updateBookingStatus } = require('../controllers/bookings.controller');

router.post('/', requireAuth, createBooking);
router.patch('/:id', requireAuth, updateBookingStatus);

module.exports = router;
