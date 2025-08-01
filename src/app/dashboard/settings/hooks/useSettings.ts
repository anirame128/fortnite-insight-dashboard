// src/app/dashboard/settings/hooks/useSettings.ts

import { useState, useEffect } from 'react';
import { validateSettings } from '@/utils/validation';
import { updateSettings } from '@/api/settings'; // Assuming an API function exists
import { SettingsFormValues } from '@/types/settings'; // Assuming a type definition exists

const useSettings = () => {
  const [formValues, setFormValues] = useState<SettingsFormValues>({
    // Initialize with default values or fetched data
    username: '',
    email: '',
    // Add other settings fields as necessary
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SettingsFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');
    setErrorMessage('');

    const validationErrors = validateSettings(formValues);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await updateSettings(formValues);
      setSuccessMessage('Settings updated successfully!');
      // Optionally reset form values or fetch updated data
    } catch (error) {
      setErrorMessage('Failed to update settings. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formValues,
    errors,
    isSubmitting,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
  };
};

export default useSettings;