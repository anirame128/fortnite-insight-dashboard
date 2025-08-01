'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateUserSettings } from '../../../api/user/settings';
import { useProfile } from './hooks/useProfile';
import { validateRequired } from './validation';
import SuccessNotification from './successNotification';

const SettingsPage = () => {
  const { profile, fetchProfile, updateProfile } = useProfile();
  const { register, handleSubmit, setError, clearErrors } = useForm({
    defaultValues: {
      name: profile?.name || '',
      email: profile?.email || '',
    },
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const onSubmit = async (data) => {
    const validation = validateRequired(data.name);
    if (!validation.isValid) {
      setError('name', { type: 'manual', message: validation.errors[0] });
      return;
    }

    try {
      await updateUserSettings(data);
      setShowSuccess(true);
      toast.success('Profile updated successfully!');
      clearErrors();
    } catch (error) {
      toast.error('Failed to update profile. Please try again.');
    }
  };

  return (
    <div>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name</label>
          <input {...register('name')} />
        </div>
        <div>
          <label>Email</label>
          <input {...register('email')} />
        </div>
        <button type="submit">Update</button>
      </form>
      {showSuccess && (
        <SuccessNotification
          message="Profile updated successfully!"
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default SettingsPage;