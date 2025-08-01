'use client'

import React, { useEffect, useState } from 'react';
import { fetchSettings } from '../dashboard/settings/hooks/useSettings'; // Adjust the import path as necessary

export default function ErrorPage() {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = async () => {
      try {
        // Simulate fetching settings and handling potential errors
        await fetchSettings();
      } catch (err) {
        setError(err);
      }
    };

    handleError();
  }, []);

  if (error) {
    return <p>Sorry, something went wrong: {error.message}</p>;
  }

  return <p>Sorry, something went wrong</p>;
}