-- resources: shared machinery/equipment a provider lists for booking
CREATE TABLE IF NOT EXISTS resources (
  id            SERIAL PRIMARY KEY,
  provider_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type          TEXT NOT NULL,
  description   TEXT,
  usage_charge  NUMERIC(10, 2) NOT NULL DEFAULT 0,
  latitude      DOUBLE PRECISION,
  longitude     DOUBLE PRECISION,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_resources_provider_id ON resources(provider_id);
