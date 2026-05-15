"use client";

import { HelpCircle } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { FAQItem } from "../../ui/ZCodeUI";
import { faqData } from "../../data/zcode/newdocs";

export function FAQSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <section id="faq">
      <SectionHeader
        num="14"
        title="FAQ"
        subtitle="Ответы на частые вопросы о ZCode"
      />

      <p className={`text-sm leading-relaxed mb-6 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Краткие ответы на распространённые вопросы о позиционировании продукта, тарифах и технических проблемах.
      </p>

      <div className="space-y-4 mb-6">
        {faqData.map((item, i) => (
          <FAQItem key={i} question={item.q} answer={item.a} />
        ))}
      </div>

      {/* Additional help */}
      <div className={`p-4 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-4 w-4 text-nyc-taxi" />
          <span className="text-sm font-semibold">Не нашли ответ?</span>
        </div>
        <p className={`text-sm ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
          Отправьте вопрос через форму обратной связи или создайте issue на GitHub.
        </p>
      </div>

      <TaxiDivider />
    </section>
  );
}
