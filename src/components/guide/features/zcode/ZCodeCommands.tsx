"use client";

import { motion } from "framer-motion";
import { Terminal, Hash, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { commandExamples } from "../../data/zcode/commands";

export function ZCodeCommands() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th(
    "nyc-card-enhanced",
    "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm"
  );
  const hlCard = th(
    "nyc-card-highlight-enhanced",
    "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm"
  );

  return (
    <section id="zcode-commands">
      <SectionHeader
        num="08"
        title="Команды (/Commands)"
        subtitle="Многоразовые ярлыки для типовых действий в Z Code"
      />

      {/* Intro */}
      <p className={`text-sm leading-relaxed mb-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Команды <code className={`px-1.5 py-0.5 rounded text-xs font-mono ${th("bg-white/10 text-white/80", "bg-oklch(0.92 0 0) text-oklch(0.35 0 0)")}`}>/command</code> —
        это многоразовые ярлыки, которые позволяют быстро вызывать типовые операции без ввода полных инструкций.
      </p>

      {/* How to use */}
      <div className={`${hlCard} p-5 mb-6`}>
        <div className="flex items-center gap-2 mb-2">
          <Hash className="h-5 w-5 text-nyc-taxi" />
          <span className="text-lg font-semibold">Как использовать</span>
        </div>
        <div className={`text-sm leading-relaxed space-y-2 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
          <div className="flex items-start gap-2">
            <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-nyc-taxi" />
            <span>Введите <code className={`px-1 py-0.5 rounded text-xs font-mono ${th("bg-white/10", "bg-oklch(0.92 0 0)")}`}>/</code> в поле чата, чтобы открыть список доступных команд</span>
          </div>
          <div className="flex items-start gap-2">
            <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-nyc-taxi" />
            <span>Выберите команду из списка или начните вводить её название для фильтрации</span>
          </div>
        </div>
      </div>

      {/* Commands table */}
      <h3 className="text-lg font-semibold mb-3">Примеры команд</h3>
      <div className={`${card} p-0 overflow-hidden mb-6`}>
        <table className="w-full text-sm">
          <thead>
            <tr className={`${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
              <th className={`text-left px-4 py-2.5 font-medium ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>Команда</th>
              <th className={`text-left px-4 py-2.5 font-medium ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>Описание</th>
            </tr>
          </thead>
          <tbody>
            {commandExamples.map((c, i) => (
              <tr key={c.cmd} className={`${th("border-t border-white/5", "border-t border-oklch(0.90 0 0)")}`}>
                <td className="px-4 py-2.5">
                  <Badge className={`font-mono text-xs ${th("bg-nyc-taxi/15 text-nyc-taxi", "bg-oklch(0.78 0.16 85 / 10%) text-oklch(0.55 0.12 85)")}`}>{c.cmd}</Badge>
                </td>
                <td className={`px-4 py-2.5 ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{c.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Screenshot */}
      <div className="mb-6">
        <img
          src="/images/zcode/commands-call.png"
          alt="Вызов команды через слэш в чате"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      <TaxiDivider />
    </section>
  );
}
