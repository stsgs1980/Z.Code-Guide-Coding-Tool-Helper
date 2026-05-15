"use client";

import { MessageSquare, Shield, Lightbulb } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { StepCard, ModeCard, TipBox } from "../../ui/ZCodeUI";
import { ClickableImage } from "../../ui/ImageModal";
import { agentChatModes, agentChatSteps } from "../../data/zcode/newdocs";

export function AgentChatSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  return (
    <section id="agent-chat">
      <SectionHeader
        num="02"
        title="Agent Chat"
        subtitle="Взаимодействие с AI-агентом через естественный язык"
      />

      {/* Description */}
      <p className={`text-sm leading-relaxed mb-6 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Agent Chat — основная поверхность взаимодействия. Для каждого запроса вы можете настроить 
        модель AI и режим разрешений. Цель — дать вам контроль над каждым действием Agent.
      </p>

      {/* Steps */}
      <div className="mb-6">
        {agentChatSteps.map((step, i) => (
          <StepCard
            key={step.step}
            step={step.step}
            title={step.title}
            action={step.action}
            image={step.image}
            isLast={i === agentChatSteps.length - 1}
          />
        ))}
      </div>

      {/* Permission Modes */}
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Shield className="h-5 w-5 text-nyc-taxi" />
        Режимы разрешений
      </h3>
      
      <p className={`text-sm mb-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Режимы разрешений контролируют, как Agent выполняет действия и когда запрашивает подтверждение.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {agentChatModes.map((mode) => (
          <ModeCard key={mode.name} {...mode} />
        ))}
      </div>

      {/* Screenshot */}
      <div className="mb-6">
        <ClickableImage
          src="/images/zcode/agent-permissions.png"
          alt="Режимы разрешений Agent в ZCode"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      <TipBox icon={Lightbulb}>
        Для критических файлов, внешних команд и сетевой активности используйте более консервативный режим. 
        Для рутинных правок — режим автопринятия ускорит работу.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
