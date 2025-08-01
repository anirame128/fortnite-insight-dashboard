// src/app/dashboard/settings/SettingsForm.tsx

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserSettings } from '@/app/api/user/settings/route'; // Adjust the import path as necessary
import './SettingsForm.css'; // Optional: Add styles for the form

const settingsSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long').optional(),
});

type SettingsFormInputs = z.infer<typeof settingsSchema>;

const SettingsForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<SettingsFormInputs>({
    resolver: zodResolver(settingsSchema),
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: SettingsFormInputs) => {
    setSubmitError(null);
    try {
      await updateUserSettings(data);
    } catch (error) {
      setSubmitError('Failed to update settings. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" {...register('username')} />
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      {submitError && <span className="error">{submitError}</span>}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update Settings'}
      </button>
      {isSubmitSuccessful && <span className="success">Settings updated successfully!</span>}
    </form>
  );
};

export default SettingsForm;