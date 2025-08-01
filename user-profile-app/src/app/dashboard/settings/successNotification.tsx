// src/app/dashboard/settings/successNotification.tsx

'use client';

import React from 'react';

interface SuccessNotificationProps {
  message: string;
  onClose: () => void;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({ message, onClose }) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg transition-opacity duration-300"
      onAnimationEnd={onClose}
    >
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>{message}</span>
        <button
          className="ml-auto text-white"
          onClick={onClose}
          aria-label="Close notification"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SuccessNotification;