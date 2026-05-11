"use client";

import { SectionHeader } from "../ui";
import { models, modelMapping } from "../data/models";
import { CodeBlock } from "../ui";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../hooks/useTheme";

const levelLabels: Record<string, { text: string; color: string }> = {
  opus: { text: "Opus", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  sonnet: { text: "Sonnet", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  haiku: { text: "Haiku", color: "bg-green-500/10 text-green-400 border-green-500/20" },
};

export function ModelsSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="models" className="py-8">
      <SectionHeader
        num="07"
        title="Модели GLM"
        subtitle="Четыре модели для разных задач и бюджетов"
      />

      <div className="space-y-4 mb-8">
        {models.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-5`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg font-mono">{model.name}</h3>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${levelLabels[model.level].color}`}
                  >
                    {levelLabels[model.level].text}
                  </Badge>
                </div>
                <p className={`text-sm ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>{model.description}</p>
                <p className={`text-xs mt-1 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                  <span className="text-nyc-taxi">Применение:</span> {model.useCase}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs flex-shrink-0">
                <span className={th('text-white/30', 'text-oklch(0.60 0 0)')}>Скорость</span>
                <span className={th('text-white/60', 'text-oklch(0.35 0 0)')}>{model.speed}</span>
                <span className={th('text-white/30', 'text-oklch(0.60 0 0)')}>Качество</span>
                <span className={th('text-white/60', 'text-oklch(0.35 0 0)')}>{model.quality}</span>
                <span className={th('text-white/30', 'text-oklch(0.60 0 0)')}>Пик</span>
                <span className="text-nyc-taxi font-mono">{model.quotaPeak}</span>
                <span className={th('text-white/30', 'text-oklch(0.60 0 0)')}>Не-пик</span>
                <span className="text-nyc-taxi font-mono">{model.quotaOffPeak}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Models image */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <img
          src="/images/models.png"
          alt="Модели GLM: GLM-5.1, GLM-5-Turbo, GLM-4.7, GLM-4.5-Air"
          className="w-full max-w-2xl rounded-lg border border-white/10 shadow-xl"
        />
      </motion.div>

      <CodeBlock
        lang="json"
        title="Маппинг моделей (Anthropic API)"
        code={JSON.stringify(modelMapping.anthropic, null, 2)}
      />
    </section>
  );
}
