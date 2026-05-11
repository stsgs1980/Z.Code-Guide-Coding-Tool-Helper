"use client";

import { motion } from "framer-motion";
import { Terminal, Zap, Shield, Globe, BookOpen } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const stats = [
  { icon: Terminal, value: "10+", label: "Инструментов" },
  { icon: Zap, value: "4", label: "GLM-модели" },
  { icon: Shield, value: "3", label: "MCP-сервера" },
  { icon: Globe, value: "24/7", label: "Доступность" },
];

export function HeroSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="hero" className={`relative overflow-hidden ${th('nyc-ambient-bg', 'bg-oklch(0.97 0 0)')}`}>
      {/* Full-width inner container */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 pt-12 md:pt-20 pb-14 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl"
        >
          <div className="nyc-label mb-5">Руководство пользователя</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-5">
            <span className="nyc-gradient-text">Z Code</span>
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mb-10 leading-relaxed ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
            Платформа AI-кодинга нового поколения. Используйте мощные модели GLM
            в ваших любимых инструментах разработки с поддержкой MCP-серверов.
          </p>

          {/* Quick nav buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#quickstart"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${th('bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] shadow-xl shadow-[var(--nyc-taxi)]/30 nyc-cta-glow', 'bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] shadow-md')}`}
            >
              <Zap className="h-4 w-4" />
              Быстрый старт
            </a>
            <a
              href="#plan"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${th('border border-white/10 text-white/70 hover:bg-white/5 hover:border-[var(--nyc-taxi)]/30', 'border border-oklch(0.82 0 0) text-oklch(0.30 0 0) hover:bg-oklch(0.93 0 0)')}`}
            >
              <BookOpen className="h-4 w-4" />
              GLM Coding Plan
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-4xl"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} nyc-hero-card-glow p-5 text-center`}
            >
              <stat.icon className="h-5 w-5 text-nyc-taxi mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-black nyc-gradient-text">{stat.value}</div>
              <div className={`text-xs ${th('text-white/40', 'text-oklch(0.50 0 0)')} mt-1`}>{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero image */}
      <div className="relative z-10 px-6 md:px-12 lg:px-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-4xl"
        >
          <img
            src="/images/hero.png"
            alt="Z Code -- платформа AI-кодинга нового поколения"
            className={`w-full rounded-lg shadow-2xl ${th('border border-white/10', 'border border-oklch(0.85 0 0)')}`}
          />
        </motion.div>
      </div>

      <div className="nyc-caution-stripe" />
    </section>
  );
}
