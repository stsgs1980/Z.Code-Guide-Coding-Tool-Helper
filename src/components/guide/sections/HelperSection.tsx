'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Terminal, Settings, FileCode, Cpu, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { SectionHeader } from '@/components/guide/SectionHeader'
import { CodeBlock } from '@/components/guide/CodeBlock'
import { CopyButton } from '@/components/guide/CopyButton'
import { HELPER_COMMANDS, GLM_MODELS, PLAN_LIMITS } from '@/data/guide-data'

interface HelperSectionProps {
  helperFilter: string
  setHelperFilter: (filter: string) => void
  runningCmd: string
  setRunningCmd: (cmd: string) => void
  theme: 'dark' | 'light'
}

export function HelperSection({ helperFilter, setHelperFilter, runningCmd, setRunningCmd, theme }: HelperSectionProps) {
  return (
    <section id="helper" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="03" title="Coding Tool Helper" subtitle="@z_ai/coding-helper — центральный узел интеграции" readingTime={3} />

      {/* Setup Wizard */}
      <Card className="nyc-card-enhanced mb-6">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
            <Settings className="w-4 h-4 text-[var(--nyc-taxi)]" />
            Интерактивный мастер настройки
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            {[
              'Выбор языка интерфейса (zh_CN, en_US)',
              'Выбор типа плана GLM Coding Plan (global/china)',
              'Ввод API-ключа',
              'Выбор инструментов разработки',
              'Автоматическая установка и настройка',
              'Управление MCP-серверами (опционально)',
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 text-xs"
              >
                <span className="w-5 h-5 rounded-sm bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] flex items-center justify-center font-mono text-[10px] shrink-0">
                  {i + 1}
                </span>
                <span className="text-[var(--nyc-text-label)]">{step}</span>
                {i < 5 && <div className="hidden sm:block w-px h-3 bg-[var(--nyc-taxi)]/20 ml-[-10px] mt-5" />}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Commands */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[var(--nyc-taxi)]" />
          Система команд
        </h3>
        <div className="mb-3">
          <input
            type="text"
            value={helperFilter}
            onChange={(e) => setHelperFilter(e.target.value)}
            placeholder="Фильтр команд..."
            className="w-full border rounded-md px-3 py-2 text-xs outline-none focus:border-[var(--nyc-taxi)]/30 transition-colors bg-[var(--nyc-bg-input)] border-[var(--nyc-border-subtle)] text-[var(--nyc-text-body)] placeholder:text-[var(--nyc-text-placeholder)]"
          />
        </div>
        <div className="space-y-1.5">
          {HELPER_COMMANDS.filter(cmd => !helperFilter || cmd.cmd.toLowerCase().includes(helperFilter.toLowerCase()) || cmd.desc.toLowerCase().includes(helperFilter.toLowerCase())).map((cmd, i) => (
            <motion.div
              key={cmd.cmd}
              initial={{ opacity: 0, x: -5 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="group relative"
            >
              <div className={`flex items-center gap-3 text-xs rounded-md border px-4 py-2.5 pr-12 transition-all duration-300 bg-[var(--nyc-bg-input)] border-[var(--nyc-border-faint)] ${
                runningCmd === cmd.cmd ? 'border-[var(--nyc-taxi)]/30 shadow-md shadow-[var(--nyc-taxi)]/5' : 'hover:border-[var(--nyc-taxi)]/15'
              }`}>
                <span className="text-[var(--nyc-taxi)] font-mono shrink-0">{'>'}</span>
                <span className="text-[var(--nyc-concrete)] font-mono">{cmd.cmd}</span>
                <span className="text-[var(--nyc-text-subtle)] hidden sm:inline">— {cmd.desc}</span>
                {runningCmd === cmd.cmd && (
                  <span className="ml-auto flex items-center gap-1 text-[10px] text-green-400/80 font-mono">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    copied
                  </span>
                )}
              </div>
              <CopyButton text={cmd.cmd} className="absolute top-1.5 right-1.5" theme={theme} onCopied={() => {
                setRunningCmd(cmd.cmd)
                setTimeout(() => setRunningCmd(''), 1500)
              }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Config File */}
      <Card className="nyc-card-enhanced mb-6">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
            <FileCode className="w-4 h-4 text-[var(--nyc-taxi)]" />
            Конфигурационный файл
            <Badge className={`text-[10px] border-0 ml-auto font-mono bg-[var(--nyc-bg-interactive-hover)] text-[var(--nyc-text-icon)]`}>~/.chelper/config.yaml</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <CodeBlock
            code={`lang: zh_CN          # UI язык\nplan: glm_coding_plan_global  # Тип плана\ntoken: your-api-key-here      # API ключ`}
            lang="yaml"
            theme={theme}
          />
        </CardContent>
      </Card>

      {/* GLM Models */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[var(--nyc-taxi)]" />
          Доступные модели GLM
        </h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {GLM_MODELS.map((model, i) => (
            <motion.div
              key={model.tier}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-4 border border-[var(--nyc-border-faint)] rounded-lg nyc-card-enhanced hover:border-[var(--nyc-taxi)]/15 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[var(--nyc-taxi)] text-xs font-bold">{model.tier}</span>
                <Badge className="text-[10px] bg-[var(--nyc-taxi)]/10 text-[var(--nyc-taxi)] border-0">
                  {model.name}
                </Badge>
              </div>
              <p className="text-sm text-[var(--nyc-text-body)] leading-relaxed mb-3">{model.use}</p>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono text-[var(--nyc-text-icon)]`}>Скорость</span>
                <div className="flex-1 h-1 bg-[var(--nyc-bg-progress-track)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[var(--nyc-taxi)] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${model.speed}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Model Mapping */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3">Маппинг моделей для Claude Code</h3>
        <CodeBlock
          code={`{\n  "env": {\n    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air",\n    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.7",\n    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-4.7"\n  }\n}`}
          lang="json"
          theme={theme}
        />
      </div>

      {/* Plan Limits */}
      <div className="space-y-3">
        <h3 className="text-base font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4 text-[var(--nyc-taxi)]" />
          Лимиты планов
        </h3>
        {PLAN_LIMITS.map((plan, i) => (
          <motion.div
            key={plan.plan}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-4 border border-[var(--nyc-border-faint)] rounded-lg nyc-card-enhanced"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold tracking-tight">{plan.plan}</span>
                <span className="text-[var(--nyc-taxi)] font-mono text-xs font-bold">{plan.price}</span>
              </div>
            </div>
            <Progress value={plan.pct} className={`h-1 mb-3 [&>div]:${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-400' : 'bg-[var(--nyc-taxi)]'}`} />
            <div className="flex justify-between text-xs text-[var(--nyc-text-muted)]">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5ч: {plan.fiveHour}</span>
              <span>Неделя: {plan.weekly}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
