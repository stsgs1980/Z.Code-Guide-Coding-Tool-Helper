"use client";

import { SectionHeader, TaxiDivider, CodeBlock } from "../ui";
import { claudeCodeConfig, openaiCompatConfig } from "../data/tools";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

export function InstallSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="install" className="py-8">
      <SectionHeader
        num="04"
        title="Установка"
        subtitle="Пошаговая конфигурация для каждого инструмента"
      />

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="nyc-label">Рекомендуем</span>
            Claude Code
          </h3>
          <p className={`text-sm mb-3 ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>
            Claude Code работает через Anthropic API. Z.AI предоставляет
            прокси-сервер, поэтому достаточно настроить переменные окружения
            в файле <code className="text-nyc-taxi text-xs">settings.json</code>.
          </p>
          <CodeBlock
            lang={claudeCodeConfig.lang}
            title={claudeCodeConfig.title}
            code={claudeCodeConfig.code}
          />
        </motion.div>

        <TaxiDivider />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-3">
            OpenAI-совместимые инструменты
          </h3>
          <p className={`text-sm mb-3 ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>
            Большинство инструментов (OpenCode, Cline, Cursor, Goose и др.)
            используют OpenAI-совместимый API. Укажите следующие параметры:
          </p>
          <CodeBlock
            lang={openaiCompatConfig.lang}
            title={openaiCompatConfig.title}
            code={openaiCompatConfig.code}
          />
        </motion.div>

        <TaxiDivider />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-3">Установка через Coding Tool Helper</h3>
          <CodeBlock
            lang="bash"
            title="Автоматическая настройка"
            code={`# Запустите мастер настройки
coding-helper init

# Мастер предложит:
# 1. Выбрать инструмент (Claude Code, Cline и т.д.)
# 2. Ввести API-ключ
# 3. Выбрать модель по умолчанию
# 4. Настроить язык интерфейса

# После настройки можно сразу работать!`}
          />
        </motion.div>
      </div>
    </section>
  );
}
