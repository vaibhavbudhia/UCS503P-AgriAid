-- labour_requests: a farmer asking for local workers, matched by
-- proximity to workers looking for jobs
CREATE TABLE IF NOT EXISTS labour_requests (
  id              SERIAL PRIMARY KEY,
  farmer_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  description     TEXT NOT NULL,
  latitude        DOUBLE PRECISION,
  longitude       DOUBLE PRECISION,
  workers_needed  INTEGER NOT NULL DEFAULT 1,
  wage_offered    NUMERIC(10, 2),
  status          TEXT NOT NULL DEFAULT 'open'
                     CHECK (status IN ('open', 'matched', 'closed')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_labour_requests_farmer_id ON labour_requests(farmer_id);
