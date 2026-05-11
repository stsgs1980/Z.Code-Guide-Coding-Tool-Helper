'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SCROLL_TOP_THRESHOLD, QUICK_START_THRESHOLD, SECTION_DETECT_OFFSET } from '@/lib/constants'

interface TocItem {
  id: string
  label: string
  title: string
  icon: React.ComponentType<{ className?: string }>
}

export function useScrollNavigation(tocItems: TocItem[]) {
  const [activeSection, setActiveSection] = useState('hero')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showQuickStart, setShowQuickStart] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [visitedSections, setVisitedSections] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set()
    try {
      const raw = localStorage.getItem('nyc-visited')
      return raw ? new Set(JSON.parse(raw)) : new Set()
    } catch { return new Set() }
  })
  const allVisitedThisSessionRef = useRef(false)
  const [showAllVisitedToast, setShowAllVisitedToast] = useState(false)

  // Persist visited sections
  useEffect(() => {
    try { localStorage.setItem('nyc-visited', JSON.stringify([...visitedSections])) } catch {}
  }, [visitedSections])

  // Update URL hash on section change
  useEffect(() => {
    if (activeSection && activeSection !== 'hero') {
      window.history.replaceState(null, '', `#${activeSection}`)
    }
  }, [activeSection])

  // Scroll handler
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > SCROLL_TOP_THRESHOLD)
          setShowQuickStart(window.scrollY > QUICK_START_THRESHOLD)
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = scrollHeight > 0 ? Math.round((window.scrollY / scrollHeight) * 100) : 0
          setReadingProgress(progress)
          const sections = tocItems.map(item => document.getElementById(item.id))
          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i]
            if (section) {
              const rect = section.getBoundingClientRect()
              if (rect.top <= SECTION_DETECT_OFFSET) {
                const sectionId = tocItems[i].id
                setActiveSection(sectionId)
                setVisitedSections(prev => {
                  if (prev.has(sectionId)) return prev
                  const next = new Set([...prev, sectionId])
                  if (next.size === tocItems.length && !allVisitedThisSessionRef.current) {
                    allVisitedThisSessionRef.current = true
                    setShowAllVisitedToast(true)
                  }
                  return next
                })
                break
              }
            }
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  const scrollToNextSection = useCallback(() => {
    const currentIndex = tocItems.findIndex(item => item.id === activeSection)
    const next = tocItems[Math.min(currentIndex + 1, tocItems.length - 1)]
    document.getElementById(next.id)?.scrollIntoView({ behavior: 'smooth' })
  }, [activeSection, tocItems])

  const scrollToPrevSection = useCallback(() => {
    const currentIndex = tocItems.findIndex(item => item.id === activeSection)
    const prev = tocItems[Math.max(currentIndex - 1, 0)]
    document.getElementById(prev.id)?.scrollIntoView({ behavior: 'smooth' })
  }, [activeSection, tocItems])

  return {
    activeSection,
    showScrollTop,
    showQuickStart,
    readingProgress,
    visitedSections,
    showAllVisitedToast,
    setShowAllVisitedToast,
    scrollToNextSection,
    scrollToPrevSection,
  }
}
