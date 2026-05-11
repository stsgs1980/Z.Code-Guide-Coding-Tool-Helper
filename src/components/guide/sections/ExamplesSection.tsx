"use client";

import { SectionHeader, CodeBlock } from "../ui";
import { motion } from "framer-motion";
import { MessageSquare, Bug, Rocket, Sparkles } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const examples = [
  {
    icon: MessageSquare,
    title: "Кодинг на естественном языке",
    desc: "Опишите задачу словами — AI напишет код",
    prompt: "Создай REST API на Next.js для управления задачами с Prisma и SQLite",
    lang: "bash",
  },
  {
    icon: Bug,
    title: "Отладка и исправление",
    desc: "AI найдёт и исправит ошибки в коде",
    prompt: "Исправь утечку памяти в этом React-компоненте: useEffect не очищает таймер",
    lang: "bash",
  },
  {
    icon: Rocket,
    title: "Оптимизация",
    desc: "AI предложит улучшения производительности",
    prompt: "Оптимизируй этот SQL-запрос — он выполняется 5 секунд на таблице 1M строк",
    lang: "bash",
  },
  {
    icon: Sparkles,
    title: "Умное автодополнение",
    desc: "Модели Haiku-уровня для быстрого дополнения",
    prompt: "Используйте GLM-4.5-Air для мгновенного дополнения при вводе кода",
    lang: "bash",
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
            transition={{ delay: i * 0.1 }}
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
              className="text-xs"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
