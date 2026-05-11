'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Cpu, Shield, Eye, AlertTriangle, Monitor, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SectionHeader } from '@/components/guide/SectionHeader'
import { StatusDot } from '@/components/guide/StatusDot'
import { CodeBlock } from '@/components/guide/CodeBlock'

interface StagewiseSectionProps {
  theme: 'dark' | 'light'
}

export function StagewiseSection({ theme }: StagewiseSectionProps) {
  return (
    <section id="stagewise" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="04" title="Stagewise" subtitle="AI Browser для веб-разработчиков" readingTime={2} />

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Пользователи', value: '130K+', icon: Users },
          { label: 'Технологии', value: 'Electron + React 19', icon: Cpu },
          { label: 'Статус', value: 'Open Source', icon: Shield },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="nyc-card-enhanced nyc-card-enter rounded-xl p-5 text-center hover:border-[var(--nyc-taxi)]/15 transition-colors"
          >
            <stat.icon className="w-5 h-5 text-[var(--nyc-taxi)] mx-auto mb-2" />
            <div className="font-black text-xl">{stat.value}</div>
            <div className="text-[10px] text-[var(--nyc-steel)] font-mono uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Features */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          { title: 'Визуальный контекст', desc: 'AI агент «видит» ваш DOM в реальном времени', icon: Eye },
          { title: 'Console Monitoring', desc: 'Автоматический анализ ошибок консоли', icon: AlertTriangle },
          { title: 'Element Selection', desc: 'Выбор UI элементов для редактирования', icon: Monitor },
          { title: 'Code Generation', desc: 'Прямая генерация кода на основе визуального контекста', icon: Sparkles },
        ].map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="nyc-card-enhanced nyc-card-enter rounded-xl p-5 flex items-start gap-3 hover:border-[var(--nyc-taxi)]/15 transition-all duration-300 group"
          >
            <div className="w-8 h-8 rounded bg-[var(--nyc-taxi)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--nyc-taxi)]/20 transition-colors">
              <feat.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight mb-0.5">{feat.title}</div>
              <div className="text-sm text-[var(--nyc-text-body)] leading-relaxed">{feat.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Installation */}
      <Card className="nyc-card-enhanced rounded-xl mb-6">
        <CardHeader className="p-5 pb-2">
          <CardTitle className="text-sm font-semibold tracking-tight">Установка</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div>
            <span className="text-[10px] text-[var(--nyc-steel)] font-mono uppercase tracking-wider mb-1.5 block">Desktop приложение</span>
            <CodeBlock code="# Скачать с официального сайта\n# https://stagewise.io\n\n# Или через npm (toolbar extension)\nnpx stagewise@latest" theme={theme} />
          </div>
          <div>
            <span className="text-[10px] text-[var(--nyc-steel)] font-mono uppercase tracking-wider mb-1.5 block">IDE Extension (Cursor, Windsurf, VS Code)</span>
            <CodeBlock code={'# Установка расширения через marketplace\n# Search: "stagewise" или "21st.dev"'} theme={theme} />
          </div>
        </CardContent>
      </Card>

      {/* Workflow */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-4">Workflow</h3>
        <div className="relative">
          <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[var(--nyc-taxi)]/15" />
          <div className="space-y-3">
            {[
              'Открыть Stagewise Browser',
              'Загрузить URL работающего приложения (localhost:3000)',
              'Нажать на элемент для выбора (или использовать toolbar)',
              'AI агент получает контекст: DOM, стили, console errors',
              'Описать желаемые изменения на естественном языке',
              'AI генерирует код изменений',
              'Применить изменения к локальному проекту',
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 text-xs pl-1"
              >
                <div className="w-6 h-6 rounded-full bg-background border-2 border-[var(--nyc-taxi)]/30 flex items-center justify-center shrink-0 z-10">
                  <span className="text-[var(--nyc-taxi)] font-mono text-[10px] font-bold">{i + 1}</span>
                </div>
                <span className="text-[var(--nyc-concrete)] pt-1">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <Card className="nyc-card-enhanced overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[var(--nyc-taxi)]/15 bg-[var(--nyc-bg-card)]">
                <th className="text-left py-3 px-4 font-mono text-[var(--nyc-text-secondary)]">Функция</th>
                <th className="text-center py-3 px-3 font-mono text-[var(--nyc-taxi)]">Stagewise</th>
                <th className="text-center py-3 px-3 font-mono text-[var(--nyc-text-secondary)]">Cursor AI</th>
                <th className="text-center py-3 px-3 font-mono text-[var(--nyc-text-secondary)]">Cline</th>
                <th className="text-center py-3 px-3 font-mono text-[var(--nyc-text-secondary)]">OpenCode</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Визуальный контекст', true, false, false, false],
                ['DOM Analysis', true, false, false, false],
                ['Console Integration', true, false, false, false],
                ['Desktop App', true, true, false, false],
                ['File System Access', true, true, true, true],
                ['MCP Support', 'plugin', true, true, true],
                ['Open Source', true, false, true, true],
              ].map(([name, ...vals]) => (
                <tr key={name as string} className="border-b border-[var(--nyc-border-subtle)] hover:bg-[var(--nyc-bg-hover)] transition-colors">
                  <td className="py-4 px-4 font-mono text-[var(--nyc-text-primary)] font-semibold text-sm">{name as string}</td>
                  {vals.map((v, i) => (
                    <td key={i} className="text-center py-2.5 px-3">
                      <StatusDot status={v as boolean | string} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  )
}
