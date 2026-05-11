'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/guide/SectionHeader'
import { StatusDot } from '@/components/guide/StatusDot'
import { PLATFORMS } from '@/data/guide-data'

export function PlatformsSection() {
  return (
    <section id="platforms" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="02" title="Платформы и совместимость" subtitle="compatibility_matrix" readingTime={2} />

      {/* Compatibility Matrix */}
      <Card className="nyc-card-enhanced rounded-xl mb-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--nyc-taxi)]/15 bg-[var(--nyc-bg-card)]">
                <th className="text-left py-5 px-5 font-mono text-sm text-[var(--nyc-text-description)] font-semibold">Функция</th>
                <th className="text-center py-5 px-5 font-mono text-sm text-[var(--nyc-taxi)] font-semibold">OpenCode</th>
                <th className="text-center py-5 px-5 font-mono text-sm text-[var(--nyc-text-description)] font-semibold">VS Code+Cline</th>
                <th className="text-center py-5 px-5 font-mono text-sm text-[var(--nyc-text-description)] font-semibold">Z Code</th>
                <th className="text-center py-5 px-5 font-mono text-sm text-[var(--nyc-text-description)] font-semibold">chat.z.ai</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Magic MCP', true, true, true, false],
                ['Stitch MCP', true, true, true, false],
                ['UI UX Pro Max', true, true, true, 'partial'],
                ['GLM Coding Plan', true, true, 'native', 'builtin'],
                ['File system', true, true, true, false],
                ['Visual preview', false, true, true, false],
              ].map(([name, ...vals]) => (
                <tr key={name as string} className="border-b border-[var(--nyc-border-default)] hover:bg-[var(--nyc-taxi)]/[0.03] transition-colors">
                  <td className="py-5 px-5 font-mono text-[var(--nyc-text-primary)] font-semibold text-sm">{name as string}</td>
                  {vals.map((v, i) => (
                    <td key={i} className="text-center py-5 px-5 min-w-[60px]">
                      <StatusDot status={v as boolean | string} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Platform Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PLATFORMS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="nyc-card-enhanced nyc-card-glow-hover nyc-card-enter rounded-xl h-full">
              <CardHeader className="p-5 pb-2">
                <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                  <p.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  {p.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <p className="text-sm text-[var(--nyc-text-body)] leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {p.features.map(f => (
                    <Badge key={f} variant="secondary" className="text-[10px] bg-[var(--nyc-bg-hover)] text-[var(--nyc-text-secondary)] border border-[var(--nyc-border-faint)]">
                      {f}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
