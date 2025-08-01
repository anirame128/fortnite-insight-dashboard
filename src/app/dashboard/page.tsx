'use client';

import React, { useEffect } from 'react';
import { useSettings } from './hooks/useSettings';
import { SettingsForm } from './SettingsForm';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const { settings, updateSettings, error } = useSettings();

  useEffect(() => {
    if (error) {
      toast.error('Failed to load settings. Please try again.');
    }
  }, [error]);

  const handleSettingsUpdate = async (newSettings) => {
    try {
      await updateSettings(newSettings);
      toast.success('Settings updated successfully!');
    } catch (err) {
      toast.error('Failed to update settings. Please try again.');
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <SettingsForm settings={settings} onSubmit={handleSettingsUpdate} />
    </div>
  );
};

export default DashboardPage;