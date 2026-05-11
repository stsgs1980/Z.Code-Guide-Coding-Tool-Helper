'use client'

import React from 'react'
import { ClipboardList } from 'lucide-react'
import { ToastContext } from '@/hooks/useToast'

export function CopyAllButton() {
  const { addToast } = React.useContext(ToastContext)
  const allCommands = `npx @z_ai/coding-helper init
coding-helper auth
coding-helper lang set ru
coding-helper doctor

# OpenCode config
npx @anthropic-ai/opencode@latest

# Stitch MCP
npx @_davideast/stitch-mcp init

# Magic MCP (optional)
npx skills add @anthropic-ai/magic-mcp --global`

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(allCommands)
      addToast('Все команды скопированы!', 'success')
    } catch {
      addToast('Не удалось скопировать', 'info')
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--nyc-taxi)]/10 border border-[var(--nyc-taxi)]/20 text-[var(--nyc-taxi)] text-xs font-mono hover:bg-[var(--nyc-taxi)]/20 transition-all duration-200 mb-6"
    >
      <ClipboardList className="w-3.5 h-3.5" />
      Скопировать все команды
    </button>
  )
}
