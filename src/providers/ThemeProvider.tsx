/**
 * PROVIDERS LAYER
 * ThemeProvider - wraps the app with theme context
 * 
 * Anti-monolith: providers import from hooks, ui, tokens
 */

'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { colors } from '@/tokens';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  th: (dark: string, light: string) => string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({ 
  children, 
  defaultTheme = 'dark' 
}: ThemeProviderProps) {
  // Initialize from localStorage on mount
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('zcode-theme') as Theme | null;
      if (stored && (stored === 'dark' || stored === 'light')) {
        return stored;
      }
    }
    return defaultTheme;
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('zcode-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Helper for conditional values
  const th = (dark: string, light: string) => theme === 'light' ? light : dark;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, th }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// Re-export for convenience
export { useTheme as useThemeContext };
