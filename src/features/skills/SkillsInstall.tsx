"use client";

import { FolderOpen, Package, BookOpen, Sparkles } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { TaxiDivider, CodeBlock } from "../../ui";
import { installAiCommands } from "@/data/skills";

export function SkillsInstall() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Установка и перенос навыков</h3>

      {/* Method 1 */}
      <div className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-5`}>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-nyc-taxi" />
          Способ 1: Копирование папки (самый простой)
        </h4>
        <CodeBlock code={`# Навык — это просто папка. Копируйте куда угодно:\ncp -r skills/performance-code-generator /другой/проект/skills/\n\n# После копирования навык автоматически доступен`} lang="bash" title="Копирование навыка" />
        <div className={`mt-3 p-3 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
          <p className={`text-xs ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>
            ✅ Навык сразу работает — AI читает все папки из skills/ при запуске
          </p>
        </div>
      </div>

      {/* Method 2 */}
      <div className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-5`}>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Package className="h-4 w-4 text-nyc-taxi" />
          Способ 2: Через .skill файл (портативный)
        </h4>
        <CodeBlock code={`# Упаковать навык в .skill файл (zip-архив):\npython3 -m scripts.package_skill ../my-skill --output /tmp/\n\n# Результат: /tmp/my-skill.skill (3-4 KB)\n\n# Распаковать в другой проект:\nunzip my-skill.skill -d /другой/проект/skills/my-skill/`} lang="bash" title="Упаковка и распаковка" />
        <div className={`mt-3 p-3 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
          <p className={`text-xs ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>
            ✅ .skill файл можно пересылать, скачивать, делиться — это обычный zip-архив
          </p>
        </div>
      </div>

      {/* Method 3 */}
      <div className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-5`}>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-nyc-taxi" />
          Способ 3: Через Git (для команд)
        </h4>
        <CodeBlock code={`# Навыки в репозитории — клонируйте и используйте\ngit clone <repo-url>\n# Навыки в: skills/performance-code-generator/ и skills/code-reviewer/`} lang="bash" title="Через Git" />
      </div>

      {/* Method 4 — No terminal */}
      <div className={`${th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm")} p-5`}>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-nyc-taxi" />
          Способ 4: Без терминала (через AI-ассистента)
        </h4>
        <div className={`rounded-lg p-4 ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
          <p className={`text-sm leading-relaxed mb-3 ${th("text-white/70", "text-oklch(0.30 0 0)")}`}>
            Если у вас нет доступа к терминалу — просто попросите AI-ассистента:
          </p>
          <div className="space-y-2">
            {installAiCommands.map((item) => (
              <div key={item.cmd} className="flex items-start gap-2">
                <span className="text-nyc-taxi text-xs mt-0.5">▸</span>
                <div>
                  <code className="text-xs font-mono text-nyc-taxi">{item.cmd}</code>
                  <span className={`text-xs ml-2 ${th("text-white/30", "text-oklch(0.50 0 0)")}`}>— {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TaxiDivider />

      <h3 className="text-lg font-semibold">Структура проекта с навыками</h3>
      <CodeBlock
        code={`любой-проект/\n└── skills/\n    ├── LLM/                        ← встроенные\n    ├── VLM/                        ← встроенные\n    ├── ASR/                        ← встроенные\n    ├── code-reviewer/              ← ВАШ навык\n    │   └── SKILL.md\n    └── performance-code-generator/ ← ВАШ навык\n        ├── SKILL.md\n        └── evals/evals.json`}
        lang="text"
        title="Структура директории skills/"
      />
    </div>
  );
}
