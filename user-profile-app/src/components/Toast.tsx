'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { ToastVariant } from '@/types/toast';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface ToastProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  onDismiss: (id: string) => void;
  duration?: number;
}

const variantStyles = {
  success: {
    container: 'bg-green-100 border-green-500',
    icon: 'text-green-500',
    progress: 'bg-green-500',
  },
  error: {
    container: 'bg-red-100 border-red-500',
    icon: 'text-red-500',
    progress: 'bg-red-500',
  },
  warning: {
    container: 'bg-yellow-100 border-yellow-500',
    icon: 'text-yellow-500',
    progress: 'bg-yellow-500',
  },
  info: {
    container: 'bg-blue-100 border-blue-500',
    icon: 'text-blue-500',
    progress: 'bg-blue-500',
  },
};

const variantIcons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

export default function Toast({
  id,
  message,
  variant = 'info',
  onDismiss,
  duration = 5000,
}: ToastProps) {
  const [progress, setProgress] = useState(100);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const styles = variantStyles[variant];
  const IconComponent = variantIcons[variant];

  const handleDismiss = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    onDismiss(id);
  };

  useEffect(() => {
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev - (100 / (duration / 100));
        if (newProgress <= 0) {
          handleDismiss();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className={`relative flex items-start p-4 rounded-lg shadow-lg border-l-4 ${styles.container} bg-[var(--background)] text-[var(--foreground)]`}
    >
      <div className="flex-shrink-0">
        <IconComponent className={`h-6 w-6 ${styles.icon}`} />
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <div className="ml-4 flex flex-shrink-0">
        <button
          onClick={handleDismiss}
          className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1">
        <div 
          className={`h-full ${styles.progress} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
}