// Real resource search + booking request screen.
// Owner: Anisa Arora

import { useEffect, useState } from 'react';
import apiRequest from '../api/client';

export default function ResourceSearch() {
  const [resources, setResources] = useState([]);
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const [bookingFor, setBookingFor] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('agriaid_token');

  function loadResources() {
    const query = type ? `?type=${type}` : '';
    apiRequest(`/resources${query}`)
      .then((data) => setResources(data.results))
      .catch((err) => setError(err.message));
  }

  useEffect(() => { loadResources(); }, [type]);

  async function submitBooking(e) {
    e.preventDefault();
    setMessage('');
    try {
      await apiRequest('/bookings', {
        method: 'POST',
        token,
        body: { resource_id: bookingFor.id, start_time: startTime, end_time: endTime },
      });
      setMessage('Booking request sent!');
      setBookingFor(null);
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  return (
    <div style={{ maxWidth: 560, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>Find a Resource</h1>
      <select value={type} onChange={(e) => setType(e.target.value)} style={{ padding: 8, marginBottom: 16 }}>
        <option value="">All types</option>
        <option value="tractor">Tractor</option>
        <option value="harvester">Harvester</option>
        <option value="pump">Pump</option>
        <option value="rotavator">Rotavator</option>
        <option value="trailer">Trailer</option>
        <option value="service">Service</option>
      </select>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {message && <p>{message}</p>}

      {resources.map((r) => (
        <div key={r.id} style={{ border: '1px solid #ccc', borderRadius: 6, padding: 12, marginBottom: 10 }}>
          <b style={{ textTransform: 'capitalize' }}>{r.type}</b> — {r.description}<br />
          ₹{r.usage_charge}/day · {r.provider_name} ({r.provider_region || 'region not set'})
          <div>
            <button onClick={() => setBookingFor(r)} style={{ marginTop: 8 }}>Book Now</button>
          </div>
        </div>
      ))}

      {bookingFor && (
        <div style={{ border: '2px solid #333', borderRadius: 6, padding: 16, marginTop: 16 }}>
          <h3>Book {bookingFor.type}</h3>
          <form onSubmit={submitBooking}>
            <label>Start: <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required /></label><br /><br />
            <label>End: <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required /></label><br /><br />
            <button type="submit">Confirm Request</button>
            <button type="button" onClick={() => setBookingFor(null)} style={{ marginLeft: 8 }}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
