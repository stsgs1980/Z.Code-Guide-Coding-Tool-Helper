"use client";

import { Shield, AlertTriangle, Terminal, Globe, Database, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { ClickableImage } from "../../ui/ImageModal";
import { safetyConfirmSectionData } from "../../data/zcode/newdocs";

export function SafetyConfirmSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = safetyConfirmSectionData;

  const colorMap: Record<string, string> = {
    green: th("bg-green-500/20 text-green-400", "bg-green-100 text-green-700"),
    blue: th("bg-blue-500/20 text-blue-400", "bg-blue-100 text-blue-700"),
    red: th("bg-red-500/20 text-red-400", "bg-red-100 text-red-700"),
  };

  const iconMap: Record<string, React.ElementType> = {
    Terminal,
    Globe,
    AlertTriangle,
    Database,
  };

  return (
    <section id="safety-confirm">
      <SectionHeader
        num="09"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* What is Safety Confirm */}
      <div className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Shield className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.safetyConfirm.title}</h4>
        </div>
        <p className={`text-sm leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.safetyConfirm.desc}
        </p>
      </div>

      {/* Workflow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Workflow className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.workflow.title}</h4>
        </div>

        <div className="space-y-2">
          {data.subsections.workflow.steps.map((s) => (
            <div key={s.step} className="flex items-start gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                {s.step}
              </span>
              <p className={`text-sm ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Decision Options */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Shield className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.decisionOptions.title}</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {data.subsections.decisionOptions.options.map((opt) => (
            <div 
              key={opt.name}
              className={`p-3 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${colorMap[opt.color]}`}>
                  {opt.name}
                </span>
              </div>
              <p className={`text-sm mb-1 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>{opt.desc}</p>
              <p className={`text-xs ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
                👉 {opt.scenario}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scenarios */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <AlertTriangle className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.scenarios.title}</h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {data.subsections.scenarios.items.map((item, i) => {
            const Icon = iconMap[item.icon] || AlertTriangle;
            return (
              <div 
                key={i}
                className={`p-3 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-4 w-4 text-nyc-taxi" />
                  <span className="font-medium text-sm">{item.title}</span>
                </div>
                <p className={`text-xs ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>{item.desc}</p>
              </div>
            );
          })}
        </div>

        {data.subsections.scenarios.image && (
          <ClickableImage
            src={data.subsections.scenarios.image}
            alt="Safety Confirm"
            className={`w-full max-w-xs rounded-lg border cursor-pointer hover:opacity-90 transition-opacity ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
            thumbnailHeight={120}
          />
        )}
      </motion.div>

      <TaxiDivider />
    </section>
  );
}
