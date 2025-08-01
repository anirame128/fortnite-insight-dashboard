// src/app/dashboard/settings/hooks/useSettings.ts

import { useState, useEffect } from 'react';
import { fetchSettings, updateSettings } from '../api/settingsApi'; // Adjust the import path as necessary
import { Settings } from '../types/settingsTypes'; // Adjust the import path as necessary
import { showErrorNotification, showSuccessNotification } from '../notifications'; // Adjust the import path as necessary

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
                setError('Failed to load settings.');
                showErrorNotification('Failed to load settings.');
            } finally {
                setLoading(false);
            }
        };

        loadSettings();
    }, []);

    const saveSettings = async (newSettings: Settings) => {
        setLoading(true);
        setError(null);
        try {
            await updateSettings(newSettings);
            setSettings(newSettings);
            showSuccessNotification('Settings updated successfully.');
        } catch (err) {
            setError('Failed to update settings.');
            showErrorNotification('Failed to update settings.');
        } finally {
            setLoading(false);
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