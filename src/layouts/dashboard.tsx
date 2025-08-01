import { useState, useEffect } from 'react';

const DashboardLayout = () => {
  const [theme, setTheme] = useState('light'); // Safe default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);

  // Don't render until mounted
  if (!mounted) return <div className="w-6 h-6" />;

  return (
    <html className={theme === 'dark' ? 'dark' : ''}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const stored = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = stored || (prefersDark ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
        <style>
          {`
            :root {
              --background: #ffffff;
              --foreground: #171717;
            }
            .dark {
              --background: #0a0a0a;
              --foreground: #ededed;
            }
          `}
        </style>
      </head>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        {/* Your dashboard content here */}
      </body>
    </html>
  );
};

export default DashboardLayout;