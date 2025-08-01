'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationToastProps {
  id: string;
  message: string;
  type: NotificationType;
  onDismiss: (id: string) => void;
}

const typeStyles = {
  success: {
    container: 'border-green-500/30 bg-green-500/10',
    icon: 'text-green-500',
    title: 'text-green-400'
  },
  error: {
    container: 'border-red-500/30 bg-red-500/10',
    icon: 'text-red-500',
    title: 'text-red-400'
  },
  warning: {
    container: 'border-yellow-500/30 bg-yellow-500/10',
    icon: 'text-yellow-500',
    title: 'text-yellow-400'
  },
  info: {
    container: 'border-blue-500/30 bg-blue-500/10',
    icon: 'text-blue-500',
    title: 'text-blue-400'
  }
};

const typeIcons = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  )
};

export default function NotificationToast({ 
  id, 
  message, 
  type, 
  onDismiss 
}: NotificationToastProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const styles = typeStyles[type];
  const icon = typeIcons[type];

  useEffect(() => {
    setMounted(true);
    
    // Auto-dismiss after 5 seconds unless hovered
    const timer = setTimeout(() => {
      if (!isHovered) {
        onDismiss(id);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onDismiss, isHovered]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className="relative w-full max-w-sm overflow-hidden rounded-lg border backdrop-blur-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`p-4 ${styles.container}`}>
          <div className="flex items-start">
            <div className={`flex-shrink-0 ${styles.icon}`}>
              {icon}
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-[var(--foreground)]">
                {message}
              </p>
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className="inline-flex rounded-md text-[var(--foreground)] hover:text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-offset-2"
                onClick={() => onDismiss(id)}
                aria-label="Dismiss notification"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}