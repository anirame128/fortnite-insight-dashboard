// src/app/dashboard/settings/tests/SettingsForm.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsForm from '../SettingsForm';
import { useSettings } from '../hooks/useSettings';
import { validateSettings } from '../../../utils/validation';

jest.mock('../hooks/useSettings');
jest.mock('../../../utils/validation');

describe('SettingsForm', () => {
  const mockUseSettings = useSettings as jest.Mock;
  const mockValidateSettings = validateSettings as jest.Mock;

  beforeEach(() => {
    mockUseSettings.mockReturnValue({
      settings: {},
      loading: false,
      error: null,
      updateSettings: jest.fn(),
    });
    mockValidateSettings.mockReturnValue({ isValid: true, errors: {} });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<SettingsForm />);
    expect(screen.getByLabelText(/settings/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('displays validation errors when form is submitted with invalid data', async () => {
    mockValidateSettings.mockReturnValue({
      isValid: false,
      errors: { fieldName: 'Field is required' },
    });

    render(<SettingsForm />);
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText(/field is required/i)).toBeInTheDocument();
    });
  });

  it('calls updateSettings when form is submitted with valid data', async () => {
    const updateSettingsMock = jest.fn();
    mockUseSettings.mockReturnValue({
      settings: {},
      loading: false,
      error: null,
      updateSettings: updateSettingsMock,
    });

    render(<SettingsForm />);
    fireEvent.change(screen.getByLabelText(/settings/i), { target: { value: 'valid data' } });
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(updateSettingsMock).toHaveBeenCalledWith({ /* valid data */ });
    });
  });

  it('displays a loading state while updating settings', () => {
    mockUseSettings.mockReturnValue({
      settings: {},
      loading: true,
      error: null,
      updateSettings: jest.fn(),
    });

    render(<SettingsForm />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays an error message when updateSettings fails', async () => {
    const errorMessage = 'Failed to update settings';
    mockUseSettings.mockReturnValue({
      settings: {},
      loading: false,
      error: errorMessage,
      updateSettings: jest.fn(),
    });

    render(<SettingsForm />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});