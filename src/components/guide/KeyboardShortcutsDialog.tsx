'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, X } from 'lucide-react'

export function KeyboardShortcutsDialog({ open, onClose, theme }: { open: boolean; onClose: () => void; theme: 'dark' | 'light' }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  const shortcuts = [
    { keys: 'Ctrl + K', desc: 'Поиск по разделам' },
    { keys: 'T', desc: 'Переключить тему' },
    { keys: 'J', desc: 'Следующий раздел' },
    { keys: 'K', desc: 'Предыдущий раздел' },
    { keys: '?', desc: 'Показать подсказки' },
    { keys: 'Esc', desc: 'Закрыть панель' },
  ]


  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 backdrop-blur-sm z-[100] bg-[var(--nyc-bg-overlay-modal)]`}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className={`fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[101] border rounded-xl shadow-2xl overflow-hidden bg-[var(--nyc-bg-card)] border-[var(--nyc-border-default)]`}
          >
            <div className={`flex items-center justify-between px-5 py-4 border-b border-[var(--nyc-border-faint)]`}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[var(--nyc-taxi)]/15 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-[var(--nyc-taxi)]" />
                </div>
                <span className="font-mono text-xs font-bold tracking-wider text-[var(--nyc-taxi)]">КЛАВИАТУРНЫЕ ПОДСКАЗКИ</span>
              </div>
              <button
                onClick={onClose}
                className={`p-1.5 rounded transition-colors hover:bg-[var(--nyc-bg-icon-hover)] text-[var(--nyc-text-icon)] hover:text-[var(--nyc-text-icon-hover)]`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="px-5 py-4 space-y-3">
              {shortcuts.map(s => (
                <div key={s.keys} className="flex items-center justify-between">
                  <span className={`text-sm text-[var(--nyc-text-body)]`}>{s.desc}</span>
                  <kbd className={`font-mono text-[11px] px-2 py-0.5 rounded border text-[var(--nyc-text-active)] bg-[var(--nyc-taxi-bg-subtle)] border-[var(--nyc-taxi-border)]`}>{s.keys}</kbd>
                </div>
              ))}
            </div>
            <div className={`px-5 py-3 border-t text-center border-[var(--nyc-border-faint)]`}>
              <span className={`text-[10px] font-mono text-[var(--nyc-text-icon)]`}>Нажмите Esc для закрытия</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
