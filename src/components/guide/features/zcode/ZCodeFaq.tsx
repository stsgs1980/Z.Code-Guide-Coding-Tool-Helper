"use client";

import { HelpCircle } from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { faqItems } from "../../data/zcode/misc";

export function ZCodeFaq() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  return (
    <section id="zcode-faq">
      <SectionHeader num="10" title="Часто задаваемые вопросы" subtitle="Ответы на популярные вопросы о Z Code" />

      <div className={`${card} overflow-hidden mb-6`}>
        <div className={`flex items-center gap-2 px-5 py-3 ${th("border-b border-white/5", "border-b border-oklch(0.88 0 0)")}`}>
          <HelpCircle className="h-4 w-4 text-nyc-taxi" />
          <span className="text-sm font-semibold">FAQ</span>
        </div>
        <Accordion type="single" collapsible>
          {faqItems.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}
              className={th("border-b border-white/[0.03]", "border-b border-oklch(0.92 0 0)")}>
              <AccordionTrigger className={`text-sm font-medium px-5 ${th("text-white/80 hover:text-white", "text-oklch(0.25 0 0) hover:text-oklch(0.15 0 0)")}`}>
                {f.q}
              </AccordionTrigger>
              <AccordionContent className={`text-sm leading-relaxed px-5 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Screenshot */}
      <div className="mb-6">
        <img src="/images/zcode/faq.png" alt="FAQ section"
          className={`w-full rounded-lg border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
      </div>

      <TaxiDivider />
    </section>
  );
}
