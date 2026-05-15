"use client";

import { Sparkles, Settings, MessageSquare, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { ClickableImage } from "../../ui/ImageModal";
import { skillSectionData } from "../../data/zcode/newdocs";

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

      {/* What is Skills */}
      <div className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Sparkles className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.skill.title}</h4>
        </div>
        <p className={`text-sm leading-relaxed mb-4 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.skill.desc}
        </p>

        {/* Example */}
        <div className={`p-3 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
          <p className="text-sm mb-1">
            <span className={th("text-white/50", "text-oklch(0.50 0 0)")}>Пример: </span>
            <code className="text-nyc-taxi">{data.subsections.skill.example.prompt}</code>
          </p>
          <p className={`text-xs ${th("text-white/40", "text-oklch(0.55 0 0)")}`}>
            → {data.subsections.skill.example.result}
          </p>
        </div>
      </div>

      {/* Manage */}
      <SubsectionCard
        title={data.subsections.manage.title}
        steps={data.subsections.manage.steps}
        features={data.subsections.manage.sources}
        images={data.subsections.manage.images}
        icon="Settings"
        theme={theme}
        th={th}
      />

      {/* Usage */}
      <SubsectionCard
        title={data.subsections.usage.title}
        steps={data.subsections.usage.steps}
        format={data.subsections.usage.format}
        image={data.subsections.usage.image}
        icon="MessageSquare"
        theme={theme}
        th={th}
      />

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <HelpCircle className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.faq.title}</h4>
        </div>

        <div className="space-y-3">
          {data.subsections.faq.items.map((item, i) => (
            <div key={i} className={`p-3 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
              <p className="font-medium text-sm mb-1">{item.q}</p>
              <p className={`text-sm ${th("text-white/60", "text-oklch(0.45 0 0)")}`}>{item.a}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <TaxiDivider />
    </section>
  );
}

// Reusable card
interface SubsectionCardProps {
  title: string;
  steps: { step: number; action: string }[];
  features?: string[];
  format?: string;
  image?: string;
  images?: string[];
  icon: string;
  theme: string;
  th: (d: string, l: string) => string;
}

function SubsectionCard({ title, steps, features, format, image, images, icon, theme, th }: SubsectionCardProps) {
  const iconMap: Record<string, React.ElementType> = {
    Settings,
    MessageSquare,
    HelpCircle,
    Sparkles,
  };
  const Icon = iconMap[icon] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
    >
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

      {/* Format */}
      {format && (
        <div className={`p-2 rounded-lg mb-4 ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
          <code className="text-sm text-nyc-taxi">{format}</code>
        </div>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((f, i) => (
            <span key={i} className={`text-xs px-2 py-1 rounded-full ${th("bg-white/5 text-white/70", "bg-oklch(0.93 0 0) text-oklch(0.40 0 0)")}`}>
              {f}
            </span>
          ))}
        </div>
      )}

      {/* Single Image */}
      {image && (
        <ClickableImage
          src={image}
          alt={title}
          className={`w-full max-w-xs rounded-lg border cursor-pointer hover:opacity-90 transition-opacity ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
          thumbnailHeight={120}
        />
      )}

      {/* Multiple Images */}
      {images && images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <ClickableImage
              key={i}
              src={img}
              alt={`${title} ${i + 1}`}
              className={`w-32 rounded-lg border cursor-pointer hover:opacity-90 transition-opacity ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
              thumbnailHeight={80}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
