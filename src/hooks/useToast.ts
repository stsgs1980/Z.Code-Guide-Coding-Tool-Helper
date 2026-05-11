'use client'

import React, { useState, useCallback, createContext } from 'react'

const TOAST_DURATION = 3000

export type ToastItem = { id: string; message: string; type: 'success' | 'info' }

export const ToastContext = createContext<{
  addToast: (message: string, type: 'success' | 'info') => void
}>({ addToast: () => {} })

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((message: string, type: 'success' | 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, TOAST_DURATION)
  }, [])

  return { toasts, addToast }
}
