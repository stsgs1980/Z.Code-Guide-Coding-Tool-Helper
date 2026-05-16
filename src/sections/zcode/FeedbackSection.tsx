"use client";

import { MessageCircle, FileText, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "@/ui/SectionHeader";
import { TaxiDivider } from "@/ui/TaxiDivider";
import { ClickableImage } from "@/ui";
import { feedbackSectionData } from "@/data/zcode/newdocs";

export function FeedbackSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = feedbackSectionData;

  const subsections = [
    { key: "feedback", icon: "MessageCircle", ...data.subsections.feedback },
    { key: "packageLogs", icon: "FileText", ...data.subsections.packageLogs },
    { key: "windows", icon: "Monitor", ...data.subsections.windows },
  ];

  const iconMap: Record<string, React.ElementType> = {
    MessageCircle,
    FileText,
    Monitor,
  };

  return (
    <section id="feedback">
      <SectionHeader
        num="01"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {subsections.map((sub, i) => {
          const Icon = iconMap[sub.icon] || MessageCircle;
          return (
            <motion.div
              key={sub.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl h-fit ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
                  <Icon className="h-4 w-4 text-nyc-taxi" />
                </div>
                <h4 className="font-semibold text-sm">{sub.title}</h4>
              </div>

              {/* Steps */}
              <div className="space-y-1.5 mb-3">
                {sub.steps.map((s: { step: number; action: string }) => (
                  <div key={s.step} className="flex items-start gap-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                      {s.step}
                    </span>
                    <p className={`text-xs leading-relaxed ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
                  </div>
                ))}
              </div>

              {/* Tip */}
              {"tip" in sub && sub.tip && (
                <p className={`text-[10px] italic mb-3 ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
                  💡 {sub.tip}
                </p>
              )}

              {/* Image */}
              {sub.image && (
                <ClickableImage
                  src={sub.image}
                  alt={sub.title}
                  className={`w-full rounded-lg border cursor-pointer hover:opacity-90 transition-opacity ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
                  thumbnailHeight={100}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Form Link */}
      <div className={`p-4 rounded-xl mb-6 ${th("bg-nyc-taxi/10 border border-nyc-taxi/20", "bg-oklch(0.95 0.1 85) border border-oklch(0.88 0 0)")}`}>
        <p className={`text-sm mb-3 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          Для отправки обратной связи используйте официальную форму:
        </p>
        <a
          href={data.formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-nyc-taxi text-black font-medium text-sm hover:bg-nyc-taxi/90 transition-colors"
        >
          <MessageCircle className="h-4 w-4" />
          Открыть форму
        </a>
      </div>

      <TaxiDivider />
    </section>
  );
}
