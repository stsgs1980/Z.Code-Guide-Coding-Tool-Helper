"use client";

import { FileCode2, FolderOpen, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { TaxiDivider, CodeBlock } from "../../ui";
import { whatIsCards, howItWorksSteps } from "../../data/skills";

const iconMap = { FileCode2, FolderOpen, Sparkles, Zap };

export function SkillsWhatIs() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Что такое Skills?</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {whatIsCards.map((item, i) => {
          const Icon = iconMap[item.icon];
          return (
            <motion.div key={item.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-nyc-taxi" />
                <span className="text-sm font-semibold">{item.title}</span>
              </div>
              <p className={`text-sm leading-relaxed ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{item.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <TaxiDivider />

      <h3 className="text-lg font-semibold">Как это работает</h3>
      <div className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-5`}>
        <div className="space-y-3">
          {howItWorksSteps.map((item) => (
            <div key={item.step} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-nyc-taxi/10 flex items-center justify-center text-xs font-bold text-nyc-taxi flex-shrink-0">
                {item.step}
              </div>
              <p className={`text-sm leading-relaxed pt-1 ${th("text-white/70", "text-oklch(0.30 0 0)")}`}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <TaxiDivider />

      <h3 className="text-lg font-semibold">Анатомия SKILL.md</h3>
      <div className="relative">
        <CodeBlock
          code={`---
name: my-skill
description: "Что делает навык и КОГДА его вызывать. Это главный триггер."
---

# Название навыка

Подробные инструкции для AI...

## Правило 1
Описание правила с примерами.

## Правило 2
Описание правила с примерами.

## Формат ответа
Как AI должен структурировать свой ответ.`}
          lang="yaml"
          title="SKILL.md — минимальная структура"
        />
      </div>
    </div>
  );
}
