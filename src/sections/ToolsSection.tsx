/**
 * SECTIONS LAYER
 * ToolsSection - list of supported tools
 * 
 * Anti-monolith: no state, uses UI components and providers
 */

'use client';

import { SectionHeader } from '@/ui';
import { tools } from '@/data/tools';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';

const typeLabels: Record<string, string> = {
  cli: 'CLI',
  ide: 'IDE',
  agent: 'Агент',
};

const typeColors: Record<string, string> = {
  cli: 'bg-green-500/10 text-green-400 border-green-500/20',
  ide: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  agent: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

export function ToolsSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === 'light' ? light : dark;

  return (
    <section id="tools" className="py-10 md:py-14">
      <SectionHeader
        num="05"
        title="Инструменты"
        subtitle="Поддерживаемые AI-кодинг-инструменты"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold">{tool.name}</h3>
              <Badge variant="outline" className={`text-xs ${typeColors[tool.type]}`}>
                {typeLabels[tool.type]}
              </Badge>
            </div>
            <p className={`text-sm leading-relaxed ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>{tool.description}</p>
            {tool.note && (
              <p className={`text-sm leading-relaxed mt-1 ${th('text-amber-400/60', 'text-amber-600')}`}>
                {tool.note}
              </p>
            )}
            <div className="mt-2 flex gap-2">
              <Badge variant="outline" className={`text-xs ${th('border-white/10 text-white/30', 'border-oklch(0.82 0 0) text-oklch(0.60 0 0)')}`}>
                {tool.configFormat === 'anthropic' ? 'Anthropic API' : 'OpenAI Compatible'}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
