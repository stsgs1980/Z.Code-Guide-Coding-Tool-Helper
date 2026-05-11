'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Terminal, CheckCircle2, Shield, Box, Cpu, Layers, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CopySummaryButton } from '@/components/guide/CopySummaryButton'

interface HeroSectionProps {
  theme: 'dark' | 'light'
  readingProgress: number
}

export function HeroSection({ theme, readingProgress: _readingProgress }: HeroSectionProps) {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/nyc-hero.png"
          alt="New York City industrial skyline"
          className={`w-full h-full object-cover ${theme === 'light' ? 'opacity-40' : 'opacity-25'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${theme === 'light' ? 'from-white/70 via-white/40 to-white/85' : 'from-background/80 via-background/50 to-background'}`} />
        <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'light' ? 'from-white/40 via-transparent to-white/40' : 'from-background/50 via-transparent to-background/50'}`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Version + reading badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-3 px-3 py-1.5 rounded-full border mb-6 bg-[var(--nyc-taxi-bg-subtle)] border-[var(--nyc-taxi-border)]`}
          >
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse bg-[var(--nyc-taxi)]`} />
            <span className={`font-mono text-[10px] tracking-widest uppercase text-[var(--nyc-text-taxi)]`}>
              v1.0 · Production Ready
            </span>
            <span className={'text-[var(--nyc-text-faint)]'}>|</span>
            <BookOpen className={`w-3 h-3 text-[var(--nyc-taxi-bg)]`} />
            <span className={`font-mono text-[10px] tracking-widest text-[var(--nyc-taxi-bg)]`}>
              ~14 мин
            </span>
          </motion.div>

          <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-5 ${theme === 'light' ? '' : 'nyc-text-shadow-strong'}`}>
            ЕДИНОЕ
            <br />
            <span className={`inline-block ${theme === 'light' ? 'text-amber-700' : 'nyc-gradient-text'}`}>РУКОВОДСТВО</span>
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed nyc-text-readable text-[var(--nyc-text-hero-desc)]">
            Подробный гайд по установке и настройке AI-инструментов
            разработки. <span className="font-medium text-[var(--nyc-text-hero-em)]">Coding Tool Helper</span>, <span className="font-medium text-[var(--nyc-text-hero-em)]">OpenCode</span>, <span className="font-medium text-[var(--nyc-text-hero-em)]">Stagewise</span> и <span className="font-medium text-[var(--nyc-text-hero-em)]">MCP-серверы</span>.
          </p>

          {/* Key Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Версия', value: '1.0', icon: Shield },
              { label: 'Пакет', value: '0.0.7', icon: Box },
              { label: 'Node.js', value: '≥ 18.0.0', icon: Cpu },
              { label: 'Зависимости', value: '6 пакетов', icon: Layers },
            ].map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="nyc-card-inner-light nyc-hero-card nyc-hero-card-glow rounded-xl p-4 bg-[var(--nyc-bg-card)] border-[var(--nyc-border-subtle)] hover:border-[var(--nyc-taxi)]/25 transition-all duration-300 hover:-translate-y-0.5 shadow-[var(--nyc-shadow-hero-card)] hover:shadow-[var(--nyc-shadow-hero-card-hover)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <fact.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  <span className="text-[11px] nyc-hero-stat-label font-mono uppercase tracking-wider">{fact.label}</span>
                </div>
                <span className="text-2xl font-black nyc-hero-stat-value">{fact.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <a href="#install">
              <Button className="bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] font-bold gap-2 shadow-xl shadow-[var(--nyc-taxi)]/30 nyc-cta-glow">
                <Terminal className="w-4 h-4" />
                Начать установку
              </Button>
            </a>
            <a href="#checklist">
              <Button variant="outline" className="gap-2 border-[var(--nyc-border-visible)] hover:bg-[var(--nyc-bg-interactive-hover)] hover:border-[var(--nyc-taxi)]/30">
                <CheckCircle2 className="w-4 h-4" />
                Чек-лист
              </Button>
            </a>
            <CopySummaryButton />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
