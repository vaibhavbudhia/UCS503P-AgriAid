// Equipment breakdown reporting. Not implemented — Phase 3.

async function reportBreakdown(req, res) {
  // TODO: insert breakdown_reports row, find nearby mechanics by location
  res.status(501).json({ error: 'not implemented' });
}

module.exports = { reportBreakdown };
