-- insurance_claims: a farmer's crop-damage claim
CREATE TABLE IF NOT EXISTS insurance_claims (
  id                  SERIAL PRIMARY KEY,
  farmer_id           INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  crop                TEXT NOT NULL,
  incident_date       DATE NOT NULL,
  latitude            DOUBLE PRECISION,
  longitude           DOUBLE PRECISION,
  damage_description  TEXT,
  status              TEXT NOT NULL DEFAULT 'submitted'
                         CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected', 'paid')),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_insurance_claims_farmer_id ON insurance_claims(farmer_id);
