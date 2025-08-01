'use client';

import React from 'react';
import ErrorNotification from '../dashboard/settings/ErrorNotification';

export default function ErrorPage({ error }: { error: Error }) {
  const errorMessage = error?.message || 'Sorry, something went wrong';

  return (
    <div>
      <h1>Error</h1>
      <ErrorNotification errorMessage={errorMessage} />
    </div>
  );
}