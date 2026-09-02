// Real login screen, wired to the backend.
// Owner: Anisa Arora

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiRequest from '../api/client';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiRequest('/auth/login', { method: 'POST', body: { phone, password } });
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required style={inputStyle} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>New here? <Link to="/register">Register</Link></p>
    </div>
  );
}

const inputStyle = { display: 'block', width: '100%', padding: 8, marginBottom: 10 };
const buttonStyle = { padding: '8px 16px' };
