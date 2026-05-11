'use client'

import React, { useState, useCallback } from 'react'
import { Check, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { COPY_FEEDBACK_DURATION } from '@/lib/constants'
import {
  TOOLS,
  PLATFORMS,
  HELPER_COMMANDS,
  MCP_SERVERS,
  PROMPT_TEMPLATES,
  COST_SCENARIOS,
  ERRORS,
  CHECKLIST_ITEMS,
} from '@/data/guide-data'

function generateSummary(): string {
  const lines: string[] = []

  lines.push('UI Generation Stack — Единое руководство v1.0')
  lines.push('')

  // 01. Матрица инструментов
  lines.push('01. Матрица инструментов')
  for (const tool of TOOLS) {
    lines.push(`- ${tool.name} (${tool.type}) — ${tool.price}${tool.mcp ? ' [MCP]' : ''}`)
  }
  lines.push('')

  // 02. Платформы
  lines.push('02. Платформы')
  for (const p of PLATFORMS) {
    lines.push(`- ${p.name} — ${p.desc}`)
  }
  lines.push('')

  // 03. Coding Tool Helper
  lines.push('03. Coding Tool Helper')
  for (const cmd of HELPER_COMMANDS) {
    lines.push(`  ${cmd.cmd} — ${cmd.desc}`)
  }
  lines.push('')

  // 04. Stagewise (brief mention)
  lines.push('04. Stagewise — AI-браузер для веб-разработки (Free)')
  lines.push('')

  // 05. Установка
  lines.push('05. Установка')
  lines.push('npx @z_ai/coding-helper init')
  lines.push('coding-helper auth')
  lines.push('coding-helper lang set ru')
  lines.push('coding-helper doctor')
  lines.push('')

  // 06. MCP-серверы
  lines.push('06. MCP-серверы')
  for (const server of MCP_SERVERS) {
    lines.push(`- ${server.name} (${server.tool}) — ${server.desc}`)
  }
  lines.push('')

  // 07. Промпт-шаблоны
  lines.push('07. Промпт-шаблоны')
  for (const tmpl of PROMPT_TEMPLATES) {
    lines.push(`- ${tmpl.category}`)
  }
  lines.push('')

  // 08. Стоимость
  lines.push('08. Стоимость')
  for (const scenario of COST_SCENARIOS) {
    lines.push(`- ${scenario.name}: ${scenario.price} — ${scenario.tools}`)
  }
  lines.push('')

  // 09. Диагностика
  lines.push('09. Диагностика')
  for (const err of ERRORS) {
    lines.push(`- ${err.error} → ${err.fix}`)
  }
  lines.push('')

  // Checklist
  lines.push('11. Чек-лист')
  for (const item of CHECKLIST_ITEMS) {
    lines.push(`[ ] ${item.label}`)
  }

  return lines.join('\n')
}

export function CopySummaryButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    try {
      navigator.clipboard.writeText(generateSummary())
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION)
    } catch {
      // Fallback via execCommand
      const ta = document.createElement('textarea')
      ta.value = generateSummary()
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION)
    }
  }, [])

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      className="border-[var(--nyc-border-visible)] hover:bg-[var(--nyc-bg-interactive-hover)] hover:border-[var(--nyc-taxi)]/30 gap-2"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <ClipboardList className="w-4 h-4" />}
      {copied ? 'Скопировано!' : 'Скопировать сводку'}
    </Button>
  )
}
