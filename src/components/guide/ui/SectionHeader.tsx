"use client";

import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

interface SectionHeaderProps {
  num: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ num, title, subtitle, className = "" }: SectionHeaderProps) {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`mb-6 ${className}`}
    >
      <span className="section-number">{num}</span>
      <h2 className="text-2xl md:text-3xl font-bold mt-1 tracking-tight">{title}</h2>
      {subtitle && (
        <p className={`mt-2 text-sm md:text-base ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>{subtitle}</p>
      )}
    </motion.div>
  );
}
