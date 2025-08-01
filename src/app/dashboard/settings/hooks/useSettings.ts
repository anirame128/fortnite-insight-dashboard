// src/app/dashboard/settings/hooks/useSettings.ts

import { useState, useEffect } from 'react';
import { fetchSettings, updateSettings } from '../api/settingsApi'; // Adjust the import path as necessary
import { showNotification } from '../notifications';
import { validateSettings } from '../../../utils/validation'; // Adjust the import path as necessary

interface Settings {
  // Define the shape of your settings here
  theme: string;
  notificationsEnabled: boolean;
}

const useSettings = () => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const fetchedSettings = await fetchSettings();
        setSettings(fetchedSettings);
      } catch (err) {
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async (newSettings: Settings) => {
    const validationError = validateSettings(newSettings);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await updateSettings(newSettings);
      setSettings(newSettings);
      showNotification('Settings updated successfully', 'success');
    } catch (err) {
      setError('Failed to update settings');
    }
  };

  return {
    settings,
    loading,
    error,
    saveSettings,
  };
};

export default useSettings;