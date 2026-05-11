'use client'

import React, { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import { COPY_FEEDBACK_DURATION } from '@/lib/constants'

export function CopyButton({ text, className = '', onCopied, theme }: { text: string; className?: string; onCopied?: () => void; theme?: 'dark' | 'light' }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    try {
      navigator.clipboard.writeText(text)
      setCopied(true)
      onCopied?.()
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION)
    } catch {
      // Fallback: select text via textarea
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION)
    }
  }, [text, onCopied])
  return (
    <button
      onClick={handleCopy}
      className={`p-1 rounded transition-all duration-200 group/copy bg-[var(--nyc-bg-interactive-hover)] hover:bg-[var(--nyc-bg-icon-hover)] ${className}`}
      aria-label="Copy code"
    >
      {copied
        ? <Check className="w-3 h-3 text-green-400" />
        : <Copy className={`w-3 h-3 text-[var(--nyc-text-icon)] group-hover/copy:text-[var(--nyc-text-icon-hover)]`} />
      }
    </button>
  )
}
