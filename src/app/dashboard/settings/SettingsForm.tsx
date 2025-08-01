// src/app/dashboard/settings/SettingsForm.tsx

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSettings } from '@/app/api/user/settings/route';

const settingsSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
});

type SettingsFormInputs = z.infer<typeof settingsSchema>;

const SettingsForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormInputs>({
    resolver: zodResolver(settingsSchema),
  });

  const onSubmit = async (data: SettingsFormInputs) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    
    try {
      await updateUserSettings(data);
      setSuccessMessage('Settings updated successfully!');
    } catch (error) {
      setErrorMessage('Failed to update settings. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" {...register('username')} />
        {errors.username && <span role="alert">{errors.username.message}</span>}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span role="alert">{errors.email.message}</span>}
      </div>
      
      <div>
        <label htmlFor="password">Password (optional)</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <span role="alert">{errors.password.message}</span>}
      </div>
      
      {errorMessage && <div role="alert">{errorMessage}</div>}
      {successMessage && <div role="alert">{successMessage}</div>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update Settings'}
      </button>
    </form>
  );
};

export default SettingsForm;