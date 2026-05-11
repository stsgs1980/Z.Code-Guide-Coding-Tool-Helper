"use client";

import { SectionHeader, TaxiDivider, CodeBlock } from "../ui";
import {
  models,
  modelMapping,
  visionModels,
  imageGenModels,
  videoGenModels,
  audioModels,
  agentModels,
  additionalTextModels,
} from "../data/models";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../hooks/useTheme";
import { Eye, ImageIcon, Video, Mic, Bot, Brain } from "lucide-react";

const levelLabels: Record<string, { text: string; color: string }> = {
  opus: { text: "Opus", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  sonnet: { text: "Sonnet", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  haiku: { text: "Haiku", color: "bg-green-500/10 text-green-400 border-green-500/20" },
};

export function ModelsSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="models" className="py-10 md:py-14">
      <SectionHeader
        num="08"
        title="Модели GLM"
        subtitle="Полная линейка моделей Z.AI для разных задач"
      />

      {/* Coding Models */}
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Brain className="h-5 w-5 text-nyc-taxi" />
        Модели для кодинга
      </h3>
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
                  <h4 className="font-semibold text-lg font-mono">{model.name}</h4>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${levelLabels[model.level].color}`}
                  >
                    {levelLabels[model.level].text}
                  </Badge>
                  {model.context && (
                    <Badge variant="outline" className={`text-[10px] ${th('border-white/10 text-white/30', 'border-oklch(0.82 0 0) text-oklch(0.50 0 0)')}`}>
                      {model.context}
                    </Badge>
                  )}
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

      {/* Free / Additional text models */}
      <h4 className={`text-sm font-semibold mb-3 ${th('text-white/70', 'text-oklch(0.30 0 0)')}`}>
        Бесплатные и дополнительные текстовые модели
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {additionalTextModels.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm font-mono">{m.name}</span>
              <Badge className={`text-[10px] ${m.price === 'Бесплатно' ? 'bg-green-500/10 text-green-400 border-green-500/20' : th('bg-white/5 text-white/30', 'bg-oklch(0.93 0 0) text-oklch(0.50 0 0)')}`}>{m.price}</Badge>
            </div>
            <p className={`text-xs ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{m.description}</p>
            <div className={`text-[10px] mt-1 ${th('text-white/30', 'text-oklch(0.60 0 0)')}`}>Контекст: {m.context}</div>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Vision Models */}
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Eye className="h-5 w-5 text-nyc-taxi" />
        Vision-модели
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {visionModels.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm font-mono">{model.name}</span>
              <Badge variant="outline" className={`text-[10px] ${th('border-white/10 text-white/30', 'border-oklch(0.82 0 0) text-oklch(0.50 0 0)')}`}>{model.context}</Badge>
            </div>
            <p className={`text-xs ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{model.description}</p>
            <p className={`text-[10px] mt-1 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
              <span className="text-nyc-taxi">Применение:</span> {model.useCase}
            </p>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Image Generation */}
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ImageIcon className="h-5 w-5 text-nyc-taxi" />
        Генерация изображений
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {imageGenModels.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <span className="font-semibold text-sm font-mono">{model.name}</span>
            <p className={`text-xs mt-1 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{model.description}</p>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Video Generation */}
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Video className="h-5 w-5 text-nyc-taxi" />
        Генерация видео
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {videoGenModels.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <span className="font-semibold text-sm font-mono">{model.name}</span>
            <p className={`text-xs mt-1 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{model.description}</p>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Audio */}
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Mic className="h-5 w-5 text-nyc-taxi" />
        Аудио-модели
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {audioModels.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <span className="font-semibold text-sm font-mono">{model.name}</span>
            <p className={`text-xs mt-1 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{model.description}</p>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Agents */}
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Bot className="h-5 w-5 text-nyc-taxi" />
        Агенты
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {agentModels.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-sm">{model.name}</span>
              <Badge variant="outline" className={`text-[10px] ${model.status === 'Beta' ? 'border-amber-500/20 text-amber-400' : th('border-white/10 text-white/40', 'border-oklch(0.82 0 0) text-oklch(0.50 0 0)')}`}>
                {model.status}
              </Badge>
            </div>
            <p className={`text-xs ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{model.description}</p>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      <h3 className="text-lg font-semibold mb-4">Маппинг моделей</h3>
      <CodeBlock
        lang="json"
        title="Маппинг моделей (Anthropic API)"
        code={JSON.stringify(modelMapping.anthropic, null, 2)}
      />
    </section>
  );
}
