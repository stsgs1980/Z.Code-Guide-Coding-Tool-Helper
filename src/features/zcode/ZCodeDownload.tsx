"use client";

import { motion } from "framer-motion";
import { Download, Monitor, CheckCircle } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "@/ui/SectionHeader";
import { TaxiDivider } from "@/ui/TaxiDivider";
import { CodeBlock } from "@/ui/CodeBlock";
import { installPlatforms, installSteps } from "@/data/zcode/features";

export function ZCodeDownload() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  return (
    <section id="zcode-install">
      <SectionHeader
        num="04"
        title="Загрузка и установка"
        subtitle="Скачайте ZCode для вашей платформы и начните работу за минуты"
      />

      {/* Download buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {installPlatforms.map((p, i) => (
          <motion.a
            key={p.platform}
            href={p.url}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${card} hover:border-nyc-taxi/30 p-4 flex items-center gap-3 transition-colors group cursor-pointer`}
          >
            <Download className="h-5 w-5 text-nyc-taxi flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-sm font-semibold group-hover:text-nyc-taxi transition-colors">{p.platform}</div>
              <div className={`text-xs ${th("text-white/30", "text-oklch(0.60 0 0)")}`}>{p.ext}</div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Install instructions */}
      <h3 className="text-lg font-semibold mb-4">Инструкции по установке</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {installSteps.map((s, i) => (
          <motion.div key={s.os} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className={`${card} p-5`}>
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="h-4 w-4 text-nyc-taxi" />
              <span className="text-lg font-semibold">{s.os}</span>
            </div>
            <p className={`text-sm leading-relaxed ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{s.steps}</p>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Verification */}
      <h3 className="text-lg font-semibold mb-3">Проверка установки</h3>
      <p className={`text-sm leading-relaxed mb-3 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        После установки запустите ZCode и убедитесь, что приложение открывается корректно. На экране приветствия выберите способ подключения.
      </p>
      <CodeBlock code="zcode --version" lang="bash" title="Terminal" className="mb-4" />

      <div className={`${card} p-4 flex items-start gap-3`}>
        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
        <p className={`text-sm leading-relaxed ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
          Если версия отображается корректно — установка завершена. Перейдите к настройке API-провайдеров.
        </p>
      </div>
    </section>
  );
}
