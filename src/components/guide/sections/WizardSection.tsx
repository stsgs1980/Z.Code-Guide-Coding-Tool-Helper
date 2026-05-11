'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Hash } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/guide/SectionHeader'

interface WizardSectionProps {
  wizardUsage: string
  setWizardUsage: (usage: string) => void
  wizardBudget: string
  setWizardBudget: (budget: string) => void
  wizardTools: string[]
  toggleWizardTool: (tool: string) => void
  wizardRecommendation: { name: string; price: string; plan: string } | null
}

export function WizardSection({
  wizardUsage,
  setWizardUsage,
  wizardBudget,
  setWizardBudget,
  wizardTools,
  toggleWizardTool,
  wizardRecommendation,
}: WizardSectionProps) {
  return (
    <section id="wizard" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="08.5" title="Мастер выбора плана" subtitle="plan_comparison_wizard" readingTime={2} />

      <Card className="nyc-card-enhanced p-6">
        <CardContent className="p-0">
          <p className="text-sm text-[var(--nyc-concrete)] mb-6 nyc-text-readable">Ответьте на несколько вопросов, чтобы подобрать оптимальный план:</p>

          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-mono text-[var(--nyc-taxi)] uppercase tracking-wider mb-2">Тип использования</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Обучение', value: 'learn' },
                  { label: 'Фриланс', value: 'freelance' },
                  { label: 'Команда', value: 'team' },
                ].map(opt => (
                  <motion.div
                    key={opt.value}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setWizardUsage(opt.value)}
                    className={`p-3 rounded-lg border text-center text-xs cursor-pointer transition-all nyc-hover-lift ${
                      wizardUsage === opt.value
                        ? 'border-[var(--nyc-taxi)]/30 bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)]'
                        : 'border-[var(--nyc-border-faint)] bg-[var(--nyc-bg-interactive-hover)] hover:border-[var(--nyc-taxi)]/20 hover:bg-[var(--nyc-taxi)]/[0.03]'
                    }`}
                  >
                    <span className={wizardUsage === opt.value ? 'text-[var(--nyc-taxi)] font-bold' : 'text-[var(--nyc-concrete)]'}>{opt.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono text-[var(--nyc-taxi)] uppercase tracking-wider mb-2">Бюджет</h4>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '$0', value: 'free' },
                  { label: '$20-60', value: 'mid' },
                  { label: '$100+', value: 'pro' },
                ].map(opt => (
                  <motion.div
                    key={opt.value}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setWizardBudget(opt.value)}
                    className={`p-3 rounded-lg border text-center text-xs cursor-pointer transition-all nyc-hover-lift ${
                      wizardBudget === opt.value
                        ? 'border-[var(--nyc-taxi)]/30 bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)]'
                        : 'border-[var(--nyc-border-faint)] bg-[var(--nyc-bg-interactive-hover)] hover:border-[var(--nyc-taxi)]/20 hover:bg-[var(--nyc-taxi)]/[0.03]'
                    }`}
                  >
                    <span className={wizardBudget === opt.value ? 'text-[var(--nyc-taxi)] font-bold' : 'text-[var(--nyc-concrete)]'}>{opt.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono text-[var(--nyc-taxi)] uppercase tracking-wider mb-2">Ключевые инструменты</h4>
              <div className="flex flex-wrap gap-2">
                {['Magic MCP', 'Stitch MCP', 'UI UX Pro Max', 'OpenCode', 'Stagewise', 'GLM Coding Plan'].map(tool => (
                  <Badge
                    key={tool}
                    onClick={() => toggleWizardTool(tool)}
                    className={`text-[10px] cursor-pointer transition-all ${
                      wizardTools.includes(tool)
                        ? 'bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] border-[var(--nyc-taxi)]/20'
                        : 'bg-[var(--nyc-bg-interactive-hover)] text-[var(--nyc-concrete)] border-[var(--nyc-border-faint)] hover:bg-[var(--nyc-taxi)]/10 hover:text-[var(--nyc-taxi)] hover:border-[var(--nyc-taxi)]/20'
                    }`}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--nyc-border-faint)]">
              {wizardRecommendation ? (
                <motion.div
                  key={`${wizardUsage}-${wizardBudget}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[var(--nyc-taxi)]/[0.05] border border-[var(--nyc-taxi)]/10"
                >
                  <Zap className="w-4 h-4 text-[var(--nyc-taxi)] shrink-0" />
                  <div className="text-xs">
                    <span className="text-[var(--nyc-concrete)]">Рекомендация: </span>
                    <span className="text-[var(--nyc-taxi)] font-bold">{wizardRecommendation.plan}</span>
                    <span className="text-[var(--nyc-steel)]"> — {wizardRecommendation.name} ({wizardRecommendation.price})</span>
                  </div>
                </motion.div>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--nyc-bg-interactive-hover)] border border-[var(--nyc-border-faint)]">
                  <Hash className="w-4 h-4 text-[var(--nyc-steel)] shrink-0" />
                  <div className="text-xs text-[var(--nyc-steel)]">
                    Выберите тип использования и бюджет для получения рекомендации
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
