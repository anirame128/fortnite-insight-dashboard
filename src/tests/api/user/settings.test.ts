// src/tests/api/user/settings.test.ts

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Settings } from '../../../app/dashboard/settings/Settings'; // Adjust the import path as necessary
import { useSettings } from '../../../app/dashboard/settings/hooks/useSettings';
import { mockApi } from '../../../utils/api'; // Mock API utility

jest.mock('../../../app/dashboard/settings/hooks/useSettings');
jest.mock('../../../utils/api');

describe('Settings API Endpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render settings form correctly', () => {
    (useSettings as jest.Mock).mockReturnValue({
      settings: { notification: true, theme: 'light' },
      loading: false,
      error: null,
      updateSettings: jest.fn(),
    });

    render(<Settings />);

    expect(screen.getByLabelText(/notification/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/theme/i)).toBeInTheDocument();
  });

  it('should handle settings update successfully', async () => {
    (useSettings as jest.Mock).mockReturnValue({
      settings: { notification: true, theme: 'light' },
      loading: false,
      error: null,
      updateSettings: jest.fn().mockResolvedValue({ success: true }),
    });

    render(<Settings />);

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(screen.getByText(/settings updated successfully/i)).toBeInTheDocument();
    });
  });

  it('should handle settings update failure', async () => {
    (useSettings as jest.Mock).mockReturnValue({
      settings: { notification: true, theme: 'light' },
      loading: false,
      error: null,
      updateSettings: jest.fn().mockRejectedValue(new Error('Update failed')),
    });

    render(<Settings />);

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(screen.getByText(/update failed/i)).toBeInTheDocument();
    });
  });

  it('should show loading state while updating settings', () => {
    (useSettings as jest.Mock).mockReturnValue({
      settings: { notification: true, theme: 'light' },
      loading: true,
      error: null,
      updateSettings: jest.fn(),
    });

    render(<Settings />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('should display error message when there is an error', () => {
    (useSettings as jest.Mock).mockReturnValue({
      settings: { notification: true, theme: 'light' },
      loading: false,
      error: 'An error occurred',
      updateSettings: jest.fn(),
    });

    render(<Settings />);

    expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
  });
});