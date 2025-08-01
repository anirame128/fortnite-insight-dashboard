'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Define types for notifications
type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number; // in milliseconds, optional
}

// Context value type
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

// Create context with default values
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove notification after duration if specified
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Prevent SSR issues with context
  if (!mounted) {
    return null;
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

// Hook to use notification context
export function useNotification() {
  const context = useContext(NotificationContext);
  
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  
  return context;
}