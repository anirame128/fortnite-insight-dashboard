'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const toastStyles = {
  success: {
    icon: '✓',
    bg: 'bg-[var(--success-bg)]',
    border: 'border-[var(--success-border)]',
    text: 'text-[var(--success-text)]',
  },
  error: {
    icon: '✕',
    bg: 'bg-[var(--error-bg)]',
    border: 'border-[var(--error-border)]',
    text: 'text-[var(--error-text)]',
  },
  warning: {
    icon: '⚠',
    bg: 'bg-[var(--warning-bg)]',
    border: 'border-[var(--warning-border)]',
    text: 'text-[var(--warning-text)]',
  },
  info: {
    icon: 'ℹ',
    bg: 'bg-[var(--info-bg)]',
    border: 'border-[var(--info-border)]',
    text: 'text-[var(--info-text)]',
  },
};

export default function Toast({ id, message, type, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Trigger entrance animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for exit animation to complete
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  if (!isMounted) {
    return null;
  }

  const style = toastStyles[type];

  return (
    <div
      className={`
        ${style.bg} ${style.border} ${style.text}
        border rounded-lg shadow-lg p-4 min-w-[300px] max-w-md
        flex items-start gap-3
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
      aria-live="polite"
    >
      <span
        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold"
        aria-hidden="true"
      >
        {style.icon}
      </span>
      
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      
      <button
        onClick={handleClose}
        className="flex-shrink-0 p-1 rounded hover:bg-[var(--hover-bg)] transition-colors"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}