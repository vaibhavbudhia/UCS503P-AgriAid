// Registration/login logic. Not implemented — Phase 2.

async function register(req, res) {
  // TODO: hash password (bcrypt), insert into users table, return JWT
  res.status(501).json({ error: 'not implemented' });
}

async function login(req, res) {
  // TODO: look up user by phone, compare password hash, sign and return JWT
  res.status(501).json({ error: 'not implemented' });
}

module.exports = { register, login };
