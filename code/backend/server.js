const express = require('express');
const cors = require('cors');

const authRoutes = require('./src/routes/auth.routes');
const resourceRoutes = require('./src/routes/resources.routes');
const bookingRoutes = require('./src/routes/bookings.routes');
const breakdownRoutes = require('./src/routes/breakdown.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/breakdowns', breakdownRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`AgriAid backend on :${PORT}`));