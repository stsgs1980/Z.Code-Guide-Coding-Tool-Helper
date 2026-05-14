"use client";

import { motion } from "framer-motion";
import { Shield, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { ClickableImage } from "../../ui/ImageModal";
import { permissionModes } from "../../data/zcode/features";

const colorMap: Record<string, string> = {
  green: "bg-green-500/10 text-green-400",
  blue: "bg-blue-500/10 text-blue-400",
  yellow: "bg-amber-500/10 text-amber-400",
  purple: "bg-purple-500/10 text-purple-400",
  cyan: "bg-cyan-500/10 text-cyan-400",
  red: "bg-red-500/10 text-red-400",
};

const colorMapLight: Record<string, string> = {
  green: "bg-green-500/10 text-green-600",
  blue: "bg-blue-500/10 text-blue-600",
  yellow: "bg-amber-500/10 text-amber-600",
  purple: "bg-purple-500/10 text-purple-600",
  cyan: "bg-cyan-500/10 text-cyan-600",
  red: "bg-red-500/10 text-red-600",
};

export function ZCodePermissionModes() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  return (
    <section id="zcode-permissions">
      <SectionHeader
        num="06"
        title="Режимы разрешений Agent"
        subtitle="Управляйте балансом между автоматизацией и безопасностью"
      />

      <p className={`text-sm leading-relaxed mb-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Для критических файлов, внешних команд и сетевой активности используйте более консервативный режим.
      </p>

      {/* Permission mode cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {permissionModes.map((m, i) => {
          const badgeClass = theme === "light" ? colorMapLight[m.color] : colorMap[m.color];
          return (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`${card} p-5 flex flex-col`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-nyc-taxi" />
                <span className="text-lg font-semibold">{m.name}</span>
              </div>
              <p className={`text-sm leading-relaxed mb-3 flex-1 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{m.desc}</p>
              <Badge className={`text-xs ${badgeClass} w-fit`}>{m.best}</Badge>
            </motion.div>
          );
        })}
      </div>

      {/* Screenshot */}
      <div className="mb-6">
        <ClickableImage src="/images/zcode/agent-permissions.png" alt="Режимы разрешений Agent в ZCode" className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`} />
      </div>

      {/* Tip */}
      <div className={`${th("bg-white/[0.03] border-l-2 border-nyc-taxi/30", "bg-oklch(0.96 0 0) border-l-2 border-oklch(0.78 0.16 85 / 30%)")} p-3 rounded-r-lg mb-6`}>
        <p className={`text-sm ${th("text-white/50", "text-oklch(0.40 0 0)")}`}>
          <Lightbulb className="h-4 w-4 inline mr-1 text-nyc-taxi" />
          Переключайте режимы в процессе работы — используйте автопринятие правок для написания кода и переходите на стандартный режим для критических операций.
        </p>
      </div>

      <TaxiDivider />
    </section>
  );
}
