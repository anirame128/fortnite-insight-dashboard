// src/app/dashboard/settings/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UserProfile {
  name: string;
  email: string;
}

const SettingsPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserProfile>();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user/settings');
        setInitialData(response.data);
        reset(response.data);
      } catch (error) {
        toast.error('Failed to load user profile.');
      }
    };

    fetchUserProfile();
  }, [reset]);

  const onSubmit = async (data: UserProfile) => {
    setLoading(true);
    try {
      await axios.put('/api/user/settings', data);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email', { 
              required: 'Email is required', 
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;