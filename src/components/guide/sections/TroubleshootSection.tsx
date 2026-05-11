'use client'

import React from 'react'
import { Terminal, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionHeader } from '@/components/guide/SectionHeader'
import { ERRORS } from '@/data/guide-data'

interface TroubleshootSectionProps {
  errorExpanded: string[]
  setErrorExpanded: (value: string[]) => void
}

export function TroubleshootSection({ errorExpanded, setErrorExpanded }: TroubleshootSectionProps) {
  return (
    <section id="troubleshoot" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="09" title="Диагностика и решение проблем" subtitle="troubleshooting_guide" readingTime={2} />

      {/* Diagnostic Commands */}
      <Card className="nyc-card-enhanced mb-6">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[var(--nyc-taxi)]" />
            Диагностические команды
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-1.5">
          {[
            { cmd: 'node --version', note: '# need >= 18.0.0' },
            { cmd: 'opencode --version', note: '' },
            { cmd: 'coding-helper doctor', note: '' },
            { cmd: 'npx @_davideast/stitch-mcp --help', note: '' },
            { cmd: 'npx skills list --global', note: '' },
          ].map(diag => (
            <div key={diag.cmd} className="flex items-center gap-2 rounded-md border px-3 py-2 text-xs bg-[var(--nyc-bg-input)] border-[var(--nyc-border-faint)]">
              <span className="text-[var(--nyc-taxi)]">{'>'}</span>
              <span className="font-mono text-[var(--nyc-concrete)]">{diag.cmd}</span>
              {diag.note && <span className="text-[var(--nyc-text-subtle)]">{diag.note}</span>}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Error Accordion */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">Ошибки и решения</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setErrorExpanded(ERRORS.map((_, i) => `error-${i}`))}
            className={`text-[10px] font-mono text-[var(--nyc-steel)] hover:text-[var(--nyc-taxi)] px-2 py-1 rounded hover:bg-[var(--nyc-bg-interactive-hover)] transition-colors`}
          >
            Раскрыть все
          </button>
          <span className="text-[var(--nyc-border-separator)]">|</span>
          <button
            onClick={() => setErrorExpanded([])}
            className={`text-[10px] font-mono text-[var(--nyc-steel)] hover:text-[var(--nyc-taxi)] px-2 py-1 rounded hover:bg-[var(--nyc-bg-interactive-hover)] transition-colors`}
          >
            Свернуть все
          </button>
        </div>
      </div>
      <Accordion type="multiple" value={errorExpanded} onValueChange={setErrorExpanded} className="space-y-1.5">
        {ERRORS.map((err, i) => (
          <AccordionItem
            key={i}
            value={`error-${i}`}
            className="border border-[var(--nyc-border-subtle)] rounded-lg bg-[var(--nyc-bg-subtle)] px-4 data-[state=open]:border-[var(--nyc-taxi)]/20 data-[state=open]:bg-[var(--nyc-taxi)]/[0.04]"
          >
            <AccordionTrigger className="text-xs hover:no-underline py-3 gap-2">
              <div className="flex items-center gap-2 text-left">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400/60 shrink-0" />
                <span className="font-mono text-[var(--nyc-concrete)]">{err.error}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs pb-3 space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-red-400/70 font-mono text-[10px] uppercase shrink-0 mt-0.5">Причина:</span>
                <span className="text-[var(--nyc-steel)]">{err.cause}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400/70 font-mono text-[10px] uppercase shrink-0 mt-0.5">Решение:</span>
                <span className="text-[var(--nyc-concrete)]">{err.fix}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
