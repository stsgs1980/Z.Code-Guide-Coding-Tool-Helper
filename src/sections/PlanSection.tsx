"use client";

import { SectionHeader, TaxiDivider } from '@/ui';
import { plans, planFaqs, planFaqGroups } from '@/data/plans';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTheme } from '@/providers/ThemeProvider';

export function PlanSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="plan" className="py-10 md:py-14">
      <SectionHeader
        num="07"
        title="GLM Coding Plan"
        subtitle="Тарифные планы для AI-кодинга с моделями GLM"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-8">
        {plans.map((plan, i) => (
          <div className="relative" key={plan.id}>
            {plan.highlight && (
              <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10 bg-nyc-taxi text-black text-xs px-3">
                Популярный
              </Badge>
            )}
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-5 !overflow-visible ${
              plan.highlight
                ? th('nyc-card-highlight-enhanced', 'rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm')
                : th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')
            }`}
          >
            <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
            <div className="text-2xl font-bold nyc-gradient-text mb-4">{plan.price}</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className={th('text-white/40', 'text-oklch(0.50 0 0)')}>Запросов / 5ч</span>
                <span className="font-mono text-nyc-taxi">{plan.promptsPer5h}</span>
              </div>
              <div className="flex justify-between">
                <span className={th('text-white/40', 'text-oklch(0.50 0 0)')}>Запросов / нед.</span>
                <span className="font-mono text-nyc-taxi">{plan.promptsPerWeek}</span>
              </div>
              <div className={`h-px ${th('bg-white/5', 'bg-oklch(0.90 0 0)')} my-2`} />
              <div className="flex justify-between">
                <span className={th('text-white/40', 'text-oklch(0.50 0 0)')}>MCP поиск + чтение</span>
                <span className={`font-mono text-xs ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>{plan.mcpSearchesAndReaders}</span>
              </div>
            </div>
          </motion.div>
          </div>
        ))}
      </div>

      <TaxiDivider />

      <h3 className="text-lg font-semibold mb-4">Часто задаваемые вопросы</h3>
      <div className="space-y-6">
        {planFaqGroups.map((group) => (
          <div key={group}>
            <h4 className={`text-sm font-semibold uppercase tracking-wider mb-3 px-3 py-2 rounded-lg ${th('bg-white/[0.03] text-nyc-taxi border-l-2 border-nyc-taxi/40', 'bg-oklch(0.95 0 0) text-oklch(0.78 0.16 85) border-l-2 border-oklch(0.78 0.16 85 / 40%)')}`}>
              {group}
            </h4>
            <Accordion type="single" collapsible className="w-full">
              {planFaqs
                .filter((faq) => faq.group === group)
                .map((faq, i) => (
                  <AccordionItem
                    key={`${group}-${i}`}
                    value={`${group}-${i}`}
                    className={th('border-white/5', 'border-oklch(0.88 0 0)')}
                  >
                    <AccordionTrigger className={`text-sm text-left font-bold ${th('text-white/90 hover:text-nyc-taxi', 'text-oklch(0.15 0 0) hover:text-oklch(0.78 0.16 85)')} hover:no-underline ${th('[&>svg]:text-white/30', '[&>svg]:text-oklch(0.50 0 0)')}`}>
                      <span className={`${th('border-l-2 border-nyc-taxi/40 pl-3', 'border-l-2 border-oklch(0.78 0.16 85 / 40%) pl-3')}`}>{faq.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className={`text-sm whitespace-pre-line ${th('text-white/50 pl-5', 'text-oklch(0.40 0 0) pl-5')}`}>
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
        ))}
      </div>
    </section>
  );
}
