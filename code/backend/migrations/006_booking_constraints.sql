-- 006_booking_constraints.sql
-- Owner: Anisa Arora
-- Phase 3 completion: booking conflict prevention, breakdown assignment, minor fixes



CREATE EXTENSION IF NOT EXISTS btree_gist;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'no_overlapping_bookings'
  ) THEN
    ALTER TABLE public.bookings
    ADD CONSTRAINT no_overlapping_bookings
    EXCLUDE USING gist (
      resource_id WITH =,
      tsrange(start_time, end_time) WITH &&
    ) WHERE (status IN ('pending','accepted'));
  END IF;
END $$;

ALTER TABLE public.breakdown_reports
ADD COLUMN IF NOT EXISTS assigned_provider_id UUID REFERENCES public.users(id) ON DELETE SET NULL;

ALTER TABLE public.resource_availability
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT now();

-- Breakdown report lifecycle improvements
ALTER TABLE public.breakdown_reports
  ADD COLUMN IF NOT EXISTS required_time TIMESTAMP,
  ADD COLUMN IF NOT EXISTS rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
  ADD COLUMN IF NOT EXISTS rating_comment TEXT;

ALTER TABLE public.breakdown_reports DROP CONSTRAINT IF EXISTS breakdown_reports_status_check;
ALTER TABLE public.breakdown_reports
  ADD CONSTRAINT breakdown_reports_status_check
  CHECK (status IN ('open', 'accepted', 'rejected', 'in_progress', 'resolved'));