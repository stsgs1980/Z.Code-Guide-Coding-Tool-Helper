"use client";

import { Server, Plus, Eye, Globe, FileText, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { TipBox, FeatureCard } from "../../ui/ZCodeUI";
import { ClickableImage } from "../../ui/ImageModal";
import { mcpData } from "../../data/zcode/newdocs";

export function MCPSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <section id="mcp">
      <SectionHeader
        num="08"
        title="MCP Services"
        subtitle="Model Context Protocol — интеграция внешних возможностей"
      />

      {/* What is */}
      <p className={`text-sm leading-relaxed mb-6 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        {mcpData.whatIs}
      </p>

      {/* Entry point */}
      <div className={`p-5 mb-6 ${th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm")}`}>
        <div className="flex items-center gap-2 mb-2">
          <Settings className="h-5 w-5 text-nyc-taxi" />
          <span className="font-semibold">{mcpData.entry.path}</span>
        </div>
        <p className={`text-sm mb-3 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
          {mcpData.entry.desc}
        </p>
        <ClickableImage
          src={mcpData.entry.image}
          alt="MCP Servers"
          className={`w-full rounded-lg border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      {/* Service groups */}
      <h3 className="text-base font-semibold mb-3">Группы сервисов</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {mcpData.groups.map((group) => (
          <span key={group} className={`px-3 py-1 rounded-full text-sm ${th("bg-white/5 border border-white/10", "bg-oklch(0.93 0 0) border border-oklch(0.85 0 0)")}`}>
            {group}
          </span>
        ))}
      </div>

      {/* Add steps */}
      <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
        <Plus className="h-4 w-4 text-nyc-taxi" />
        Добавление MCP-сервиса
      </h3>

      <div className="mb-6">
        {mcpData.addSteps.map((step, i) => (
          <div key={i} className={`flex items-start gap-2 mb-2 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
            <span className="w-5 h-5 rounded-full bg-nyc-taxi text-black text-xs flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>

      {/* Key services */}
      <h3 className="text-base font-semibold mb-3">Ключевые MCP-сервисы</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {mcpData.services.map((service) => {
          const iconMap: Record<string, React.ElementType> = { Eye, Globe, FileText };
          const Icon = iconMap[service.icon] || Server;
          return (
            <FeatureCard
              key={service.id}
              icon={Icon}
              title={service.name}
              description={service.desc}
            />
          );
        })}
      </div>

      {/* Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <ClickableImage
          src="/images/zcode/mcp-servers.png"
          alt="Список MCP серверов"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
        <ClickableImage
          src="/images/zcode/mcp-create.png"
          alt="Создание MCP сервера"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      <TipBox>
        MCP-сервисы требуют настройки перед использованием. Проверьте документацию каждого сервиса для корректной конфигурации.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
