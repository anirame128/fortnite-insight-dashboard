'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { fetchSettings } from '@/utils/api'; // Adjust import based on your API utility

const ErrorPage = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleFetchSettings = async () => {
      try {
        const settings = await fetchSettings();
        // Handle settings data as needed
      } catch (err) {
        setError('Failed to load settings. Please try again later.');
        toast.error('Error loading settings: ' + (err instanceof Error ? err.message : 'Unknown error'));
      }
    };

    handleFetchSettings();
  }, []);

  return (
    <div>
      <h1>Error</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <p>Loading settings...</p>
      )}
    </div>
  );
};

export default ErrorPage;