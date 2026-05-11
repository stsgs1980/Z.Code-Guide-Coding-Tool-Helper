'use client'

import React, { useMemo } from 'react'
import { Check, Copy, Terminal } from 'lucide-react'
import { ToastContext } from '@/hooks/useToast'
import { CodeBlock } from '@/components/guide/CodeBlock'
import { INSTALL_TOOLS } from '@/data/guide-data'

export function InstallScriptGenerator({ installSelections, setInstallSelections, theme }: {
  installSelections: Record<string, boolean>;
  setInstallSelections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  theme: 'dark' | 'light';
}) {
  const { addToast } = React.useContext(ToastContext)

  const allSelected = INSTALL_TOOLS.every(t => installSelections[t.name])
  const noneSelected = INSTALL_TOOLS.every(t => !installSelections[t.name])
  const selectedCount = INSTALL_TOOLS.filter(t => installSelections[t.name]).length

  const toggleTool = (name: string) => {
    setInstallSelections(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const selectAll = () => {
    setInstallSelections(prev => {
      const next = { ...prev }
      INSTALL_TOOLS.forEach(t => { next[t.name] = true })
      return next
    })
  }

  const deselectAll = () => {
    setInstallSelections(prev => {
      const next = { ...prev }
      INSTALL_TOOLS.forEach(t => { next[t.name] = false })
      return next
    })
  }

  const generatedScript = useMemo(() => {
    if (noneSelected) return ''
    const selected = INSTALL_TOOLS.filter(t => installSelections[t.name])
    const date = new Date().toISOString().split('T')[0]
    const lines = [
      '#!/bin/bash',
      '# UI Generation Stack — Auto-generated Install Script',
      `# Generated: ${date}`,
      '',
      'echo "[START] UI Generation Stack installation..."',
      '',
    ]
    for (const tool of selected) {
      lines.push(`# ${tool.name}`)
      lines.push(`echo "\\n[INSTALL] ${tool.name}..."`)
      for (const cmdLine of tool.command.split('\n')) {
        lines.push(cmdLine)
      }
      lines.push('')
    }
    lines.push('echo "\\n[DONE] Installation complete!"')
    lines.push('echo "Run \'coding-helper doctor\' to verify your setup."')
    return lines.join('\n')
  }, [installSelections, noneSelected])

  const handleCopyScript = () => {
    if (!generatedScript) return
    try {
      navigator.clipboard.writeText(generatedScript)
      addToast('Скрипт скопирован!', 'success')
    } catch {
      addToast('Не удалось скопировать скрипт', 'info')
    }
  }

  return (
    <div className="nyc-card-enhanced p-6 mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-lg bg-[var(--nyc-taxi)]/15 flex items-center justify-center">
          <Terminal className="w-3.5 h-3.5 text-[var(--nyc-taxi)]" />
        </div>
        <div>
          <h3 className="text-base font-semibold tracking-tight">Генератор скрипта установки</h3>
          <p className="text-xs text-[var(--nyc-text-muted)]">Выберите инструменты и скопируйте готовый bash-скрипт</p>
        </div>
      </div>

      {/* Select All / Deselect All */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={selectAll}
          className="text-[10px] font-mono text-[var(--nyc-taxi)] hover:text-[var(--nyc-amber)] px-2 py-1 rounded bg-[var(--nyc-taxi)]/5 hover:bg-[var(--nyc-taxi)]/10 transition-colors"
        >
          Выбрать все
        </button>
        <button
          onClick={deselectAll}
          className="text-[10px] font-mono text-[var(--nyc-steel)] hover:text-[var(--nyc-text-secondary)] px-2 py-1 rounded bg-[var(--nyc-bg-interactive-hover)] hover:bg-[var(--nyc-bg-interactive-hover)] transition-colors"
        >
          Снять все
        </button>
        {selectedCount > 0 && (
          <span className="text-[10px] font-mono text-[var(--nyc-taxi)] ml-auto">
            {selectedCount}/{INSTALL_TOOLS.length}
          </span>
        )}
      </div>

      {/* Tool checkboxes */}
      <div className="grid sm:grid-cols-2 gap-2 mb-5">
        {INSTALL_TOOLS.map(tool => (
          <label
            key={tool.name}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all border ${
              installSelections[tool.name]
                ? 'bg-[var(--nyc-taxi)]/8 border-[var(--nyc-taxi)]/20'
                : 'bg-[var(--nyc-bg-interactive-hover)] border-[var(--nyc-border-faint)] hover:border-[var(--nyc-border-default)]'
            }`}
          >
            <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0 ${
              installSelections[tool.name]
                ? 'bg-[var(--nyc-taxi)] border-[var(--nyc-taxi)]'
                : 'border-[var(--nyc-border-visible)]'
            }`}>
              {installSelections[tool.name] && <Check className="w-2.5 h-2.5 text-black" />}
            </div>
            <input
              type="checkbox"
              checked={!!installSelections[tool.name]}
              onChange={() => toggleTool(tool.name)}
              className="sr-only"
            />
            <span className={`text-xs font-mono ${installSelections[tool.name] ? 'text-[var(--nyc-taxi)]' : 'text-[var(--nyc-text-body)]'}`}>
              {tool.name}
            </span>
          </label>
        ))}
      </div>

      {/* Generated script */}
      {generatedScript && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-[var(--nyc-steel)] uppercase tracking-wider">Сгенерированный скрипт</span>
            <button
              onClick={handleCopyScript}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--nyc-taxi)]/10 border border-[var(--nyc-taxi)]/20 text-[var(--nyc-taxi)] text-[11px] font-mono hover:bg-[var(--nyc-taxi)]/20 transition-all"
            >
              <Copy className="w-3 h-3" />
              Скопировать скрипт
            </button>
          </div>
          <CodeBlock code={generatedScript} lang="bash" theme={theme} />
        </div>
      )}
    </div>
  )
}
