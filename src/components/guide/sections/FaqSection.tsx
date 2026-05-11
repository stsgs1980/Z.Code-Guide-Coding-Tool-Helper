'use client'

import React from 'react'
import { MessageSquare } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionHeader } from '@/components/guide/SectionHeader'
import { FAQ_ITEMS } from '@/data/guide-data'

interface FaqSectionProps {
  faqExpanded: string[]
  setFaqExpanded: (value: string[]) => void
}

export function FaqSection({ faqExpanded, setFaqExpanded }: FaqSectionProps) {
  return (
    <section id="faq" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="09.5" title="Часто задаваемые вопросы" subtitle="faq" readingTime={3} />

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold">Ответы</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFaqExpanded(FAQ_ITEMS.map((_, i) => `faq-${i}`))}
            className={`text-[10px] font-mono text-[var(--nyc-steel)] hover:text-[var(--nyc-taxi)] px-2 py-1 rounded hover:bg-[var(--nyc-bg-interactive-hover)] transition-colors`}
          >
            Раскрыть все
          </button>
          <span className="text-[var(--nyc-border-separator)]">|</span>
          <button
            onClick={() => setFaqExpanded([])}
            className={`text-[10px] font-mono text-[var(--nyc-steel)] hover:text-[var(--nyc-taxi)] px-2 py-1 rounded hover:bg-[var(--nyc-bg-interactive-hover)] transition-colors`}
          >
            Свернуть все
          </button>
        </div>
      </div>
      <Accordion type="multiple" value={faqExpanded} onValueChange={setFaqExpanded} className="space-y-1.5">
        {FAQ_ITEMS.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border border-[var(--nyc-border-subtle)] rounded-lg bg-[var(--nyc-bg-subtle)] px-4 data-[state=open]:border-[var(--nyc-taxi)]/20 data-[state=open]:bg-[var(--nyc-taxi)]/[0.04]"
          >
            <AccordionTrigger className="text-xs hover:no-underline py-3 gap-2">
              <div className="flex items-center gap-2 text-left">
                <MessageSquare className="w-3.5 h-3.5 text-[var(--nyc-taxi)]/80 shrink-0" />
                <span className="font-bold text-[var(--nyc-concrete)]">{faq.q}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-xs pb-3">
              <span className="text-[var(--nyc-steel)] leading-relaxed">{faq.a}</span>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
