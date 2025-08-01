// src/tests/dashboard/settings/page.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SettingsClient from '../../../app/dashboard/settings/SettingsClient';
import { MockedProvider } from '@apollo/client/testing';
import { NotificationProvider } from '../../../app/dashboard/settings/notifications';
import { useSettings } from '../../../app/dashboard/settings/hooks/useSettings';

jest.mock('../../../app/dashboard/settings/hooks/useSettings');

const mockUseSettings = useSettings as jest.Mock;

describe('Settings Page Integration Tests', () => {
  beforeEach(() => {
    mockUseSettings.mockReturnValue({
      settings: { /* mock settings data */ },
      updateSettings: jest.fn(),
      loading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should submit the form and show success notification', async () => {
    const updateSettingsMock = jest.fn();
    mockUseSettings.mockReturnValue({
      settings: { /* mock settings data */ },
      updateSettings: updateSettingsMock,
      loading: false,
      error: null,
    });

    render(
      <MockedProvider>
        <NotificationProvider>
          <SettingsClient />
        </NotificationProvider>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/setting name/i), {
      target: { value: 'New Setting Value' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(updateSettingsMock).toHaveBeenCalledWith({
        /* expected settings data */
      });
      expect(screen.getByText(/settings updated successfully/i)).toBeInTheDocument();
    });
  });

  it('should show error notification on submission failure', async () => {
    const updateSettingsMock = jest.fn().mockRejectedValue(new Error('Update failed'));
    mockUseSettings.mockReturnValue({
      settings: { /* mock settings data */ },
      updateSettings: updateSettingsMock,
      loading: false,
      error: null,
    });

    render(
      <MockedProvider>
        <NotificationProvider>
          <SettingsClient />
        </NotificationProvider>
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/setting name/i), {
      target: { value: 'New Setting Value' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(updateSettingsMock).toHaveBeenCalled();
      expect(screen.getByText(/update failed/i)).toBeInTheDocument();
    });
  });
});