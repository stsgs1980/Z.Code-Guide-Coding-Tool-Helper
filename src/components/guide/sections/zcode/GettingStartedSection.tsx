"use client";

import { Rocket, ArrowRight } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { StepCard, TipBox } from "../../ui/ZCodeUI";
import { gettingStartedSteps } from "../../data/zcode/newdocs";

export function GettingStartedSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <section id="getting-started">
      <SectionHeader
        num="01"
        title="Начало работы"
        subtitle="Первый запуск и настройка ZCode Desktop"
      />

      {/* Quick start */}
      <div className={`p-5 mb-6 ${th("nyc-card-highlight-enhanced", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm")}`}>
        <div className="flex items-center gap-2 mb-3">
          <Rocket className="h-5 w-5 text-nyc-taxi" />
          <span className="font-semibold">Быстрый старт</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Скачать ZCode", "Открыть папку", "Настроить API", "Начать задачу"].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i === 0 ? "bg-nyc-taxi text-black" : th("bg-white/5 text-white/40", "bg-oklch(0.90 0 0) text-oklch(0.50 0 0)")
              }`}>
                {i + 1}
              </span>
              <span className={`text-sm ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>{step}</span>
              {i < 3 && <ArrowRight className={`h-4 w-4 ${th("text-white/20", "text-oklch(0.70 0 0)")}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="mb-6">
        {gettingStartedSteps.map((step, i) => (
          <StepCard
            key={step.step}
            step={step.step}
            title={step.title}
            description={step.description}
            options={step.options}
            image={step.image}
            isLast={i === gettingStartedSteps.length - 1}
          />
        ))}
      </div>

      <TipBox>
        После первого запуска ZCode создаст папку <code className="text-nyc-taxi">~/.zcode</code> для хранения настроек и логов.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
