// src/app/dashboard/settings/page.tsx

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateUserSettings } from '@/app/api/user/settings/route';
import { UserSettings } from '@/types/UserSettings';

const SettingsPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserSettings>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: UserSettings) => {
    setLoading(true);
    try {
      await updateUserSettings(data);
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error('Failed to update settings. Please try again.');
      console.error('Error updating settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <h1>User Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <span className="error">{errors.username.message}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'Email is required', 
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } 
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register('password', { 
              minLength: { value: 6, message: 'Password must be at least 6 characters' } 
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Settings'}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;