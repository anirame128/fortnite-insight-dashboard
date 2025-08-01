'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { updateUserSettings } from '../../../app/api/user/settings/route';
import { validateEmail } from '../../../utils/validation';

const ProfileClient = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    // Fetch initial profile data
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setInitialData(data);
        setValue('email', data.email);
        setValue('name', data.name);
      } catch (error) {
        toast.error('Failed to load profile data');
      }
    };

    fetchProfileData();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const emailValidation = validateEmail(data.email);
      if (!emailValidation.isValid) {
        toast.error(`Email validation failed: ${emailValidation.errors.join(', ')}`);
        return;
      }

      const response = await updateUserSettings(data);
      if (response.ok) {
        toast.success('Profile updated successfully');
      } else {
        const errorData = await response.json();
        toast.error(`Error updating profile: ${errorData.message}`);
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name', { required: 'Name is required' })} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email', { required: 'Email is required' })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default ProfileClient;