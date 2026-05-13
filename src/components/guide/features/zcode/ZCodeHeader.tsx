"use client";

import { motion } from "framer-motion";
import { MessageSquare, Eye, Shield, Layers, ShieldCheck, Clock, Users, Globe } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { welcomeFeatures, newReleaseStrengths } from "../../data/zcode/features";

const iconMap: Record<string, React.ElementType> = {
  MessageSquare, Eye, Shield, Layers, ShieldCheck, Clock, Users, Globe,
};

export function ZCodeHeader() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");
  const hlCard = th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm");

  return (
    <section id="zcode-welcome">
      <SectionHeader
        num="03"
        title="ZCode Desktop — ADE"
        subtitle="Agentic Development Environment — полноценная среда AI-разработки"
      />

      {/* Intro */}
      <div className={`${hlCard} p-6 mb-6`}>
        <p className={`text-sm leading-relaxed mb-3 ${th("text-white/70", "text-oklch(0.30 0 0)")}`}>
          ZCode — это <strong>Agentic Development Environment (ADE)</strong>, среда разработки,
          в которой AI-агенты находятся в центре рабочего процесса. Это больше, чем чат-интерфейс —
          через естественный язык вы напрямую управляете Agent для полного цикла задач: от кодинга и
          отладки до предпросмотра проекта.
        </p>
        <div className={`text-sm ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
          Статус: Private Beta &middot; Версия: v2.0.0 &middot; Платформы: macOS, Windows, Linux
        </div>
      </div>

      {/* 3 Vision Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {welcomeFeatures.map((f, i) => {
          const Icon = iconMap[f.icon] || Shield;
          return (
            <motion.div key={f.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={`${card} p-5`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-5 w-5 text-nyc-taxi" />
                <span className="text-lg font-semibold">{f.title}</span>
              </div>
              <p className={`text-sm leading-relaxed ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{f.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <img src="/images/zcode/welcome-login-modal.png" alt="ZCode Desktop — экран входа с модальным окном авторизации" className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
        <img src="/images/zcode/welcome-new-task.png" alt="ZCode Desktop — создание новой задачи" className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
      </div>

      <TaxiDivider />

      {/* What makes new release stronger */}
      <h3 className="text-lg font-semibold mb-4 mt-6">Что делает новый релиз сильнее?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {newReleaseStrengths.map((s, i) => {
          const Icon = iconMap[s.icon] || Shield;
          return (
            <motion.div key={s.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={`${card} p-5`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-5 w-5 text-nyc-taxi" />
                <span className="text-lg font-semibold">{s.title}</span>
              </div>
              <p className={`text-sm leading-relaxed ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{s.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
