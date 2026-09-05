// Restricts a route to users with role === 'admin'. Must run after requireAuth.
// Owner: Neha Bansal

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'admin access required' } });
  }
  next();
}

module.exports = { requireAdmin };