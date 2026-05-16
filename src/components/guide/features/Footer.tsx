/**
 * Footer - page footer with theme badge, Fibonacci spacing, GitHub icon
 * 
 * Anti-monolith: may use providers, minimal state
 * Phi-layout: uses --fib-3, --fib-5 spacing variables
 */

"use client";

import { useTheme } from "../hooks/useTheme";
import { Moon, Sun, Github } from 'lucide-react';

export function Footer() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) =>
    theme === "light" ? light : dark;
  const isDark = theme === "dark";

  return (
    <footer 
      className="nyc-footer-glow-line mt-auto text-center"
      style={{ paddingTop: 'var(--fib-5)', paddingBottom: 'var(--fib-5)' }}
    >
      {/* Theme Badge */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span 
          className={`
            inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
            ${th('bg-white/5 border border-white/10', 'bg-oklch(0.92 0 0) border border-oklch(0.85 0 0)')}
          `}
        >
          {isDark ? (
            <>
              <Moon className="w-3 h-3 text-[var(--nyc-taxi)]" />
              <span className={th('text-white/60', 'text-oklch(0.40 0 0)')}>Dark</span>
            </>
          ) : (
            <>
              <Sun className="w-3 h-3 text-[var(--nyc-subway)]" />
              <span className="text-oklch(0.40 0 0)">Light</span>
            </>
          )}
        </span>
      </div>

      {/* Main text */}
      <p className={`text-xs ${th("text-white/20", "text-oklch(0.70 0 0)")}`}>
        Z Code User Guide — Руководство пользователя
      </p>
      
      {/* Links */}
      <p className={`text-xs ${th("text-white/15", "text-oklch(0.75 0 0)")} mt-1`}>
        Документация Z.AI —{" "}
        <a
          href="https://docs.z.ai"
          target="_blank"
          rel="noopener"
          className="nyc-link-hover"
        >
          docs.z.ai
        </a>
        {" · "}
        <a
          href="https://zcode.z.ai"
          target="_blank"
          rel="noopener"
          className="nyc-link-hover"
        >
          zcode.z.ai
        </a>
      </p>

      {/* GitHub Icon */}
      <div className="mt-3">
        <a
          href="https://github.com/z-ai"
          target="_blank"
          rel="noopener"
          className={`
            inline-flex items-center justify-center w-8 h-8 rounded-lg
            ${th(
              'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10',
              'bg-oklch(0.94 0 0) hover:bg-oklch(0.90 0 0) border border-oklch(0.88 0 0)'
            )}
            transition-all duration-200
          `}
          title="GitHub"
        >
          <Github className={`w-4 h-4 ${th('text-white/40 hover:text-white/60', 'text-oklch(0.50 0 0) hover:text-oklch(0.30 0 0)')} transition-colors`} />
        </a>
      </div>
    </footer>
  );
}
