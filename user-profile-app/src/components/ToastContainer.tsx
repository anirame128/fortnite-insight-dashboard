'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export default function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemove = useCallback((id: string) => {
    onRemove(id);
  }, [onRemove]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={handleRemove}
        />
      ))}
    </div>,
    document.body
  );
}

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toast.duration !== 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, toast.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const typeStyles = {
    success: {
      bg: 'bg-[var(--success-bg)]',
      border: 'border-[var(--success-border)]',
      text: 'text-[var(--success-text)]',
      icon: '✓',
    },
    error: {
      bg: 'bg-[var(--error-bg)]',
      border: 'border-[var(--error-border)]',
      text: 'text-[var(--error-text)]',
      icon: '✕',
    },
    warning: {
      bg: 'bg-[var(--warning-bg)]',
      border: 'border-[var(--warning-border)]',
      text: 'text-[var(--warning-text)]',
      icon: '⚠',
    },
    info: {
      bg: 'bg-[var(--info-bg)]',
      border: 'border-[var(--info-border)]',
      text: 'text-[var(--info-text)]',
      icon: 'ℹ',
    },
  };

  const style = typeStyles[toast.type];

  return (
    <div
      className={`
        ${style.bg} ${style.border} ${style.text}
        min-w-[300px] max-w-md rounded-lg border p-4 shadow-lg
        transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-lg" aria-hidden="true">{style.icon}</span>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
        <button
          type="button"
          className="ml-4 inline-flex rounded-md p-1.5 hover:bg-[var(--hover-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}