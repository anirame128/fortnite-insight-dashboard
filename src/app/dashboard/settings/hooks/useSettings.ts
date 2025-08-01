// src/app/dashboard/settings/hooks/useSettings.ts

import { useEffect, useState } from 'react';
import { fetchUserSettings, updateUserSettings } from '../actions';
import { validateSettings } from '../validation';
import { Settings } from '../types'; // Assuming you have a type definition for Settings

const useSettings = () => {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const userSettings = await fetchUserSettings();
                setSettings(userSettings);
            } catch (err) {
                setError('Failed to load settings.');
            } finally {
                setLoading(false);
            }
        };

        loadSettings();
    }, []);

    const handleSubmit = async (newSettings: Settings) => {
        setError(null);
        setSuccess(false);

        const validationError = validateSettings(newSettings);
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        try {
            await updateUserSettings(newSettings);
            setSuccess(true);
            setSettings(newSettings);
        } catch (err) {
            setError('Failed to update settings.');
        } finally {
            setLoading(false);
        }
    };

    return {
        settings,
        loading,
        error,
        success,
        handleSubmit,
    };
};

export default useSettings;