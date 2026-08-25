// Verifies the JWT sent in the Authorization header and attaches the
// decoded user to req.user. Not implemented yet — Phase 2.

function requireAuth(req, res, next) {
  // TODO: read `Authorization: Bearer <token>`, verify with jsonwebtoken,
  // attach payload to req.user, call next(). Reject with 401 otherwise.
  return res.status(501).json({ error: 'auth middleware not implemented' });
}

module.exports = { requireAuth };
