'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationItem from '@/components/NotificationItem';

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();
  const [mounted, setMounted] = useState(false);
  const portalRef = useRef<Element | null>(null);

  useEffect(() => {
    setMounted(true);
    portalRef.current = document.getElementById('__next') || document.body;
  }, []);

  if (!mounted || !portalRef.current) {
    return null;
  }

  return createPortal(
    <div 
      className="fixed top-4 right-4 z-[9999] flex flex-col items-end space-y-2"
      role="region" 
      aria-live="polite"
      aria-label="Notifications"
    >
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>,
    portalRef.current
  );
}