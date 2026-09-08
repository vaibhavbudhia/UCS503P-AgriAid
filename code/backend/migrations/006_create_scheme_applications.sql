-- scheme_applications: a farmer applying for a scheme
CREATE TABLE IF NOT EXISTS scheme_applications (
  id          SERIAL PRIMARY KEY,
  scheme_id   INTEGER NOT NULL REFERENCES schemes(id) ON DELETE CASCADE,
  farmer_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status      TEXT NOT NULL DEFAULT 'submitted'
                 CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected')),
  applied_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (scheme_id, farmer_id)
);

CREATE INDEX IF NOT EXISTS idx_scheme_applications_farmer_id ON scheme_applications(farmer_id);
