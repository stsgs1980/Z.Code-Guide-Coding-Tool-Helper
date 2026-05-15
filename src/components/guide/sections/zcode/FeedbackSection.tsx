"use client";

import { MessageCircle, ExternalLink, Apple, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { TipBox } from "../../ui/ZCodeUI";
import { ClickableImage } from "../../ui/ImageModal";
import { feedbackData } from "../../data/zcode/newdocs";

export function FeedbackSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  const platformIcons: Record<string, React.ElementType> = {
    "Встроенная форма": MessageCircle,
    "macOS": Apple,
    "Windows": Monitor,
  };

  return (
    <section id="feedback">
      <SectionHeader
        num="13"
        title="Feedback & Support"
        subtitle="Как сообщить о проблеме или предложить улучшение"
      />

      <p className={`text-sm leading-relaxed mb-6 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Для эффективной диагностики проблем рекомендуется включать подробный контекст использования, 
        шаги воспроизведения и логи ошибок при отправке обратной связи.
      </p>

      {/* Feedback form link */}
      <div className={`p-4 mb-6 ${th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm")}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold mb-1">Форма обратной связи</div>
            <p className={`text-sm ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
              Заполните форму на Feishu
            </p>
          </div>
          <a
            href={feedbackData.formUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-nyc-taxi hover:underline text-sm"
          >
            Открыть <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Export logs */}
      <h3 className="text-base font-semibold mb-3">Экспорт логов</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {feedbackData.methods.map((method, i) => {
          const Icon = platformIcons[method.platform] || MessageCircle;
          return (
            <motion.div
              key={method.platform}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${card} p-4`}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className="h-4 w-4 text-nyc-taxi" />
                <span className="font-semibold">{method.platform}</span>
              </div>
              <ol className="space-y-2 mb-3">
                {method.steps.map((step, j) => (
                  <li key={j} className={`text-sm flex items-start gap-2 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
                    <span className="text-nyc-taxi font-mono flex-shrink-0">{j + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              {method.image && (
                <ClickableImage
                  src={method.image}
                  alt={method.platform}
                  className={`w-full rounded-lg border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Logs location */}
      <div className={`p-4 mb-6 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
        <h4 className="text-sm font-semibold mb-2">Расположение логов</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Apple className="h-4 w-4 text-nyc-taxi" />
            <code className={`text-sm ${th("text-white/70", "text-oklch(0.30 0 0)")}`}>~/.zcode/logs</code>
          </div>
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-nyc-taxi" />
            <code className={`text-sm ${th("text-white/70", "text-oklch(0.30 0 0)")}`}>%USERPROFILE%\.zcode\logs</code>
          </div>
        </div>
      </div>

      <TipBox>
        Используйте встроенный Export Logs сначала. Если экспорт не работает — логи можно найти вручную.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
