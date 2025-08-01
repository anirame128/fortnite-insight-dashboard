// src/utils/hooks/useNotification.ts

import { useState, useEffect, useCallback } from 'react';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const useNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    const id = new Date().getTime().toString();
    const newNotification: Notification = { id, message, type };
    setNotifications((prev) => [...prev, newNotification]);

    // Automatically remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter(notification => notification.id !== id));
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};

export default useNotification;