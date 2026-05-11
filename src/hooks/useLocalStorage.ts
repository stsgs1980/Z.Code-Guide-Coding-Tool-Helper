'use client'

import { useState, useEffect, useRef } from 'react'

/**
 * SSR-safe localStorage hook with hydration, persistence, and cross-tab sync.
 * Moved from page.tsx monolith into a shared hook.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options?: {
    serialize?: (value: T) => string;
    deserialize?: (raw: string) => T;
  }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const serialize = options?.serialize ?? ((v: T) => JSON.stringify(v))
  const deserialize = options?.deserialize ?? ((raw: string) => JSON.parse(raw) as T)

  // Use useState with SSR-safe default; hydrate from localStorage on mount
  const [value, setValue] = useState<T>(defaultValue)
  const hydrated = useRef(false)

  // Hydrate from localStorage on mount (SSR-safe: default value used during SSR)
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw !== null) {
        setValue(deserialize(raw))
      }
    } catch { /* ignore parse errors */ }
    hydrated.current = true
  }, [key])
  /* eslint-enable react-hooks/set-state-in-effect */

  // Persist to localStorage when value changes (skip initial hydration)
  useEffect(() => {
    if (!hydrated.current) return
    try {
      localStorage.setItem(key, serialize(value))
    } catch { /* ignore quota errors */ }
  }, [value, key, serialize])

  // Listen for cross-tab storage changes
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== key) return
      try {
        const newVal = e.newValue !== null ? deserialize(e.newValue) : defaultValue
        setValue(newVal)
      } catch { /* ignore */ }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [key])

  return [value, setValue]
}
