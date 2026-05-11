'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { TOC_ITEMS } from '@/data/guide-data'

export function SearchDialog({ open, onClose, theme }: { open: boolean; onClose: () => void; theme: 'dark' | 'light' }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClose = useCallback(() => {
    setQuery('')
    setSelectedIndex(0)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        handleClose()
      }
      if (e.key === 'Escape' && open) handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, handleClose])

  const results = query.length > 0
    ? TOC_ITEMS.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : TOC_ITEMS

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    }
    if (e.key === 'Enter' && results[selectedIndex]) {
      handleClose()
      document.getElementById(results[selectedIndex].id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }


  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 backdrop-blur-sm z-[100] bg-[var(--nyc-bg-overlay-modal)]`}
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className={`fixed top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-[101] border rounded-lg shadow-2xl overflow-hidden bg-[var(--nyc-bg-overlay)] border-[var(--nyc-border-default)]`}
          >
            <div className={`flex items-center gap-3 px-4 py-3 border-b border-[var(--nyc-border-default)]`}>
              <Search className="w-4 h-4 text-[var(--nyc-taxi)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Поиск по разделам..."
                className={`flex-1 bg-transparent text-sm outline-none text-[var(--nyc-text-heading)] placeholder:text-[var(--nyc-text-placeholder)]`}
              />
              <div className="flex items-center gap-1">
                <kbd className={`text-[10px] font-mono px-1 py-0.5 rounded text-[var(--nyc-text-icon)] bg-[var(--nyc-bg-interactive-hover)]`}>↑↓</kbd>
                <kbd className={`text-[10px] font-mono px-1 py-0.5 rounded text-[var(--nyc-text-icon)] bg-[var(--nyc-bg-interactive-hover)]`}>↵</kbd>
                <kbd className={`text-[10px] font-mono px-1.5 py-0.5 rounded text-[var(--nyc-text-muted)] bg-[var(--nyc-bg-interactive-hover)]`}>ESC</kbd>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {results.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    index === selectedIndex
                      ? 'bg-[var(--nyc-bg-active)] text-[var(--nyc-text-active)]'
                      : 'hover:bg-[var(--nyc-bg-interactive-hover)] text-[var(--nyc-text-heading)]'
                  }`}
                >
                  <span className="font-mono text-xs w-5 shrink-0">{item.label}</span>
                  <item.icon className={`w-3.5 h-3.5 shrink-0 ${index === selectedIndex ? 'text-[var(--nyc-taxi)]' : 'text-[var(--nyc-text-icon)]'}`} />
                  <span className={index === selectedIndex ? ('text-[var(--nyc-text-active)]') : 'text-[var(--nyc-text-interactive)]'}>{item.title}</span>
                </a>
              ))}
              {results.length === 0 && (
                <div className={`px-3 py-6 text-center text-sm text-[var(--nyc-text-icon)]`}>Ничего не найдено</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
