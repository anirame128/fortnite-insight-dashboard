// src/app/dashboard/settings/ErrorNotification.tsx

'use client';

import React from 'react';
import { useEffect } from 'react';

interface ErrorNotificationProps {
  errorMessage: string | null;
  onClose: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ errorMessage, onClose }) => {
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [errorMessage, onClose]);

  if (!errorMessage) return null;

  return (
    <div role="alert" aria-live="assertive" style={{ backgroundColor: 'red', color: 'white', padding: '1em', borderRadius: '5px' }}>
      <strong>Error:</strong> {errorMessage}
      <button onClick={onClose} style={{ marginLeft: '1em', backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>
        Close
      </button>
    </div>
  );
};

export default ErrorNotification;