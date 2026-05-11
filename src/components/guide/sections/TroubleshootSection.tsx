"use client";

import { SectionHeader } from "../ui";
import { errors } from "../data/errors";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../hooks/useTheme";

const categoryLabels: Record<string, { text: string; color: string }> = {
  auth: { text: "Авторизация", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  config: { text: "Конфигурация", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  network: { text: "Сеть", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  quota: { text: "Лимиты", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  tool: { text: "Инструмент", color: "bg-green-500/10 text-green-400 border-green-500/20" },
};

export function TroubleshootSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="troubleshoot" className="py-8">
      <SectionHeader
        num="09"
        title="Решение проблем"
        subtitle="Частые ошибки и способы их устранения"
      />

      <div className="space-y-3">
        {errors.map((err, i) => (
          <motion.div
            key={err.error}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <code className="text-sm font-mono text-red-400">{err.error}</code>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${categoryLabels[err.category].color}`}
                  >
                    {categoryLabels[err.category].text}
                  </Badge>
                </div>
                <p className={`text-xs mb-1 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                  <span className={th('text-white/60', 'text-oklch(0.35 0 0)')}>Причина:</span> {err.cause}
                </p>
                <p className={`text-xs ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>
                  <span className="text-nyc-taxi">Решение:</span> {err.fix}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
