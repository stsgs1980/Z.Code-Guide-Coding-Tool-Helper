"use client";

import { motion } from "framer-motion";
import { Cpu, ChevronRight, ArrowLeftRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { agentFrameworks, workflowSuggestions } from "../../data/zcode/agents";

const colorMap: Record<string, string> = {
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const colorMapLight: Record<string, string> = {
  orange: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  blue: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  green: "bg-green-500/10 text-green-600 border-green-500/20",
  purple: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

export function ZCodeMultiAgent() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  return (
    <section id="zcode-multi-agent">
      <SectionHeader num="06" title="Мультиагентный фреймворк" subtitle="Z Code построен на мультиагентной платформе" />

      <p className={`text-sm leading-relaxed mb-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Z Code интегрирует несколько AI-агентов в одном продукте. Каждый агент обладает уникальными преимуществами —
        выберите подходящего для вашей задачи.
      </p>

      {/* Agent cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {agentFrameworks.map((agent, i) => (
          <motion.div key={agent.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className={`${card} p-5`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm">{agent.name}</span>
              <Badge variant="outline" className={`text-xs ${th(colorMap[agent.color] || "", colorMapLight[agent.color] || "")}`}>
                {agent.provider}
              </Badge>
            </div>
            <p className={`text-sm mb-2 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{agent.strength}</p>
            <div className={`text-xs mb-1 ${th("text-white/30", "text-oklch(0.55 0 0)")}`}>
              Модели: <span className="text-nyc-taxi font-mono">{agent.models}</span>
            </div>
            <div className={`text-xs ${th("text-white/30", "text-oklch(0.55 0 0)")}`}>
              Лучше для: <span className={th("text-white/50", "text-oklch(0.40 0 0)")}>{agent.bestFor}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Switching section */}
      <div className={`${th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm")} p-5 mb-6`}>
        <div className="flex items-center gap-2 mb-2">
          <ArrowLeftRight className="h-4 w-4 text-nyc-taxi" />
          <span className="text-sm font-semibold">Переключение фреймворков</span>
        </div>
        <p className={`text-sm ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
          Переключайтесь между агентами из верхнего меню прямо в диалоге — не нужно создавать новую задачу.
        </p>
      </div>

      {/* Workflow suggestions */}
      <h4 className={`text-sm font-semibold mb-3 ${th("text-white/70", "text-oklch(0.30 0 0)")}`}>
        Рекомендации по выбору агента:
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {workflowSuggestions.map((ws) => (
          <div key={ws.task} className={`flex items-center gap-2 p-3 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
            <ChevronRight className="h-4 w-4 text-nyc-taxi flex-shrink-0" />
            <span className={`text-sm ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
              <strong className={th("text-white/70", "text-oklch(0.30 0 0)")}>{ws.task}</strong> →&nbsp;
              <span className="text-nyc-taxi">{ws.agent}</span>&nbsp;({ws.models})
            </span>
          </div>
        ))}
      </div>

      {/* Screenshot */}
      <div className="mb-6">
        <img src="/images/zcode/agent-framework.png" alt="Agent framework selection"
          className={`w-full rounded-lg border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
      </div>

      <TaxiDivider />
    </section>
  );
}
