<think>
Okay, I need to create a Notification component for a Next.js app using App Router, Tailwind CSS v4, and React with SSR support. Let me think about how to approach this.

First, the component should display success or error messages. So, I'll need to accept a type prop, which can be 'success' or 'error'. The message should be a string, and maybe an optional title.

I remember that in Tailwind v4, using dark mode with the 'dark:' prefix isn't reliable. Instead, I should use CSS variables. So, I'll set up classes using bg-[var(--background)] and text-[var(--foreground)] for the notification's background and text colors.

For the notification to appear and disappear, I'll need to use React's useState and useEffect hooks. The component should mount and then display the message. Maybe a timer to auto-dismiss it after a few seconds.

I should also ensure that the component is accessible. So, adding role="alert" and proper aria attributes would be good. Also, providing a way for the user to dismiss the notification, like a close button.

Since the project uses SSR, I need to make sure that any client-side features are handled correctly. Using 'use client' at the top of the file is necessary because I'm using React hooks.

I'll structure the component with a main div that centers the notification. Inside, a header with a title and close button, followed by the message. Styling with Tailwind classes for padding, margins, and transitions.

I should also handle cases where the message or title might be missing, but since the props are required, that's covered.

Finally, I'll export the component as a default export so it can be imported elsewhere without issues.
</think>


'use client';

import { useState, useEffect } from 'react';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  title?: string;
}

export default function Notification({ type, message, title }: NotificationProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setMounted(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div
      role="alert"
      className="fixed top-4 right-4 z-50 w-96 rounded-lg border-2 bg-[var(--background)] shadow-lg transition-all duration-300 ease-in-out"
      aria-live="assertive"
    >
      <div className={`p-4 ${type === 'error' ? 'border-red-500' : 'border-green-500'}`}>
        {title && (
          <h2 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
            {title}
          </h2>
        )}
        <p className="text-[var(--foreground)]">{message}</p>
        <button
          onClick={() => setMounted(false)}
          className="mt-4 text-[var(--foreground)] hover:text-gray-400"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}