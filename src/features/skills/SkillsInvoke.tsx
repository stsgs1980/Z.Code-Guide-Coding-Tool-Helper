"use client";

import { Terminal, Search, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTheme } from "../../hooks/useTheme";
import { TaxiDivider } from "../../ui";
import { faqItems, invokeMethods, queryExamples } from "@/data/skills";

const methodIconMap = { Terminal, Search, Sparkles };

export function SkillsInvoke() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Вызов навыков</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {invokeMethods.map((method, i) => {
          const Icon = methodIconMap[method.icon];
          return (
            <motion.div key={method.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-4`}>
              <div className={`w-10 h-10 rounded-lg ${method.color} flex items-center justify-center mb-3`}>
                <Icon className="h-5 w-5 text-nyc-taxi" />
              </div>
              <span className="text-sm font-semibold block mb-1">{method.title}</span>
              <p className={`text-xs leading-relaxed mb-2 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{method.desc}</p>
              <code className="text-xs font-mono text-nyc-taxi">{method.example}</code>
            </motion.div>
          );
        })}
      </div>

      <TaxiDivider />

      <h3 className="text-lg font-semibold">Примеры запросов по навыкам</h3>

      <div className="space-y-3">
        {queryExamples.map((group) => (
          <div key={group.skill} className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-4`}>
            <code className="text-xs font-mono text-nyc-taxi mb-2 block">{group.skill}</code>
            <div className="flex flex-wrap gap-2">
              {group.queries.map((q) => (
                <span key={q} className={`text-xs px-2 py-1 rounded ${th("bg-white/[0.03] text-white/50", "bg-oklch(0.96 0 0) text-oklch(0.40 0 0)")}`}>
                  «{q}»
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <TaxiDivider />

      <h3 className="text-lg font-semibold">Частые вопросы</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, i) => (
          <AccordionItem key={`faq-${i}`} value={`faq-${i}`} className={th("border-white/5", "border-oklch(0.88 0 0)")}>
            <AccordionTrigger className={`text-sm text-left font-bold ${th("text-white/90 hover:text-nyc-taxi", "text-oklch(0.15 0 0) hover:text-oklch(0.78 0.16 85)")} hover:no-underline ${th("[&>svg]:text-white/30", "[&>svg]:text-oklch(0.50 0 0)")}`}>
              <span className={th("border-l-2 border-nyc-taxi/40 pl-3", "border-l-2 border-oklch(0.78 0.16 85 / 40%) pl-3")}>{item.q}</span>
            </AccordionTrigger>
            <AccordionContent className={`text-sm whitespace-pre-line ${th("text-white/50 pl-5", "text-oklch(0.40 0 0) pl-5")}`}>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
