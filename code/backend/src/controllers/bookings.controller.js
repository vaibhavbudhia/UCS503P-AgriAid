// Owner: Lovish Bansal

const bookingModel = require('../models/booking.model');
const resourceModel = require('../models/resource.model');

async function createBooking(req, res) {
  try {
    const { resourceId, startTime, endTime, isGroupBooking } = req.body;

    if (!resourceId || !startTime || !endTime) {
      return res.status(400).json({ error: { code: 'MISSING_FIELDS', message: 'resourceId, startTime, and endTime are required' } });
    }
    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).json({ error: { code: 'BAD_RANGE', message: 'startTime must be before endTime' } });
    }

    const resource = await resourceModel.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'resource not found' } });
    }

    const result = await bookingModel.create({
      resourceId,
      farmerId: req.user.id,
      startTime,
      endTime,
      isGroupBooking,
    });

    if (result.conflict) {
      return res.status(409).json({ error: { code: 'BOOKING_CONFLICT', message: 'resource is already booked for an overlapping time window' } });
    }

    res.status(201).json(result.booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to create booking' } });
  }
}

async function updateBookingStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ error: { code: 'BAD_STATUS', message: 'status must be accepted, rejected, or completed' } });
    }

    const booking = await bookingModel.findById(id);
    if (!booking) {
      return res.status(404).json({ error: { code: 'NOT_FOUND', message: 'booking not found' } });
    }

    if (status === 'accepted') {
      const conflict = await bookingModel.hasConflict(booking.resource_id, booking.start_time, booking.end_time);
      if (conflict) {
        return res.status(409).json({ error: { code: 'BOOKING_CONFLICT', message: 'another booking already accepted for an overlapping window' } });
      }
    }

    const updated = await bookingModel.updateStatus(id, status);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to update booking' } });
  }
}

async function listMyBookings(req, res) {
  try {
    const bookings = req.user.role === 'provider'
      ? await bookingModel.listForProvider(req.user.id)
      : await bookingModel.listForFarmer(req.user.id);
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to list bookings' } });
  }
}

module.exports = { createBooking, updateBookingStatus, listMyBookings };