"use client";

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center p-1 rounded-full bg-gray-200 dark:bg-gray-700 w-16 h-8 btn-icon glass-bg shadow-soft transition-all duration-300 focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div
        className={`absolute flex items-center justify-center w-6 h-6 rounded-full bg-primary dark:bg-primary-dark transform transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-8' : 'translate-x-0'
        }`}
      >
        {theme === 'dark' ? (
          <SunIcon className="h-4 w-4 text-white" />
        ) : (
          <MoonIcon className="h-4 w-4 text-white" />
        )}
      </div>
    </button>
  );
}