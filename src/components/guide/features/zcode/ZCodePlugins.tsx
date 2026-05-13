"use client";

import { motion } from "framer-motion";
import { Puzzle, Search, ToggleLeft, Store, HelpCircle } from "lucide-react";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";

const pluginSections = [
  { title: "Поиск и установка", desc: "На вкладке «Search» просмотрите плагины маркетплейса. Нажмите «Install» для установки.", icon: Search },
  { title: "Управление установленными", desc: "На вкладке «Installed» — включайте/выключайте переключатель, удаляйте ненужные.", icon: ToggleLeft },
  { title: "Управление маркетплейсами", desc: "На вкладке «Marketplace» добавляйте источники, обновляйте и удаляйте.", icon: Store },
];

const pluginFaq = [
  { q: "В чём разница между плагином и навыком?", a: "Плагин отвечает на вопрос «что система может делать» (добавляет команды, сервисы, инструменты). Навык отвечает на вопрос «как агент должен это делать» (направляет поведение агента)." },
];

export function ZCodePlugins() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th(
    "nyc-card-enhanced",
    "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm"
  );

  return (
    <section id="zcode-plugins">
      <SectionHeader
        num="09"
        title="Плагины"
        subtitle="Механизм расширения возможностей Z Code"
      />

      <p className={`text-sm leading-relaxed mb-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Плагины — это расширения, которые добавляют новые команды, сервисы и инструменты в Z Code.
        Управляйте ими через раздел <strong>Settings → Plugins</strong>.
      </p>

      {/* Plugin subsections */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {pluginSections.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`${card} p-5 flex flex-col`}
          >
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="h-4 w-4 text-nyc-taxi" />
              <span className="text-lg font-semibold">{s.title}</span>
            </div>
            <p className={`text-sm leading-relaxed flex-1 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Screenshots */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <img
          src="/images/zcode/plugin-discover.png"
          alt="Plugin Discover — поиск плагинов"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
        <img
          src="/images/zcode/plugin-installed.png"
          alt="Plugin Installed — управление установленными"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
        <img
          src="/images/zcode/plugin-marketplace.png"
          alt="Plugin Marketplace — маркетплейсы"
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
          {pluginFaq.map((f, i) => (
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
