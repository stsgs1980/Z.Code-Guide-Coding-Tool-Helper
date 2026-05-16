"use client";

import { ListTodo, Terminal, Globe, GitCompare, Wifi, Wrench, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { TipBox } from "../../ui/ZCodeUI";
import { ClickableImage } from "../../ui/ImageModal";
import { adeToolsSectionData } from "../../data/zcode/newdocs";

export function ADEToolsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = adeToolsSectionData;

  const tools = [
    { key: "taskManager", icon: "ListTodo", ...data.subsections.taskManager },
    { key: "cliPanel", icon: "Terminal", ...data.subsections.cliPanel },
    { key: "webBrowser", icon: "Globe", ...data.subsections.webBrowser },
    { key: "remoteDev", icon: "Smartphone", ...data.subsections.remoteDev },
    { key: "sidebar", icon: "Wrench", ...data.subsections.sidebar },
    { key: "diffPreview", icon: "GitCompare", ...data.subsections.diffPreview },
  ];

  const iconMap: Record<string, React.ElementType> = {
    ListTodo,
    Terminal,
    Globe,
    GitCompare,
    Wifi,
    Wrench,
    Smartphone,
  };

  return (
    <section id="ade-tools">
      <SectionHeader
        num="10"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* Intro */}
      <div className={`p-4 rounded-xl mb-4 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <p className={`text-xs leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.adeTools.desc}
        </p>
      </div>

      {/* Tools Grid - 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {tools.map((tool, i) => {
          const Icon = iconMap[tool.icon] || Wrench;
          return (
            <motion.div
              key={tool.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`p-4 rounded-xl h-fit ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
                  <Icon className="h-4 w-4 text-nyc-taxi" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{tool.title}</h4>
                </div>
                {"shortcut" in tool && tool.shortcut && (
                  <code className={`text-[10px] px-1.5 py-0.5 rounded ${th("bg-white/5 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                    {tool.shortcut}
                  </code>
                )}
              </div>

              <p className={`text-xs mb-2 ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>{tool.desc}</p>

              {/* Steps */}
              {"steps" in tool && tool.steps && (
                <div className="space-y-1 mb-2">
                  {tool.steps.slice(0, 3).map((s: { step: number; action: string }) => (
                    <div key={s.step} className="flex items-start gap-1.5">
                      <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0)")}`}>
                        {s.step}
                      </span>
                      <p className={`text-[10px] ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Features */}
              {"features" in tool && tool.features && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {(tool.features as string[]).slice(0, 3).map((f: string, j: number) => (
                    <span
                      key={j}
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${th("bg-white/5 text-white/70", "bg-oklch(0.93 0 0) text-oklch(0.40 0 0)")}`}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {/* Image */}
              {"image" in tool && tool.image && (
                <ClickableImage
                  src={tool.image}
                  alt={tool.title}
                  className={`w-full rounded-lg border ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
                  thumbnailHeight={80}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <TipBox>
        Используйте <code className="text-nyc-taxi">Cmd/Ctrl + J</code> для терминала,
        и <code className="text-nyc-taxi">Cmd/Ctrl + B</code> для сайдбара.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
