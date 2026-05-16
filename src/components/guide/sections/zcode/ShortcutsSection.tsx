"use client";

import { Keyboard, Globe, MessageSquare, Code } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { ShortcutRow, TipBox } from "../../ui/ZCodeUI";
import { shortcutsData } from "../../data/zcode/newdocs";

export function ShortcutsSection() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);

  const sections = [
    { title: "Глобальные", icon: Globe, data: shortcutsData.global },
    { title: "Чат", icon: MessageSquare, data: shortcutsData.chat },
    { title: "Редактор", icon: Code, data: shortcutsData.editor },
  ];

  return (
    <section id="shortcuts">
      <SectionHeader
        num="12"
        title="Keyboard Shortcuts"
        subtitle="Быстрые клавиши для эффективной работы"
      />

      <p className={`text-sm leading-relaxed mb-6 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        Самые полезные сочетания клавиш для повседневной работы. Полный список доступен в меню приложения.
      </p>

      <div className="space-y-6 mb-6">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title}>
              <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-nyc-taxi" />
                {section.title}
              </h3>
              <div className={`p-4 rounded-lg ${th("bg-white/[0.02]", "bg-oklch(0.97 0 0)")}`}>
                {section.data.map((shortcut, i) => (
                  <div key={i}>
                    <ShortcutRow keys={shortcut.keys} action={shortcut.action} />
                    {i < section.data.length - 1 && (
                      <div className={`border-b ${th("border-white/5", "border-oklch(0.90 0 0)")}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <TipBox icon={Keyboard}>
        Нажмите <code className="text-nyc-taxi">Cmd/Ctrl + K</code> для открытия Command Palette с полным списком команд.
      </TipBox>

      <TaxiDivider />
    </section>
  );
}
