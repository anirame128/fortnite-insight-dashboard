// src/app/dashboard/settings/page.tsx

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateUserSettings } from '@/app/api/user/settings/route';
import { UserSettings } from '@/types/UserSettings';
import { Button, Input, FormGroup, Label } from '@/components/ui'; // Assuming these components exist
import 'react-toastify/dist/ReactToastify.css';

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">
      <h1>User Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            {...register('username', { required: 'Username is required' })}
            aria-invalid={errors.username ? 'true' : 'false'}
          />
          {errors.username && <span role="alert">{errors.username.message}</span>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { 
              required: 'Email is required', 
              pattern: { value: /^\S+@\S+$/, message: 'Email is not valid' } 
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <span role="alert">{errors.email.message}</span>}
        </FormGroup>

        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Settings'}
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;