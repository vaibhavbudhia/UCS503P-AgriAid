// Integration tests for the auth flow. Runs against a real Postgres
// database (DATABASE_URL) with migrations already applied -- see
// package.json's "test" script and the CI workflow for how that's set up.
const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');
const app = require('../server');
const db = require('../src/config/db');

const phone = `9${Date.now().toString().slice(-9)}`; // unique per run
const password = 'correct-horse-battery-staple';

test.after(async () => {
  await db.query('DELETE FROM users WHERE phone = $1', [phone]);
  await db.pool.end();
});

test('POST /api/auth/register creates a user and returns a token', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ name: 'Gurpreet Singh', phone, password, region: 'Amritsar' });

  assert.equal(res.status, 201);
  assert.ok(res.body.token, 'expected a JWT in the response');
  assert.equal(res.body.user.phone, phone);
  assert.equal(res.body.user.password_hash, undefined, 'password hash must not leak');
});

test('POST /api/auth/register rejects a duplicate phone number', async () => {
  const res = await request(app)
    .post('/api/auth/register')
    .send({ name: 'Gurpreet Singh', phone, password });

  assert.equal(res.status, 409);
});

test('POST /api/auth/login with the correct password returns a token', async () => {
  const res = await request(app).post('/api/auth/login').send({ phone, password });

  assert.equal(res.status, 200);
  assert.ok(res.body.token);
});

test('POST /api/auth/login with the wrong password is rejected', async () => {
  const res = await request(app).post('/api/auth/login').send({ phone, password: 'wrong' });

  assert.equal(res.status, 401);
});

test('GET /api/auth/profile without a token is rejected', async () => {
  const res = await request(app).get('/api/auth/profile');

  assert.equal(res.status, 401);
});

test('GET /api/auth/profile with a valid token returns the user', async () => {
  const login = await request(app).post('/api/auth/login').send({ phone, password });
  const res = await request(app)
    .get('/api/auth/profile')
    .set('Authorization', `Bearer ${login.body.token}`);

  assert.equal(res.status, 200);
  assert.equal(res.body.user.phone, phone);
});
