// src/app/dashboard/settings/SuccessNotification.tsx

'use client';

import React from 'react';
import { useEffect } from 'react';

interface SuccessNotificationProps {
  message: string;
  onClose: () => void;
  duration?: number; // Optional duration to auto-dismiss the notification
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '1rem',
        borderRadius: '0.25rem',
        marginBottom: '1rem',
        border: '1px solid #c3e6cb',
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: '1rem',
          background: 'none',
          border: 'none',
          color: '#155724',
          cursor: 'pointer',
        }}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

export default SuccessNotification;