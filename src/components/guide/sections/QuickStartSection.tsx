"use client";

import { SectionHeader, TaxiDivider, CodeBlock } from "../ui";
import { motion } from "framer-motion";
import { UserPlus, Key, Settings, Play, ExternalLink } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const steps = [
  {
    icon: UserPlus,
    title: "Зарегистрируйтесь",
    desc: "Создайте аккаунт на z.ai",
  },
  {
    icon: Key,
    title: "Получите API-ключ",
    desc: "В панели управления создайте ключ",
  },
  {
    icon: Settings,
    title: "Настройте инструмент",
    desc: "Укажите Base URL и ключ",
  },
  {
    icon: Play,
    title: "Начните кодить",
    desc: "Запустите AI-ассистента",
  },
];

export function QuickStartSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="quick-start" className="py-10 md:py-14">
      <SectionHeader
        num="01"
        title="Быстрый старт"
        subtitle="От регистрации до первого AI-запроса за 4 шага"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4 text-center`}
          >
            <div className="w-8 h-8 rounded-full bg-nyc-taxi/10 flex items-center justify-center mx-auto mb-3">
              <step.icon className="h-4 w-4 text-nyc-taxi" />
            </div>
            <div className="text-xs text-nyc-taxi font-mono mb-1">Шаг {i + 1}</div>
            <div className="font-semibold text-sm">{step.title}</div>
            <div className={`text-xs ${th('text-white/40', 'text-oklch(0.50 0 0)')} mt-1`}>{step.desc}</div>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      <div className="space-y-6 mt-6">
        <h3 className="text-lg font-semibold">Регистрация и API-ключ</h3>
        <p className={`text-sm ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
          Перейдите на{" "}
          <a href="https://z.ai" target="_blank" rel="noopener" className="nyc-link-hover inline-flex items-center gap-1">
            z.ai <ExternalLink className="h-3 w-3" />
          </a>, создайте аккаунт и оформите подписку GLM Coding Plan.
          Затем получите API-ключ в разделе{" "}
          <a href="https://z.ai/manage-apikey/apikey-list" target="_blank" rel="noopener" className="nyc-link-hover inline-flex items-center gap-1">
            Управление API-ключами <ExternalLink className="h-3 w-3" />
          </a>.
        </p>

        <CodeBlock
          lang="bash"
          title="Способ 1: Автоматическая настройка (рекомендуется)"
          code={`# Установите Coding Tool Helper
npm install -g @z_ai/coding-helper

# Запустите мастер настройки
coding-helper init

# Мастер предложит:
# 1. Выбрать язык (ru / en_US)
# 2. Выбрать кодинг-план (Global)
# 3. Ввести API-ключ
# 4. Выбрать инструменты для настройки
# 5. Автоустановить инструменты
# 6. Загрузить план в инструменты

# Или настройте API-ключ напрямую:
coding-helper auth glm_coding_plan_global YOUR_API_KEY`}
        />

        <CodeBlock
          lang="bash"
          title="Способ 2: Ручная настройка Claude Code"
          code={`# Отредактируйте файл: ~/.claude/settings.json
# (macOS/Linux) или <user_dir>/.claude/settings.json (Windows)

{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_Z.ai_api_key",
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-5.1",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.7",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air"
  }
}`}
        />

        <CodeBlock
          lang="bash"
          title="Способ 3: OpenAI-совместимые инструменты"
          code={`# Base URL: https://api.z.ai/api/paas/v4
# API Key: YOUR_API_KEY
# Model: GLM-4.7

# Пример с curl
curl https://api.z.ai/api/paas/v4/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"GLM-4.7","messages":[{"role":"user","content":"Hello"}]}'

# Подходит для: OpenCode, Cline, Cursor, Goose, Kilo Code и др.`}
        />
      </div>
    </section>
  );
}
