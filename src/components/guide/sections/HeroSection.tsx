"use client";

import { motion } from "framer-motion";
import { Terminal, Zap, Shield, Globe } from "lucide-react";
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
    <section id="hero" className="relative nyc-ambient-bg pt-8 pb-12">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="nyc-label mb-4">Руководство пользователя</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="nyc-gradient-text">Z Code</span>
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mb-8 leading-relaxed ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
            Платформа AI-кодинга нового поколения. Используйте мощные модели GLM
            в ваших любимых инструментах разработки с поддержкой MCP-серверов.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} nyc-hero-card-glow p-4 text-center`}
            >
              <stat.icon className="h-5 w-5 text-nyc-taxi mx-auto mb-2" />
              <div className="text-2xl font-bold nyc-gradient-text">{stat.value}</div>
              <div className={`text-xs ${th('text-white/40', 'text-oklch(0.50 0 0)')} mt-1`}>{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="nyc-caution-stripe mt-10" />
      </div>
    </section>
  );
}
