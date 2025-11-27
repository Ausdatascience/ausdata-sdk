'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const { theme } = useTheme();
  const toggleTheme = theme.themeToggle;

  useEffect(() => {
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const handleToggle = () => {
    const html = document.documentElement;
    
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
      console.log('Switched to light mode');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
      console.log('Switched to dark mode');
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`group fixed top-6 right-6 p-3 rounded-2xl ${toggleTheme.background.light} ${toggleTheme.background.dark} shadow-lg hover:shadow-2xl transition-all duration-300 border ${toggleTheme.border.light} ${toggleTheme.border.dark} backdrop-blur-sm hover:scale-110 active:scale-95`}
      aria-label="Toggle theme"
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <svg
          className={`absolute inset-0 w-6 h-6 ${toggleTheme.iconDark} transition-all duration-500 ${
            isDark ? 'rotate-0 opacity-100 scale-100' : 'rotate-90 opacity-0 scale-50'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" strokeWidth={2} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"
          />
        </svg>

        {/* Moon icon */}
        <svg
          className={`absolute inset-0 w-6 h-6 ${toggleTheme.iconLight} transition-all duration-500 ${
            isDark ? '-rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        </svg>
      </div>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
}
