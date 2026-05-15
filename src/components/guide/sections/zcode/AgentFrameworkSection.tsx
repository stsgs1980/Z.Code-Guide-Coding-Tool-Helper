"use client";

import { Cpu, Bot, SwitchCamera, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { ClickableImage } from "../../ui/ImageModal";
import { agentFrameworkSectionData } from "../../data/zcode/newdocs";

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
        className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Cpu className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.multiAgent.title}</h4>
        </div>
        <p className={`text-sm mb-4 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.multiAgent.desc}
        </p>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.subsections.multiAgent.agents.map((agent) => (
            <div 
              key={agent.name}
              className={`p-3 rounded-lg ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Bot className="h-4 w-4 text-nyc-taxi" />
                <span className="font-medium text-sm">{agent.name}</span>
              </div>
              <p className={`text-xs ${th("text-white/50", "text-oklch(0.50 0 0)")}`}>
                {agent.provider} • {agent.features}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Select Agent */}
      <SubsectionCard
        title={data.subsections.selectAgent.title}
        steps={data.subsections.selectAgent.steps}
        image={data.subsections.selectAgent.image}
        icon="Bot"
        theme={theme}
        th={th}
      />

      {/* Switch Framework */}
      <SubsectionCard
        title={data.subsections.switchFramework.title}
        steps={data.subsections.switchFramework.steps}
        image={data.subsections.switchFramework.image}
        icon="SwitchCamera"
        theme={theme}
        th={th}
      />

      {/* Workflow */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
            <Workflow className="h-5 w-5 text-nyc-taxi" />
          </div>
          <h4 className="font-semibold">{data.subsections.workflow.title}</h4>
        </div>
        <p className={`text-sm mb-4 ${th("text-white/70", "text-oklch(0.35 0 0)")}`}>
          {data.subsections.workflow.desc}
        </p>

        <div className="space-y-2">
          {data.subsections.workflow.examples.map((ex, i) => (
            <div key={i} className={`p-2 rounded-lg flex items-center justify-between ${th("bg-white/5", "bg-oklch(0.95 0 0)")}`}>
              <span className="text-sm">{ex.task}</span>
              <code className="text-xs px-2 py-1 rounded text-nyc-taxi bg-nyc-taxi/10">
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

// Reusable card
interface SubsectionCardProps {
  title: string;
  steps: { step: number; action: string }[];
  image?: string;
  icon: string;
  theme: string;
  th: (d: string, l: string) => string;
}

function SubsectionCard({ title, steps, image, icon, theme, th }: SubsectionCardProps) {
  const iconMap: Record<string, React.ElementType> = {
    Bot,
    SwitchCamera,
    Workflow,
    Cpu,
  };
  const Icon = iconMap[icon] || Bot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-6 p-4 rounded-xl ${th("nyc-card-enhanced", "border border-oklch(0.88 0 0) bg-oklch(0.98 0 0)")}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${th("bg-white/5", "bg-oklch(0.93 0 0)")}`}>
          <Icon className="h-5 w-5 text-nyc-taxi" />
        </div>
        <h4 className="font-semibold">{title}</h4>
      </div>

      <div className="space-y-2 mb-4">
        {steps.map((s) => (
          <div key={s.step} className="flex items-start gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${th("bg-nyc-taxi/20 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
              {s.step}
            </span>
            <p className={`text-sm ${th("text-white/60", "text-oklch(0.40 0 0)")}`}>{s.action}</p>
          </div>
        ))}
      </div>

      {image && (
        <ClickableImage
          src={image}
          alt={title}
          className={`w-full max-w-xs rounded-lg border cursor-pointer hover:opacity-90 transition-opacity ${th("border-white/10", "border-oklch(0.88 0 0)")}`}
          thumbnailHeight={120}
        />
      )}
    </motion.div>
  );
}
