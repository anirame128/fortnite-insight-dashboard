// src/app/dashboard/profile/page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { fetchUserSettings } from '../settings/hooks/useSettings';
import { updateProfile } from '../actions';
import SettingsErrorNotification from '../settings/SettingsErrorNotification';
import SettingsSuccessNotification from '../settings/SettingsSuccessNotification';

const ProfilePage = () => {
    const [userSettings, setUserSettings] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserSettings = async () => {
            try {
                const settings = await fetchUserSettings();
                setUserSettings(settings);
            } catch (err) {
                setError('Failed to fetch user settings.');
            } finally {
                setLoading(false);
            }
        };

        loadUserSettings();
    }, []);

    const handleUpdateProfile = async (updatedData) => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        try {
            await updateProfile(updatedData);
            setSuccessMessage('Profile updated successfully!');
            const updatedSettings = await fetchUserSettings();
            setUserSettings(updatedSettings);
        } catch (err) {
            setError('Failed to update profile.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>User Profile</h1>
            {error && <SettingsErrorNotification errorMessage={error} onDismiss={() => setError(null)} />}
            {successMessage && <SettingsSuccessNotification message={successMessage} />}
            {/* Render user settings form here, passing handleUpdateProfile as a prop */}
            {/* <UserSettingsForm initialValues={userSettings} onSubmit={handleUpdateProfile} /> */}
        </div>
    );
};

export default ProfilePage;