// src/app/dashboard/settings/SettingsForm.tsx

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const settingsSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type SettingsFormInputs = z.infer<typeof settingsSchema>;

interface SettingsFormProps {
  onSubmit: (data: SettingsFormInputs) => Promise<void>;
  initialValues?: SettingsFormInputs;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onSubmit, initialValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormInputs>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialValues,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleFormSubmit = async (data: SettingsFormInputs) => {
    setSubmitError(null);
    try {
      await onSubmit(data);
    } catch (error) {
      setSubmitError('Failed to update settings. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" {...register('username')} />
        {errors.username && <span>{errors.username.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      {submitError && <div role="alert">{submitError}</div>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : 'Update Settings'}
      </button>
    </form>
  );
};

export default SettingsForm;