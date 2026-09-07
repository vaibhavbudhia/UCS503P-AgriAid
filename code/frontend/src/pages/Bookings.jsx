// Real bookings view — farmer sees their requests, provider accepts/rejects.
// Owner: Lovish Bansal

import { useEffect, useState } from 'react';
import apiRequest from '../api/client';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('agriaid_token');

  function load() {
    apiRequest('/bookings', { token })
      .then((data) => setBookings(data.results))
      .catch((err) => setError(err.message));
  }

  useEffect(() => { load(); }, []);

  async function respond(id, status) {
    try {
      await apiRequest(`/bookings/${id}`, { method: 'PATCH', token, body: { status } });
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>My Bookings</h1>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {bookings.length === 0 && <p>No bookings yet.</p>}
      {bookings.map((b) => (
        <div key={b.id} style={{ border: '1px solid #ccc', borderRadius: 6, padding: 12, marginBottom: 10 }}>
          <b style={{ textTransform: 'capitalize' }}>{b.resource_type}</b>
          {b.farmer_name && <> — requested by {b.farmer_name}</>}<br />
          {new Date(b.start_time).toLocaleString()} → {new Date(b.end_time).toLocaleString()}<br />
          Status: <b>{b.status}</b>
          {b.status === 'pending' && b.farmer_name && (
            <div style={{ marginTop: 8 }}>
              <button onClick={() => respond(b.id, 'accepted')}>Accept</button>
              <button onClick={() => respond(b.id, 'rejected')} style={{ marginLeft: 8 }}>Reject</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
