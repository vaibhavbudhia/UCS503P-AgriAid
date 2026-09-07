// Real breakdown reporting screen.
// Owner: Anisa Arora

import { useState } from 'react';
import apiRequest from '../api/client';

export default function BreakdownReport() {
  const [equipmentType, setEquipmentType] = useState('');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('agriaid_token');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const data = await apiRequest('/breakdowns', {
        method: 'POST',
        token,
        body: { equipment_type: equipmentType, description },
      });
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Report Equipment Breakdown</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Equipment type (e.g. tractor)" value={equipmentType}
          onChange={(e) => setEquipmentType(e.target.value)} required
          style={{ display: 'block', width: '100%', padding: 8, marginBottom: 10 }} />
        <textarea placeholder="What's wrong?" value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, marginBottom: 10 }} />
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        <button type="submit">Submit Report</button>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          <p>Report submitted. Status: {result.report.status}</p>
          <h3>Nearby mechanics</h3>
          {result.nearby_mechanics.length === 0 && <p>None listed in your area yet.</p>}
          {result.nearby_mechanics.map((m) => (
            <div key={m.id}>{m.name} — {m.phone} ({m.region || 'region not set'})</div>
          ))}
        </div>
      )}
    </div>
  );
}
