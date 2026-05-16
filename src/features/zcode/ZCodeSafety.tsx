"use client";

import { motion } from "framer-motion";
import { Lock, Terminal, Globe, AlertTriangle, Keyboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "@/ui/SectionHeader";
import { TaxiDivider } from "@/ui/TaxiDivider";
import { ClickableImage } from "@/ui";
import { safetyDecisionOptions, safetyScenarios } from "@/data/zcode/safety";

const iconMap: Record<string, typeof Terminal> = { Terminal, Globe, AlertTriangle };

const decColorMap: Record<string, { dark: string; light: string }> = {
  yellow: { dark: "bg-yellow-500/10 text-yellow-400", light: "bg-yellow-500/10 text-yellow-600" },
  green: { dark: "bg-green-500/10 text-green-400", light: "bg-green-500/10 text-green-600" },
  red: { dark: "bg-red-500/10 text-red-400", light: "bg-red-500/10 text-red-600" },
};

export function ZCodeSafety() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  return (
    <section id="zcode-safety">
      <SectionHeader num="13" title="Подтверждение безопасности" subtitle="Ручное подтверждение перед выполнением рискованных действий" />

      <p className={`text-sm leading-relaxed mb-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Когда Agent пытается выполнить потенциально рискованное действие, выполнение приостанавливается автоматически.
        Панель подтверждения показывает подготовленную команду и связанные предупреждения о рисках.
      </p>

      {/* 3-step workflow */}
      <div className={`${th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm")} p-5 mb-6`}>
        <h4 className="text-sm font-semibold mb-3">Рабочий процесс</h4>
        <div className="flex flex-col sm:flex-row gap-3">
          {["Триггер — агент инициирует действие", "Отображение — панель показывает детали команды", "Решение — пользователь выбирает действие"].map((step, i) => (
            <div key={i} className={`flex-1 flex items-start gap-2 p-3 rounded-lg ${th("bg-white/[0.03]", "bg-oklch(0.96 0 0)")}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 0 ? "bg-nyc-taxi text-black" : th("bg-white/5 text-white/40", "bg-oklch(0.90 0 0) text-oklch(0.50 0 0)")}`}>{i + 1}</span>
              <span className={`text-sm ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Decision options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {safetyDecisionOptions.map((dec) => {
          const colors = decColorMap[dec.color] || decColorMap.yellow;
          return (
            <motion.div key={dec.option} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} className={`${card} p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={`text-xs ${th(colors.dark, colors.light)}`}>{dec.option}</Badge>
              </div>
              <p className={`text-sm mb-1 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{dec.desc}</p>
              <p className={`text-xs ${th("text-white/30", "text-oklch(0.55 0 0)")}`}>{dec.scenario}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Typical scenarios */}
      <h4 className={`text-sm font-semibold mb-3 ${th("text-white/70", "text-oklch(0.30 0 0)")}`}>Типичные сценарии</h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {safetyScenarios.map((sc, i) => {
          const Icon = iconMap[sc.icon] || AlertTriangle;
          return (
            <motion.div key={sc.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={`${card} p-4`}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-nyc-taxi" />
                <span className="text-sm font-semibold">{sc.title}</span>
              </div>
              <p className={`text-sm ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{sc.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Keyboard tip */}
      <div className={`${th("bg-white/[0.03] border-l-2 border-nyc-taxi/30", "bg-oklch(0.96 0 0) border-l-2 border-oklch(0.78 0.16 85 / 30%)")} p-3 rounded-r-lg mb-6`}>
        <p className={`text-sm ${th("text-white/50", "text-oklch(0.40 0 0)")}`}>
          <Keyboard className="h-4 w-4 inline mr-1 text-nyc-taxi" />
          Используйте <code className="text-nyc-taxi">Tab</code> + стрелки для переключения, <code className="text-nyc-taxi">Enter</code> для подтверждения.
        </p>
      </div>

      {/* Screenshot */}
      <div className="mb-6">
        <ClickableImage src="/images/zcode/safety-confirm.png" alt="Панель подтверждения безопасности"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
      </div>

      <TaxiDivider />
    </section>
  );
}
