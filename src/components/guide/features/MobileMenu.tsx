"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useActiveSection } from "../hooks/useActiveSection";
import { tocItems } from "../data/toc";
import type { PageType } from "../hooks/usePageState";

interface MobileMenuProps {
  open: boolean;
  currentPage: PageType;
  onNavigate: (page: string) => void;
  onClose: () => void;
  onSetCurrentPage: (page: PageType) => void;
}

export function MobileMenu({
  open,
  currentPage,
  onNavigate,
  onClose,
  onSetCurrentPage,
}: MobileMenuProps) {
  const { theme } = useTheme();
  const activeId = useActiveSection();
  const th = (dark: string, light: string) =>
    theme === "light" ? light : dark;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-background/95 backdrop-blur-md border-r pt-16 ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        >
          <nav className="p-4 space-y-1">
            {tocItems.map((item) => {
              const isPageItem = item.isPage;
              const isActive = isPageItem
                ? (item.id === "zcode-desktop" && currentPage === "zcode") ||
                  (item.id === "coding-helper" && currentPage === "helper") ||
                  (item.id === "skills-guide" && currentPage === "skills")
                : activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (isPageItem) {
                      onNavigate(item.id);
                    } else {
                      if (currentPage !== "guide") {
                        onSetCurrentPage("guide");
                        setTimeout(() => {
                          const el = document.getElementById(item.id);
                          if (el) {
                            const offset = 56;
                            const y =
                              el.getBoundingClientRect().top +
                              window.scrollY -
                              offset;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }
                        }, 100);
                      } else {
                        const el = document.getElementById(item.id);
                        if (el) {
                          const offset = 56;
                          const y =
                            el.getBoundingClientRect().top +
                            window.scrollY -
                            offset;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }
                      onClose();
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                    isActive
                      ? `${th("bg-white/5", "bg-oklch(0.90 0 0)")} text-nyc-taxi`
                      : `${th("text-white/50", "text-oklch(0.40 0 0)")} ${th("hover:bg-white/5", "hover:bg-oklch(0.90 0 0)")} ${th("hover:text-white/70", "hover:text-oklch(0.25 0 0)")}`
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                  {isPageItem && (
                    <span
                      className={`ml-auto text-[10px] px-1.5 py-0.5 rounded ${th("bg-white/5 text-white/30", "bg-oklch(0.90 0 0) text-oklch(0.50 0 0)")}`}
                    >
                      →
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
