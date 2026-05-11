'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/guide/SectionHeader'
import { TOOLS } from '@/data/guide-data'

export function ToolMatrixSection() {
  return (
    <section id="matrix" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="01" title="Матрица инструментов" subtitle="tools_matrix" readingTime={2} />
      <div className="grid gap-4">
        {TOOLS.map((tool, i) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
          >
            <Card className="nyc-card-enhanced nyc-card-tilt nyc-card-glow-hover nyc-card-enter rounded-xl group" style={{ borderLeftColor: tool.color, borderLeftWidth: '2px' }}>
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className="w-1.5 h-10 rounded-full shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: tool.color }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-semibold tracking-tight leading-none">{tool.name}</span>
                      {tool.mcp && (
                        <Badge className="bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] border-[var(--nyc-taxi)]/30 text-[10px] px-1.5 py-px inline-flex items-center leading-none">
                          MCP
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[var(--nyc-text-body)] leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs shrink-0 sm:pl-4 sm:border-l border-[var(--nyc-border-faint)]">
                  <span className="font-mono text-[var(--nyc-concrete)] leading-none">{tool.type}</span>
                  <span className="text-[var(--nyc-taxi)] font-mono font-bold text-xs leading-none">{tool.price}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Free Alternatives */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 p-6 border border-[var(--nyc-taxi)]/10 rounded-lg bg-[var(--nyc-taxi)]/[0.02]"
      >
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-4 h-4 text-[var(--nyc-taxi)]" />
          <span className="text-sm font-semibold tracking-tight">Бесплатные альтернативы 21st Magic</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          {[
            ['Google Stitch', '$0 (350 gen/мес)', 'Полная'],
            ['v0.dev Free', '$0 ($5 credit/мес)', 'Через clipboard'],
            ['Bolt.diy', '$0 (self-hosted)', 'Полная'],
            ['Ollama + Local LLM', '$0', 'Полная'],
          ].map(([name, price, compat]) => (
            <div key={name} className="flex items-center justify-between p-2.5 rounded bg-[var(--nyc-bg-secondary)] border border-[var(--nyc-border-subtle)] hover:border-[var(--nyc-taxi)]/15 hover:shadow-md hover:shadow-black/10 transition-all duration-200">
              <span className="font-mono text-[var(--nyc-concrete)]">{name}</span>
              <div className="flex items-center gap-3">
                <span className="text-[var(--nyc-taxi)] font-bold text-xs">{price}</span>
                <Badge variant="secondary" className="text-[10px] bg-[var(--nyc-bg-interactive-hover)] text-[var(--nyc-text-icon)] border-0">{compat}</Badge>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[var(--nyc-taxi)] text-xs mt-3 font-mono flex items-center gap-2">
          <Zap className="w-3 h-3" />
          Экономия: $240/год по сравнению с 21st Magic Pro ($20/мес)
        </p>
      </motion.div>
    </section>
  )
}
