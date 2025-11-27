'use client';

import { useState } from 'react';

export default function TestPage() {
  const [isDark, setIsDark] = useState(false);

  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Dark Mode Test</h1>
      <p className="mb-4">Current mode: {isDark ? 'Dark' : 'Light'}</p>
      
      <button
        onClick={toggle}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mb-4"
      >
        Toggle Dark Mode
      </button>

      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
        <p>This box should change color</p>
      </div>

      <div className="mt-4 p-4 border border-gray-300 dark:border-gray-700">
        <p>Border should change too</p>
      </div>
    </div>
  );
}
