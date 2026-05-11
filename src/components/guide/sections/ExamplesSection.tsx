"use client";

import { SectionHeader, CodeBlock } from "../ui";
import { motion } from "framer-motion";
import { MessageSquare, Bug, Rocket, Sparkles, Search, Eye } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const examples = [
  {
    icon: MessageSquare,
    title: "Генерация кода на естественном языке",
    desc: "Опишите задачу словами — AI напишет код",
    prompt: "Создай REST API на Next.js для управления задачами с Prisma и SQLite. Включи CRUD-эндпоинты, валидацию и обработку ошибок.",
    lang: "bash",
    model: "GLM-4.7",
    tip: "Используйте GLM-4.7 для повседневных задач кодинга — оптимальное соотношение скорости и качества.",
  },
  {
    icon: Bug,
    title: "Отладка и исправление ошибок",
    desc: "AI найдёт и исправит ошибки в коде",
    prompt: "Исправь утечку памяти в этом React-компоненте: useEffect не очищает таймер, и при каждом рендере создаётся новый интервал.",
    lang: "bash",
    model: "GLM-4.7",
    tip: "Скопируйте ошибку из консоли и вставьте в чат — AI определит причину и предложит исправление.",
  },
  {
    icon: Rocket,
    title: "Сложная архитектура и рефакторинг",
    desc: "AI предложит улучшения и перепишет архитектуру",
    prompt: "Перепиши монолитный модуль авторизации на микросервисную архитектуру с JWT, refresh tokens и rate limiting.",
    lang: "bash",
    model: "GLM-5.1",
    tip: "Для сложных задач используйте GLM-5.1 — он эффективнее в рассуждениях и масштабных изменениях.",
  },
  {
    icon: Sparkles,
    title: "Быстрое автодополнение",
    desc: "Мгновенные подсказки при вводе кода",
    prompt: "Используйте GLM-4.5-Air для мгновенного дополнения при вводе — функция, циклы, импорты.",
    lang: "bash",
    model: "GLM-4.5-Air",
    tip: "Haiku-уровень модели — самые быстрые ответы, идеально для автодополнения и мелких правок.",
  },
  {
    icon: Search,
    title: "Поиск информации в реальном времени",
    desc: "Web Search MCP находит актуальную документацию",
    prompt: "Найди последние изменения в Next.js 15 App Router и обнови роутинг в моём проекте.",
    lang: "bash",
    model: "GLM-4.7 + MCP",
    tip: "Подключите Web Search MCP для доступа к актуальной информации из интернета прямо в чате.",
  },
  {
    icon: Eye,
    title: "Анализ скриншотов и UI",
    desc: "Vision MCP распознаёт интерфейсы и ошибки",
    prompt: "Проанализируй скриншот ошибки в терминале и предложи решение. Файл: error-screenshot.png",
    lang: "bash",
    model: "GLM-4.7 + MCP",
    tip: "Разместите изображение в локальной директории и укажите имя файла — MCP Vision проанализирует его.",
  },
];

export function ExamplesSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="examples" className="py-8">
      <SectionHeader
        num="08"
        title="Примеры использования"
        subtitle="Как использовать Z Code в повседневной разработке"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {examples.map((ex, i) => (
          <motion.div
            key={ex.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-5`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-nyc-taxi/10 flex items-center justify-center">
                <ex.icon className="h-4 w-4 text-nyc-taxi" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{ex.title}</h3>
                <p className={`text-xs ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>{ex.desc}</p>
              </div>
            </div>
            <CodeBlock
              lang={ex.lang}
              code={ex.prompt}
              className="text-xs mb-2"
            />
            <div className={`text-[11px] flex items-center gap-2 ${th('text-white/40', 'text-oklch(0.55 0 0)')}`}>
              <span className="px-1.5 py-0.5 rounded bg-nyc-taxi/10 text-nyc-taxi font-mono font-semibold">
                {ex.model}
              </span>
              <span>💡 {ex.tip}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
