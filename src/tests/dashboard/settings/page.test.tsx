// src/tests/dashboard/settings/page.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsPage from '../../../app/dashboard/settings/SettingsPage'; // Adjust the import path as necessary
import { useSettings } from '../../../app/dashboard/settings/hooks/useSettings';
import { NotificationProvider } from '../../../app/dashboard/settings/notifications';

jest.mock('../../../app/dashboard/settings/hooks/useSettings');
jest.mock('../../../app/dashboard/settings/notifications', () => ({
  useNotification: jest.fn(() => ({
    notifySuccess: jest.fn(),
    notifyError: jest.fn(),
  })),
}));

describe('Settings Page Integration Tests', () => {
  beforeEach(() => {
    (useSettings as jest.Mock).mockReturnValue({
      formState: { username: '', email: '', password: '' },
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      isSubmitting: false,
      errors: {},
    });
  });

  test('renders settings form', () => {
    render(
      <NotificationProvider>
        <SettingsPage />
      </NotificationProvider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('validates form submission', async () => {
    const mockHandleSubmit = jest.fn();
    (useSettings as jest.Mock).mockReturnValue({
      formState: { username: 'testuser', email: 'test@example.com', password: 'password123' },
      handleChange: jest.fn(),
      handleSubmit: mockHandleSubmit,
      isSubmitting: false,
      errors: {},
    });

    render(
      <NotificationProvider>
        <SettingsPage />
      </NotificationProvider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  test('displays validation errors', async () => {
    const mockHandleSubmit = jest.fn();
    (useSettings as jest.Mock).mockReturnValue({
      formState: { username: '', email: '', password: '' },
      handleChange: jest.fn(),
      handleSubmit: mockHandleSubmit,
      isSubmitting: false,
      errors: {
        username: 'Username is required',
        email: 'Email is required',
        password: 'Password is required',
      },
    });

    render(
      <NotificationProvider>
        <SettingsPage />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
  });
});