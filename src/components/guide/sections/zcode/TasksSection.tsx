"use client";

import { ListTodo, Archive, Pin, Trash2, Clock, Settings } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { FeatureCard, TipBox } from "../../ui/ZCodeUI";
import { ClickableImage } from "../../ui/ImageModal";
import { taskManagerFeatures, autoArchiveSettings } from "../../data/zcode/newdocs";

export function TasksSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <section id="tasks">
      <SectionHeader
        num="04"
        title="Задачи"
        subtitle="Управление сессиями и историей работы"
      />

      {/* Description */}
      <p className={`text-sm leading-relaxed mb-6 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        История диалогов в рамках проекта сохраняется как задачи. Вы можете вернуться к предыдущей работе 
        в любой момент, архивировать завершённые задачи или закрепить важные.
      </p>

      {/* Features */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {taskManagerFeatures.map((f) => {
          const iconMap: Record<string, React.ElementType> = { ListTodo, Archive, Pin, Trash: Trash2 };
          const Icon = iconMap[f.icon] || ListTodo;
          return (
            <div key={f.title} className={`p-4 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
              <Icon className="h-5 w-5 text-nyc-taxi mb-2" />
              <div className="text-sm font-semibold">{f.title}</div>
              <div className={`text-xs ${th("text-white/40", "text-oklch(0.55 0 0)")}`}>{f.desc}</div>
            </div>
          );
        })}
      </div>

      {/* New Task */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3">Создание новой задачи</h3>
        <div className="flex gap-2 mb-3">
          {["New Task в меню", "Cmd/Ctrl + N", "Введите запрос"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i === 0 ? "bg-nyc-taxi text-black" : th("bg-white/5 text-white/40", "bg-oklch(0.90 0 0) text-oklch(0.50 0 0)")
              }`}>
                {i + 1}
              </span>
              <span className={`text-sm ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>{step}</span>
            </div>
          ))}
        </div>
        <ClickableImage
          src="/images/zcode/task-new.png"
          alt="Создание новой задачи"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      {/* Auto-archive */}
      <div className={`p-5 mb-6 ${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")}`}>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-5 w-5 text-nyc-taxi" />
          <span className="font-semibold">{autoArchiveSettings.title}</span>
        </div>
        <p className={`text-sm mb-3 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
          {autoArchiveSettings.description}
        </p>
        <ul className="space-y-1 mb-3">
          {autoArchiveSettings.options.map((opt, i) => (
            <li key={i} className={`text-sm flex items-center gap-2 ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
              <Settings className="h-3 w-3 text-nyc-taxi" />
              {opt}
            </li>
          ))}
        </ul>
        <ClickableImage
          src={autoArchiveSettings.image}
          alt="Настройки автоархивирования"
          className={`w-full rounded-lg border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      <TipBox>
        Закреплённые задачи (pinned) исключаются из автоархивирования. Используйте это для важных сессий.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
