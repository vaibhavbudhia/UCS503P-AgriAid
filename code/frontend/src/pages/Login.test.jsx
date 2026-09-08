import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import Login from '../pages/Login';
import { getToken, clearToken } from '../api/client';

beforeEach(() => {
  clearToken();
  vi.restoreAllMocks();
});

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
}

describe('Login', () => {
  it('renders phone and password fields', () => {
    renderLogin();
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('submits credentials, stores the token on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ token: 'fake-jwt', user: { id: 1, phone: '9999999999' } }),
      })
    );

    renderLogin();
    await userEvent.type(screen.getByLabelText(/phone/i), '9999999999');
    await userEvent.type(screen.getByLabelText(/password/i), 'secret123');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => expect(getToken()).toBe('fake-jwt'));
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/login'),
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('shows the server error message on a failed login', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ error: 'invalid phone or password' }),
      })
    );

    renderLogin();
    await userEvent.type(screen.getByLabelText(/phone/i), '9999999999');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrong');
    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText(/invalid phone or password/i)).toBeInTheDocument();
    expect(getToken()).toBeNull();
  });
});
