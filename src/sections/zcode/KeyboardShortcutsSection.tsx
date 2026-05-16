"use client";

import { Keyboard, Globe, Search, Code } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "@/ui/SectionHeader";
import { TaxiDivider } from "@/ui/TaxiDivider";
import { keyboardShortcutsSectionData } from "@/data/zcode/newdocs";

export function KeyboardShortcutsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = keyboardShortcutsSectionData;

  const kbdClass = th("bg-white/10 text-white/80", "bg-oklch(0.88 0 0) text-oklch(0.30 0 0)");

  return (
    <section id="shortcuts">
      <SectionHeader
        num="11"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* Intro */}
      <div className={`p-4 rounded-xl mb-4 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Keyboard className="h-4 w-4 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold text-sm">{data.subsections.keyboardShortcuts.title}</h4>
        </div>
        <p className={`text-xs ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.keyboardShortcuts.desc}
        </p>
      </div>

      {/* 3 columns: Global + Quick Pickers + Chat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Global Shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-4 w-4 text-nyc-taxi" />
            <h4 className="font-semibold text-xs">{data.subsections.globalShortcuts.title}</h4>
          </div>
          <div className="space-y-1.5">
            {data.subsections.globalShortcuts.shortcuts.slice(0, 5).map((s, i) => (
              <div key={i} className={`p-1.5 rounded flex items-center gap-2 ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
                <div className="flex gap-0.5 flex-shrink-0">
                  {s.keys.map((key, j) => (
                    <kbd key={j} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${kbdClass}`}>
                      {key}
                    </kbd>
                  ))}
                </div>
                <span className={`text-[10px] truncate ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Pickers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Search className="h-4 w-4 text-nyc-taxi" />
            <h4 className="font-semibold text-xs">{data.subsections.quickPickers.title}</h4>
          </div>
          <p className={`text-[10px] mb-2 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
            {data.subsections.quickPickers.desc}
          </p>
          <div className="space-y-1.5">
            {data.subsections.quickPickers.pickers.map((p, i) => (
              <div key={i} className={`p-1.5 rounded flex items-center gap-2 ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
                <div className="flex gap-0.5 flex-shrink-0">
                  {p.keys.map((key, j) => (
                    <kbd key={j} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${kbdClass}`}>
                      {key}
                    </kbd>
                  ))}
                </div>
                <span className={`text-[10px] truncate ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{p.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Chat Shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <Keyboard className="h-4 w-4 text-nyc-taxi" />
            <h4 className="font-semibold text-xs">{data.subsections.chatShortcuts.title}</h4>
          </div>
          <div className="space-y-1.5">
            {data.subsections.chatShortcuts.shortcuts.map((s, i) => (
              <div key={i} className={`p-1.5 rounded flex items-center gap-2 ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
                <div className="flex gap-0.5 flex-shrink-0">
                  {s.keys.map((key, j) => (
                    <kbd key={j} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${kbdClass}`}>
                      {key}
                    </kbd>
                  ))}
                </div>
                <span className={`text-[10px] truncate ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Editor Shortcuts - full width */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <Code className="h-4 w-4 text-nyc-taxi" />
          <h4 className="font-semibold text-xs">{data.subsections.editorShortcuts.title}</h4>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {data.subsections.editorShortcuts.shortcuts.map((s, i) => (
            <div key={i} className={`p-2 rounded ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
              <div className="flex gap-0.5 mb-1 flex-wrap">
                {s.keys.map((key, j) => (
                  <kbd key={j} className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${kbdClass}`}>
                    {key}
                  </kbd>
                ))}
              </div>
              <span className={`text-[10px] ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <TaxiDivider />
    </section>
  );
}
