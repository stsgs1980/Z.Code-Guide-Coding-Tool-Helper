"use client";

import { Terminal, Plus, Play, FileText } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { TipBox } from "../../ui/ZCodeUI";
import { ClickableImage } from "../../ui/ImageModal";
import { commandsData } from "../../data/zcode/newdocs";

export function CommandsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <section id="commands">
      <SectionHeader
        num="06"
        title="Commands"
        subtitle="Переиспользуемые ярлыки для частых промптов"
      />

      {/* What is */}
      <p className={`text-sm leading-relaxed mb-6 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        {commandsData.whatIs}
      </p>

      {/* How to create */}
      <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
        <Plus className="h-4 w-4 text-nyc-taxi" />
        Создание команды
      </h3>

      <div className="mb-4">
        {commandsData.howTo.create.map((step, i) => (
          <div key={i} className={`flex items-start gap-2 mb-2 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
            <span className="w-5 h-5 rounded-full bg-nyc-taxi text-black text-xs flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {commandsData.fields.map((field) => (
          <div key={field.name} className={`p-3 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
            <div className="text-sm font-semibold text-nyc-taxi">{field.name}</div>
            <div className={`text-xs ${th("text-white/40", "text-oklch(0.55 0 0)")}`}>{field.desc}</div>
          </div>
        ))}
      </div>

      {/* Screenshot */}
      <div className="mb-6">
        <ClickableImage
          src={commandsData.images.new}
          alt="Создание новой команды"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      {/* How to call */}
      <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
        <Play className="h-4 w-4 text-nyc-taxi" />
        Вызов команды
      </h3>

      <div className="mb-4">
        {commandsData.howTo.call.map((step, i) => (
          <div key={i} className={`flex items-start gap-2 mb-2 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
            <span className="w-5 h-5 rounded-full bg-nyc-taxi text-black text-xs flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>

      {/* Screenshot */}
      <div className="mb-6">
        <ClickableImage
          src={commandsData.images.call}
          alt="Вызов команды через /"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      {/* Example */}
      <div className={`p-4 mb-6 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-4 w-4 text-nyc-taxi" />
          <span className="text-sm font-semibold">Пример команды</span>
        </div>
        <div className={`font-mono text-sm ${th("text-white/70", "text-oklch(0.30 0 0)")}`}>
          <div><span className="text-nyc-taxi">Name:</span> review</div>
          <div><span className="text-nyc-taxi">Prompt:</span> Review this code for bugs and suggest improvements: {"{{code}}"}</div>
        </div>
      </div>

      <TipBox>
        Используйте {"{{variable}}"} в промпте для создания параметров команды.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
