// Real dashboard: fetches the logged-in user's profile from the backend.
// Owner: Anisa Arora

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../api/client';

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('agriaid_token');
    if (!token) {
      navigate('/login');
      return;
    }
    apiRequest('/profile', { token })
      .then(setProfile)
      .catch((err) => setError(err.message));
  }, [navigate]);

  function logout() {
    localStorage.removeItem('agriaid_token');
    navigate('/login');
  }

  if (error) return <p style={{ fontFamily: 'sans-serif', margin: 40 }}>Error: {error}</p>;
  if (!profile) return <p style={{ fontFamily: 'sans-serif', margin: 40 }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 480, margin: '60px auto', fontFamily: 'sans-serif' }}>
      <h1>Welcome, {profile.name}</h1>
      <p>Role: {profile.role}</p>
      <p>Region: {profile.region || 'Not set'}</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
