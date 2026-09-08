-- breakdown_reports: a farmer flagging broken equipment so nearby
-- mechanics/providers can be notified
CREATE TABLE IF NOT EXISTS breakdown_reports (
  id                     SERIAL PRIMARY KEY,
  farmer_id              INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  resource_id            INTEGER REFERENCES resources(id) ON DELETE SET NULL,
  equipment_description  TEXT NOT NULL,
  latitude               DOUBLE PRECISION,
  longitude              DOUBLE PRECISION,
  status                 TEXT NOT NULL DEFAULT 'open'
                            CHECK (status IN ('open', 'assigned', 'resolved')),
  reported_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_breakdown_reports_farmer_id ON breakdown_reports(farmer_id);
