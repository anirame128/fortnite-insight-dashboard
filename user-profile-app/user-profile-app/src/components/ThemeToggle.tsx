// user-profile-app/src/components/ThemeToggle.tsx

import { useTheme } from '../hooks/useTheme'; // Adjust the path as necessary
import { MoonIcon, SunIcon } from 'lucide-react'; // Using existing dependency

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return <div className="w-6 h-6" />;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-muted hover:bg-muted/80 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;