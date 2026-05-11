"use client";

import { SectionHeader, TaxiDivider, CodeBlock } from "../ui";
import { motion } from "framer-motion";
import { UserPlus, Key, Settings, Play } from "lucide-react";
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
    <section id="quick-start" className="py-8">
      <SectionHeader
        num="01"
        title="Быстрый старт"
        subtitle="От регистрации до первого AI-запроса за 4 шага"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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

      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-semibold">Регистрация и API-ключ</h3>
        <p className={`text-sm ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
          Перейдите на <a href="https://z.ai" target="_blank" rel="noopener" className="nyc-link-hover">z.ai</a>,
          создайте аккаунт и оформите подписку GLM Coding Plan.
          Затем получите API-ключ в разделе{" "}
          <a href="https://z.ai/manage-apikey/apikey-list" target="_blank" rel="noopener" className="nyc-link-hover">
            Управление API-ключами
          </a>.
        </p>

        <CodeBlock
          lang="bash"
          title="Настройка Claude Code"
          code={`# Установите Coding Tool Helper
npm install -g @z_ai/coding-helper

# Запустите мастер настройки
coding-helper init

# Или настройте API-ключ напрямую
coding-helper auth glm_coding_plan_global YOUR_API_KEY`}
        />

        <CodeBlock
          lang="bash"
          title="Для OpenAI-совместимых инструментов"
          code={`# Base URL: https://api.z.ai/api/paas/v4
# API Key: YOUR_API_KEY
# Model: GLM-4.7

# Пример с curl
curl https://api.z.ai/api/paas/v4/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"GLM-4.7","messages":[{"role":"user","content":"Hello"}]}'`}
        />
      </div>
    </section>
  );
}
