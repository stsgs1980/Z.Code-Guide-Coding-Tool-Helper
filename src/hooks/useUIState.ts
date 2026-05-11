'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export function useUIState() {
  const [mobileNav, setMobileNav] = useState(false)
  const closeMobileNav = useCallback(() => setMobileNav(false), [])
  const [searchOpen, setSearchOpen] = useState(false)
  const [tourOpen, setTourOpen] = useState(false)
  const [tourStep, setTourStep] = useState(0)
  const [tourCompleted, setTourCompleted] = useLocalStorage<boolean>('nyc-tour-completed', false)
  const [helperFilter, setHelperFilter] = useState('')
  const [runningCmd, setRunningCmd] = useState('')
  const [errorExpanded, setErrorExpanded] = useState<string[]>([])
  const [faqExpanded, setFaqExpanded] = useState<string[]>([])
  const [tocPanelOpen, setTocPanelOpen] = useState(false)
  const [quickJumpOpen, setQuickJumpOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const [installSelections, setInstallSelections] = useLocalStorage<Record<string, boolean>>('nyc-install-selections', {})
  const quickJumpRef = useRef<HTMLDivElement>(null)

  // Close quick jump on click outside
  useEffect(() => {
    if (!quickJumpOpen) return
    const handleClick = (e: MouseEvent) => {
      if (quickJumpRef.current && !quickJumpRef.current.contains(e.target as Node)) {
        setQuickJumpOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [quickJumpOpen])

  return {
    mobileNav, setMobileNav, closeMobileNav,
    searchOpen, setSearchOpen,
    tourOpen, setTourOpen,
    tourStep, setTourStep,
    tourCompleted, setTourCompleted,
    helperFilter, setHelperFilter,
    runningCmd, setRunningCmd,
    errorExpanded, setErrorExpanded,
    faqExpanded, setFaqExpanded,
    tocPanelOpen, setTocPanelOpen,
    quickJumpOpen, setQuickJumpOpen,
    shortcutsOpen, setShortcutsOpen,
    installSelections, setInstallSelections,
    quickJumpRef,
  }
}
