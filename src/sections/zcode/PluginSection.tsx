"use client";

import { Puzzle, Search, Package, Store, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "@/ui/SectionHeader";
import { TaxiDivider } from "@/ui/TaxiDivider";
import { ClickableImage } from "@/ui";
import { pluginSectionData } from "@/data/zcode/newdocs";

export function PluginSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = pluginSectionData;

  const iconMap: Record<string, React.ElementType> = {
    Search,
    Package,
    Store,
    HelpCircle,
  };

  const subsections = [
    { key: "discover", icon: "Search", ...data.subsections.discover },
    { key: "installed", icon: "Package", ...data.subsections.installed },
    { key: "marketplace", icon: "Store", ...data.subsections.marketplace },
  ];

  return (
    <section id="plugin">
      <SectionHeader
        num="05"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* What is Plugins */}
      <div className={`p-4 rounded-xl mb-4 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Puzzle className="h-4 w-4 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold text-sm">{data.subsections.plugin.title}</h4>
        </div>
        <p className={`text-xs leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.plugin.desc}
        </p>
      </div>

      {/* 3 columns: Discover, Installed, Marketplace */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {subsections.map((sub, i) => {
          const Icon = iconMap[sub.icon] || Puzzle;
          return (
            <motion.div
              key={sub.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
                  <Icon className="h-4 w-4 text-nyc-taxi" />
                </div>
                <h4 className="font-semibold text-sm">{sub.title}</h4>
              </div>

              <div className="space-y-1.5 mb-3">
                {sub.steps.map((s: { step: number; action: string }) => (
                  <div key={s.step} className="flex items-start gap-2">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                      {s.step}
                    </span>
                    <p className={`text-xs ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
                  </div>
                ))}
              </div>

              {"features" in sub && sub.features && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {(sub.features as string[]).map((f: string, j: number) => (
                    <span
                      key={j}
                      className={`text-[10px] px-2 py-0.5 rounded-full ${th("bg-white/5 text-white/70", "bg-oklch(0.93 0 0) text-oklch(0.40 0 0)")}`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {sub.image && (
                <ClickableImage
                  src={sub.image}
                  alt={sub.title}
                  className={`w-full rounded-lg border ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
                  thumbnailHeight={80}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* FAQ */}
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
