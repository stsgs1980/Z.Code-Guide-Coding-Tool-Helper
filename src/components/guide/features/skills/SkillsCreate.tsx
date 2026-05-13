"use client";

import { Lightbulb } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { TaxiDivider, CodeBlock } from "../../ui";
import { frontmatterFields } from "../../data/skills";

export function SkillsCreate() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Создание навыка</h3>

      {/* Step 1 */}
      <div className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-5`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-nyc-taxi text-black flex items-center justify-center text-xs font-bold">1</div>
          <span className="text-sm font-semibold">Создайте папку и файл</span>
        </div>
        <CodeBlock code={`skills/\n└── my-skill/\n    └── SKILL.md`} lang="text" title="Структура" />
        <p className={`text-xs mt-2 ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
          Минимум — одна папка с одним файлом SKILL.md. Больше ничего не нужно.
        </p>
      </div>

      {/* Step 2 */}
      <div className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-5`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-nyc-taxi text-black flex items-center justify-center text-xs font-bold">2</div>
          <span className="text-sm font-semibold">Напишите SKILL.md</span>
        </div>
        <CodeBlock
          code={`---
name: performance-code-generator
description: "Генерация высокопроизводительного кода. Используй когда
пользователь просит написать производительный код, оптимизировать
существующий код, улучшить скорость, уменьшить потребление памяти,
или при упоминании: 'медленный код', 'оптимизация', 'Big O',
'cache miss', 'SIMD', 'lock-free', 'bottleneck'."
---

# Performance Code Generator

Ты — эксперт по высокопроизводительной разработке.

## Принципы

### 1. Алгоритмическая эффективность (Big O)
Всегда выбирай алгоритмы с наименьшей сложностью.
O(1) > O(log n) > O(n) > O(n log n) > O(n²)

### 2. Кэш-локальность
Структурируй данные компактно в памяти.
Предпочитай AoS для последовательного обхода,
SoA для векторизуемых операций.

## Формат ответа
\`\`\`
## Решение
[Код]

## Обоснование
### Сложность: O(...)
### Кэш-локальность: [...]
### Аллокации: [...]
\`\`\``}
          lang="yaml"
          title="Пример SKILL.md — performance-code-generator"
        />
      </div>

      {/* Step 3 — Frontmatter rules */}
      <div className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-5`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-nyc-taxi text-black flex items-center justify-center text-xs font-bold">3</div>
          <span className="text-sm font-semibold">Правила frontmatter</span>
        </div>
        <div className="space-y-2">
          {frontmatterFields.map((item) => (
            <div key={item.field} className={`flex items-start gap-3 p-2 rounded ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
              <code className="text-xs font-mono text-nyc-taxi flex-shrink-0 mt-0.5">{item.field}</code>
              {item.required && <span className="text-[10px] text-red-400 mt-0.5">required</span>}
              <span className={`text-xs ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{item.desc}</span>
            </div>
          ))}
        </div>
        <div className={`mt-3 p-3 rounded-lg ${th("bg-nyc-taxi/5 border border-nyc-taxi/10", "bg-oklch(0.78 0.16 85 / 5%) border border-oklch(0.78 0.16 85 / 15%)")}`}>
          <p className={`text-xs leading-relaxed ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
            <Lightbulb className="h-3.5 w-3.5 text-nyc-taxi inline mr-1" />
            <strong>Ключевой секрет:</strong> поле <code className="text-nyc-taxi">description</code> — это единственное, что AI видит при выборе навыка.
            Сделайте его подробным с ключевыми словами, синонимами и контекстами вызова.
            Лучше перестараться, чем недописать.
          </p>
        </div>
      </div>

      {/* Step 4 — Optional structure */}
      <div className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-5`}>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-nyc-taxi text-black flex items-center justify-center text-xs font-bold">4</div>
          <span className="text-sm font-semibold">Расширенная структура (опционально)</span>
        </div>
        <CodeBlock
          code={`skills/
└── my-skill/
    ├── SKILL.md           ← Обязательный. Инструкции для AI
    ├── scripts/           ← Скрипты для детерминированных задач
    │   └── validate.py    ← AI может запустить скрипт
    ├── references/        ← Документация, загружаемая по необходимости
    │   ├── api.md         ← Справочник API
    │   └── patterns.md    ← Шаблоны и примеры
    └── assets/            ← Файлы для генерации (шаблоны, иконки)
        └── template.html`}
          lang="text"
          title="Полная структура навыка"
        />
      </div>
    </div>
  );
}
