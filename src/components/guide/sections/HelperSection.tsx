"use client";

import { SectionHeader, TaxiDivider, CodeBlock, CopyButton } from "../ui";
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
    <section id="helper" className="py-10 md:py-14">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
        {keyFeatures.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex items-center gap-2 mb-1">
              <feat.icon className="h-4 w-4 text-nyc-taxi" />
              <span className="text-sm font-semibold">{feat.title}</span>
            </div>
            <p className={`text-sm leading-relaxed ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{feat.desc}</p>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Wizard steps — Timeline */}
      <h3 className="text-lg font-semibold mb-4 mt-6">Шаги мастера настройки</h3>
      <p className={`text-sm leading-relaxed mb-6 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        После запуска <code className="text-nyc-taxi">coding-helper init</code> мастер проведёт вас через следующие шаги.
        Используйте стрелки для выбора и Enter для подтверждения.
      </p>
      <div className="relative mb-8">
        {/* Vertical line */}
        <div className={`absolute left-[15px] top-2 bottom-2 w-px ${th('bg-gradient-to-b from-nyc-taxi/40 via-nyc-taxi/20 to-transparent', 'bg-gradient-to-b from-oklch(0.78 0.16 85 / 30%) via-oklch(0.78 0.16 85 / 15%) to-transparent')}`} />

        <div className="space-y-1">
          {wizardSteps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-4 group"
            >
              {/* Timeline node */}
              <div className="relative z-10 flex-shrink-0">
                <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i === 0
                    ? 'bg-nyc-taxi text-black shadow-md shadow-nyc-taxi/30'
                    : th(
                        'bg-oklch(0.18 0 0) border border-white/10 text-white/50 group-hover:border-nyc-taxi/40 group-hover:text-nyc-taxi',
                        'bg-oklch(0.96 0 0) border border-oklch(0.82 0 0) text-oklch(0.45 0 0) group-hover:border-oklch(0.78 0.16 85 / 50%) group-hover:text-oklch(0.78 0.16 85)'
                      )
                }`}>
                  {step.num}
                </div>
              </div>

              {/* Label */}
              <div className={`py-2 px-4 rounded-lg transition-colors duration-200 flex-1 ${
                th(
                  'bg-white/[0.02] group-hover:bg-white/[0.05]',
                  'bg-oklch(0.97 0 0) group-hover:bg-oklch(0.94 0 0)'
                )
              }`}>
                <span className={`text-sm font-medium transition-colors duration-200 ${
                  i === 0
                    ? 'text-nyc-taxi'
                    : th('text-white/60 group-hover:text-white/80', 'text-oklch(0.35 0 0) group-hover:text-oklch(0.20 0 0)')
                }`}>
                  {step.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <TaxiDivider />

      {/* 3-column layout for Install / API-key / Language */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Установка и базовая настройка</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <CodeBlock lang="bash" title="Установка" code={helperInstallCode} />
          <CodeBlock lang="bash" title="Настройка API-ключа" code={helperAuthCode} />
          <CodeBlock lang="bash" title="Управление языком" code={helperLangCode} />
        </div>
      </div>

      <TaxiDivider />

      <h3 className="text-lg font-semibold mb-4">Справочник команд</h3>
      <div className="space-y-2">
        {commands.map((cmd, i) => (
          <motion.div
            key={cmd.cmd}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-2`}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <code className="text-sm font-mono text-nyc-taxi flex-shrink-0">{cmd.cmd}</code>
              <CopyButton text={cmd.cmd} />
            </div>
            <span className={`text-xs sm:text-sm ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>{cmd.description}</span>
            <Badge variant="outline" className={`text-xs w-fit sm:ml-auto ${th('border-white/10 text-white/40', 'border-oklch(0.82 0 0) text-oklch(0.50 0 0)')}`}>
              {cmd.category}
            </Badge>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
