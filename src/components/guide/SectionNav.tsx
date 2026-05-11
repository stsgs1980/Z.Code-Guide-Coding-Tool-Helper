'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TOC_ITEMS } from '@/data/guide-data'

export function SectionNav({ currentId }: { currentId: string }) {
  const currentIndex = TOC_ITEMS.findIndex(item => item.id === currentId)
  if (currentIndex < 0) return null
  const prev = currentIndex > 0 ? TOC_ITEMS[currentIndex - 1] : null
  const next = currentIndex < TOC_ITEMS.length - 1 ? TOC_ITEMS[currentIndex + 1] : null

  return (
    <div className="flex items-center justify-between mt-8 mb-2">
      {prev ? (
        <a
          href={`#${prev.id}`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--nyc-text-icon)] hover:text-[var(--nyc-taxi)] hover:bg-[var(--nyc-bg-interactive-hover)] transition-all group/nav"
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover/nav:-translate-x-0.5 transition-transform" />
          <span className="font-mono">{prev.label}</span>
          <span className="hidden sm:inline">{prev.title}</span>
        </a>
      ) : <div />}
      {next ? (
        <a
          href={`#${next.id}`}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--nyc-text-icon)] hover:text-[var(--nyc-taxi)] hover:bg-[var(--nyc-bg-interactive-hover)] transition-all group/nav"
        >
          <span className="hidden sm:inline">{next.title}</span>
          <span className="font-mono">{next.label}</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover/nav:translate-x-0.5 transition-transform" />
        </a>
      ) : <div />}
    </div>
  )
}
