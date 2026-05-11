"use client";

import { SectionHeader, TaxiDivider, CodeBlock } from "../ui";
import { Badge } from "@/components/ui/badge";
import { commands, helperInstallCode, helperAuthCode, helperLangCode } from "../data/commands";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

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
