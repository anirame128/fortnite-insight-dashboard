'use client';

import { motion } from 'framer-motion';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationItem } from '@/components/NotificationItem';
import type { Notification } from '@/types/notification';

export default function NotificationContainer() {
  const { notifications } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div 
      className="fixed top-4 right-4 z-50 w-full max-w-xs"
      aria-live="polite"
      aria-label="Notifications"
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {notifications.map((notification: Notification) => (
          <motion.div
            key={notification.id}
            layout
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
              exit: { opacity: 0, x: 20 }
            }}
            transition={{ duration: 0.3 }}
            className="mb-2"
          >
            <NotificationItem notification={notification} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}