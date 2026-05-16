"use client";

import { Bot, Shield, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "@/ui/SectionHeader";
import { TaxiDivider } from "@/ui/TaxiDivider";
import { ClickableImage } from "@/ui";
import { agentsSectionData } from "@/data/zcode/newdocs";

export function AgentsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = agentsSectionData;

  const colorMap: Record<string, string> = {
    green: th("bg-green-500/20 text-green-400", "bg-green-100 text-green-700"),
    blue: th("bg-blue-500/20 text-blue-400", "bg-blue-100 text-blue-700"),
    yellow: th("bg-yellow-500/20 text-yellow-400", "bg-yellow-100 text-yellow-700"),
    purple: th("bg-purple-500/20 text-purple-400", "bg-purple-100 text-purple-700"),
  };

  return (
    <section id="agents">
      <SectionHeader
        num="02"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* Agent Chat + Permissions - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Agent Chat */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <Bot className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.agentChat.title}</h4>
          </div>
          <p className={`text-xs mb-3 ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>{data.subsections.agentChat.desc}</p>
          
          <div className="space-y-1.5 mb-3">
            {data.subsections.agentChat.steps.map((s) => (
              <div key={s.step} className="flex items-start gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                  {s.step}
                </span>
                <p className={`text-xs ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
              </div>
            ))}
          </div>

          {data.subsections.agentChat.image && (
            <ClickableImage
              src={data.subsections.agentChat.image}
              alt="Agent Chat"
              className={`w-full rounded-lg border ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
              thumbnailHeight={80}
            />
          )}
        </motion.div>

        {/* Permissions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <Shield className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.permissions.title}</h4>
          </div>
          <p className={`text-xs mb-3 ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>{data.subsections.permissions.desc}</p>
          
          <div className="space-y-1.5 mb-3">
            {data.subsections.permissions.steps.map((s) => (
              <div key={s.step} className="flex items-start gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                  {s.step}
                </span>
                <p className={`text-xs ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
              </div>
            ))}
          </div>

          {data.subsections.permissions.image && (
            <ClickableImage
              src={data.subsections.permissions.image}
              alt="Permissions"
              className={`w-full rounded-lg border ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
              thumbnailHeight={80}
            />
          )}
        </motion.div>
      </div>

      {/* Available Modes - full width */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Settings className="h-4 w-4 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold text-sm">{data.subsections.availableModes.title}</h4>
        </div>

        {/* Modes Grid - 4 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {data.subsections.availableModes.modes.map((mode) => (
            <div
              key={mode.name}
              className={`p-3 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}
            >
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${colorMap[mode.color]}`}>
                {mode.name}
              </span>
              <p className={`text-xs mt-2 mb-1 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>{mode.desc}</p>
              <p className={`text-[10px] ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>
                👉 {mode.bestFor}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <TaxiDivider />
    </section>
  );
}
