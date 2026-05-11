'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ArrowRight, Check, X, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TOUR_STEPS } from '@/data/guide-data'

export function GuideTour({ open, onClose, currentStep, onNext, onPrev, theme }: {
  open: boolean
  onClose: () => void
  currentStep: number
  onNext: () => void
  onPrev: () => void
  theme: 'dark' | 'light'
}) {
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null)
  const step = TOUR_STEPS[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === TOUR_STEPS.length - 1

  useEffect(() => {
    if (open && step) {
      const el = document.getElementById(step.target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => {
          const rect = el.getBoundingClientRect()
          setHighlightRect(rect)
        }, 500)
      }
    }
  }, [open, currentStep, step])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' || e.key === 'Enter') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose, onNext, onPrev])

  if (!highlightRect || !open) return null

  const padding = 12
  const tooltipWidth = 400
  const tooltipHeight = 220 // estimated tooltip height
  const vw = window.innerWidth
  const vh = window.innerHeight

  // Calculate tooltip position — prefer below the highlight, but flip above if needed
  let tooltipTop = highlightRect.bottom + padding + 8
  let tooltipLeft = Math.max(16, Math.min(
    highlightRect.left + highlightRect.width / 2 - tooltipWidth / 2,
    vw - tooltipWidth - 16
  ))

  // If tooltip would go below viewport, place it above the highlight instead
  if (tooltipTop + tooltipHeight > vh - 16) {
    tooltipTop = Math.max(16, highlightRect.top - padding - tooltipHeight - 8)
  }

  // If tooltip still goes below, center it on screen
  if (tooltipTop + tooltipHeight > vh - 16) {
    tooltipTop = Math.max(16, (vh - tooltipHeight) / 2)
    tooltipLeft = Math.max(16, (vw - tooltipWidth) / 2)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[199] pointer-events-auto"
            style={{ background: 'var(--nyc-bg-overlay-modal)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Highlight border */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-[200] rounded-lg pointer-events-none"
            style={{
              top: highlightRect.top - padding,
              left: highlightRect.left - padding,
              width: highlightRect.width + padding * 2,
              height: highlightRect.height + padding * 2,
              border: '2px solid var(--nyc-taxi)',
              boxShadow: '0 0 20px oklch(0.78 0.16 85 / 20%), inset 0 0 20px oklch(0.78 0.16 85 / 5%)',
            }}
          />

          {/* Tooltip card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[202] w-[400px] max-w-[calc(100vw-32px)] pointer-events-auto"
            style={{
              top: tooltipTop,
              left: tooltipLeft,
            }}
          >
            <div className={`border rounded-xl shadow-2xl overflow-hidden bg-[var(--nyc-bg-card)] border-[var(--nyc-taxi-border)]`}>
              {/* Header */}
              <div className={`flex items-center gap-3 px-5 py-4 border-b border-[var(--nyc-border-faint)]`}>
                <div className="w-8 h-8 rounded-lg bg-[var(--nyc-taxi)]/15 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[var(--nyc-taxi)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-base font-semibold truncate text-[var(--nyc-text-heading)]`}>{step.title}</h3>
                  <span className={`text-[10px] font-mono text-[var(--nyc-text-muted)]`}>
                    Шаг {currentStep + 1} из {TOUR_STEPS.length}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className={`p-1.5 rounded transition-colors hover:bg-[var(--nyc-bg-icon-hover)] text-[var(--nyc-text-icon)] hover:text-[var(--nyc-text-icon-hover)]`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                <p className={`text-sm leading-relaxed text-[var(--nyc-text-body)]`}>{step.description}</p>
              </div>

              {/* Progress dots */}
              <div className="px-5 pb-2 flex items-center justify-center gap-1.5">
                {TOUR_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentStep
                        ? 'w-6 h-1.5 bg-[var(--nyc-taxi)]'
                        : i < currentStep
                          ? 'w-1.5 h-1.5 bg-[var(--nyc-taxi)]/40'
                          : 'w-1.5 h-1.5 bg-[var(--nyc-border-separator)]'
                    }`}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className={`flex items-center justify-between px-5 py-3 border-t border-[var(--nyc-border-faint)]`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onPrev}
                  disabled={isFirst}
                  className={`text-[var(--nyc-text-icon)] hover:text-[var(--nyc-text-icon-hover)] gap-1 h-7 px-2 text-xs disabled:opacity-20`}
                >
                  <ChevronLeft className="w-3 h-3" />
                  Назад
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className={`text-[var(--nyc-text-icon)] hover:text-[var(--nyc-text-icon-hover)] h-7 px-2 text-xs`}
                  >
                    Пропустить
                  </Button>
                  {isLast ? (
                    <Button
                      size="sm"
                      onClick={onClose}
                      className="bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] font-bold h-7 px-4 text-xs gap-1.5"
                    >
                      <Check className="w-3 h-3" />
                      Завершить
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={onNext}
                      className="bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] font-bold h-7 px-4 text-xs gap-1.5"
                    >
                      Далее
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
