-- claim_documents: supporting files uploaded against an insurance claim
CREATE TABLE IF NOT EXISTS claim_documents (
  id           SERIAL PRIMARY KEY,
  claim_id     INTEGER NOT NULL REFERENCES insurance_claims(id) ON DELETE CASCADE,
  file_url     TEXT NOT NULL,
  uploaded_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_claim_documents_claim_id ON claim_documents(claim_id);
