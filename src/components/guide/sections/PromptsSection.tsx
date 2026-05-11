'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/guide/SectionHeader'
import { CopyButton } from '@/components/guide/CopyButton'
import { PROMPT_TEMPLATES, READY_PROMPTS } from '@/data/guide-data'

interface PromptsSectionProps {
  theme: 'dark' | 'light'
}

export function PromptsSection({ theme }: PromptsSectionProps) {
  return (
    <section id="prompts" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="07" title="Промпт-шаблоны" subtitle="ready_to_use_prompt_templates" readingTime={2} />

      <div className="space-y-4 mb-8">
        {PROMPT_TEMPLATES.map((tmpl, i) => (
          <motion.div
            key={tmpl.category}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="nyc-card-enhanced">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <tmpl.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  {tmpl.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="relative">
                  <div className="relative rounded-md border p-3 pr-12 text-xs bg-[var(--nyc-bg-input)] border-[var(--nyc-border-faint)]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]/60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]/60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]/60" />
                    </div>
                    <pre className="text-[var(--nyc-concrete)] font-mono whitespace-pre-wrap">{tmpl.prompt}</pre>
                  </div>
                  <CopyButton text={tmpl.prompt} className="absolute top-1.5 right-1.5" theme={theme} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Ready Prompts */}
      <div className="p-5 border border-[var(--nyc-border-faint)] rounded-lg nyc-card-enhanced">
        <h3 className="text-base font-semibold mb-3">Готовые промпты</h3>
        <div className="space-y-2.5">
          {READY_PROMPTS.map(p => (
            <div key={p.cat} className="flex items-start gap-3 text-xs">
              <Badge className="text-[10px] bg-[var(--nyc-taxi)]/10 text-[var(--nyc-taxi)] border-0 shrink-0 mt-0.5 font-bold">
                {p.cat}
              </Badge>
              <span className="text-[var(--nyc-concrete)] font-mono leading-relaxed">{p.prompt}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
