// src/app/dashboard/settings/SettingsForm.tsx

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserProfile } from '@/app/api/user/settings/route';
import { Button, Input, Notification } from '@/components'; // Assuming these components exist
import './SettingsForm.css'; // Assuming you have a CSS file for styles

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  bio: z.string().optional(),
});

type SettingsFormData = z.infer<typeof schema>;

const SettingsForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SettingsFormData>({
    resolver: zodResolver(schema),
  });
  
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const onSubmit = async (data: SettingsFormData) => {
    try {
      await updateUserProfile(data);
      setNotification({ message: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to update profile. Please try again.', type: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div>
        <label htmlFor="username">Username</label>
        <Input id="username" {...register('username')} />
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <Input id="bio" {...register('bio')} />
      </div>
      <Button type="submit" disabled={isSubmitting}>Update Profile</Button>
    </form>
  );
};

export default SettingsForm;