"use client";

import { Server, Settings, FolderPlus, Edit, Eye, Globe, FileText, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { ClickableImage } from "../../ui/ImageModal";
import { mcpSectionData } from "../../data/zcode/newdocs";

export function MCPSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = mcpSectionData;

  return (
    <section id="mcp">
      <SectionHeader
        num="06"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* What is MCP */}
      <div className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Server className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.mcpServices.title}</h4>
        </div>
        <p className={`text-sm leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.mcpServices.desc}
        </p>
      </div>

      {/* Config Guide */}
      <div className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Settings className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.configGuide.title}</h4>
        </div>
        <p className={`text-sm leading-relaxed ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.configGuide.desc}
        </p>
      </div>

      {/* Config UI */}
      <SubsectionCard
        title={data.subsections.configUi.title}
        steps={data.subsections.configUi.steps}
        features={data.subsections.configUi.modes}
        image={data.subsections.configUi.image}
        icon="Settings"
        theme={theme}
        th={th}
      />

      {/* Service Groups */}
      <SubsectionCard
        title={data.subsections.serviceGroups.title}
        features={data.subsections.serviceGroups.groups}
        desc={data.subsections.serviceGroups.desc}
        image={data.subsections.serviceGroups.image}
        icon="FolderPlus"
        theme={theme}
        th={th}
      />

      {/* Add MCP */}
      <SubsectionCard
        title={data.subsections.addMcp.title}
        steps={data.subsections.addMcp.steps}
        image={data.subsections.addMcp.image}
        icon="FolderPlus"
        theme={theme}
        th={th}
      />

      {/* Edit MCP */}
      <SubsectionCard
        title={data.subsections.editMcp.title}
        steps={data.subsections.editMcp.steps}
        image={data.subsections.editMcp.image}
        icon="Edit"
        theme={theme}
        th={th}
      />

      {/* Core MCP */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Cpu className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.coreMcp.title}</h4>
        </div>
        <p className={`text-sm mb-3 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>{data.subsections.coreMcp.desc}</p>
        <div className="space-y-2">
          {data.subsections.coreMcp.servers.map((s, i) => (
            <div key={i} className={`p-2 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
              <span className="font-medium text-sm">{s.name}</span>
              <span className={`text-sm ${th("text-white/50", "text-oklch(0.50 0 0)")}`}> — {s.desc}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Vision MCP */}
      <MCPServerCard
        title={data.subsections.visionMcp.title}
        desc={data.subsections.visionMcp.desc}
        features={data.subsections.visionMcp.features}
        usage={data.subsections.visionMcp.usage}
        icon="Eye"
        theme={theme}
        th={th}
      />

      {/* Search MCP */}
      <MCPServerCard
        title={data.subsections.searchMcp.title}
        desc={data.subsections.searchMcp.desc}
        features={data.subsections.searchMcp.features}
        usage={data.subsections.searchMcp.usage}
        icon="Globe"
        theme={theme}
        th={th}
      />

      {/* Web Reader MCP */}
      <MCPServerCard
        title={data.subsections.webReaderMcp.title}
        desc={data.subsections.webReaderMcp.desc}
        features={data.subsections.webReaderMcp.features}
        usage={data.subsections.webReaderMcp.usage}
        icon="FileText"
        theme={theme}
        th={th}
      />

      <TaxiDivider />
    </section>
  );
}

// Reusable card
interface SubsectionCardProps {
  title: string;
  steps?: { step: number; action: string }[];
  features?: string[];
  desc?: string;
  image?: string;
  icon: string;
  theme: string;
  th: (d: string, l: string) => string;
}

function SubsectionCard({ title, steps, features, desc, image, icon, theme, th }: SubsectionCardProps) {
  const iconMap: Record<string, React.ElementType> = {
    Settings,
    FolderPlus,
    Edit,
    Server,
  };
  const Icon = iconMap[icon] || Server;

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

      {desc && <p className={`text-sm mb-3 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>{desc}</p>}

      {steps && (
        <div className="space-y-2 mb-4">
          {steps.map((s) => (
            <div key={s.step} className="flex items-start gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                {s.step}
              </span>
              <p className={`text-sm ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
            </div>
          ))}
        </div>
      )}

      {features && features.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((f, i) => (
            <span key={i} className={`text-xs px-2 py-1 rounded-full ${th("bg-white/5 text-white/70", "bg-oklch(0.93 0 0) text-oklch(0.40 0 0)")}`}>
              {f}
            </span>
          ))}
        </div>
      )}

      {image && (
        <ClickableImage
          src={image}
          alt={title}
          className={`w-full max-w-xs rounded-lg border cursor-pointer hover:opacity-90 transition-opacity ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
          thumbnailHeight={120}
        />
      )}
    </motion.div>
  );
}

// MCP Server Card
interface MCPServerCardProps {
  title: string;
  desc: string;
  features: string[];
  usage: string;
  icon: string;
  theme: string;
  th: (d: string, l: string) => string;
}

function MCPServerCard({ title, desc, features, usage, icon, theme, th }: MCPServerCardProps) {
  const iconMap: Record<string, React.ElementType> = {
    Eye,
    Globe,
    FileText,
  };
  const Icon = iconMap[icon] || Server;

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

      <p className={`text-sm mb-3 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>{desc}</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {features.map((f, i) => (
          <span key={i} className={`text-xs px-2 py-1 rounded-full ${th("bg-white/5 text-white/70", "bg-oklch(0.93 0 0) text-oklch(0.40 0 0)")}`}>
            {f}
          </span>
        ))}
      </div>

      <p className={`text-xs italic ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>
        💡 {usage}
      </p>
    </motion.div>
  );
}
