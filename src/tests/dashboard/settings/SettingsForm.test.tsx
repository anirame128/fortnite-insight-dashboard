// src/tests/dashboard/settings/SettingsForm.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsForm from 'src/app/dashboard/settings/SettingsForm';
import { useSettings } from 'src/app/dashboard/settings/hooks/useSettings';
import { NotificationProvider } from 'src/app/dashboard/settings/notifications';

jest.mock('src/app/dashboard/settings/hooks/useSettings');

describe('SettingsForm', () => {
  const mockUseSettings = useSettings as jest.Mock;

  beforeEach(() => {
    mockUseSettings.mockReturnValue({
      settings: { emailNotifications: true, darkMode: false },
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with initial settings', () => {
    render(
      <NotificationProvider>
        <SettingsForm />
      </NotificationProvider>
    );

    expect(screen.getByLabelText(/email notifications/i)).toBeChecked();
    expect(screen.getByLabelText(/dark mode/i)).not.toBeChecked();
  });

  test('calls handleChange on input change', () => {
    render(
      <NotificationProvider>
        <SettingsForm />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByLabelText(/dark mode/i));
    expect(mockUseSettings().handleChange).toHaveBeenCalledWith('darkMode', true);
  });

  test('submits the form and handles success', async () => {
    const handleSubmit = jest.fn();
    mockUseSettings.mockReturnValueOnce({
      settings: { emailNotifications: true, darkMode: false },
      handleChange: jest.fn(),
      handleSubmit,
      isLoading: false,
      error: null,
    });

    render(
      <NotificationProvider>
        <SettingsForm />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
  });

  test('displays error message on submission failure', async () => {
    const errorMessage = 'Failed to save settings';
    mockUseSettings.mockReturnValueOnce({
      settings: { emailNotifications: true, darkMode: false },
      handleChange: jest.fn(),
      handleSubmit: jest.fn().mockRejectedValue(new Error(errorMessage)),
      isLoading: false,
      error: null,
    });

    render(
      <NotificationProvider>
        <SettingsForm />
      </NotificationProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));
    await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
  });

  test('shows loading state while submitting', () => {
    mockUseSettings.mockReturnValueOnce({
      settings: { emailNotifications: true, darkMode: false },
      handleChange: jest.fn(),
      handleSubmit: jest.fn(),
      isLoading: true,
      error: null,
    });

    render(
      <NotificationProvider>
        <SettingsForm />
      </NotificationProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});