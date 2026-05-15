"use client";

import { ListTodo, Terminal, Globe, GitCompare, Wifi, Wrench, Smartphone, FileCode } from "lucide-react";
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

  const iconMap: Record<string, React.ElementType> = {
    ListTodo,
    Terminal,
    Globe,
    GitCompare,
    Wifi,
    Wrench,
    Smartphone,
    FileCode,
  };

  return (
    <section id="ade-tools">
      <SectionHeader
        num="10"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* ADE Tools Intro */}
      <div className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <p className={`text-sm leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.adeTools.desc}
        </p>
      </div>

      {/* Task Manager */}
      <SubsectionCard
        title={data.subsections.taskManager.title}
        desc={data.subsections.taskManager.desc}
        features={data.subsections.taskManager.features}
        steps={data.subsections.taskManager.steps}
        shortcut={data.subsections.taskManager.shortcut}
        image={data.subsections.taskManager.image}
        icon="ListTodo"
        iconMap={iconMap}
        theme={theme}
        th={th}
      />

      {/* Remote Dev */}
      <SubsectionCard
        title={data.subsections.remoteDev.title}
        desc={data.subsections.remoteDev.desc}
        features={data.subsections.remoteDev.features}
        steps={data.subsections.remoteDev.steps}
        image={data.subsections.remoteDev.image}
        icon="Smartphone"
        iconMap={iconMap}
        theme={theme}
        th={th}
      />

      {/* CLI Panel */}
      <SubsectionCard
        title={data.subsections.cliPanel.title}
        desc={data.subsections.cliPanel.desc}
        features={data.subsections.cliPanel.features}
        steps={data.subsections.cliPanel.steps}
        shortcut={data.subsections.cliPanel.shortcut}
        image={data.subsections.cliPanel.image}
        icon="Terminal"
        iconMap={iconMap}
        theme={theme}
        th={th}
      />

      {/* Web Browser */}
      <SubsectionCard
        title={data.subsections.webBrowser.title}
        desc={data.subsections.webBrowser.desc}
        features={data.subsections.webBrowser.features}
        steps={data.subsections.webBrowser.steps}
        image={data.subsections.webBrowser.image}
        icon="Globe"
        iconMap={iconMap}
        theme={theme}
        th={th}
      />

      {/* Sidebar */}
      <SubsectionCard
        title={data.subsections.sidebar.title}
        desc={data.subsections.sidebar.desc}
        features={data.subsections.sidebar.features}
        steps={data.subsections.sidebar.steps}
        shortcut={data.subsections.sidebar.shortcut}
        image={data.subsections.sidebar.image}
        icon="Wrench"
        iconMap={iconMap}
        theme={theme}
        th={th}
      />

      {/* Diff Preview */}
      <SubsectionCard
        title={data.subsections.diffPreview.title}
        desc={data.subsections.diffPreview.desc}
        features={data.subsections.diffPreview.features}
        image={data.subsections.diffPreview.image}
        icon="GitCompare"
        iconMap={iconMap}
        theme={theme}
        th={th}
      />

      <TipBox>
        Используйте <code className="text-nyc-taxi">Cmd/Ctrl + J</code> для быстрого открытия/закрытия терминала, 
        и <code className="text-nyc-taxi">Cmd/Ctrl + B</code> для управления сайдбаром.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}

// Reusable subsection card component
interface SubsectionCardProps {
  title: string;
  desc: string;
  features?: string[];
  steps?: { step: number; action: string }[];
  shortcut?: string;
  image?: string;
  icon: string;
  iconMap: Record<string, React.ElementType>;
  theme: string;
  th: (d: string, l: string) => string;
}

function SubsectionCard({ 
  title, desc, features, steps, shortcut, image, icon, iconMap, theme, th 
}: SubsectionCardProps) {
  const Icon = iconMap[icon] || Wrench;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
          <Icon className="h-5 w-5 text-nyc-taxi" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">{title}</h4>
          <p className={`text-xs ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>{desc}</p>
        </div>
        {shortcut && (
          <code className={`text-xs px-2 py-1 rounded ${th("bg-white/5 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
            {shortcut}
          </code>
        )}
      </div>

      {/* Steps */}
      {steps && steps.length > 0 && (
        <div className="mb-4">
          <div className={`space-y-2`}>
            {steps.map((s) => (
              <div key={s.step} className="flex items-start gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                  {s.step}
                </span>
                <p className={`text-sm ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      {features && features.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((f, i) => (
            <span 
              key={i} 
              className={`text-xs px-2 py-1 rounded-full ${th("bg-white/5 text-white/70", "bg-oklch(0.93 0 0) text-oklch(0.40 0 0)")}`}
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {/* Small clickable image card */}
      {image && (
        <div className="mt-3">
          <ClickableImage
            src={image}
            alt={title}
            className={`w-full max-w-xs rounded-lg border cursor-pointer hover:opacity-90 transition-opacity ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
            thumbnailHeight={120}
          />
        </div>
      )}
    </motion.div>
  );
}
