'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, BookOpen, ExternalLink, PartyPopper } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { SectionHeader } from '@/components/guide/SectionHeader'
import { CHECKLIST_ITEMS, SOURCES } from '@/data/guide-data'

interface ChecklistSectionProps {
  checkedItems: Record<string, boolean>
  toggleCheck: (id: string) => void
  checkedCount: number
  setCheckedItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

export function ChecklistSection({ checkedItems, toggleCheck, checkedCount, setCheckedItems }: ChecklistSectionProps) {
  return (
    <section id="checklist" className="py-12 pb-16 lg:py-20 lg:pb-20">
      <SectionHeader number="11" title="Чек-лист перед началом работы" subtitle="pre_launch_checklist" readingTime={1} />

      <Card className="nyc-card-enhanced">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-sm font-semibold tracking-tight">Прогресс настройки</span>
              {checkedCount > 0 && (
                <button
                  onClick={() => setCheckedItems({})}
                  className={`ml-auto text-[10px] font-mono text-[var(--nyc-text-icon)] hover:text-red-500 hover:bg-red-50 transition-colors px-2 py-0.5 rounded`}
                >
                  Сбросить
                </button>
              )}
            </div>
            <span className="text-[var(--nyc-taxi)] font-mono font-bold text-xs">{checkedCount}/{CHECKLIST_ITEMS.length}</span>
          </div>
          <Progress
            value={(checkedCount / CHECKLIST_ITEMS.length) * 100}
            className="h-2 mb-6 [&>div]:bg-[var(--nyc-taxi)]"
          />
          {checkedCount === CHECKLIST_ITEMS.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-4 rounded-lg bg-green-400/10 border border-green-400/20 text-center relative overflow-hidden"
            >
              {/* Confetti dots */}
              {Array.from({ length: 18 }).map((_, i) => {
                const colors = ['#FFC107', '#FF6B6B', '#4ECDC4', '#96CEB4', '#DDA0DD', '#45B7D1', '#FFB300', '#27C93F']
                const color = colors[i % colors.length]
                const left = `${5 + (i / 18) * 90}%`
                const delay = `${i * 0.08}s`
                // Deterministic pseudo-random based on index (avoids hydration mismatch)
                const seed = (i * 2654435761) >>> 0
                const confettiX = `${((seed % 1000) / 1000 - 0.5) * 80}px`
                const confettiRotate = `${(seed * 7) % 360}deg`
                return (
                  <span
                    key={i}
                    className="confetti-dot"
                    style={{
                      backgroundColor: color,
                      left,
                      bottom: '10px',
                      animationDelay: delay,
                      '--confetti-x': confettiX,
                      '--confetti-rotate': confettiRotate,
                    } as React.CSSProperties}
                  />
                )
              })}
              <div className="relative z-10">
                <PartyPopper className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <div className="text-sm text-green-400 font-bold">Все шаги выполнены!</div>
                <div className="text-xs text-green-400/60 mt-1">Среда разработки полностью настроена</div>
              </div>
            </motion.div>
          )}
          <div className="space-y-1">
            {CHECKLIST_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                onClick={() => toggleCheck(item.id)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[var(--nyc-bg-interactive-hover)] transition-all duration-200 text-left group"
              >
                {checkedItems[item.id] ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-5 h-5 rounded-md bg-[var(--nyc-taxi)] flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-black" />
                  </motion.div>
                ) : (
                  <div className="w-5 h-5 rounded-md border-2 border-[var(--nyc-border-default)] group-hover:border-[var(--nyc-taxi)]/30 transition-colors" />
                )}
                <item.icon className={`w-4 h-4 transition-colors ${checkedItems[item.id] ? 'text-[var(--nyc-taxi)]' : 'text-[var(--nyc-text-faint)]'}`} />
                <span className={`text-sm transition-colors ${
                  checkedItems[item.id]
                    ? 'text-[var(--nyc-taxi)] line-through opacity-60'
                    : 'text-[var(--nyc-concrete)]'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sources */}
      <Card className="nyc-card-enhanced mt-8">
        <CardContent className="p-5">
          <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[var(--nyc-taxi)]" />
            Источники
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs max-h-80 overflow-y-auto">
            {SOURCES.map(s => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="nyc-link-hover flex items-center gap-2 p-2 rounded bg-[var(--nyc-bg-interactive-hover)] hover:bg-[var(--nyc-bg-hover)] transition-colors group"
              >
                <span className="text-[var(--nyc-taxi)] font-mono text-[10px]">{s.id}</span>
                <span className="text-[var(--nyc-concrete)] group-hover:text-[var(--nyc-taxi)] transition-colors">{s.desc}</span>
                <ExternalLink className="w-2.5 h-2.5 text-[var(--nyc-taxi)]/30 group-hover:text-[var(--nyc-taxi)] ml-auto transition-colors" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
