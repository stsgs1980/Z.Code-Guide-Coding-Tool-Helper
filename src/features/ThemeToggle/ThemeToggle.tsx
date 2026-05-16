/**
 * FEATURES LAYER
 * ThemeToggle - dark/light theme switcher
 * 
 * Anti-monolith: may have state, uses providers
 */

'use client';

import { useTheme } from '@/providers/ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const th = (dark: string, light: string) => theme === 'light' ? light : dark;

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors group ${th('hover:bg-white/5', 'hover:bg-oklch(0.90 0 0)')}`}
      aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
    >
      <motion.div
        key={theme}
        initial={{ rotate: -30, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <Sun className={`h-4 w-4 group-hover:text-nyc-taxi transition-colors ${th('text-white/50', 'text-oklch(0.40 0 0)')}`} />
        ) : (
          <Moon className={`h-4 w-4 group-hover:text-nyc-taxi transition-colors ${th('text-white/50', 'text-oklch(0.40 0 0)')}`} />
        )}
      </motion.div>
    </button>
  );
}
