// src/app/dashboard/settings/hooks/useProfile.ts

import { useState, useEffect } from 'react';
import { fetchProfile, updateProfile } from '../api/profileService'; // Adjust the import path as necessary
import { ProfileData } from '../types'; // Adjust the import path as necessary

const useProfile = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchProfile();
                setProfile(data);
            } catch (err) {
                setError('Failed to fetch profile data');
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleUpdateProfile = async (updatedData: ProfileData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedProfile = await updateProfile(updatedData);
            setProfile(updatedProfile);
        } catch (err) {
            setError('Failed to update profile data');
        } finally {
            setLoading(false);
        }
    };

    return {
        profile,
        loading,
        error,
        handleUpdateProfile,
    };
};

export default useProfile;