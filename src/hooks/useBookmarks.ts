'use client'

import React, { useCallback, createContext } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export const BookmarkContext = createContext<{
  bookmarks: Set<string>
  toggleBookmark: (sectionId: string) => void
}>({ bookmarks: new Set(), toggleBookmark: () => {} })

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<Set<string>>('nyc-bookmarks', new Set(), {
    serialize: (v) => JSON.stringify([...v]),
    deserialize: (raw) => new Set(JSON.parse(raw)),
  })

  const toggleBookmark = useCallback((sectionId: string) => {
    setBookmarks(prev => {
      const next = new Set(prev)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })
  }, [setBookmarks])

  return { bookmarks, toggleBookmark }
}
