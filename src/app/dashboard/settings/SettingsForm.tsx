// src/app/dashboard/settings/SettingsForm.tsx

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserProfile } from '@/app/api/user/settings/route';
import { Notification } from '@/components/Notification'; // Assuming a Notification component exists

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  bio: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const SettingsForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateUserProfile(data);
      setSuccessMessage('Profile updated successfully!');
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Failed to update profile. Please try again.');
      setSuccessMessage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {errorMessage && <Notification type="error" message={errorMessage} />}
      {successMessage && <Notification type="success" message={successMessage} />}
      
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          {...register('username')}
          aria-invalid={!!errors.username}
          aria-describedby="username-error"
        />
        {errors.username && <span id="username-error">{errors.username.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && <span id="email-error">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          {...register('bio')}
          aria-describedby="bio-description"
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update Profile'}
      </button>
    </form>
  );
};

export default SettingsForm;