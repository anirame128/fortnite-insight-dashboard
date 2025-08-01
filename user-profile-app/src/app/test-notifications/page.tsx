'use client';

import { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

export default function TestNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addNotification = (type: Notification['type'], title: string, message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date(),
    };
    setNotifications(prev => [newNotification, ...prev]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[var(--background)]" />;
  }

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Notification System Test</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => addNotification('success', 'Success!', 'Your action was completed successfully.')}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Success
          </button>
          
          <button
            onClick={() => addNotification('error', 'Error!', 'Something went wrong. Please try again.')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Error
          </button>
          
          <button
            onClick={() => addNotification('warning', 'Warning!', 'Please review your input before proceeding.')}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Warning
          </button>
          
          <button
            onClick={() => addNotification('info', 'Info', 'Here is some useful information for you.')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Info
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Notifications ({notifications.length})</h2>
          
          {notifications.length === 0 ? (
            <p className="text-[var(--foreground)] opacity-60">No notifications to display</p>
          ) : (
            <div className="space-y-3">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border flex items-start gap-3 ${getBackgroundColor(notification.type)}`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {notification.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Dismiss notification"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}