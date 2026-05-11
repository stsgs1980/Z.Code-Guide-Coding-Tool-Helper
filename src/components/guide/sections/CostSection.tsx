'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { SectionHeader } from '@/components/guide/SectionHeader'
import { COST_SCENARIOS } from '@/data/guide-data'

export function CostSection() {
  return (
    <section id="cost" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="08" title="Сценарии стоимости" subtitle="cost_scenarios" readingTime={2} />

      <div className="grid sm:grid-cols-2 gap-5">
        {COST_SCENARIOS.map((scenario, i) => (
          <motion.div
            key={scenario.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className={`${i === 3 ? 'nyc-card-highlight-enhanced shadow-xl shadow-[var(--nyc-taxi)]/10' : i === 0 ? 'nyc-card-enhanced border-l-2 border-l-green-500/30' : i === 1 ? 'nyc-card-enhanced border-l-2 border-l-blue-400/30' : 'nyc-card-enhanced border-l-2 border-l-[var(--nyc-taxi)]/40'} nyc-card-enter rounded-xl h-full nyc-card-inner-light`}>
              <CardHeader className="p-5 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <scenario.icon className="w-5 h-5 text-[var(--nyc-taxi)]" />
                    {scenario.name}
                  </CardTitle>
                  <span className="text-lg font-black text-[var(--nyc-taxi)]">{scenario.price}</span>
                </div>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                <Progress value={scenario.pct} className={`h-1.5 [&>div]:${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-400' : i === 2 ? 'bg-[var(--nyc-taxi)]' : 'bg-[var(--nyc-subway)]'}`} />
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-[var(--nyc-steel)] font-mono text-[10px] uppercase tracking-wider">Инструменты</span>
                    <p className="text-[var(--nyc-concrete)] mt-0.5 leading-relaxed">{scenario.tools}</p>
                  </div>
                  <div>
                    <span className="text-[var(--nyc-steel)] font-mono text-[10px] uppercase tracking-wider">API ключи</span>
                    <p className="text-[var(--nyc-concrete)] mt-0.5">{scenario.keys}</p>
                  </div>
                  <div>
                    <span className="text-[var(--nyc-steel)] font-mono text-[10px] uppercase tracking-wider">Назначение</span>
                    <p className="text-[var(--nyc-concrete)] mt-0.5">{scenario.purpose}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
