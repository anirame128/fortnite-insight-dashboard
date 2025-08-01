'use client';

import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useContext,
} from 'react';

export interface Notification {
  id: string;
  title: string;
  message?: string;
  type: 'info' | 'success' | 'warning' | 'error';
  autoDismiss?: boolean;
  dismissDuration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const DEFAULT_DISMISS_DURATION = 5000;

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newNotification: Notification = {
        ...notification,
        id,
      };

      setNotifications(prev => [...prev, newNotification]);

      if (notification.autoDismiss !== false) {
        const duration = notification.dismissDuration ?? DEFAULT_DISMISS_DURATION;
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }
    },
    [removeNotification]
  );

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Prevent SSR mismatches
  if (!mounted) {
    return <div className="hidden" />;
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}