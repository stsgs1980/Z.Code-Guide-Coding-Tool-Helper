"use client";

import { motion } from "framer-motion";
import { LogIn, Settings, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { apiSetupMethods, apiProviders } from "../../data/zcode/features";

const methodIcons: Record<string, React.ElementType> = { LogIn, Settings };

export function ZCodeApiKeySetup() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  return (
    <section id="zcode-api-setup">
      <SectionHeader
        num="05"
        title="Настройка API-провайдеров"
        subtitle="Подключите AI-сервисы для работы агентов"
      />

      {/* Setup methods */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {apiSetupMethods.map((m) => {
          const Icon = methodIcons[m.icon] || LogIn;
          return (
            <div key={m.num} className={`${card} p-5`}>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-nyc-taxi text-black text-xs">Способ {m.num}</Badge>
                <Icon className="h-4 w-4 text-nyc-taxi" />
                <span className="text-lg font-semibold">{m.title}</span>
              </div>
              <p className={`text-sm leading-relaxed ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{m.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Screenshot */}
      <div className="mb-6">
        <img src="/images/zcode/configuration.png" alt="ZCode API configuration screen" className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
      </div>

      {/* Tip */}
      <div className={`${th("bg-white/[0.03] border-l-2 border-nyc-taxi/30", "bg-oklch(0.96 0 0) border-l-2 border-oklch(0.78 0.16 85 / 30%)")} p-3 rounded-r-lg mb-6`}>
        <p className={`text-sm ${th("text-white/50", "text-oklch(0.40 0 0)")}`}>
          <Lightbulb className="h-4 w-4 inline mr-1 text-nyc-taxi" />
          Настройки GLM-терминала не синхронизируются с ZCode автоматически — настройте ключ отдельно в приложении.
        </p>
      </div>

      {/* Provider cards grid */}
      <h3 className="text-lg font-semibold mb-4">Доступные провайдеры</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {apiProviders.map((p, i) => (
          <motion.div
            key={p.key}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className={`${card} p-5 flex flex-col`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-semibold">{p.name}</span>
            </div>
            {p.baseUrl && (
              <code className={`text-xs px-1.5 py-0.5 rounded mb-2 self-start ${th("bg-white/5 text-nyc-taxi", "bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)")}`}>
                {p.baseUrl}
              </code>
            )}
            <p className={`text-sm leading-relaxed mb-2 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{p.note}</p>
            <div className={`text-xs mt-auto ${th("text-white/30", "text-oklch(0.55 0 0)")}`}>
              Модели: <span className="text-nyc-taxi font-mono">{p.models}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />
    </section>
  );
}
