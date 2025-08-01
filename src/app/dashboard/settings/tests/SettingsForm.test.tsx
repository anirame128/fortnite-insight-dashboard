// src/app/dashboard/settings/tests/SettingsForm.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsForm from '../SettingsForm';
import { useSettings } from '../hooks/useSettings';
import { updateProfile } from '../actions';

jest.mock('../hooks/useSettings');
jest.mock('../actions');

describe('SettingsForm', () => {
  const mockUpdateProfile = updateProfile as jest.Mock;
  const mockUseSettings = useSettings as jest.Mock;

  beforeEach(() => {
    mockUseSettings.mockReturnValue({
      currentSettings: { username: '', email: '' },
      loading: false,
      error: null,
    });
    mockUpdateProfile.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form with initial values', () => {
    render(<SettingsForm />);
    
    expect(screen.getByLabelText(/username/i)).toHaveValue('');
    expect(screen.getByLabelText(/email/i)).toHaveValue('');
  });

  test('validates required fields', async () => {
    render(<SettingsForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  test('validates email format', async () => {
    render(<SettingsForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(await screen.findByText(/email is invalid/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    render(<SettingsForm />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        username: 'testuser',
        email: 'test@example.com',
      });
    });
  });

  test('displays success notification on successful submission', async () => {
    render(<SettingsForm />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/settings updated successfully/i)).toBeInTheDocument();
    });
  });

  test('handles submission error', async () => {
    mockUpdateProfile.mockRejectedValue(new Error('Submission failed'));
    
    render(<SettingsForm />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
    });
  });
});