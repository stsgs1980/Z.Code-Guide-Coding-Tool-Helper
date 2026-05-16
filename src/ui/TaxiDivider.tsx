/**
 * UI LAYER
 * TaxiDivider - NYC taxi-styled section divider
 * 
 * Anti-monolith: presentational component, no state
 */

'use client';

import { useTheme } from '@/providers/ThemeProvider';

export function TaxiDivider({ className = '' }: { className?: string }) {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === 'light' ? light : dark;

  return <hr className={`${th('nyc-section-divider', 'nyc-section-divider')} ${className}`} />;
}
