"use client";

import { Cpu, Bot, SwitchCamera, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "@/ui/SectionHeader";
import { TaxiDivider } from "@/ui/TaxiDivider";
import { ClickableImage } from "@/ui";
import { agentFrameworkSectionData } from "@/data/zcode/newdocs";

export function AgentFrameworkSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const data = agentFrameworkSectionData;

  return (
    <section id="agent-framework">
      <SectionHeader
        num="08"
        title={data.title}
        subtitle={data.subtitle}
      />

      {/* Multi-Agent */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-4 rounded-xl mb-4 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Cpu className="h-4 w-4 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold text-sm">{data.subsections.multiAgent.title}</h4>
        </div>
        <p className={`text-xs mb-3 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.multiAgent.desc}
        </p>

        {/* Agents Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {data.subsections.multiAgent.agents.map((agent) => (
            <div
              key={agent.name}
              className={`p-2 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Bot className="h-3 w-3 text-nyc-taxi" />
                <span className="font-medium text-xs">{agent.name}</span>
              </div>
              <p className={`text-[10px] ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>
                {agent.provider} • {agent.features}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Select Agent + Switch Framework - 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Select Agent */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <Bot className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.selectAgent.title}</h4>
          </div>

          <div className="space-y-1.5 mb-3">
            {data.subsections.selectAgent.steps.map((s) => (
              <div key={s.step} className="flex items-start gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                  {s.step}
                </span>
                <p className={`text-xs ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
              </div>
            ))}
          </div>

          {data.subsections.selectAgent.image && (
            <ClickableImage
              src={data.subsections.selectAgent.image}
              alt="Select Agent"
              className={`w-full rounded-lg border ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
              thumbnailHeight={80}
            />
          )}
        </motion.div>

        {/* Switch Framework */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
              <SwitchCamera className="h-4 w-4 text-nyc-taxi" />
            </div>
            <h4 className="font-semibold text-sm">{data.subsections.switchFramework.title}</h4>
          </div>

          <div className="space-y-1.5 mb-3">
            {data.subsections.switchFramework.steps.map((s) => (
              <div key={s.step} className="flex items-start gap-2">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium flex-shrink-0 mt-0.5 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                  {s.step}
                </span>
                <p className={`text-xs ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
              </div>
            ))}
          </div>

          {data.subsections.switchFramework.image && (
            <ClickableImage
              src={data.subsections.switchFramework.image}
              alt="Switch Framework"
              className={`w-full rounded-lg border ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
              thumbnailHeight={80}
            />
          )}
        </motion.div>
      </div>

      {/* Workflow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`p-4 rounded-xl mb-6 ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Workflow className="h-4 w-4 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold text-sm">{data.subsections.workflow.title}</h4>
        </div>
        <p className={`text-xs mb-3 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.workflow.desc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {data.subsections.workflow.examples.map((ex, i) => (
            <div key={i} className={`p-2 rounded-lg flex items-center justify-between ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
              <span className="text-xs">{ex.task}</span>
              <code className="text-[10px] px-1.5 py-0.5 rounded text-nyc-taxi bg-nyc-taxi/10">
                {ex.agent}
              </code>
            </div>
          ))}
        </div>
      </motion.div>

      <TaxiDivider />
    </section>
  );
}
