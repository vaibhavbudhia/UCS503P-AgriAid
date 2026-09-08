// Booking + conflict-detection logic. Not implemented — Phase 3.

async function createBooking(req, res) {
  // TODO: check for overlapping bookings on resource_id before inserting
  res.status(501).json({ error: 'not implemented' });
}

async function updateBookingStatus(req, res) {
  // TODO: provider accepts/rejects/reschedules a booking by id
  res.status(501).json({ error: 'not implemented' });
}

module.exports = { createBooking, updateBookingStatus };
