'use client'

import React from 'react'

/* Inline SVG micro-icons — No-Unicode Policy v2.1 compliant */

function SvgCheck({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`w-3.5 h-3.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
    </svg>
  )
}

function SvgCross({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`w-3.5 h-3.5 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M4 4L12 12M12 4L4 12" />
    </svg>
  )
}

function SvgBolt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`w-3 h-3 ${className}`} fill="currentColor">
      <path d="M9 1L3 9h4l-1 6 6-8H8l1-6z" />
    </svg>
  )
}

function SvgHalf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`w-3 h-3 ${className}`} fill="currentColor">
      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 1.5v11a5.5 5.5 0 0 1 0-11z" />
    </svg>
  )
}

function SvgDiamond({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`w-3 h-3 ${className}`} fill="currentColor">
      <path d="M8 2L14 8L8 14L2 8Z" />
    </svg>
  )
}

function SvgDot({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`w-3 h-3 ${className}`} fill="currentColor">
      <circle cx="8" cy="8" r="5" />
    </svg>
  )
}

export function StatusDot({ status }: { status: boolean | string }) {
  if (status === true) return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-green-500/15 text-green-400 border border-green-500/20">
      <SvgCheck />
    </span>
  )
  if (status === false) return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-red-500/10 text-red-400/70 border border-red-500/15">
      <SvgCross />
    </span>
  )
  const s = status as string
  const styleMap: Record<string, { bg: string; text: string; border: string; Icon: React.FC<{ className?: string }> }> = {
    native:  { bg: 'bg-emerald-500/12', text: 'text-emerald-400', border: 'border-emerald-500/20', Icon: SvgBolt },
    builtin: { bg: 'bg-emerald-500/12', text: 'text-emerald-400', border: 'border-emerald-500/20', Icon: SvgBolt },
    partial: { bg: 'bg-amber-500/12', text: 'text-amber-400', border: 'border-amber-500/20', Icon: SvgHalf },
    mcp:     { bg: 'bg-blue-500/12', text: 'text-blue-400', border: 'border-blue-500/20', Icon: SvgDiamond },
  }
  const style = styleMap[s] || { bg: 'bg-[var(--nyc-taxi)]/10', text: 'text-[var(--nyc-taxi)]', border: 'border-[var(--nyc-taxi)]/15', Icon: SvgDot }
  const { Icon, ...rest } = style
  return (
    <span className={`inline-flex items-center justify-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${rest.bg} ${rest.text} border ${rest.border}`}>
      <Icon className="w-3 h-3" /> {s}
    </span>
  )
}
