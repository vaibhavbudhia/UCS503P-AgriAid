// Real registration screen, wired to the backend.
// Owner: Anisa Arora

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiRequest from '../api/client';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', password: '', role: 'farmer', region: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiRequest('/auth/register', { method: 'POST', body: form });
      localStorage.setItem('agriaid_token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: '60px auto', fontFamily: 'sans-serif' }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={update('name')} required style={inputStyle} />
        <input placeholder="Phone" value={form.phone} onChange={update('phone')} required style={inputStyle} />
        <input placeholder="Password" type="password" value={form.password} onChange={update('password')} required style={inputStyle} />
        <select value={form.role} onChange={update('role')} style={inputStyle}>
          <option value="farmer">Farmer</option>
          <option value="provider">Resource Provider</option>
        </select>
        <input placeholder="Region" value={form.region} onChange={update('region')} style={inputStyle} />
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}

const inputStyle = { display: 'block', width: '100%', padding: 8, marginBottom: 10 };
const buttonStyle = { padding: '8px 16px' };
