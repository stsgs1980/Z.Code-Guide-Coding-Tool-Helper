"use client";

import { motion } from "framer-motion";
import { ListTodo, Smartphone, Terminal, Globe, GitCompare } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { adeTools } from "../../data/zcode/misc";

const iconMap: Record<string, typeof Terminal> = {
  ListTodo, Smartphone, Terminal, Globe, GitCompare,
};

export function ZCodeToolsPipeline() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  return (
    <section id="zcode-ade-tools">
      <SectionHeader num="08" title="Инструменты ADE" subtitle="Встроенные инструменты для полного цикла разработки" />

      <p className={`text-sm leading-relaxed mb-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        От планирования до деплоя — каждый инструмент встроен в рабочий процесс разработки Z Code.
      </p>

      {/* ADE tool cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {adeTools.map((tool, i) => {
          const Icon = iconMap[tool.icon] || Terminal;
          return (
            <motion.div key={tool.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className={`${card} p-5 flex flex-col`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
                  <Icon className="h-4 w-4 text-nyc-taxi" />
                </div>
                <span className="text-sm font-semibold">{tool.title}</span>
              </div>
              <p className={`text-sm mb-3 flex-1 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{tool.desc}</p>
              <ul className="space-y-1">
                {tool.features.map((feat) => (
                  <li key={feat} className={`text-xs flex items-center gap-1.5 ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
                    <span className="nyc-status-dot nyc-status-active flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Screenshot */}
      <div className="mb-6">
        <img src="/images/zcode/ade-tools.png" alt="ADE tools overview"
          className={`w-full rounded-lg border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
      </div>

      <TaxiDivider />
    </section>
  );
}
