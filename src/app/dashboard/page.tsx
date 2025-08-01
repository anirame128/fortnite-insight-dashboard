'use client';

import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { fetchSettings } from './settings/hooks/useSettings'; // Adjust the import path as necessary

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const userSettings = await fetchSettings();
        setSettings(userSettings);
      } catch (err) {
        setError('Failed to fetch user settings');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  redirect('/dashboard/profile');
}