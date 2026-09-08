-- schemes: government schemes an admin publishes, with machine-checkable
-- eligibility rules so a farmer's profile can be matched against them
CREATE TABLE IF NOT EXISTS schemes (
  id                  SERIAL PRIMARY KEY,
  name                TEXT NOT NULL,
  eligibility_rules   JSONB NOT NULL DEFAULT '{}'::jsonb,
  required_documents  TEXT[] NOT NULL DEFAULT '{}',
  created_by          INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);
