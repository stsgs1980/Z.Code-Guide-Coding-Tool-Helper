"use client";

import { Terminal, Plus, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { ClickableImage } from "../../ui/ImageModal";
import { commandsSectionData } from "../../data/zcode/newdocs";

export function CommandsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = commandsSectionData;

  return (
    <section id="commands">
      <SectionHeader
        num="04"
        title={data.title}
        subtitle={data.subtitle}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Terminal className="h-4 w-4 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold text-sm">{data.subsections.commands.title}</h4>
        </div>
        <p className={`text-xs leading-relaxed mb-4 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.commands.desc}
        </p>

        {/* Create + Fields + Usage - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Create Steps */}
          <div>
            <h5 className={`text-xs font-medium mb-2 flex items-center gap-1 ${th("text-white/80", "text-oklch(0.30 0 0)")}`}>
              <Plus className="h-3 w-3" /> Создание:
            </h5>
            <div className="space-y-1.5">
              {data.subsections.commands.steps.map((s) => (
                <div key={s.step} className="flex items-start gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                    {s.step}
                  </span>
                  <p className={`text-xs ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className={`p-3 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
            <h5 className={`text-xs font-medium mb-2 ${th("text-white/80", "text-oklch(0.30 0 0)")}`}>Поля команды:</h5>
            <div className="space-y-1">
              {data.subsections.commands.fields.map((f) => (
                <div key={f.name} className="text-xs">
                  <code className="text-nyc-taxi">{f.name}</code>
                  <span className={th("text-white/50", "text-oklch(0.50 0 0)")}> — {f.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Usage */}
          <div>
            <h5 className={`text-xs font-medium mb-2 flex items-center gap-1 ${th("text-white/80", "text-oklch(0.30 0 0)")}`}>
              <Play className="h-3 w-3" /> Вызов:
            </h5>
            <div className="space-y-1.5">
              {data.subsections.commands.usage.map((s) => (
                <div key={s.step} className="flex items-start gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                    {s.step}
                  </span>
                  <p className={`text-xs ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Images */}
        {data.subsections.commands.images && (
          <div className="flex gap-3">
            {data.subsections.commands.images.map((img, i) => (
              <ClickableImage
                key={i}
                src={img}
                alt={`Commands ${i + 1}`}
                className={`w-40 rounded-lg border ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
                thumbnailHeight={80}
              />
            ))}
          </div>
        )}
      </motion.div>

      <TaxiDivider />
    </section>
  );
}
