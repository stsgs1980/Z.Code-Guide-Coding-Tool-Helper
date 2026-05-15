"use client";

import { motion } from "framer-motion";
import { Pencil, MousePointerClick, RefreshCw } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { ClickableImage } from "../../ui/ImageModal";
import { editUseCases } from "../../data/zcode/features";

export function ZCodeEditHistory() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");
  const hlCard = th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm");

  return (
    <section id="zcode-edit-history">
      <SectionHeader
        num="07"
        title="Редактирование отправленных сообщений"
        subtitle="Исправляйте и уточняйте инструкции на лету"
      />

      {/* How to enter edit mode */}
      <div className={`${hlCard} p-5 mb-6`}>
        <div className="flex items-center gap-2 mb-2">
          <MousePointerClick className="h-5 w-5 text-nyc-taxi" />
          <span className="text-lg font-semibold">Как войти в режим редактирования</span>
        </div>
        <p className={`text-sm leading-relaxed ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
          Наведите курсор на своё сообщение в истории диалога и нажмите иконку <strong>карандаша</strong> (Edit Message) в правом верхнем углу.
          Сообщение переключится в режим редактирования.
        </p>
      </div>

      {/* What editing helps with */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className={`${card} p-5`}>
          <div className="flex items-center gap-2 mb-2">
            <Pencil className="h-4 w-4 text-nyc-taxi" />
            <span className="text-lg font-semibold">Прямые изменения</span>
          </div>
          <p className={`text-sm leading-relaxed ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
            Редактируйте текст любого отправленного сообщения — Agent регенерирует цепочку ответов на основе обновлённого содержания.
          </p>
        </div>
        <div className={`${card} p-5`}>
          <div className="flex items-center gap-2 mb-2">
            <RefreshCw className="h-4 w-4 text-nyc-taxi" />
            <span className="text-lg font-semibold">Контекст сохранён</span>
          </div>
          <p className={`text-sm leading-relaxed ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
            Общая структура диалога сохраняется. Agent переобрабатывает только затронутую часть цепочки, не теряя предшествующий контекст.
          </p>
        </div>
      </div>

      {/* Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <ClickableImage src="/images/zcode/edit-history-enter.png" alt="Вход в режим редактирования — иконка карандаша" className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
        <ClickableImage src="/images/zcode/edit-history-button.png" alt="Кнопка редактирования сообщения" className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
      </div>

      {/* Use cases */}
      <h3 className="text-lg font-semibold mb-4">Сценарии использования</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {editUseCases.map((uc, i) => (
          <motion.div
            key={uc.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`${card} p-5`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Pencil className="h-4 w-4 text-nyc-taxi" />
              <span className="text-lg font-semibold">{uc.title}</span>
            </div>
            <p className={`text-sm leading-relaxed ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{uc.desc}</p>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />
    </section>
  );
}
