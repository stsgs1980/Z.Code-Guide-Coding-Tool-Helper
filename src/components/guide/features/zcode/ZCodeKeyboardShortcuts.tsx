"use client";

import { Keyboard } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "../../ui/SectionHeader";
import { TaxiDivider } from "../../ui/TaxiDivider";
import { keyboardShortcuts } from "../../data/zcode/misc";

function ShortcutTable({ title, items, th, card }: {
  title: string;
  items: { win: string; mac: string; desc: string }[];
  th: (d: string, l: string) => string;
  card: string;
}) {
  const kbdClass = th(
    "text-xs px-2 py-0.5 rounded font-mono bg-white/5 text-white/40 border border-white/10",
    "text-xs px-2 py-0.5 rounded font-mono bg-oklch(0.93 0 0) text-oklch(0.40 0 0) border border-oklch(0.85 0 0)"
  );

  return (
    <div className={`${card} overflow-hidden`}>
      <div className={`px-4 py-3 font-semibold text-sm ${th("border-b border-white/5", "border-b border-oklch(0.88 0 0)")}`}>
        {title}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className={th("border-b border-white/5", "border-b border-oklch(0.88 0 0)")}>
            <th className={`text-left py-2 px-4 text-xs font-medium ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>Действие</th>
            <th className={`text-left py-2 px-4 text-xs font-medium ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>Mac</th>
            <th className={`text-left py-2 px-4 text-xs font-medium ${th("text-white/40", "text-oklch(0.50 0 0)")}`}>Windows</th>
          </tr>
        </thead>
        <tbody>
          {items.map((sc) => (
            <tr key={sc.desc} className={th("border-b border-white/[0.02]", "border-b border-oklch(0.94 0 0)")}>
              <td className={`py-2.5 px-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>{sc.desc}</td>
              <td className="py-2.5 px-4"><kbd className={kbdClass}>{sc.mac}</kbd></td>
              <td className="py-2.5 px-4"><kbd className={kbdClass}>{sc.win}</kbd></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ZCodeKeyboardShortcuts() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th("nyc-card-enhanced", "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm");

  return (
    <section id="zcode-keyboard">
      <SectionHeader num="09" title="Горячие клавиши" subtitle="Быстрое управление через клавиатуру" />

      <div className={`${th("bg-white/[0.03] border-l-2 border-nyc-taxi/30", "bg-oklch(0.96 0 0) border-l-2 border-oklch(0.78 0.16 85 / 30%)")} p-3 rounded-r-lg mb-6`}>
        <p className={`text-sm ${th("text-white/50", "text-oklch(0.40 0 0)")}`}>
          <Keyboard className="h-4 w-4 inline mr-1 text-nyc-taxi" />
          Все основные действия доступны через горячие клавиши — работайте быстрее без мыши.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ShortcutTable title="Глобальные действия" items={keyboardShortcuts.global} th={th} card={card} />
        <ShortcutTable title="Быстрые выборки (Pickers)" items={keyboardShortcuts.pickers} th={th} card={card} />
      </div>

      <TaxiDivider />
    </section>
  );
}
