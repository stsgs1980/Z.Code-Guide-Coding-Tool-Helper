/**
 * FEATURES LAYER
 * TableOfContents - right sidebar table of contents
 * 
 * Anti-monolith: may have state, uses hooks and providers
 */

'use client';

import { useActiveSection } from '@/hooks/useActiveSection';
import { useTheme } from '@/providers/ThemeProvider';
import { tocItems } from '@/data/toc';

interface TableOfContentsProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
  onGoToGuide?: () => void;
}

export function TableOfContents({ currentPage, onNavigate, onGoToGuide }: TableOfContentsProps) {
  const activeId = useActiveSection();
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === 'light' ? light : dark;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = window.innerWidth < 768 ? 56 : 0;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Filter items based on current page
  const filteredItems = tocItems.filter((item) => {
    if (currentPage === 'guide') {
      return !item.isPage;
    }
    return true; // Show all for subpages
  });

  return (
    <nav className="hidden lg:block">
      <div className={`sticky top-24 p-4 rounded-lg ${th('bg-white/[0.02]', 'bg-oklch(0.97 0 0)')}`}>
        <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
          Содержание
        </h3>
        <ul className="space-y-1">
          {filteredItems.map((item) => {
            const isActive = item.isPage
              ? (item.id === 'zcode-desktop' && currentPage === 'zcode') || 
                (item.id === 'coding-helper' && currentPage === 'helper') || 
                (item.id === 'skills-guide' && currentPage === 'skills')
              : activeId === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    if (item.isPage && onNavigate) {
                      onNavigate(item.id);
                    } else if (currentPage !== 'guide' && onGoToGuide) {
                      onGoToGuide();
                      setTimeout(() => scrollTo(item.id), 150);
                    } else {
                      scrollTo(item.id);
                    }
                  }}
                  className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
                    isActive
                      ? `text-nyc-taxi ${th('bg-white/5', 'bg-oklch(0.90 0 0)')}`
                      : `${th('text-white/50 hover:text-white/70', 'text-oklch(0.40 0 0) hover:text-oklch(0.25 0 0)')} ${th('hover:bg-white/5', 'hover:bg-oklch(0.93 0 0)')}`
                  }`}
                >
                  <span className="text-xs opacity-50 mr-2">{item.num}</span>
                  {item.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
