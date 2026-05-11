'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Hash, Star } from 'lucide-react'
import { ToastContext } from '@/hooks/useToast'
import { BookmarkContext } from '@/hooks/useBookmarks'
import { COPY_FEEDBACK_DURATION } from '@/lib/constants'

export function SectionHeader({ number, title, subtitle, readingTime }: { number: string; title: string; subtitle?: string; readingTime?: number }) {
  const [shareCopied, setShareCopied] = useState(false)
  const { addToast } = React.useContext(ToastContext)
  const { bookmarks, toggleBookmark } = React.useContext(BookmarkContext)

  const sectionMap: Record<string, string> = {
    '00': 'hero', '01': 'matrix', '02': 'platforms', '03': 'helper',
    '04': 'stagewise', '05': 'install', '06': 'mcp', '07': 'prompts',
    '08': 'cost', '08.5': 'wizard', '09': 'troubleshoot', '09.5': 'faq', '10': 'architecture', '11': 'checklist',
  }
  const sectionId = sectionMap[number.trim()] || 'hero'
  const isBookmarked = bookmarks.has(sectionId)

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#${sectionId}`
    try {
      navigator.clipboard.writeText(shareUrl)
      setShareCopied(true)
      addToast('Ссылка скопирована!', 'success')
    } catch {
      addToast('Не удалось скопировать ссылку', 'info')
    }
    setTimeout(() => setShareCopied(false), COPY_FEEDBACK_DURATION)
  }

  const handleBookmark = () => {
    toggleBookmark(sectionId)
    addToast(isBookmarked ? 'Закладка удалена' : 'Закладка добавлена', isBookmarked ? 'info' : 'success')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="mb-8 relative"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[var(--nyc-taxi)] rotate-45" />
          <span className="section-number font-mono text-sm">{number}</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[var(--nyc-taxi)]/30 to-transparent" />
        <button
          onClick={handleBookmark}
          className={`p-1 rounded transition-all ${isBookmarked ? 'text-[var(--nyc-taxi)]' : 'text-[var(--nyc-text-faint)] hover:text-[var(--nyc-taxi)] hover:bg-[var(--nyc-bg-interactive-hover)]'}`}
          title={isBookmarked ? 'Удалить закладку' : 'Добавить закладку'}
        >
          {isBookmarked ? <Star className="w-3 h-3 fill-[var(--nyc-taxi)]" /> : <Star className="w-3 h-3" />}
        </button>
        <div className="relative">
          <button
            onClick={handleShare}
            className="p-1 rounded text-[var(--nyc-text-faint)] hover:text-[var(--nyc-taxi)] hover:bg-[var(--nyc-bg-interactive-hover)] transition-all"
            title="Скопировать ссылку на раздел"
          >
            {shareCopied ? <Check className="w-3 h-3 text-green-400" /> : <Hash className="w-3 h-3" />}
          </button>
        </div>
        {readingTime && (
          <span className="text-[var(--nyc-text-faint)] text-[10px] font-mono flex items-center gap-1" title={`Время чтения: ~${readingTime} мин`}>
            ⏱ ~{readingTime} мин
          </span>
        )}
      </div>
      <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-[var(--nyc-text-muted)] mt-2 text-xs font-mono tracking-widest uppercase">
          {'<'}{subtitle}{' />'}
        </p>
      )}
    </motion.div>
  )
}
