"use client";

import { SectionHeader, TaxiDivider, CodeBlock } from "../ui";
import { Badge } from "@/components/ui/badge";
import { commands, helperInstallCode, helperAuthCode, helperLangCode } from "../data/commands";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { Wrench, Globe, Shield, Settings, Terminal } from "lucide-react";

const keyFeatures = [
  { icon: Settings, title: "Интерактивный мастер", desc: "Пошаговая настройка с подсказками на экране" },
  { icon: Wrench, title: "Интеграция плана", desc: "Подключение GLM Plan к вашим инструментам" },
  { icon: Terminal, title: "Управление инструментами", desc: "Автоопределение, установка и настройка" },
  { icon: Globe, title: "MCP-конфигурация", desc: "Управление MCP-сервисами из одного места" },
  { icon: Shield, title: "Безопасное хранение", desc: "Локальное хранение конфигурации" },
  { icon: Globe, title: "Мультиязычность", desc: "Интерфейс на нескольких языках (RU/EN)" },
];

const wizardSteps = [
  { num: "1", label: "Выбор языка интерфейса" },
  { num: "2", label: "Выбор кодинг-плана" },
  { num: "3", label: "Ввод API-ключа" },
  { num: "4", label: "Выбор инструментов" },
  { num: "5", label: "Автоустановка инструментов" },
  { num: "6", label: "Загрузка плана в инструменты" },
  { num: "7", label: "Настройка MCP (опционально)" },
  { num: "8", label: "Готово — запускайте!" },
];

export function HelperSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="helper" className="py-8">
      <SectionHeader
        num="02"
        title="Coding Tool Helper"
        subtitle="CLI-утилита для настройки и управления AI-кодинг-инструментами"
      />

      <div className={`${th('nyc-card-highlight-enhanced', 'rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm')} p-6 mb-6`}>
        <p className={`text-sm leading-relaxed ${th('text-white/70', 'text-oklch(0.30 0 0)')}`}>
          Coding Tool Helper — это официальный CLI-инструмент от Z.AI, который
          автоматизирует настройку AI-кодинг-инструментов. Мастер настройки
          проведёт вас через все этапы: выбор инструмента, настройка API-ключа,
          выбор модели и языка.
        </p>
        <div className={`text-xs mt-3 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
          NPM-пакет: <code className="text-nyc-taxi">@z_ai/coding-helper</code> · Требуется: <code className="text-nyc-taxi">Node.js ≥ v18.0.0</code>
        </div>
      </div>

      <TaxiDivider />

      {/* Key Features */}
      <h3 className="text-lg font-semibold mb-4 mt-6">Ключевые возможности</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {keyFeatures.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-3`}
          >
            <div className="flex items-center gap-2 mb-1">
              <feat.icon className="h-4 w-4 text-nyc-taxi" />
              <span className="text-sm font-semibold">{feat.title}</span>
            </div>
            <p className={`text-xs ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{feat.desc}</p>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Wizard steps */}
      <h3 className="text-lg font-semibold mb-4 mt-6">Шаги мастера настройки</h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        После запуска <code className="text-nyc-taxi">coding-helper init</code> мастер проведёт вас через следующие шаги.
        Используйте стрелки для выбора и Enter для подтверждения.
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {wizardSteps.map((step) => (
          <div
            key={step.num}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} px-3 py-2 flex items-center gap-2`}
          >
            <span className="w-5 h-5 rounded-full bg-nyc-taxi/10 flex items-center justify-center text-[10px] font-bold text-nyc-taxi">
              {step.num}
            </span>
            <span className={`text-xs ${th('text-white/70', 'text-oklch(0.35 0 0)')}`}>{step.label}</span>
          </div>
        ))}
      </div>

      <TaxiDivider />

      <div className="space-y-6 mt-6">
        <h3 className="text-lg font-semibold">Установка</h3>
        <CodeBlock lang="bash" code={helperInstallCode} />

        <h3 className="text-lg font-semibold">Настройка API-ключа</h3>
        <CodeBlock lang="bash" code={helperAuthCode} />

        <h3 className="text-lg font-semibold">Управление языком</h3>
        <CodeBlock lang="bash" code={helperLangCode} />

        <TaxiDivider />

        <h3 className="text-lg font-semibold">Справочник команд</h3>
        <div className="space-y-2">
          {commands.map((cmd, i) => (
            <motion.div
              key={cmd.cmd}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-3 flex flex-col sm:flex-row sm:items-center gap-2`}
            >
              <code className="text-sm font-mono text-nyc-taxi flex-shrink-0">{cmd.cmd}</code>
              <span className={`text-xs sm:text-sm ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>{cmd.description}</span>
              <Badge variant="outline" className={`text-[10px] w-fit ml-auto ${th('border-white/10 text-white/40', 'border-oklch(0.82 0 0) text-oklch(0.50 0 0)')}`}>
                {cmd.category}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
