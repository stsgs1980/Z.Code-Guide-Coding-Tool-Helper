"use client";

import { SectionHeader, TaxiDivider, CodeBlock } from "../ui";
import { mcpServers } from "../data/mcpServers";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../hooks/useTheme";
import { useState } from "react";
import { Lightbulb } from "lucide-react";

type ConfigTab = "claude" | "cline" | "opencode";

export function McpSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;
  const [activeTabs, setActiveTabs] = useState<Record<string, ConfigTab>>({});

  const getTab = (serverId: string): ConfigTab => activeTabs[serverId] ?? "claude";
  const setTab = (serverId: string, tab: ConfigTab) =>
    setActiveTabs((prev) => ({ ...prev, [serverId]: tab }));

  const getConfig = (server: typeof mcpServers[number], tab: ConfigTab) => {
    switch (tab) {
      case "claude": return server.configClaudeCode;
      case "cline": return server.configCline;
      case "opencode": return server.configOpenCode;
    }
  };

  const tabLabels: { key: ConfigTab; label: string }[] = [
    { key: "claude", label: "Claude Code" },
    { key: "cline", label: "Cline" },
    { key: "opencode", label: "OpenCode" },
  ];

  return (
    <section id="mcp" className="py-10 md:py-14">
      <SectionHeader
        num="06"
        title="MCP-серверы"
        subtitle="Расширяйте возможности AI-ассистента с помощью Model Context Protocol"
      />

      <div className="space-y-6">
        {mcpServers.map((server, i) => (
          <motion.div
            key={server.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-5`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-base flex items-center gap-2">
                  {server.name}
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      server.type === "remote"
                        ? th('border-emerald-500/30 text-emerald-400', 'border-emerald-500/40 text-emerald-600')
                        : th('border-white/10 text-white/40', 'border-oklch(0.82 0 0) text-oklch(0.50 0 0)')
                    }`}
                  >
                    {server.type === "remote" ? "Remote MCP" : "Local MCP"}
                  </Badge>
                </h3>
                <p className={`text-xs mt-1 ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>
                  {server.description}
                </p>
              </div>
            </div>

            {/* Prerequisites & package info */}
            {(server.prerequisites || server.package || server.version) && (
              <div className={`flex flex-wrap gap-2 mb-3 text-sm ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                {server.package && (
                  <span className={`px-2 py-0.5 rounded ${th('bg-white/5', 'bg-oklch(0.93 0 0)')}`}>
                    Пакет: <code className="text-nyc-taxi">{server.package}</code>
                  </span>
                )}
                {server.version && (
                  <span className={`px-2 py-0.5 rounded ${th('bg-white/5', 'bg-oklch(0.93 0 0)')}`}>
                    Версия: <code className="text-nyc-taxi">{server.version}</code>
                  </span>
                )}
                {server.prerequisites && (
                  <span className={`px-2 py-0.5 rounded ${th('bg-white/5', 'bg-oklch(0.93 0 0)')}`}>
                    Требуется: {server.prerequisites}
                  </span>
                )}
              </div>
            )}

            {/* Capabilities */}
            <ul className="space-y-1 mb-3">
              {server.capabilities.map((cap) => (
                <li
                  key={cap}
                  className={`text-xs flex items-center gap-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}
                >
                  <span className="nyc-status-dot nyc-status-active" />
                  {cap}
                </li>
              ))}
            </ul>

            {/* Tools */}
            {server.tools && server.tools.length > 0 && (
              <div className="mb-3">
                <span className={`text-sm font-medium ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
                  Инструменты:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {server.tools.map((tool) => (
                    <Badge
                      key={tool}
                      variant="outline"
                      className={`text-xs font-mono ${th('border-white/10 text-white/50', 'border-oklch(0.82 0 0) text-oklch(0.45 0 0)')}`}
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Best practice */}
            {server.bestPractice && (
              <div className={`text-xs mb-3 p-2 rounded ${th('bg-white/5 text-white/50', 'bg-oklch(0.95 0 0) text-oklch(0.40 0 0)')}`}>
                <Lightbulb className="h-3 w-3 inline mr-1 text-nyc-taxi" />{server.bestPractice}
              </div>
            )}

            {/* One-click install for remote servers */}
            {server.oneClickInstall && (
              <div className="mb-3">
                <span className={`text-sm font-medium ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
                  Установка в один клик (Claude Code):
                </span>
                <CodeBlock
                  lang="bash"
                  title="One-click install"
                  code={server.oneClickInstall}
                />
              </div>
            )}

            {/* Config tabs */}
            <div>
              <div className="flex gap-1 mb-2">
                {tabLabels.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setTab(server.id, tab.key)}
                    className={`text-sm px-2.5 py-1 rounded transition-colors ${
                      getTab(server.id) === tab.key
                        ? "bg-nyc-taxi text-black font-semibold"
                        : th('bg-white/5 text-white/50 hover:text-white/80', 'bg-oklch(0.93 0 0) text-oklch(0.50 0 0) hover:text-oklch(0.30 0 0)')
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <CodeBlock
                lang={server.type === "remote" ? "bash" : "json"}
                title={`Конфигурация ${server.name} — ${tabLabels.find((t) => t.key === getTab(server.id))?.label}`}
                code={getConfig(server, getTab(server.id))}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
