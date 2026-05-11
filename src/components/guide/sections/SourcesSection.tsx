"use client";

import { SectionHeader } from "../ui";
import { sources } from "../data/sources";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

const categoryGroupLabels: Record<string, string> = {
  docs: "Документация",
  tools: "Инструменты",
  api: "API и управление",
  community: "Сообщество",
};

export function SourcesSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  const grouped = Object.entries(categoryGroupLabels).map(([key, label]) => ({
    key,
    label,
    items: sources.filter((s) => s.category === key),
  }));

  return (
    <section id="sources" className="py-10 md:py-14">
      <SectionHeader
        num="10"
        title="Источники"
        subtitle="Полезные ссылки и документация"
      />

      <div className="space-y-6">
        {grouped.map((group) => {
          if (group.items.length === 0) return null;
          return (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-sm font-semibold mb-3 font-mono uppercase tracking-wider ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
                {group.label}
              </h3>
              <div className="space-y-2">
                {group.items.map((src) => (
                  <a
                    key={src.url}
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4 flex items-center gap-3 group`}
                  >
                    <ExternalLink className="h-4 w-4 text-nyc-taxi flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium group-hover:text-nyc-taxi transition-colors">
                        {src.title}
                      </div>
                      <div className={`text-xs truncate ${th('text-white/30', 'text-oklch(0.60 0 0)')}`}>{src.url}</div>
                    </div>
                    <span className={`text-[10px] hidden sm:block ${th('text-white/20', 'text-oklch(0.70 0 0)')}`}>{src.description}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
