"use client";

import { useTheme } from "../hooks/useTheme";

export function TaxiDivider({ className = "" }: { className?: string }) {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return <hr className={`${th('nyc-section-divider', 'nyc-section-divider')} ${className}`} />;
}
