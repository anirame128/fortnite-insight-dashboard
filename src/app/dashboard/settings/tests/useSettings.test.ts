// src/app/dashboard/settings/tests/useSettings.test.ts

import { renderHook, act } from '@testing-library/react-hooks';
import { useSettings } from '../useSettings'; // Adjust the import path as necessary

describe('useSettings', () => {
  it('should initialize with default settings', () => {
    const { result } = renderHook(() => useSettings());
    expect(result.current.settings).toEqual(expect.objectContaining({
      // Add expected default settings structure here
    }));
  });

  it('should update settings correctly', () => {
    const { result } = renderHook(() => useSettings());
    
    act(() => {
      result.current.updateSettings({ theme: 'dark' }); // Example update
    });

    expect(result.current.settings.theme).toBe('dark');
  });

  it('should handle errors during settings update', async () => {
    const { result } = renderHook(() => useSettings());

    // Mock a failed update
    jest.spyOn(result.current, 'updateSettings').mockImplementation(() => {
      throw new Error('Update failed');
    });

    await act(async () => {
      await result.current.updateSettings({ theme: 'light' });
    });

    expect(result.current.error).toBe('Update failed');
  });

  it('should reset settings to default', () => {
    const { result } = renderHook(() => useSettings());

    act(() => {
      result.current.updateSettings({ theme: 'dark' });
    });

    act(() => {
      result.current.resetSettings();
    });

    expect(result.current.settings).toEqual(expect.objectContaining({
      // Add expected default settings structure here
    }));
  });
});