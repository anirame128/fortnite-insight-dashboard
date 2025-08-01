// src/app/dashboard/settings/hooks/useProfileSettings.ts

import { useState } from 'react';
import { updateProfile } from '../../actions';
import { validateProfileSettings } from '../../../utils/validation';

interface ProfileSettings {
  username: string;
  email: string;
  // Add other profile fields as necessary
}

const useProfileSettings = () => {
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    username: '',
    email: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const validationErrors = validateProfileSettings(profileSettings);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(', '));
      }

      await updateProfile(profileSettings);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    profileSettings,
    loading,
    error,
    success,
    handleChange,
    handleSubmit,
  };
};

export default useProfileSettings;