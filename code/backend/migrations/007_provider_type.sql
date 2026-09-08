-- 007_provider_type.sql
-- Owner: Anisa Arora
-- Add provider sub-type distinction (farmer vs mechanic) for breakdown matching

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS provider_type VARCHAR(20);

ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_provider_type_check;
ALTER TABLE public.users ADD CONSTRAINT users_provider_type_check
  CHECK (provider_type IS NULL OR provider_type IN ('farmer', 'mechanic'));