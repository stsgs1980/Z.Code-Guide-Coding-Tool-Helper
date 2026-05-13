"use client";

import { motion } from "framer-motion";
import { Sparkles, DollarSign, Settings2, HelpCircle } from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";

const skillFaq = [
  {
    q: "В чём разница между Workspace и User навыками?",
    a: "Workspace — доступны только в текущем проекте. User — личные, работают в нескольких проектах.",
  },
  {
    q: "Почему я не могу найти нужный навык?",
    a: "Проверьте: включён ли навык, корректен ли фильтр источника, не отфильтровывает ли поиск.",
  },
];

export function ZCodeSkills() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th(
    "nyc-card-enhanced",
    "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm"
  );
  const hlCard = th(
    "nyc-card-highlight-enhanced",
    "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm"
  );

  return (
    <section id="zcode-skills">
      <SectionHeader
        num="11"
        title="Навыки (Skills)"
        subtitle="Многоразовые конфигурации возможностей Agent"
      />

      <p className={`text-sm leading-relaxed mb-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Навыки — это многоразовые конфигурации, которые определяют поведение Agent.
        Вызовите навык, введя <code className={`px-1.5 py-0.5 rounded text-xs font-mono ${th("bg-white/10 text-white/80", "bg-oklch(0.92 0 0) text-oklch(0.35 0 0)")}`}>$skill-name</code> в чате.
        Он появится как тег и направит Agent нужным образом.
      </p>

      {/* How to use */}
      <div className={`${hlCard} p-5 mb-6`}>
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="h-5 w-5 text-nyc-taxi" />
          <span className="text-lg font-semibold">Как использовать</span>
        </div>
        <div className={`text-sm leading-relaxed space-y-2 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
          <p>
            Введите <Badge className={`font-mono text-xs ${th("bg-nyc-taxi/15 text-nyc-taxi", "bg-oklch(0.78 0.16 85 / 10%) text-oklch(0.55 0.12 85)")}`}>$skill-name</Badge> в
            поле чата — навык отобразится как тег и направит поведение Agent.
          </p>
        </div>
      </div>

      {/* Management */}
      <div className={`${card} p-5 mb-6`}>
        <div className="flex items-center gap-2 mb-2">
          <Settings2 className="h-4 w-4 text-nyc-taxi" />
          <span className="text-lg font-semibold">Управление навыками</span>
        </div>
        <ul className={`text-sm leading-relaxed space-y-1.5 list-disc list-inside ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
          <li>Откройте <strong>Settings → Skills</strong></li>
          <li>Используйте поиск для быстрого нахождения навыка</li>
          <li>Фильтруйте по источнику (Workspace / User / Marketplace)</li>
          <li>Переключайте тумблер для включения / отключения навыка</li>
        </ul>
      </div>

      {/* Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <img
          src="/images/zcode/skill-call.png"
          alt="Вызов навыка через $skill-name в чате"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
        <img
          src="/images/zcode/skill-list.png"
          alt="Список навыков в настройках"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      {/* FAQ */}
      <div className={`${card} p-5 mb-6`}>
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="h-4 w-4 text-nyc-taxi" />
          <span className="text-lg font-semibold">FAQ</span>
        </div>
        <Accordion type="single" collapsible>
          {skillFaq.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className={`text-sm font-medium ${th("text-white/80", "text-oklch(0.25 0 0)")}`}>
                {f.q}
              </AccordionTrigger>
              <AccordionContent className={`text-sm leading-relaxed ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <TaxiDivider />
    </section>
  );
}
