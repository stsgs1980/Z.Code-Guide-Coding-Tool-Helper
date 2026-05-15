"use client";

import { Settings, Eye, Brain, Palette, Cpu, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { TipBox } from "../../ui/ZCodeUI";
import { ClickableImage } from "../../ui/ImageModal";
import { settingsData } from "../../data/zcode/newdocs";

export function SettingsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  const iconMap: Record<string, React.ElementType> = {
    CodePreview: Eye,
    Memory: Brain,
    OutputStyle: Palette,
    ModelProviders: Cpu,
  };

  const settingItems = [
    { key: "codePreview", ...settingsData.codePreview },
    { key: "memory", ...settingsData.memory },
    { key: "outputStyle", ...settingsData.outputStyle },
    { key: "modelProviders", ...settingsData.modelProviders },
  ];

  return (
    <section id="settings">
      <SectionHeader
        num="10"
        title="Settings"
        subtitle="Настройка параметров ZCode"
      />

      <p className={`text-sm leading-relaxed mb-6 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Настройки ZCode разделены на категории. Каждая категория управляет определённым аспектом работы приложения.
      </p>

      <div className="space-y-4 mb-6">
        {settingItems.map((item, i) => {
          const Icon = iconMap[item.key] || Settings;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${card} p-4`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-nyc-taxi" />
                <span className="font-semibold">{item.title}</span>
              </div>
              
              {item.desc && (
                <p className={`text-sm mb-3 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{item.desc}</p>
              )}
              
              {item.options && (
                <ul className="space-y-1 mb-3">
                  {item.options.map((opt, j) => (
                    <li key={j} className={`text-xs flex items-center gap-1.5 ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
                      <span className="nyc-status-dot nyc-status-active flex-shrink-0" />
                      {opt}
                    </li>
                  ))}
                </ul>
              )}
              
              {item.fields && (
                <ul className="space-y-1 mb-3">
                  {item.fields.map((field, j) => (
                    <li key={j} className={`text-xs flex items-center gap-1.5 ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
                      <span className="nyc-status-dot nyc-status-active flex-shrink-0" />
                      {field}
                    </li>
                  ))}
                </ul>
              )}
              
              {item.actions && (
                <ul className="space-y-1 mb-3">
                  {item.actions.map((action, j) => (
                    <li key={j} className={`text-xs flex items-center gap-1.5 ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
                      <span className="nyc-status-dot nyc-status-active flex-shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              )}
              
              {item.image && (
                <ClickableImage
                  src={item.image}
                  alt={item.title}
                  className={`w-full rounded-lg border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <TipBox>
        Model Providers — настройте API ключи провайдеров AI-моделей. Конфигурация терминала не синхронизируется автоматически.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
