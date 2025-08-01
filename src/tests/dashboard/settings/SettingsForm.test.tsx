// src/tests/dashboard/settings/SettingsForm.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsForm from '../../../app/dashboard/settings/SettingsForm';
import { useSettings } from '../../../app/dashboard/settings/hooks/useSettings';

jest.mock('../../../app/dashboard/settings/hooks/useSettings');

describe('SettingsForm', () => {
  const mockUpdateSettings = jest.fn();
  const mockSetError = jest.fn();

  beforeEach(() => {
    (useSettings as jest.Mock).mockReturnValue({
      updateSettings: mockUpdateSettings,
      setError: mockSetError,
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with initial values', () => {
    render(<SettingsForm />);
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<SettingsForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    render(<SettingsForm />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockUpdateSettings).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
      });
    });
  });

  test('handles API errors gracefully', async () => {
    mockUpdateSettings.mockRejectedValueOnce(new Error('Failed to update settings'));
    
    render(<SettingsForm />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockSetError).toHaveBeenCalledWith('Failed to update settings');
      expect(screen.getByText(/failed to update settings/i)).toBeInTheDocument();
    });
  });
});