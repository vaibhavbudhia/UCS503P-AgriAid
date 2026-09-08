-- bookings: a farmer reserving a resource for a time window
CREATE TABLE IF NOT EXISTS bookings (
  id                SERIAL PRIMARY KEY,
  resource_id       INTEGER NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  farmer_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status            TEXT NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')),
  start_time        TIMESTAMPTZ NOT NULL,
  end_time          TIMESTAMPTZ NOT NULL,
  is_group_booking  BOOLEAN NOT NULL DEFAULT false,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (end_time > start_time)
);

CREATE INDEX IF NOT EXISTS idx_bookings_resource_id ON bookings(resource_id);
CREATE INDEX IF NOT EXISTS idx_bookings_farmer_id ON bookings(farmer_id);
