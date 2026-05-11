"use client";

import { SectionHeader, TaxiDivider, CodeBlock } from "../ui";
import { mcpServers, mcpCombinedConfig } from "../data/mcpServers";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../hooks/useTheme";

export function McpSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="mcp" className="py-8">
      <SectionHeader
        num="05"
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
                <h3 className="font-semibold flex items-center gap-2">
                  {server.name}
                  <Badge variant="outline" className={`text-[10px] ${th('border-white/10 text-white/40', 'border-oklch(0.82 0 0) text-oklch(0.50 0 0)')}`}>
                    порт {server.port}
                  </Badge>
                </h3>
                <p className={`text-xs mt-1 ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>{server.description}</p>
              </div>
            </div>
            <ul className="space-y-1 mb-4">
              {server.capabilities.map((cap) => (
                <li key={cap} className={`text-xs flex items-center gap-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                  <span className="nyc-status-dot nyc-status-active" />
                  {cap}
                </li>
              ))}
            </ul>
            <CodeBlock lang="json" title={`Конфигурация ${server.name}`} code={server.configJson} />
          </motion.div>
        ))}

        <TaxiDivider />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-3">Полная конфигурация (все серверы)</h3>
          <CodeBlock lang="json" title="Все MCP-серверы" code={mcpCombinedConfig} />
        </motion.div>
      </div>
    </section>
  );
}
