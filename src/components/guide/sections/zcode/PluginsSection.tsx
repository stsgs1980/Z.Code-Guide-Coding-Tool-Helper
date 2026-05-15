"use client";

import { Puzzle, Search, Package, Store, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { TipBox, FAQItem } from "../../ui/ZCodeUI";
import { ClickableImage } from "../../ui/ImageModal";
import { pluginsData } from "../../data/zcode/newdocs";

export function PluginsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  return (
    <section id="plugins">
      <SectionHeader
        num="07"
        title="Plugins"
        subtitle="Расширение возможностей ZCode через маркетплейс"
      />

      {/* What is */}
      <p className={`text-sm leading-relaxed mb-6 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        {pluginsData.whatIs}
      </p>

      {/* Tabs */}
      <div className="space-y-4 mb-6">
        {pluginsData.tabs.map((tab, i) => {
          const iconMap: Record<string, React.ElementType> = { 
            Discover: Search, 
            Installed: Package, 
            Marketplace: Store 
          };
          const Icon = iconMap[tab.name] || Puzzle;
          
          return (
            <motion.div
              key={tab.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${card} p-4`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-nyc-taxi" />
                <span className="font-semibold">{tab.name}</span>
              </div>
              <p className={`text-sm mb-3 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{tab.desc}</p>
              <ul className="space-y-1 mb-3">
                {tab.actions.map((action, j) => (
                  <li key={j} className={`text-xs flex items-center gap-1.5 ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
                    <span className="nyc-status-dot nyc-status-active flex-shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
              <ClickableImage
                src={tab.image}
                alt={`Вкладка ${tab.name}`}
                className={`w-full rounded-lg border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* FAQ */}
      <div className={`p-4 mb-6 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-4 w-4 text-nyc-taxi" />
          <span className="text-sm font-semibold">{pluginsData.faq.q}</span>
        </div>
        <p className={`text-sm ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
          {pluginsData.faq.a}
        </p>
      </div>

      <TipBox>
        Plugin отвечает "что умеет система", Skill — "как делать задачу".
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
