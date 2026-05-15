"use client";

import { ListTodo, Terminal, Globe, GitCompare, Wifi, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { TipBox } from "../../ui/ZCodeUI";
import { ClickableImage } from "../../ui/ImageModal";
import { adeToolsData } from "../../data/zcode/newdocs";

export function ADEToolsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  const iconMap: Record<string, React.ElementType> = {
    ListTodo,
    Terminal,
    Globe,
    GitCompare,
    Wifi,
    Wrench,
  };

  return (
    <section id="ade-tools">
      <SectionHeader
        num="11"
        title="ADE Tools"
        subtitle="Встроенные инструменты Agent Development Environment"
      />

      <p className={`text-sm leading-relaxed mb-6 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        ZCode предоставляет полный набор инструментов для разработки — от управления задачами до терминала и предпросмотра.
        Всё в одном месте, без переключения между приложениями.
      </p>

      {/* Tools grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {adeToolsData.map((tool, i) => {
          const Icon = iconMap[tool.icon] || Wrench;
          return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 ${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
                  <Icon className="h-4 w-4 text-nyc-taxi" />
                </div>
                <span className="font-semibold">{tool.name}</span>
                {tool.shortcut && (
                  <code className={`text-xs px-1.5 py-0.5 rounded ml-auto ${th("bg-white/5 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                    {tool.shortcut}
                  </code>
                )}
              </div>
              <p className={`text-sm mb-2 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{tool.desc}</p>
              {tool.features && (
                <ul className="space-y-1">
                  {tool.features.map((f, j) => (
                    <li key={j} className={`text-xs flex items-center gap-1.5 ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
                      <span className="nyc-status-dot nyc-status-active flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {adeToolsData.slice(0, 6).map((tool) => (
          tool.image && (
            <ClickableImage
              key={tool.name}
              src={tool.image}
              alt={tool.name}
              className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
            />
          )
        ))}
      </div>

      <TipBox>
        Используйте <code className="text-nyc-taxi">Cmd/Ctrl + J</code> для быстрого открытия/закрытия терминала.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
