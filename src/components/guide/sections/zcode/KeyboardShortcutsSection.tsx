"use client";

import { Keyboard, Globe, Search, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { keyboardShortcutsSectionData } from "../../data/zcode/newdocs";

export function KeyboardShortcutsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = keyboardShortcutsSectionData;

  return (
    <section id="shortcuts">
      <SectionHeader
        num="11"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* Intro */}
      <div className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Keyboard className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.keyboardShortcuts.title}</h4>
        </div>
        <p className={`text-sm leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.keyboardShortcuts.desc}
        </p>
      </div>

      {/* Global Shortcuts */}
      <ShortcutsCard
        title={data.subsections.globalShortcuts.title}
        shortcuts={data.subsections.globalShortcuts.shortcuts}
        icon="Globe"
        theme={theme}
        th={th}
      />

      {/* Quick Pickers */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Search className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.quickPickers.title}</h4>
        </div>
        <p className={`text-sm mb-4 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.quickPickers.desc}
        </p>

        <div className="space-y-2">
          {data.subsections.quickPickers.pickers.map((p, i) => (
            <div key={i} className={`p-2 rounded-lg flex items-center gap-3 ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
              <div className="flex gap-1">
                {p.keys.map((key, j) => (
                  <span key={j}>
                    <kbd className={`px-2 py-1 rounded text-xs font-mono ${th("bg-white/10 text-white/80", "bg-oklch(0.88 0 0) text-oklch(0.30 0 0)")}`}>
                      {key}
                    </kbd>
                    {j < p.keys.length - 1 && <span className={th("text-white/30", "text-oklch(0.60 0 0)")}> + </span>}
                  </span>
                ))}
              </div>
              <span className={`text-sm ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{p.desc}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Chat Shortcuts */}
      <ShortcutsCard
        title={data.subsections.chatShortcuts.title}
        shortcuts={data.subsections.chatShortcuts.shortcuts}
        icon="Keyboard"
        theme={theme}
        th={th}
      />

      {/* Editor Shortcuts */}
      <ShortcutsCard
        title={data.subsections.editorShortcuts.title}
        shortcuts={data.subsections.editorShortcuts.shortcuts}
        icon="Code"
        theme={theme}
        th={th}
      />

      <TaxiDivider />
    </section>
  );
}

// Shortcuts Card Component
interface ShortcutsCardProps {
  title: string;
  shortcuts: { keys: string[]; action: string }[];
  icon: string;
  theme: string;
  th: (d: string, l: string) => string;
}

function ShortcutsCard({ title, shortcuts, icon, theme, th }: ShortcutsCardProps) {
  const iconMap: Record<string, React.ElementType> = {
    Keyboard,
    Globe,
    Search,
    Code,
  };
  const Icon = iconMap[icon] || Keyboard;

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

      <div className="space-y-2">
        {shortcuts.map((s, i) => (
          <div key={i} className={`p-2 rounded-lg flex items-center gap-3 ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
            <div className="flex gap-1 flex-shrink-0">
              {s.keys.map((key, j) => (
                <span key={j} className="flex items-center">
                  <kbd className={`px-2 py-1 rounded text-xs font-mono ${th("bg-white/10 text-white/80", "bg-oklch(0.88 0 0) text-oklch(0.30 0 0)")}`}>
                    {key}
                  </kbd>
                  {j < s.keys.length - 1 && (
                    <span className={`mx-1 ${th("text-white/30", "text-oklch(0.60 0 0)")}`}>+</span>
                  )}
                </span>
              ))}
            </div>
            <span className={`text-sm ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
