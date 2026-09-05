// Owner: Neha Bansal

const ledgerModel = require('../models/ledgerEntry.model');

async function addLedgerEntry(req, res) {
  try {
    const { entryType, category, amount, cropCycle, entryDate } = req.body;

    if (!entryType || !['expense', 'revenue'].includes(entryType)) {
      return res.status(400).json({ error: { code: 'BAD_TYPE', message: 'entryType must be expense or revenue' } });
    }
    if (!category || !ledgerModel.VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ error: { code: 'BAD_CATEGORY', message: `category must be one of: ${ledgerModel.VALID_CATEGORIES.join(', ')}` } });
    }
    if (amount === undefined || amount === null || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: { code: 'BAD_AMOUNT', message: 'amount is required and must be a positive number' } });
    }
    if (!entryDate) {
      return res.status(400).json({ error: { code: 'MISSING_FIELDS', message: 'entryDate is required' } });
    }

    const entry = await ledgerModel.create({
      farmerId: req.user.id,
      entryType,
      category,
      amount,
      cropCycle,
      entryDate,
    });

    res.status(201).json(entry);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to add ledger entry' } });
  }
}

async function getLedgerSummary(req, res) {
  try {
    const { cropCycle } = req.query;
    const summary = await ledgerModel.getSummary(req.user.id, cropCycle);
    const entries = await ledgerModel.listEntries(req.user.id, cropCycle);
    res.json({ summary, entries });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { code: 'SERVER_ERROR', message: 'failed to get ledger summary' } });
  }
}

module.exports = { addLedgerEntry, getLedgerSummary };