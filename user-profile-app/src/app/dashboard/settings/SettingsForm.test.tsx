// src/app/dashboard/settings/SettingsForm.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsForm from './SettingsForm';
import { useProfileSettings } from './hooks/useProfileSettings';
import '@testing-library/jest-dom/extend-expect';

// Mock the custom hook
jest.mock('./hooks/useProfileSettings');

describe('SettingsForm', () => {
  const mockUpdateProfile = jest.fn();

  beforeEach(() => {
    (useProfileSettings as jest.Mock).mockReturnValue({
      updateProfile: mockUpdateProfile,
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with initial values', () => {
    render(<SettingsForm />);
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<SettingsForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
  });

  test('submits the form with valid data', async () => {
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

  test('displays error message on submission failure', async () => {
    (useProfileSettings as jest.Mock).mockReturnValue({
      updateProfile: mockUpdateProfile,
      loading: false,
      error: 'Profile update failed',
    });

    render(<SettingsForm />);
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(await screen.findByText(/profile update failed/i)).toBeInTheDocument();
  });
});