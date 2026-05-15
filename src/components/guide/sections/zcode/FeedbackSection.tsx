"use client";

import { MessageCircle, FileText, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { ClickableImage } from "../../ui/ImageModal";
import { feedbackSectionData } from "../../data/zcode/newdocs";

export function FeedbackSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = feedbackSectionData;

  return (
    <section id="feedback">
      <SectionHeader
        num="01"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* Feedback */}
      <SubsectionCard
        title={data.subsections.feedback.title}
        steps={data.subsections.feedback.steps}
        image={data.subsections.feedback.image}
        icon="MessageCircle"
        theme={theme}
        th={th}
      />

      {/* Package Logs */}
      <SubsectionCard
        title={data.subsections.packageLogs.title}
        steps={data.subsections.packageLogs.steps}
        tip={data.subsections.packageLogs.tip}
        image={data.subsections.packageLogs.image}
        icon="FileText"
        theme={theme}
        th={th}
      />

      {/* Windows */}
      <SubsectionCard
        title={data.subsections.windows.title}
        steps={data.subsections.windows.steps}
        image={data.subsections.windows.image}
        icon="Monitor"
        theme={theme}
        th={th}
      />

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

// Reusable subsection card
interface SubsectionCardProps {
  title: string;
  steps: { step: number; action: string }[];
  tip?: string;
  image?: string;
  icon: string;
  theme: string;
  th: (d: string, l: string) => string;
}

function SubsectionCard({ title, steps, tip, image, icon, theme, th }: SubsectionCardProps) {
  const iconMap: Record<string, React.ElementType> = {
    MessageCircle,
    FileText,
    Monitor,
  };
  const Icon = iconMap[icon] || MessageCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
          <Icon className="h-5 w-5 text-nyc-taxi" />
        </div>
        <h4 className="font-semibold">{title}</h4>
      </div>

      {/* Steps */}
      <div className="space-y-2 mb-4">
        {steps.map((s) => (
          <div key={s.step} className="flex items-start gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
              {s.step}
            </span>
            <p className={`text-sm ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
          </div>
        ))}
      </div>

      {/* Tip */}
      {tip && (
        <p className={`text-xs italic mb-4 ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
          💡 {tip}
        </p>
      )}

      {/* Image */}
      {image && (
        <ClickableImage
          src={image}
          alt={title}
          className={`w-full max-w-xs rounded-lg border cursor-pointer hover:opacity-90 transition-opacity ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
          thumbnailHeight={120}
        />
      )}
    </motion.div>
  );
}
