// src/app/dashboard/settings/hooks/useProfile.test.ts

import { renderHook, act } from '@testing-library/react-hooks';
import { useProfile } from './useProfile';
import { fetchProfile, updateProfile } from '../api/profileApi'; // Adjust the import path as necessary

jest.mock('../api/profileApi');

describe('useProfile', () => {
  const mockProfileData = { id: 1, name: 'John Doe', email: 'john@example.com' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch profile data on mount', async () => {
    (fetchProfile as jest.Mock).mockResolvedValueOnce(mockProfileData);

    const { result, waitForNextUpdate } = renderHook(() => useProfile());

    await waitForNextUpdate();

    expect(result.current.profile).toEqual(mockProfileData);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle fetch error', async () => {
    (fetchProfile as jest.Mock).mockRejectedValueOnce(new Error('Fetch error'));

    const { result, waitForNextUpdate } = renderHook(() => useProfile());

    await waitForNextUpdate();

    expect(result.current.profile).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual(new Error('Fetch error'));
  });

  it('should update profile data', async () => {
    (fetchProfile as jest.Mock).mockResolvedValueOnce(mockProfileData);
    (updateProfile as jest.Mock).mockResolvedValueOnce({ ...mockProfileData, name: 'Jane Doe' });

    const { result, waitForNextUpdate } = renderHook(() => useProfile());

    await waitForNextUpdate();

    act(() => {
      result.current.updateProfile({ name: 'Jane Doe' });
    });

    await waitForNextUpdate();

    expect(result.current.profile).toEqual({ ...mockProfileData, name: 'Jane Doe' });
    expect(result.current.error).toBe(null);
  });

  it('should handle update error', async () => {
    (fetchProfile as jest.Mock).mockResolvedValueOnce(mockProfileData);
    (updateProfile as jest.Mock).mockRejectedValueOnce(new Error('Update error'));

    const { result, waitForNextUpdate } = renderHook(() => useProfile());

    await waitForNextUpdate();

    act(() => {
      result.current.updateProfile({ name: 'Jane Doe' });
    });

    await waitForNextUpdate();

    expect(result.current.profile).toEqual(mockProfileData);
    expect(result.current.error).toEqual(new Error('Update error'));
  });
});