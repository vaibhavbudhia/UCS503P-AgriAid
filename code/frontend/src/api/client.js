// Wrapper around fetch for calling the backend. Not implemented yet —
// swap BASE_URL for the deployed API once Phase 2 backend is live.

const BASE_URL = 'http://localhost:4000/api';

async function apiRequest(path, options = {}) {
  // TODO: attach Authorization header once auth exists, handle errors
  throw new Error('not implemented');
}

export default apiRequest;
