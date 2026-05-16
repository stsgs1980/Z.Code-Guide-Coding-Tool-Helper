"use client";

import { Sparkles, Settings, Search, HelpCircle } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { TipBox, FAQItem } from "../../ui/ZCodeUI";
import { ClickableImage } from "../../ui/ImageModal";
import { skillsData } from "../../data/zcode/newdocs";

export function SkillsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <section id="skills">
      <SectionHeader
        num="05"
        title="Skills"
        subtitle="Переиспользуемые конфигурации возможностей Agent"
      />

      {/* What is */}
      <div className={`p-5 mb-6 ${th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm")}`}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-nyc-taxi" />
          <span className="font-semibold">{skillsData.whatIs.title}</span>
        </div>
        <p className={`text-sm mb-3 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
          {skillsData.whatIs.desc}
        </p>
        <div className={`p-3 rounded-lg ${th("bg-white/[0.03]", "bg-oklch(0.96 0 0)")}`}>
          <code className="text-sm text-nyc-taxi">{skillsData.whatIs.example}</code>
        </div>
      </div>

      {/* Manage */}
      <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
        <Settings className="h-4 w-4 text-nyc-taxi" />
        {skillsData.manage.title}
      </h3>

      <div className="mb-4">
        {skillsData.manage.steps.map((step, i) => (
          <div key={i} className={`flex items-start gap-2 mb-2 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
            <span className="w-5 h-5 rounded-full bg-nyc-taxi text-black text-xs flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <ClickableImage
          src={skillsData.manage.image}
          alt="Управление навыками"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      {/* Usage */}
      <h3 className="text-base font-semibold mb-3">{skillsData.usage.title}</h3>

      <div className={`p-4 mb-6 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
        <div className="flex items-center gap-2 mb-2">
          <code className="text-lg text-nyc-taxi font-mono">{skillsData.usage.format}</code>
          <span className={`text-sm ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>— формат вызова</span>
        </div>
        <p className={`text-sm ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
          {skillsData.usage.desc}
        </p>
      </div>

      {/* Screenshot */}
      <div className="mb-6">
        <ClickableImage
          src={skillsData.usage.image}
          alt="Вызов навыка в чате"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      {/* FAQ */}
      <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
        <HelpCircle className="h-4 w-4 text-nyc-taxi" />
        FAQ
      </h3>

      <div className="space-y-3 mb-6">
        {skillsData.faq.map((item, i) => (
          <FAQItem key={i} question={item.q} answer={item.a} />
        ))}
      </div>

      <TipBox>
        Workspace skills доступны только в проекте, User skills — личные и работают везде.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
