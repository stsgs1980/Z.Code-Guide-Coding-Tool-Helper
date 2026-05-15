"use client";

import { Puzzle, Search, Package, Store, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { ClickableImage } from "../../ui/ImageModal";
import { pluginSectionData } from "../../data/zcode/newdocs";

export function PluginSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = pluginSectionData;

  return (
    <section id="plugin">
      <SectionHeader
        num="05"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* What is Plugins */}
      <div className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Puzzle className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.plugin.title}</h4>
        </div>
        <p className={`text-sm leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.plugin.desc}
        </p>
      </div>

      {/* Discover */}
      <SubsectionCard
        title={data.subsections.discover.title}
        steps={data.subsections.discover.steps}
        features={data.subsections.discover.features}
        image={data.subsections.discover.image}
        icon="Search"
        theme={theme}
        th={th}
      />

      {/* Installed */}
      <SubsectionCard
        title={data.subsections.installed.title}
        steps={data.subsections.installed.steps}
        features={data.subsections.installed.actions}
        image={data.subsections.installed.image}
        icon="Package"
        theme={theme}
        th={th}
      />

      {/* Marketplace */}
      <SubsectionCard
        title={data.subsections.marketplace.title}
        steps={data.subsections.marketplace.steps}
        image={data.subsections.marketplace.image}
        icon="Store"
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
  image?: string;
  icon: string;
  theme: string;
  th: (d: string, l: string) => string;
}

function SubsectionCard({ title, steps, features, image, icon, theme, th }: SubsectionCardProps) {
  const iconMap: Record<string, React.ElementType> = {
    Search,
    Package,
    Store,
    HelpCircle,
  };
  const Icon = iconMap[icon] || Puzzle;

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

      {/* Features */}
      {features && features.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((f, i) => (
            <span 
              key={i} 
              className={`text-xs px-2 py-1 rounded-full ${th("bg-white/5 text-white/70", "bg-oklch(0.93 0 0) text-oklch(0.40 0 0)")}`}
            >
              {f}
            </span>
          ))}
        </div>
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
