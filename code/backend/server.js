// Entry point. Auth + DB are real (Phase 2 / Foundation); every other
// module still responds with 501 Not Implemented until its phase lands.
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/auth.routes');
const resourceRoutes = require('./src/routes/resources.routes');
const bookingRoutes = require('./src/routes/bookings.routes');
const breakdownRoutes = require('./src/routes/breakdown.routes');
const labourRoutes = require('./src/routes/labour.routes');
const ledgerRoutes = require('./src/routes/ledger.routes');
const schemeRoutes = require('./src/routes/schemes.routes');
const claimRoutes = require('./src/routes/claims.routes');
const adminRoutes = require('./src/routes/admin.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/breakdowns', breakdownRoutes);
app.use('/api/labour-requests', labourRoutes);
app.use('/api/ledger', ledgerRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/admin', adminRoutes);

// Catches errors forwarded by catchAsync() so a failed query returns
// JSON instead of crashing the process.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'internal server error' });
});

const PORT = process.env.PORT || 4000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`AgriAid backend on :${PORT}`));
}

module.exports = app;
