-- users: everyone who logs in (farmers, resource providers, admins)
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  phone         TEXT NOT NULL UNIQUE,
  email         TEXT,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'farmer'
                  CHECK (role IN ('farmer', 'provider', 'admin')),
  region        TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
