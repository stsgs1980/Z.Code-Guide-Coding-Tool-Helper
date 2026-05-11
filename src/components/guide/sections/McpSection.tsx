'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeader } from '@/components/guide/SectionHeader'
import { MCP_SERVERS } from '@/data/guide-data'

export function McpSection() {
  return (
    <section id="mcp" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="06" title="MCP-серверы" subtitle="model_context_protocol_servers" readingTime={2} />

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {MCP_SERVERS.map((server, i) => (
          <motion.div
            key={server.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="nyc-card-enhanced nyc-card-enter rounded-xl h-full border-l-2 border-l-taxi-accent">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded bg-[var(--nyc-taxi)]/10 flex items-center justify-center">
                    <server.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  </div>
                  <span className="text-sm font-semibold tracking-tight">{server.name}</span>
                </div>
                <p className="text-sm text-[var(--nyc-text-body)] leading-relaxed mb-2">{server.desc}</p>
                <Badge className="text-[10px] bg-[var(--nyc-bg-interactive-hover)] text-[var(--nyc-concrete)] font-mono border-0">
                  {server.tool}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Transport Protocols */}
      <div className="p-4 border border-[var(--nyc-border-faint)] rounded-lg nyc-card-enhanced">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Globe className="w-4 h-4 text-[var(--nyc-taxi)]" />
          Транспортные протоколы
        </h3>
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          {[
            ['Claude Code', 'HTTP с заголовком авторизации'],
            ['Cline (VS Code)', 'Streamable HTTP'],
            ['Roo Code, Kilo Code', 'SSE'],
            ['Crush', 'JSON Schema'],
          ].map(([client, transport]) => (
            <div key={client} className="flex items-center justify-between p-2.5 rounded bg-[var(--nyc-bg-interactive-hover)] border border-[var(--nyc-border-faint)]">
              <span className="font-mono text-[var(--nyc-text-label)]">{client}</span>
              <span className="text-[var(--nyc-text-icon)] text-[10px]">{transport}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
