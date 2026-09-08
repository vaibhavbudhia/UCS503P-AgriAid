// Registration/login logic: hash + verify passwords, issue JWTs, read/write
// the users table via the model.
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const SALT_ROUNDS = 10;

function signToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

async function register(req, res) {
  const { name, phone, password, email, role, region } = req.body || {};

  if (!name || !phone || !password) {
    return res.status(400).json({ error: 'name, phone and password are required' });
  }
  if (role && !['farmer', 'provider', 'admin'].includes(role)) {
    return res.status(400).json({ error: 'role must be farmer, provider or admin' });
  }

  const existing = await userModel.findByPhone(phone);
  if (existing) {
    return res.status(409).json({ error: 'a user with that phone number already exists' });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userModel.create({ name, phone, email, passwordHash, role, region });
  const token = signToken(user);

  return res.status(201).json({ user, token });
}

async function login(req, res) {
  const { phone, password } = req.body || {};

  if (!phone || !password) {
    return res.status(400).json({ error: 'phone and password are required' });
  }

  const user = await userModel.findByPhone(phone);
  if (!user) {
    return res.status(401).json({ error: 'invalid phone or password' });
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    return res.status(401).json({ error: 'invalid phone or password' });
  }

  const token = signToken(user);
  // eslint-disable-next-line no-unused-vars
  const { password_hash, ...safeUser } = user;
  return res.json({ user: safeUser, token });
}

async function profile(req, res) {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'user not found' });
  }
  return res.json({ user });
}

module.exports = { register, login, profile };
