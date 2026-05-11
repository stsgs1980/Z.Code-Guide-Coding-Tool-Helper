'use client'

import React, { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import { CopyButton } from '@/components/guide/CopyButton'

/* ───────────────────── SYNTAX HIGHLIGHTING ───────────────────── */

function highlightLine(line: string, lang: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let key = 0
  const trimmed = line.trimStart()

  // Comment handling
  if (lang === 'bash' && trimmed.startsWith('#')) {
    parts.push(<span key={key} className="token-comment">{line}</span>)
    return parts
  }
  if (lang === 'yaml' && trimmed.startsWith('#')) {
    parts.push(<span key={key} className="token-comment">{line}</span>)
    return parts
  }
  if ((lang === 'typescript' || lang === 'javascript' || lang === 'ts' || lang === 'js') && trimmed.startsWith('//')) {
    parts.push(<span key={key} className="token-comment">{line}</span>)
    return parts
  }

  // Empty line
  if (line.length === 0) {
    parts.push(' ')
    return parts
  }

  if (lang === 'bash') {
    let remaining = line
    const patterns: { regex: RegExp; cls: string }[] = [
      { regex: /^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'/, cls: 'token-string' },
      { regex: /^(npx|npm|curl|export|echo|cd|sudo|git|docker|yarn|pnpm|bun|pip|python|node|rm|mkdir|chmod|cat|ls|grep|sed|awk|find|source|sh|bash)\b/, cls: 'token-keyword' },
      { regex: /^--[a-zA-Z][\w-]*/, cls: 'token-variable' },
      { regex: /^-[a-zA-Z]\b/, cls: 'token-variable' },
      { regex: /^\s+/, cls: '' },
      { regex: /^./, cls: '' },
    ]
    while (remaining.length > 0) {
      let matched = false
      for (const { regex, cls } of patterns) {
        const match = remaining.match(regex)
        if (match) {
          const text = match[0]
          if (cls) {
            parts.push(<span key={key++} className={cls}>{text}</span>)
          } else {
            parts.push(text)
          }
          remaining = remaining.slice(text.length)
          matched = true
          break
        }
      }
      if (!matched) {
        parts.push(remaining[0])
        remaining = remaining.slice(1)
      }
    }
  } else if (lang === 'json') {
    let remaining = line
    const patterns: { regex: RegExp; cls: string }[] = [
      { regex: /^\s+/, cls: '' },
      { regex: /^"(?:[^"\\]|\\.)*"\s*:/, cls: 'token-property' },
      { regex: /^"(?:[^"\\]|\\.)*"/, cls: 'token-string' },
      { regex: /^-?\d+(\.\d+)?([eE][+-]?\d+)?/, cls: 'token-number' },
      { regex: /^(true|false|null)\b/, cls: 'token-boolean' },
      { regex: /^[}{\[\]:,]/, cls: 'token-punctuation' },
      { regex: /^./, cls: '' },
    ]
    while (remaining.length > 0) {
      let matched = false
      for (const { regex, cls } of patterns) {
        const match = remaining.match(regex)
        if (match) {
          const text = match[0]
          if (cls) {
            parts.push(<span key={key++} className={cls}>{text}</span>)
          } else {
            parts.push(text)
          }
          remaining = remaining.slice(text.length)
          matched = true
          break
        }
      }
      if (!matched) {
        parts.push(remaining[0])
        remaining = remaining.slice(1)
      }
    }
  } else if (lang === 'yaml') {
    let remaining = line
    const patterns: { regex: RegExp; cls: string }[] = [
      { regex: /^\s+/, cls: '' },
      { regex: /^[\w][\w.-]*\s*:/, cls: 'token-property' },
      { regex: /^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'/, cls: 'token-string' },
      { regex: /^-?\d+(\.\d+)?/, cls: 'token-number' },
      { regex: /^(true|false|null)\b/, cls: 'token-boolean' },
      { regex: /^#.*$/, cls: 'token-comment' },
      { regex: /^./, cls: '' },
    ]
    while (remaining.length > 0) {
      let matched = false
      for (const { regex, cls } of patterns) {
        const match = remaining.match(regex)
        if (match) {
          const text = match[0]
          if (cls) {
            parts.push(<span key={key++} className={cls}>{text}</span>)
          } else {
            parts.push(text)
          }
          remaining = remaining.slice(text.length)
          matched = true
          break
        }
      }
      if (!matched) {
        parts.push(remaining[0])
        remaining = remaining.slice(1)
      }
    }
  } else {
    parts.push(line)
  }

  return parts
}

export function CodeBlock({ code, lang = 'bash', theme: blockTheme }: { code: string; lang?: string; theme?: 'dark' | 'light' }) {
  const lines = code.split('\n')
  const lt = blockTheme === 'light'

  return (
    <figure className="code-listing relative group rounded-lg overflow-hidden border shadow-lg code-block-hover-glow">
      {/* Caption / Header bar */}
      <figcaption className="flex items-center gap-2 px-4 py-2 border-b bg-[var(--nyc-bg-code-header)] border-[var(--nyc-border-faint)]">
        {/* Language badge */}
        <span className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded ${
          lt
            ? 'bg-amber-100 text-amber-700 border border-amber-200'
            : 'bg-[var(--nyc-taxi)]/10 text-[var(--nyc-taxi)] border border-[var(--nyc-taxi)]/20'
        }`}>
          {lang}
        </span>
        <span className={`font-mono text-[10px] tracking-wide ${
          'text-[var(--nyc-text-icon)]'
        }`}>
          Листинг кода
        </span>
        <div className="ml-auto flex items-center gap-2">
          <CopyButton text={code} theme={blockTheme} />
        </div>
      </figcaption>
      {/* Code body */}
      <div className="p-0 overflow-x-auto bg-[var(--nyc-bg-code)]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, i) => (
              <tr key={i} className={`group/line transition-colors ${
                'hover:bg-[var(--nyc-bg-interactive-hover)]'
              }`}>
                {/* Line number gutter */}
                <td className={`w-10 shrink-0 text-right pr-3 pl-4 select-none font-mono text-[11px] leading-[1.8] align-top ${
                  'text-[var(--nyc-text-faint)]'
                } group-hover/line:text-[var(--nyc-text-icon)]`}>
                  {i + 1}
                </td>
                {/* Code content */}
                <td className="pr-4">
                  <div className="flex items-start gap-2 min-w-0">
                    {(lang === 'bash' && line.trim().length > 0 && !line.trimStart().startsWith('#')) && (
                      <span className={`font-mono text-sm leading-[1.8] shrink-0 select-none ${
                        'text-[var(--nyc-text-taxi)]'
                      }`}>{'>'}</span>
                    )}
                    <pre className={`font-mono text-[13px] leading-[1.8] whitespace-pre ${
                      'text-[var(--nyc-text-heading)]'
                    }`}>
                      {highlightLine(line, lang)}
                    </pre>
                  </div>
                </td>
              </tr>
            ))}
            {/* Cursor line */}
            <tr>
              <td className={`w-10 shrink-0 text-right pr-3 pl-4 select-none font-mono text-[11px] leading-[1.8] ${
                'text-[var(--nyc-text-faint)]'
              }`}>&nbsp;</td>
              <td className="pr-4">
                <div className="flex items-center gap-2">
                  {lang === 'bash' && (
                    <span className={`font-mono text-sm leading-[1.8] shrink-0 select-none ${
                      'text-[var(--nyc-text-taxi)]'
                    }`}>{'>'}</span>
                  )}
                  <span className={`nyc-typing-cursor font-mono text-sm leading-[1.8] ${
                    'text-[var(--nyc-text-heading)]'
                  }`} />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </figure>
  )
}
