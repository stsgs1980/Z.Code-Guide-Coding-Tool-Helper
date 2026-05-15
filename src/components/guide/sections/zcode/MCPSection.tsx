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

      {/* What is MCP + Config Guide - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <Server className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.mcpServices.title}</h4>
          </div>
          <p className={`text-xs ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>{data.subsections.mcpServices.desc}</p>
        </div>

        <div className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <Settings className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.configGuide.title}</h4>
          </div>
          <p className={`text-xs ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>{data.subsections.configGuide.desc}</p>
        </div>
      </div>

      {/* Config UI + Service Groups + Add MCP + Edit MCP - 4 columns on large */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Config UI */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4 text-nyc-taxi" />
            <h4 className="font-semibold text-xs">{data.subsections.configUi.title}</h4>
          </div>
          <div className="space-y-1 mb-2">
            {data.subsections.configUi.steps.slice(0, 3).map((s) => (
              <div key={s.step} className="flex items-start gap-1.5">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0)")}`}>
                  {s.step}
                </span>
                <p className={`text-[10px] ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
              </div>
            ))}
          </div>
          {data.subsections.configUi.image && (
            <ClickableImage src={data.subsections.configUi.image} alt="Config UI" className={`w-full rounded border ${th("border-white/10", "border-oklch(0.88 0 0)")}`} thumbnailHeight={60} />
          )}
        </motion.div>

        {/* Service Groups */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <FolderPlus className="h-4 w-4 text-nyc-taxi" />
            <h4 className="font-semibold text-xs">{data.subsections.serviceGroups.title}</h4>
          </div>
          <div className="flex flex-wrap gap-1">
            {data.subsections.serviceGroups.groups.map((g, i) => (
              <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full ${th("bg-white/5 text-white/70", "bg-oklch(0.93 0 0)")}`}>{g}</span>
            ))}
          </div>
        </motion.div>

        {/* Add MCP */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <FolderPlus className="h-4 w-4 text-nyc-taxi" />
            <h4 className="font-semibold text-xs">{data.subsections.addMcp.title}</h4>
          </div>
          <div className="space-y-1">
            {data.subsections.addMcp.steps.slice(0, 4).map((s) => (
              <div key={s.step} className="flex items-start gap-1.5">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0)")}`}>
                  {s.step}
                </span>
                <p className={`text-[10px] ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Edit MCP */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <Edit className="h-4 w-4 text-nyc-taxi" />
            <h4 className="font-semibold text-xs">{data.subsections.editMcp.title}</h4>
          </div>
          <div className="space-y-1">
            {data.subsections.editMcp.steps.map((s) => (
              <div key={s.step} className="flex items-start gap-1.5">
                <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0)")}`}>
                  {s.step}
                </span>
                <p className={`text-[10px] ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Core MCP + Vision + Search + Web Reader - 4 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Core MCP */}
        <div className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="h-4 w-4 text-nyc-taxi" />
            <h4 className="font-semibold text-xs">{data.subsections.coreMcp.title}</h4>
          </div>
          <div className="space-y-1">
            {data.subsections.coreMcp.servers.map((s, i) => (
              <div key={i} className={`p-1.5 rounded ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
                <span className="font-medium text-[10px]">{s.name}</span>
                <span className={`text-[10px] ${th("text-white/50", "text-oklch(0.50 0 0)")}`}> — {s.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vision MCP */}
        <div className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-nyc-taxi" />
            <h4 className="font-semibold text-xs">{data.subsections.visionMcp.title}</h4>
          </div>
          <p className={`text-[10px] mb-2 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>{data.subsections.visionMcp.desc}</p>
          <div className="flex flex-wrap gap-1">
            {data.subsections.visionMcp.features.map((f, i) => (
              <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>{f}</span>
            ))}
          </div>
        </div>

        {/* Search MCP */}
        <div className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-nyc-taxi" />
            <h4 className="font-semibold text-xs">{data.subsections.searchMcp.title}</h4>
          </div>
          <p className={`text-[10px] mb-2 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>{data.subsections.searchMcp.desc}</p>
          <div className="flex flex-wrap gap-1">
            {data.subsections.searchMcp.features.map((f, i) => (
              <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>{f}</span>
            ))}
          </div>
        </div>

        {/* Web Reader MCP */}
        <div className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-nyc-taxi" />
            <h4 className="font-semibold text-xs">{data.subsections.webReaderMcp.title}</h4>
          </div>
          <p className={`text-[10px] mb-2 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>{data.subsections.webReaderMcp.desc}</p>
          <div className="flex flex-wrap gap-1">
            {data.subsections.webReaderMcp.features.map((f, i) => (
              <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>{f}</span>
            ))}
          </div>
        </div>
      </div>

      <TaxiDivider />
    </section>
  );
}
