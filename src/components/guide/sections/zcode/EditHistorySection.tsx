"use client";

import { History, Pencil, FileText, Settings, FlaskConical } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { ClickableImage } from "../../ui/ImageModal";
import { editHistorySectionData } from "../../data/zcode/newdocs";

export function EditHistorySection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = editHistorySectionData;

  return (
    <section id="edit-history">
      <SectionHeader
        num="03"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* Top row: What is + Interface Behavior */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* What is Edit History */}
        <div className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <History className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.editHistory.title}</h4>
          </div>
          <p className={`text-xs leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
            {data.subsections.editHistory.desc}
          </p>
        </div>

        {/* Interface Behavior */}
        <div className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <Settings className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.interfaceBehavior.title}</h4>
          </div>
          <p className={`text-xs leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
            {data.subsections.interfaceBehavior.desc}
          </p>
        </div>
      </div>

      {/* Enter Edit + What Editing Supports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Enter Edit */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <Pencil className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.enterEdit.title}</h4>
          </div>

          <div className="space-y-1.5 mb-3">
            {data.subsections.enterEdit.steps.map((s) => (
              <div key={s.step} className="flex items-start gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                  {s.step}
                </span>
                <p className={`text-xs ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
              </div>
            ))}
          </div>

          {data.subsections.enterEdit.images && (
            <div className="flex gap-2">
              {data.subsections.enterEdit.images.map((img, i) => (
                <ClickableImage
                  key={i}
                  src={img}
                  alt={`Edit step ${i + 1}`}
                  className={`w-32 rounded-lg border ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
                  thumbnailHeight={60}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* What Editing Supports */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <FileText className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.whatEditingSupports.title}</h4>
          </div>

          <div className="space-y-2">
            {data.subsections.whatEditingSupports.items.map((item, i) => (
              <div key={i} className={`p-2 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
                <span className="font-medium text-xs">{item.name}</span>
                <span className={`text-xs ${th("text-white/50", "text-oklch(0.50 0 0)")}`}> — {item.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Usage Scenarios - 3 columns */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <FlaskConical className="h-4 w-4 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold text-sm">{data.subsections.usageScenarios.title}</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {data.subsections.usageScenarios.scenarios.map((scenario, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Pencil className="h-3 w-3 text-nyc-taxi" />
                <span className="font-medium text-xs">{scenario.title}</span>
              </div>
              <p className={`text-[10px] ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>{scenario.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <TaxiDivider />
    </section>
  );
}
