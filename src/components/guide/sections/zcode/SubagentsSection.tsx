"use client";

import { Cpu, Webhook, Zap, AlertCircle } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { TipBox } from "../../ui/ZCodeUI";
import { ClickableImage } from "../../ui/ImageModal";
import { subagentsData, hooksData } from "../../data/zcode/newdocs";

export function SubagentsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <section id="subagents">
      <SectionHeader
        num="09"
        title="Subagents & Hooks"
        subtitle="Специализированные агенты и автоматизация событий"
      />

      {/* Subagents */}
      <div className="mb-8">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-nyc-taxi" />
          Subagents
        </h3>

        <p className={`text-sm leading-relaxed mb-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
          {subagentsData.whatIs}
        </p>

        <div className={`p-4 mb-4 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
          <div className="text-sm font-semibold mb-2">Типы:</div>
          <div className="flex flex-wrap gap-2 mb-3">
            {subagentsData.types.map((type) => (
              <span key={type} className={`px-2 py-1 rounded text-xs ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
                {type}
              </span>
            ))}
          </div>
          <div className="text-sm font-semibold mb-2">Примеры:</div>
          <div className="flex flex-wrap gap-2">
            {subagentsData.examples.map((ex) => (
              <span key={ex} className={`px-2 py-1 rounded text-xs text-nyc-taxi ${th("bg-nyc-taxi/10", "bg-nyc-taxi/10")}`}>
                {ex}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <span className={`text-sm ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
            Управление: <code className="text-nyc-taxi">{subagentsData.manage}</code>
          </span>
        </div>

        <ClickableImage
          src={subagentsData.image}
          alt="Subagents"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      {/* Hooks */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Webhook className="h-5 w-5 text-nyc-taxi" />
          Hooks
        </h3>

        <p className={`text-sm leading-relaxed mb-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
          {hooksData.whatIs}
        </p>

        <div className="space-y-3 mb-4">
          {hooksData.events.map((event) => (
            <div key={event.event} className={`p-3 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-nyc-taxi" />
                <code className="text-sm text-nyc-taxi">{event.event}</code>
              </div>
              <p className={`text-xs ${th("text-white/40", "text-oklch(0.55 0 0)")}`}>{event.desc}</p>
            </div>
          ))}
        </div>

        <ClickableImage
          src={hooksData.image}
          alt="Hooks configuration"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      <TipBox icon={AlertCircle}>
        Hooks выполняются автоматически. Убедитесь, что команды в hooks безопасны.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
