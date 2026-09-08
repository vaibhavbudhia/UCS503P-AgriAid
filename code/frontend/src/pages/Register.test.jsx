import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import Register from '../pages/Register';
import { getToken, clearToken } from '../api/client';

beforeEach(() => {
  clearToken();
  vi.restoreAllMocks();
});

function renderRegister() {
  return render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );
}

describe('Register', () => {
  it('renders name, phone, password, region and role fields', () => {
    renderRegister();
    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^phone$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^region$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/i am a/i)).toBeInTheDocument();
  });

  it('submits the form and stores the returned token', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ token: 'new-user-jwt', user: { id: 2, name: 'Gurpreet Singh' } }),
      })
    );

    renderRegister();
    await userEvent.type(screen.getByLabelText(/^name$/i), 'Gurpreet Singh');
    await userEvent.type(screen.getByLabelText(/^phone$/i), '9123456789');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'secret123');
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => expect(getToken()).toBe('new-user-jwt'));
    const [, options] = fetch.mock.calls[0];
    const body = JSON.parse(options.body);
    expect(body).toMatchObject({ name: 'Gurpreet Singh', phone: '9123456789', role: 'farmer' });
  });

  it('shows a duplicate-phone error from the server', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 409,
        json: async () => ({ error: 'a user with that phone number already exists' }),
      })
    );

    renderRegister();
    await userEvent.type(screen.getByLabelText(/^name$/i), 'Gurpreet Singh');
    await userEvent.type(screen.getByLabelText(/^phone$/i), '9123456789');
    await userEvent.type(screen.getByLabelText(/^password$/i), 'secret123');
    await userEvent.click(screen.getByRole('button', { name: /create account/i }));

    expect(await screen.findByText(/already exists/i)).toBeInTheDocument();
  });
});
