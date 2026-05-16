"use client";

import { Sparkles, Settings, MessageSquare, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "@/ui/SectionHeader";
import { TaxiDivider } from "@/ui/TaxiDivider";
import { ClickableImage } from "@/ui";
import { skillSectionData } from "@/data/zcode/newdocs";

export function SkillSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = skillSectionData;

  return (
    <section id="skill">
      <SectionHeader
        num="07"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* What is Skills + Usage - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* What is Skills */}
        <div className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <Sparkles className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.skill.title}</h4>
          </div>
          <p className={`text-xs mb-3 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
            {data.subsections.skill.desc}
          </p>
          <div className={`p-2 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
            <p className="text-xs mb-1">
              <span className={th("text-white/50", "text-oklch(0.50 0 0)")}>Пример: </span>
              <code className="text-nyc-taxi">{data.subsections.skill.example.prompt}</code>
            </p>
            <p className={`text-[10px] ${th("text-white/40", "text-oklch(0.55 0 0)")}`}>
              → {data.subsections.skill.example.result}
            </p>
          </div>
        </div>

        {/* Usage */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <MessageSquare className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.usage.title}</h4>
          </div>

          <div className="space-y-1.5 mb-3">
            {data.subsections.usage.steps.map((s) => (
              <div key={s.step} className="flex items-start gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                  {s.step}
                </span>
                <p className={`text-xs ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
              </div>
            ))}
          </div>

          <div className={`p-2 rounded-lg mb-2 ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
            <code className="text-xs text-nyc-taxi">{data.subsections.usage.format}</code>
          </div>

          {data.subsections.usage.image && (
            <ClickableImage
              src={data.subsections.usage.image}
              alt="Usage"
              className={`w-full rounded-lg border ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
              thumbnailHeight={80}
            />
          )}
        </motion.div>
      </div>

      {/* Manage */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-4 rounded-xl mb-4 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Settings className="h-4 w-4 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold text-sm">{data.subsections.manage.title}</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="space-y-1.5 mb-3">
              {data.subsections.manage.steps.map((s) => (
                <div key={s.step} className="flex items-start gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                    {s.step}
                  </span>
                  <p className={`text-xs ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {data.subsections.manage.sources.map((s, i) => (
                <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full ${th("bg-white/5 text-white/70", "bg-oklch(0.93 0 0) text-oklch(0.40 0 0)")}`}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {data.subsections.manage.images && (
            <div className="flex gap-2 flex-wrap">
              {data.subsections.manage.images.map((img, i) => (
                <ClickableImage
                  key={i}
                  src={img}
                  alt={`Manage ${i + 1}`}
                  className={`w-28 rounded-lg border ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
                  thumbnailHeight={70}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* FAQ - 3 columns */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <HelpCircle className="h-4 w-4 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold text-sm">{data.subsections.faq.title}</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.subsections.faq.items.map((item, i) => (
            <div key={i} className={`p-3 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
              <p className="font-medium text-xs mb-1">{item.q}</p>
              <p className={`text-xs ${th("text-white/60", "text-oklch(0.45 0 0)")}`}>{item.a}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <TaxiDivider />
    </section>
  );
}
