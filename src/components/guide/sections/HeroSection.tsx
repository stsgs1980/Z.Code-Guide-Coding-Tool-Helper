"use client";

import { motion } from "framer-motion";
import { Terminal, Zap, Shield, Globe, BookOpen } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const stats = [
  { icon: Terminal, value: "15+", label: "Инструментов" },
  { icon: Zap, value: "12+", label: "GLM-модели" },
  { icon: Shield, value: "4", label: "MCP-сервера" },
  { icon: Globe, value: "24/7", label: "Доступность" },
];

export function HeroSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section
      id="hero"
      className={`relative overflow-hidden ${th('nyc-ambient-bg', 'bg-oklch(0.97 0 0)')}`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-32 -right-32 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl ${th('bg-[var(--nyc-taxi)]/5', 'bg-[var(--nyc-taxi)]/8')}`} />
        <div className={`absolute -bottom-24 -left-24 w-48 h-48 sm:w-60 sm:h-60 rounded-full blur-3xl ${th('bg-[var(--nyc-taxi)]/3', 'bg-[var(--nyc-taxi)]/5')}`} />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-28 pb-16 md:pb-20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16 w-full">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 min-w-0"
          >
            <div className="nyc-label mb-4">Руководство пользователя</div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-5">
              <span className="nyc-gradient-text">Z Code</span>
            </h1>
            <p className={`text-base sm:text-lg md:text-xl max-w-xl mb-8 leading-relaxed ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
              Платформа AI-кодинга нового поколения. Используйте мощные модели GLM
              в ваших любимых инструментах разработки с поддержкой MCP-серверов.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#quick-start"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${th('bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] shadow-xl shadow-[var(--nyc-taxi)]/30 nyc-cta-glow', 'bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] shadow-md')}`}
              >
                <Zap className="h-4 w-4" />
                Быстрый старт
              </a>
              <a
                href="#plan"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${th('border border-white/10 text-white/70 hover:bg-white/5 hover:border-[var(--nyc-taxi)]/30', 'border border-oklch(0.82 0 0) text-oklch(0.30 0 0) hover:bg-oklch(0.93 0 0)')}`}
              >
                <BookOpen className="h-4 w-4" />
                GLM Coding Plan
              </a>
            </div>
          </motion.div>

          {/* Right: Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-3 md:gap-4 w-full sm:w-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} nyc-hero-card-glow p-4 md:p-6 text-center`}
              >
                <stat.icon className="h-4 w-4 md:h-5 md:w-5 text-nyc-taxi mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-black nyc-gradient-text">{stat.value}</div>
                <div className={`text-xs mt-1.5 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="nyc-caution-stripe" />
    </section>
  );
}
