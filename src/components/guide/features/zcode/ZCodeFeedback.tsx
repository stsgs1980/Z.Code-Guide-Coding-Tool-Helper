"use client";

import { MessageCircle, Apple, Monitor, ExternalLink } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { feedbackMethods } from "../../data/zcode/misc";

const platformIcon: Record<string, typeof Apple> = { macOS: Apple, Windows: Monitor };

export function ZCodeFeedback() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  return (
    <section id="zcode-feedback">
      <SectionHeader num="17" title="Обратная связь и поддержка" subtitle="Как сообщить о проблеме или предложить улучшение" />

      {/* Feedback methods */}
      <div className={`${th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm")} p-5 mb-6`}>
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle className="h-4 w-4 text-nyc-taxi" />
          <span className="text-sm font-semibold">Как отправить обратную связь</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className={`p-3 rounded-lg ${th("bg-white/[0.03]", "bg-oklch(0.96 0 0)")}`}>
            <div className="text-sm font-semibold mb-1">Форма обратной связи</div>
            <p className={`text-xs mb-2 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
              Заполните форму на Feishu — включите контекст использования, шаги воспроизведения и скриншоты.
            </p>
            <a href="https://zhipu-ai.feishu.cn/share/base/form/shrcn6ZwXeNSwdfcJ6Q8XeWVb6C"
              target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-xs text-nyc-taxi hover:underline`}>
              Открыть форму <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className={`p-3 rounded-lg ${th("bg-white/[0.03]", "bg-oklch(0.96 0 0)")}`}>
            <div className="text-sm font-semibold mb-1">Встроенная обратная связь</div>
            <p className={`text-xs ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
              Меню приложения → «Feedback» — отправьте отчёт прямо из Z Code с автоматическим сбором контекста.
            </p>
          </div>
        </div>
      </div>

      {/* Export logs */}
      <h4 className={`text-sm font-semibold mb-3 ${th("text-white/70", "text-oklch(0.30 0 0)")}`}>
        Экспорт логов для диагностики
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {feedbackMethods.map((fm) => {
          const Icon = platformIcon[fm.platform] || Monitor;
          return (
            <div key={fm.platform} className={`${card} p-5`}>
              <div className="flex items-center gap-2 mb-3">
                <Icon className="h-4 w-4 text-nyc-taxi" />
                <span className="text-sm font-semibold">{fm.platform}</span>
              </div>
              <ol className="space-y-2">
                {fm.steps.map((step, i) => (
                  <li key={i} className={`text-sm flex items-start gap-2 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
                    <span className="text-nyc-taxi font-mono flex-shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>

      {/* Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <img src="/images/zcode/feedback-in-app.jpg" alt="Обратная связь — форма в приложении"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
        <img src="/images/zcode/feedback-macos.png" alt="Экспорт логов на macOS"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
        <img src="/images/zcode/feedback-win.jpg" alt="Экспорт логов на Windows"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
      </div>

      <TaxiDivider />
    </section>
  );
}
