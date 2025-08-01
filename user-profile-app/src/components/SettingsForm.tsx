'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const settingsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsForm() {
  const [mounted, setMounted] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: SettingsFormData) => {
    // Handle form submission
    console.log(data);
  };

  if (!mounted) return <div className="w-6 h-6" />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-[var(--background)]">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)]">
          Name
        </label>
        <input
          {...register('name')}
          id="name"
          type="text"
          className="block w-full p-2 mt-1 text-sm border border-gray-300 rounded-md bg-[var(--background)] text-[var(--foreground)]"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">
          Email
        </label>
        <input
          {...register('email')}
          id="email"
          type="email"
          className="block w-full p-2 mt-1 text-sm border border-gray-300 rounded-md bg-[var(--background)] text-[var(--foreground)]"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full p-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}