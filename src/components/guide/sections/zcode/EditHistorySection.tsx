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

  const iconMap: Record<string, React.ElementType> = {
    Pencil,
    Plus: Pencil,
    Flask: FlaskConical,
  };

  return (
    <section id="edit-history">
      <SectionHeader
        num="03"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* What is Edit History */}
      <div className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <History className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.editHistory.title}</h4>
        </div>
        <p className={`text-sm leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.editHistory.desc}
        </p>
      </div>

      {/* Enter Edit */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Pencil className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.enterEdit.title}</h4>
        </div>

        {/* Steps */}
        <div className="space-y-2 mb-4">
          {data.subsections.enterEdit.steps.map((s) => (
            <div key={s.step} className="flex items-start gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                {s.step}
              </span>
              <p className={`text-sm ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
            </div>
          ))}
        </div>

        {/* Images */}
        {data.subsections.enterEdit.images && (
          <div className="flex flex-wrap gap-3">
            {data.subsections.enterEdit.images.map((img, i) => (
              <ClickableImage
                key={i}
                src={img}
                alt={`Edit step ${i + 1}`}
                className={`w-40 rounded-lg border cursor-pointer hover:opacity-90 transition-opacity ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
                thumbnailHeight={100}
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
        className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <FileText className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.whatEditingSupports.title}</h4>
        </div>

        <div className="space-y-2">
          {data.subsections.whatEditingSupports.items.map((item, i) => (
            <div key={i} className={`p-2 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
              <span className="font-medium text-sm">{item.name}</span>
              <span className={`text-sm ${th("text-white/50", "text-oklch(0.50 0 0)")}`}> — {item.desc}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Interface Behavior */}
      <div className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Settings className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.interfaceBehavior.title}</h4>
        </div>
        <p className={`text-sm leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.interfaceBehavior.desc}
        </p>
      </div>

      {/* Usage Scenarios */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <FlaskConical className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.usageScenarios.title}</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {data.subsections.usageScenarios.scenarios.map((scenario, i) => {
            const Icon = iconMap[scenario.icon] || Pencil;
            return (
              <div 
                key={i}
                className={`p-3 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="h-4 w-4 text-nyc-taxi" />
                  <span className="font-medium text-sm">{scenario.title}</span>
                </div>
                <p className={`text-xs ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>{scenario.desc}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      <TaxiDivider />
    </section>
  );
}
