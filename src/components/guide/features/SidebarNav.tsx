"use client";

import { useActiveSection } from "../hooks/useActiveSection";
import { useTheme } from "../hooks/useTheme";
import { tocItems } from "../data/toc";
import { ThemeToggle } from "./ThemeToggle";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarNavProps {
  onSearchOpen: () => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
}

export function SidebarNav({ onSearchOpen, onNavigate, currentPage }: SidebarNavProps) {
  const activeId = useActiveSection();
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = window.innerWidth < 768 ? 56 : 0;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className={`hidden md:flex flex-col items-center gap-1 py-4 px-2 fixed left-0 top-0 h-full z-40 w-14 bg-background/80 backdrop-blur-sm border-r ${th('border-white/5', 'border-oklch(0.88 0 0)')}`}>
      <button
        onClick={onSearchOpen}
        className={`p-2 rounded-lg transition-colors group mb-2 ${th('hover:bg-white/5', 'hover:bg-oklch(0.90 0 0)')}`}
        aria-label="Поиск"
      >
        <Search className={`h-4 w-4 group-hover:text-nyc-taxi transition-colors ${th('text-white/50', 'text-oklch(0.40 0 0)')}`} />
      </button>

      {tocItems.map((item) => {
        const isActive = item.isPage ? currentPage === item.id : activeId === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              if (item.isPage && onNavigate) {
                onNavigate(item.id);
              } else {
                scrollTo(item.id);
              }
            }}
            className={`relative p-2 rounded-lg transition-all group ${
              isActive
                ? `${th('bg-white/5', 'bg-oklch(0.90 0 0)')} text-nyc-taxi`
                : `${th('text-white/30', 'text-oklch(0.60 0 0)')} ${th('hover:bg-white/5', 'hover:bg-oklch(0.90 0 0)')} ${th('hover:text-white/60', 'hover:text-oklch(0.35 0 0)')}`
            }`}
            aria-label={item.title}
            title={item.title}
          >
            {isActive && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-nyc-taxi rounded-r"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <item.icon className="h-4 w-4" />
          </button>
        );
      })}

      <div className="mt-auto">
        <ThemeToggle />
      </div>
    </nav>
  );
}
