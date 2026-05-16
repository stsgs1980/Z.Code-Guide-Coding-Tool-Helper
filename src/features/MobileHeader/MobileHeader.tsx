/**
 * FEATURES LAYER
 * MobileHeader - mobile navigation header
 * 
 * Anti-monolith: may have state, uses providers
 */

'use client';

import { Menu, X, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '@/features/ThemeToggle';
import { useTheme } from '@/providers/ThemeProvider';
import type { PageType } from '@/hooks/usePageState';

interface MobileHeaderProps {
  currentPage: PageType;
  mobileMenuOpen: boolean;
  onBack: () => void;
  onToggleMenu: () => void;
}

export function MobileHeader({
  currentPage,
  mobileMenuOpen,
  onBack,
  onToggleMenu,
}: MobileHeaderProps) {
  const { theme } = useTheme();
  const th = (dark: string, light: string) =>
    theme === 'light' ? light : dark;

  return (
    <header
      className={`md:hidden fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b px-4 py-3 flex items-center justify-between ${th('border-white/5', 'border-oklch(0.88 0 0)')}`}
    >
      <div className="flex items-center gap-2">
        {currentPage === 'zcode' || currentPage === 'helper' || currentPage === 'skills' ? (
          <button
            onClick={onBack}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${th('text-white/60 hover:text-nyc-taxi', 'text-oklch(0.35 0 0) hover:text-oklch(0.78 0.16 85)')} group`}
            aria-label="Назад к руководству"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Назад</span>
          </button>
        ) : (
          <span className="font-bold text-sm nyc-gradient-text">Z Code</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          onClick={onToggleMenu}
          className={`p-2 rounded-lg ${th('hover:bg-white/5', 'hover:bg-oklch(0.90 0 0)')}`}
          aria-label="Меню"
        >
          {mobileMenuOpen ? (
            <X
              className={`h-5 w-5 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}
            />
          ) : (
            <Menu
              className={`h-5 w-5 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}
            />
          )}
        </button>
      </div>
    </header>
  );
}
