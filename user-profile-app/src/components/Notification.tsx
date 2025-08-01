// user-profile-app/src/components/Notification.tsx
'use client';

import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  duration?: number; // Optional duration for auto-dismiss
}

const Notification: React.FC<NotificationProps> = ({ message, type, duration = 3000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded shadow-lg transition-opacity duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
      style={{
        opacity: visible ? 1 : 0,
      }}
    >
      {message}
    </div>
  );
};

export default Notification;