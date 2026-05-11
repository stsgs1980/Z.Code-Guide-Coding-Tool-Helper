'use client'

import { useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<'dark' | 'light'>('nyc-theme', 'dark')

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }, [setTheme])

  return { theme, toggleTheme }
}
