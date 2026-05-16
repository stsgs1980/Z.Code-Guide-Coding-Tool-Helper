"use client";

import { motion } from "framer-motion";
import { Monitor, ChevronRight } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

interface ZCodePromoCardProps {
  onNavigate: () => void;
}

export function ZCodePromoCard({ onNavigate }: ZCodePromoCardProps) {
  const { theme } = useTheme();
  const th = (dark: string, light: string) =>
    theme === "light" ? light : dark;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-10"
    >
      <button
        onClick={onNavigate}
        className={`w-full text-left group ${th("nyc-card-highlight-enhanced hover:border-nyc-taxi/40", "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm hover:border-oklch(0.78 0.16 85 / 50%)")} p-6 transition-all hover:shadow-lg`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-nyc-taxi/10 flex items-center justify-center flex-shrink-0 group-hover:bg-nyc-taxi/20 transition-colors">
              <Monitor className="h-6 w-6 text-nyc-taxi" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold nyc-gradient-text">
                  ZCode Desktop
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${th("bg-nyc-taxi/10 text-nyc-taxi", "bg-oklch(0.78 0.16 85 / 15%) text-oklch(0.78 0.16 85)")}`}
                >
                  ADE
                </span>
              </div>
              <p
                className={`text-sm ${th("text-white/50", "text-oklch(0.45 0 0)")}`}
              >
                Agentic Development Environment — полноценная среда
                AI-разработки с мультиагентной работой, терминалом,
                предпросмотром и безопасностью
              </p>
            </div>
          </div>
          <ChevronRight
            className={`h-5 w-5 flex-shrink-0 ml-4 group-hover:translate-x-1 transition-transform ${th("text-nyc-taxi/50 group-hover:text-nyc-taxi", "text-oklch(0.78 0.16 85 / 40%) group-hover:text-oklch(0.78 0.16 85)")}`}
          />
        </div>
      </button>
    </motion.div>
  );
}
