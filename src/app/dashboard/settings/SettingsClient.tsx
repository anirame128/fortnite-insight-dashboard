// src/app/dashboard/settings/SettingsClient.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { SettingsForm } from './SettingsForm';
import { useSettings } from './hooks/useSettings';
import { Notification } from './notifications';

const SettingsClient: React.FC = () => {
    const { settings, updateSettings, error, loading } = useSettings();
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        if (error) {
            setNotification('Failed to update settings. Please try again.');
        }
    }, [error]);

    const handleUpdate = async (newSettings: any) => {
        try {
            await updateSettings(newSettings);
            setNotification('Settings updated successfully!');
        } catch (err) {
            console.error(err);
            setNotification('An error occurred while updating settings.');
        }
    };

    return (
        <div>
            {loading && <p>Loading settings...</p>}
            {notification && <Notification message={notification} />}
            <SettingsForm initialValues={settings} onSubmit={handleUpdate} />
        </div>
    );
};

export default SettingsClient;