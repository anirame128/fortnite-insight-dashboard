// src/app/dashboard/settings/tests/SettingsForm.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsForm from '../SettingsForm';
import { useProfile } from '../hooks/useProfile';
import { successNotification } from '../successNotification';

jest.mock('../hooks/useProfile');
jest.mock('../successNotification');

describe('SettingsForm', () => {
  const mockUpdateProfile = jest.fn();
  const mockFetchProfile = jest.fn();

  beforeEach(() => {
    (useProfile as jest.Mock).mockReturnValue({
      profile: { name: 'John Doe', email: 'john@example.com' },
      updateProfile: mockUpdateProfile,
      fetchProfile: mockFetchProfile,
    });
    jest.clearAllMocks();
  });

  it('renders the form with initial values', () => {
    render(<SettingsForm />);
    
    expect(screen.getByLabelText(/name/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/email/i)).toHaveValue('john@example.com');
  });

  it('displays validation errors on invalid input', async () => {
    render(<SettingsForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
    fireEvent.blur(screen.getByLabelText(/email/i));
    
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

  it('calls updateProfile on form submission with valid data', async () => {
    render(<SettingsForm />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        name: 'Jane Doe',
        email: 'jane@example.com',
      });
      expect(successNotification).toHaveBeenCalledWith('Profile updated successfully!');
    });
  });

  it('handles updateProfile errors gracefully', async () => {
    mockUpdateProfile.mockRejectedValueOnce(new Error('Update failed'));
    
    render(<SettingsForm />);
    
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/update failed/i)).toBeInTheDocument();
    });
  });
});