// src/tests/api/user/settings.test.ts

import { render, screen, waitFor } from '@testing-library/react';
import { SettingsClient } from '../../app/dashboard/settings/SettingsClient';
import { fetchSettings, updateSettings } from '../../app/dashboard/settings/hooks/useSettings';
import { MockedProvider } from '@apollo/client/testing';
import userEvent from '@testing-library/user-event';

jest.mock('../../app/dashboard/settings/hooks/useSettings');

describe('SettingsClient', () => {
  const mockFetchSettings = fetchSettings as jest.Mock;
  const mockUpdateSettings = updateSettings as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders settings page correctly', async () => {
    mockFetchSettings.mockResolvedValueOnce({
      data: {
        settings: {
          notifications: true,
          theme: 'light',
        },
      },
    });

    render(
      <MockedProvider>
        <SettingsClient />
      </MockedProvider>
    );

    expect(await screen.findByText(/settings/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notifications/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/theme/i)).toBeInTheDocument();
  });

  test('updates settings successfully', async () => {
    mockFetchSettings.mockResolvedValueOnce({
      data: {
        settings: {
          notifications: true,
          theme: 'light',
        },
      },
    });
    mockUpdateSettings.mockResolvedValueOnce({
      data: {
        updateSettings: {
          success: true,
          message: 'Settings updated successfully',
        },
      },
    });

    render(
      <MockedProvider>
        <SettingsClient />
      </MockedProvider>
    );

    userEvent.click(screen.getByLabelText(/notifications/i));
    userEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText(/settings updated successfully/i)).toBeInTheDocument();
    });
  });

  test('handles update settings error', async () => {
    mockFetchSettings.mockResolvedValueOnce({
      data: {
        settings: {
          notifications: true,
          theme: 'light',
        },
      },
    });
    mockUpdateSettings.mockRejectedValueOnce(new Error('Failed to update settings'));

    render(
      <MockedProvider>
        <SettingsClient />
      </MockedProvider>
    );

    userEvent.click(screen.getByLabelText(/notifications/i));
    userEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to update settings/i)).toBeInTheDocument();
    });
  });

  test('displays loading state', async () => {
    mockFetchSettings.mockReturnValue(new Promise(() => {})); // Simulate loading

    render(
      <MockedProvider>
        <SettingsClient />
      </MockedProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});