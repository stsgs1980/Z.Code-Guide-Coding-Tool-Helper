/**
 * FEATURES LAYER
 * Footer - page footer
 * 
 * Anti-monolith: may use providers, minimal state
 */

'use client';

import { useTheme } from '@/providers/ThemeProvider';

export function Footer() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) =>
    theme === 'light' ? light : dark;

  return (
    <footer className="nyc-footer-glow-line mt-auto pt-8 pb-8 text-center">
      <p className={`text-xs ${th('text-white/20', 'text-oklch(0.70 0 0)')}`}>
        Z Code User Guide — Руководство пользователя
      </p>
      <p className={`text-xs ${th('text-white/15', 'text-oklch(0.75 0 0)')} mt-1`}>
        Документация Z.AI —{' '}
        <a
          href="https://docs.z.ai"
          target="_blank"
          rel="noopener"
          className="nyc-link-hover"
        >
          docs.z.ai
        </a>
        {' · '}
        <a
          href="https://zcode.z.ai"
          target="_blank"
          rel="noopener"
          className="nyc-link-hover"
        >
          zcode.z.ai
        </a>
      </p>
    </footer>
  );
}
