"use client";

import { useState } from "react";
import { ArrowLeft, Sparkles, Wrench, FileCode2, Package, Terminal } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { SectionHeader, TaxiDivider } from "../ui";
import {
  SkillsWhatIs,
  SkillsBuiltIn,
  SkillsCreate,
  SkillsInstall,
  SkillsInvoke,
} from "../features/skills";

type TabId = "what" | "builtin" | "create" | "install" | "call";

const tabs: { id: TabId; label: string; icon: typeof Sparkles }[] = [
  { id: "what", label: "Что такое Skills", icon: Sparkles },
  { id: "builtin", label: "Встроенные навыки", icon: Wrench },
  { id: "create", label: "Создание навыка", icon: FileCode2 },
  { id: "install", label: "Установка и перенос", icon: Package },
  { id: "call", label: "Вызов навыков", icon: Terminal },
];

interface SkillsGuideSectionProps {
  onBack?: () => void;
}

export function SkillsGuideSection({ onBack }: SkillsGuideSectionProps) {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;
  const [activeTab, setActiveTab] = useState<TabId>("what");

  return (
    <section className="py-10 md:py-14">
      {/* Sticky header */}
      {onBack && (
        <div className={`sticky top-0 z-30 -mx-4 sm:-mx-6 -mt-10 md:-mt-14 mb-6 px-4 sm:px-6 py-3 flex items-center gap-3 backdrop-blur-md border-b ${th("bg-background/80 border-white/5", "bg-background/80 border-oklch(0.88 0 0)")}`}>
          <button onClick={onBack} className={`flex items-center gap-2 text-sm font-medium transition-colors ${th("text-white/60 hover:text-nyc-taxi", "text-oklch(0.35 0 0) hover:text-oklch(0.78 0.16 85)")} group`} aria-label="Назад к руководству">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Назад</span>
          </button>
          <div className={`h-4 w-px ${th("bg-white/10", "bg-oklch(0.82 0 0)")}`} />
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-nyc-taxi" />
            <span className="text-sm font-semibold nyc-gradient-text">Skills — Шпаргалка</span>
          </div>
        </div>
      )}

      <SectionHeader num="04" title="Skills — Шпаргалка" subtitle="Всё о навыках Z.ai: что это, как создавать, устанавливать и использовать" />

      {/* Intro card */}
      <div className={`${th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm")} p-6 mb-8`}>
        <p className={`text-sm leading-relaxed ${th("text-white/80", "text-oklch(0.25 0 0)")}`}>
          <strong>Skills (навыки)</strong> — это текстовые инструкции в формате SKILL.md, которые дают AI-ассистенту
          специализированные знания. Навык = папка с файлом. Никакого кода для запуска, никаких зависимостей.
          Просто текст, который AI читает и следует ему.
        </p>
      </div>

      {/* Tab navigation */}
      <div className={`flex gap-1 p-1 rounded-lg mb-8 overflow-x-auto ${th("bg-white/[0.03]", "bg-oklch(0.96 0 0)")}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? `${th("bg-nyc-taxi text-black", "bg-oklch(0.78 0.16 85) text-white")} shadow-sm`
                  : `${th("text-white/50 hover:text-white/80 hover:bg-white/5", "text-oklch(0.45 0 0) hover:text-oklch(0.25 0 0) hover:bg-oklch(0.90 0 0)")}`
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === "what" && <SkillsWhatIs />}
      {activeTab === "builtin" && <SkillsBuiltIn />}
      {activeTab === "create" && <SkillsCreate />}
      {activeTab === "install" && <SkillsInstall />}
      {activeTab === "call" && <SkillsInvoke />}
    </section>
  );
}
