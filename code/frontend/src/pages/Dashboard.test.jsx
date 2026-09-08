import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import Dashboard from '../pages/Dashboard';
import { setToken, clearToken } from '../api/client';

beforeEach(() => {
  clearToken();
  vi.restoreAllMocks();
});

function renderDashboard() {
  return render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
}

describe('Dashboard', () => {
  it('fetches and displays the logged-in user profile when a token exists', async () => {
    setToken('fake-jwt');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          user: { id: 1, name: 'Gurpreet Singh', phone: '9999999999', role: 'farmer', region: 'Amritsar' },
        }),
      })
    );

    renderDashboard();

    expect(await screen.findByText(/welcome, gurpreet singh/i)).toBeInTheDocument();
    expect(screen.getByText(/9999999999/)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/profile'),
      expect.objectContaining({ headers: expect.objectContaining({ Authorization: 'Bearer fake-jwt' }) })
    );
  });
});
