'use client'

import { useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export function useChecklist() {
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<string, boolean>>('nyc-checklist', {})

  const toggleCheck = useCallback((id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }, [setCheckedItems])

  const checkedCount = Object.values(checkedItems).filter(Boolean).length

  return { checkedItems, toggleCheck, checkedCount }
}
