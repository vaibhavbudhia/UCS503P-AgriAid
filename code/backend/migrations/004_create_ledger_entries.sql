-- ledger_entries: a farmer's income/expense log
CREATE TABLE IF NOT EXISTS ledger_entries (
  id          SERIAL PRIMARY KEY,
  farmer_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entry_type  TEXT NOT NULL CHECK (entry_type IN ('expense', 'revenue')),
  category    TEXT NOT NULL,
  amount      NUMERIC(10, 2) NOT NULL,
  crop_cycle  TEXT,
  entry_date  DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ledger_entries_farmer_id ON ledger_entries(farmer_id);
