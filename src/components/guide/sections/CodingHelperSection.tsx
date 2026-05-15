"use client";

import { ArrowLeft, Terminal, Wand2, LayoutList, Wrench, Server, HardDrive, Globe, CheckCircle2, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTheme } from "../hooks/useTheme";
import { SectionHeader, TaxiDivider, CodeBlock } from "../ui";
import { codingHelperCommands } from "../data/zcode/commands";

const features = [
  { icon: Wand2, title: "Interactive Wizard", desc: "Пошаговый мастер настройки с интерактивными подсказками" },
  { icon: LayoutList, title: "Plan Integration", desc: "Автоматическая привязка GLM Coding Plan к вашему аккаунту" },
  { icon: Wrench, title: "Tool Management", desc: "Обнаружение, установка и настройка инструментов кодинга" },
  { icon: Server, title: "MCP Configuration", desc: "Настройка MCP серверов прямо из командной строки" },
  { icon: HardDrive, title: "Local Storage", desc: "Безопасное хранение конфигурации на локальной машине" },
  { icon: Globe, title: "I18n Support", desc: "Поддержка нескольких языков интерфейса" },
];

const wizardSteps = [
  { icon: Globe, label: "Выбор языка интерфейса" },
  { icon: LayoutList, label: "Выбор кодинг-плана" },
  { icon: Terminal, label: "Ввод API-ключа" },
  { icon: Wrench, label: "Выбор инструментов" },
  { icon: Server, label: "Автоустановка инструментов" },
  { icon: CheckCircle2, label: "Загрузка плана в инструменты" },
  { icon: Server, label: "Настройка MCP (опционально)" },
  { icon: CheckCircle2, label: "Готово — запускайте!" },
];

const troubleshootingItems = [
  { problem: "Network error", solution: "Проверьте подключение к интернету и доступность api.z.ai. Установите переменные HTTP_PROXY и HTTPS_PROXY, если используете прокси." },
  { problem: "Network timeout", solution: "Проверьте стабильность соединения и настройки прокси. Запустите coding-helper doctor для диагностики." },
  { problem: "Permission denied (EACCES)", solution: "Используйте sudo для глобальной установки, либо предпочитайте npx @z_ai/coding-helper без глобальной установки." },
  { problem: "Некорректный статус плагина в Claude Code Marketplace", solution: "Обновите Claude Code до версии 2.0.70+: выполните claude update." },
  { problem: "API Key invalid", solution: "Проверьте корректность ключа и баланс аккаунта. Запустите coding-helper doctor для проверки." },
  { problem: "Connection timeout", solution: "Проверьте сеть, настройки брандмауэра и версию Node.js (>= 18)." },
];

interface CodingHelperSectionProps { onBack?: () => void; }

export function CodingHelperSection({ onBack }: CodingHelperSectionProps) {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section className="py-10 md:py-14">
      {onBack && (
        <div className={`sticky top-0 z-30 -mx-4 sm:-mx-6 -mt-10 md:-mt-14 mb-6 px-4 sm:px-6 py-3 flex items-center gap-3 backdrop-blur-md border-b ${th('bg-background/80 border-white/5', 'bg-background/80 border-oklch(0.88 0 0)')}`}>
          <button onClick={onBack} className={`flex items-center gap-2 text-sm font-medium transition-colors ${th('text-white/60 hover:text-nyc-taxi', 'text-oklch(0.35 0 0) hover:text-oklch(0.78 0.16 85)')} group`} aria-label="Назад к руководству">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Назад</span>
          </button>
          <div className={`h-4 w-px ${th('bg-white/10', 'bg-oklch(0.82 0 0)')}`} />
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-nyc-taxi" />
            <span className="text-sm font-semibold nyc-gradient-text">Coding Tool Helper</span>
          </div>
        </div>
      )}

      <SectionHeader num="02" title="Coding Tool Helper" subtitle="CLI-утилита для настройки GLM Coding Plan в инструментах кодинга" />

      {/* Header area */}
      <div className={`${th('nyc-card-highlight-enhanced', 'rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm')} p-6 mb-6`}>
        <p className={`text-sm leading-relaxed ${th('text-white/80', 'text-oklch(0.25 0 0)')}`}>
          <code className="text-nyc-taxi">@z_ai/coding-helper</code> — это CLI-утилита, которая быстро загружает GLM Coding Plan в ваши любимые инструменты кодинга. Поддерживаемые инструменты: Claude Code, OpenCode, Crush, Factory Droid.
        </p>
        <div className={`text-xs mt-3 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
          Требуется: <code className="text-nyc-taxi">Node.js &ge; v18.0.0</code>
        </div>
      </div>

      <TaxiDivider />

      {/* Key Features */}
      <h3 className="text-xl font-semibold mb-4 mt-6">Ключевые возможности</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <motion.div key={feat.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-nyc-taxi" />
                <span className="text-sm font-semibold">{feat.title}</span>
              </div>
              <p className={`text-sm leading-relaxed ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{feat.desc}</p>
            </motion.div>
          );
        })}
      </div>

      <TaxiDivider />

      {/* Quick Start */}
      <h3 className="text-xl font-semibold mb-4 mt-6">Быстрый старт</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <p className={`text-xs font-semibold mb-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>Способ 1 (Рекомендуется)</p>
          <CodeBlock code="npx @z_ai/coding-helper" lang="bash" title="terminal" />
        </div>
        <div>
          <p className={`text-xs font-semibold mb-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>Способ 2 (Глобальная установка)</p>
          <CodeBlock code={`npm install -g @z_ai/coding-helper\n# Затем:\ncoding-helper\n# или:\nchelper`} lang="bash" title="terminal" />
        </div>
      </div>

      <TaxiDivider />

      {/* Setup Wizard Flow */}
      <h3 className="text-xl font-semibold mb-4 mt-6">Мастер настройки</h3>
      <p className={`text-sm leading-relaxed mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        После запуска <code className="text-nyc-taxi">coding-helper init</code> мастер проведёт вас через 8 шагов.
      </p>
      <div className="relative mb-6">
        <div className={`absolute left-[15px] top-2 bottom-2 w-px ${th('bg-gradient-to-b from-nyc-taxi/40 via-nyc-taxi/20 to-transparent', 'bg-gradient-to-b from-oklch(0.78 0.16 85 / 30%) via-oklch(0.78 0.16 85 / 15%) to-transparent')}`} />
        <div className="space-y-1">
          {wizardSteps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex items-center gap-4 group">
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-nyc-taxi text-black shadow-md shadow-nyc-taxi/30' : th('bg-oklch(0.18 0 0) border border-white/10 text-white/50 group-hover:border-nyc-taxi/40 group-hover:text-nyc-taxi', 'bg-oklch(0.96 0 0) border border-oklch(0.82 0 0) text-oklch(0.45 0 0) group-hover:border-oklch(0.78 0.16 85 / 50%) group-hover:text-oklch(0.78 0.16 85)')}`}>
                    {i + 1}
                  </div>
                </div>
                <div className={`py-2 px-4 rounded-lg flex-1 flex items-center gap-3 ${th('bg-white/[0.02] group-hover:bg-white/[0.05]', 'bg-oklch(0.97 0 0) group-hover:bg-oklch(0.94 0 0)')}`}>
                  <Icon className={`h-4 w-4 flex-shrink-0 ${i === 0 ? 'text-nyc-taxi' : th('text-white/40 group-hover:text-nyc-taxi/60', 'text-oklch(0.50 0 0) group-hover:text-oklch(0.78 0.16 85 / 60%)')}`} />
                  <span className={`text-sm font-medium ${i === 0 ? 'text-nyc-taxi' : th('text-white/60 group-hover:text-white/80', 'text-oklch(0.35 0 0) group-hover:text-oklch(0.20 0 0)')}`}>{step.label}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <TaxiDivider />

      {/* Command Reference */}
      <h3 className="text-xl font-semibold mb-4 mt-6">Справочник команд</h3>
      <div className={`rounded-lg border overflow-hidden mb-6 ${th('border-white/10 bg-white/[0.02]', 'border-oklch(0.88 0 0) bg-oklch(0.97 0 0)')}`}>
        <div className={`grid grid-cols-[1fr_2fr] text-xs font-semibold px-4 py-2.5 ${th('border-b border-white/[0.05] text-white/40', 'border-b border-oklch(0.88 0 0) text-oklch(0.45 0 0)')}`}>
          <span>Команда</span><span>Описание</span>
        </div>
        {codingHelperCommands.map((cmd, i) => (
          <div key={cmd.command} className={`grid grid-cols-[1fr_2fr] items-start px-4 py-2.5 ${i < codingHelperCommands.length - 1 ? th('border-b border-white/[0.03]', 'border-b border-oklch(0.92 0 0)') : ''}`}>
            <code className={`text-xs font-mono ${th('text-nyc-taxi', 'text-oklch(0.78 0.16 85)')}`}>{cmd.command}</code>
            <span className={`text-xs ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>{cmd.description}</span>
          </div>
        ))}
      </div>

      <TaxiDivider />

      {/* Troubleshooting */}
      <h3 className="text-xl font-semibold mb-4 mt-6">Устранение неполадок</h3>
      <Accordion type="single" collapsible className="w-full mb-6">
        {troubleshootingItems.map((item, i) => (
          <AccordionItem key={`ch-trouble-${i}`} value={`ch-trouble-${i}`} className={th('border-white/5', 'border-oklch(0.88 0 0)')}>
            <AccordionTrigger className={`text-sm text-left font-bold ${th('text-white/90 hover:text-nyc-taxi', 'text-oklch(0.15 0 0) hover:text-oklch(0.78 0.16 85)')} hover:no-underline ${th('[&>svg]:text-white/30', '[&>svg]:text-oklch(0.50 0 0)')}`}>
              <span className={th('border-l-2 border-nyc-taxi/40 pl-3', 'border-l-2 border-oklch(0.78 0.16 85 / 40%) pl-3')}>{item.problem}</span>
            </AccordionTrigger>
            <AccordionContent className={`text-sm whitespace-pre-line ${th('text-white/50 pl-5', 'text-oklch(0.40 0 0) pl-5')}`}>{item.solution}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <TaxiDivider />

      {/* Integration with ZCode */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Monitor className="h-5 w-5 text-nyc-taxi" />
        Интеграция с ZCode Desktop
      </h3>
      <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}>
        <p className={`text-sm leading-relaxed ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
          Coding Tool Helper и ZCode Desktop работают совместно. Настройте API-ключи через Coding Tool Helper в терминале, и они автоматически станут доступны в ZCode Desktop. Это позволяет быстро переключаться между CLI-инструментами и десктопной средой без повторной настройки.
        </p>
      </div>
    </section>
  );
}
