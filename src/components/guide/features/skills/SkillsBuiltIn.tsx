"use client";

import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { builtinSkills, categoryColors } from "../../data/skills";

export function SkillsBuiltIn() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Встроенные навыки Z.ai</h3>
      <p className={`text-sm leading-relaxed ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Эти навыки уже установлены в каждом проекте. Просто попросите — AI вызовет нужный.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {builtinSkills.map((skill, i) => (
          <motion.div key={skill.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
            className={`${th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm")} p-3`}>
            <div className="flex items-center justify-between mb-1">
              <code className="text-xs font-mono text-nyc-taxi">{skill.name}</code>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${categoryColors[skill.category] || "bg-white/5 text-white/40 border-white/10"}`}>
                {skill.category}
              </span>
            </div>
            <p className={`text-xs leading-relaxed ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>{skill.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
