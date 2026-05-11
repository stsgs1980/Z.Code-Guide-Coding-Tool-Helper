'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/guide/SectionHeader'

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="10" title="Архитектура системы" subtitle="system_architecture_diagram" readingTime={2} />

      <Card className="nyc-card-enhanced rounded-xl overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="rounded-md border p-4 text-xs sm:text-sm overflow-x-auto bg-[var(--nyc-bg-input)] border-[var(--nyc-border-faint)]">
            <pre className="text-[var(--nyc-concrete)] font-mono leading-relaxed whitespace-pre">{`┌──────────────────────────────────────────────────┐
│                  YOUR WORKSTATION                 │
├──────────────────────────────────────────────────┤
│                                                   │
│  ┌─────────────┐ ┌─────────────┐ ┌────────────┐ │
│  │  chat.z.ai  │ │  zcode.z.ai │ │  VS Code   │ │
│  │ (consult)   │ │  (full IDE) │ │  + Cline   │ │
│  └──────┬──────┘ └──────┬──────┘ └─────┬──────┘ │
│         └───────────────┼──────────────┘        │
│                         │                        │
│              ┌──────────▼──────────┐             │
│              │    OPENCODE (CLI)   │             │
│              └──────────┬──────────┘             │
│                         │                        │
│    ┌──────┬──────┬──────┼──────┬──────┐         │
│    ▼      ▼      ▼      ▼      ▼      ▼         │
│  Magic  Stitch  UI UX  v0.dev  Ollama          │
│   MCP    MCP   Pro Max  Free  (local)          │
│    │      │      │      │      │                │
│    └──────┴──────┴──────┴──────┘                │
│                    │                              │
│          ┌─────────▼─────────┐                   │
│          │   YOUR PROJECT    │                   │
│          │   (output code)   │                   │
│          └───────────────────┘                   │
└──────────────────────────────────────────────────┘`}</pre>
          </div>
        </CardContent>
      </Card>

      {/* Supported Tools */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { name: 'Claude Code', status: 'Основной', desc: 'Полный маппинг моделей GLM' },
          { name: 'OpenCode', status: 'Поддерживается', desc: 'Настройка endpoint и API-ключа' },
          { name: 'Crush', status: 'Поддерживается', desc: 'JSON Schema конфигурация' },
          { name: 'Factory Droid', status: 'Поддерживается', desc: 'Конфигурационные файлы' },
        ].map(tool => (
          <div key={tool.name} className="p-4 border border-[var(--nyc-border-subtle)] rounded-lg bg-[var(--nyc-bg-secondary)] hover:border-[var(--nyc-taxi)]/15 hover:shadow-md hover:shadow-black/10 transition-all duration-200">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold tracking-tight">{tool.name}</span>
              <Badge className={`text-[10px] border-0 ${
                tool.status === 'Основной'
                  ? 'bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)]'
                  : 'bg-[var(--nyc-bg-interactive-hover)] text-[var(--nyc-steel)]'
              }`}>
                {tool.status}
              </Badge>
            </div>
            <p className="text-xs text-[var(--nyc-steel)]">{tool.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
