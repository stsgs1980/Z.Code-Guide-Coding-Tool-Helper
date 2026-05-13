"use client";

import { Monitor, ArrowLeft } from "lucide-react";
import { SectionHeader, TaxiDivider } from "../ui";
import { useTheme } from "../hooks/useTheme";
import {
  ZCodeHeader,
  ZCodeDownload,
  ZCodeApiKeySetup,
  ZCodePermissionModes,
  ZCodeEditHistory,
  ZCodeCommands,
  ZCodePlugins,
  ZCodeMcpServices,
  ZCodeSkills,
  ZCodeMultiAgent,
  ZCodeSafety,
  ZCodeToolsPipeline,
  ZCodeKeyboardShortcuts,
  ZCodeFaq,
  ZCodeFeedback,
} from "../features/zcode";
import { ExamplesSection } from "./ExamplesSection";

interface ZCodeSectionProps {
  onBack?: () => void;
}

export function ZCodeSection({ onBack }: ZCodeSectionProps) {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="zcode-desktop" className="py-10 md:py-14">
      {/* Sticky page header with back button */}
      {onBack && (
        <div className={`sticky top-0 z-30 -mx-4 sm:-mx-6 -mt-10 md:-mt-14 mb-6 px-4 sm:px-6 py-3 flex items-center gap-3 backdrop-blur-md border-b ${th('bg-background/80 border-white/5', 'bg-background/80 border-oklch(0.88 0 0)')}`}>
          <button
            onClick={onBack}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${th('text-white/60 hover:text-nyc-taxi', 'text-oklch(0.35 0 0) hover:text-oklch(0.78 0.16 85)')} group`}
            aria-label="Назад к руководству"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Назад</span>
          </button>
          <div className={`h-4 w-px ${th('bg-white/10', 'bg-oklch(0.82 0 0)')}`} />
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-nyc-taxi" />
            <span className="text-sm font-semibold nyc-gradient-text">ZCode Desktop</span>
          </div>
        </div>
      )}

      <SectionHeader
        num="03"
        title="ZCode Desktop"
        subtitle="Agentic Development Environment — полноценная среда AI-разработки"
      />

      <ZCodeHeader />
      <TaxiDivider />
      <ZCodeDownload />
      <TaxiDivider />
      <ZCodeApiKeySetup />
      <TaxiDivider />
      <ZCodePermissionModes />
      <TaxiDivider />
      <ZCodeEditHistory />
      <TaxiDivider />
      <ZCodeCommands />
      <TaxiDivider />
      <ZCodePlugins />
      <TaxiDivider />
      <ZCodeMcpServices />
      <TaxiDivider />
      <ZCodeSkills />
      <TaxiDivider />
      <ZCodeMultiAgent />
      <TaxiDivider />
      <ZCodeToolsPipeline />
      <TaxiDivider />
      <ZCodeSafety />
      <TaxiDivider />
      <ZCodeKeyboardShortcuts />
      <TaxiDivider />
      <ExamplesSection />
      <TaxiDivider />
      <ZCodeFaq />
      <TaxiDivider />
      <ZCodeFeedback />
    </section>
  );
}
