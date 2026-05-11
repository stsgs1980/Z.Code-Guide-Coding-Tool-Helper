"use client";

import { useState } from "react";
import {
  HeroSection,
  QuickStartSection,
  HelperSection,
  ZCodeSection,
  ToolsSection,
  InstallSection,
  McpSection,
  PlanSection,
  ModelsSection,
  ExamplesSection,
  TroubleshootSection,
  SourcesSection,
  SidebarNav,
  SearchDialog,
  ReadingProgress,
  ScrollToTop,
} from "@/components/guide";
import { ThemeToggle } from "@/components/guide/features/ThemeToggle";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/components/guide/hooks/useActiveSection";
import { useTheme, ThemeProvider } from "@/components/guide/hooks/useTheme";
import { tocItems } from "@/components/guide/data/toc";
import { AnimatePresence, motion } from "framer-motion";

function GuideContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const activeId = useActiveSection();
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ReadingProgress />
      <SidebarNav onSearchOpen={() => setSearchOpen(true)} />
      <SearchDialog />

      {/* Mobile header */}
      <header className={`md:hidden fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-sm border-b px-4 py-3 flex items-center justify-between ${th('border-white/5', 'border-oklch(0.88 0 0)')}`}>
        <span className="font-bold text-sm nyc-gradient-text">Z Code</span>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg ${th('hover:bg-white/5', 'hover:bg-oklch(0.90 0 0)')}`}
            aria-label="Меню"
          >
            {mobileMenuOpen ? (
              <X className={`h-5 w-5 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`} />
            ) : (
              <Menu className={`h-5 w-5 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-background/95 backdrop-blur-md border-r pt-16 ${th('border-white/5', 'border-oklch(0.88 0 0)')}`}
          >
            <nav className="p-4 space-y-1">
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeId === item.id
                      ? `${th('bg-white/5', 'bg-oklch(0.90 0 0)')} text-nyc-taxi`
                      : `${th('text-white/50', 'text-oklch(0.40 0 0)')} ${th('hover:bg-white/5', 'hover:bg-oklch(0.90 0 0)')} ${th('hover:text-white/70', 'hover:text-oklch(0.25 0 0)')}`
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero — full width */}
      <div className="md:ml-14 pt-14 md:pt-0">
        <HeroSection />
      </div>

      {/* Content sections */}
      <main className="md:ml-14 md:pr-16 lg:pr-16 w-full px-4 sm:px-6 pb-20 flex-1 break-words">
        <QuickStartSection />
        <HelperSection />
        <ZCodeSection />
        <ToolsSection />
        <InstallSection />
        <McpSection />
        <PlanSection />
        <ModelsSection />
        <ExamplesSection />
        <TroubleshootSection />
        <SourcesSection />

        {/* Footer */}
        <footer className="nyc-footer-glow-line mt-auto pt-8 pb-8 text-center">
          <p className={`text-xs ${th('text-white/20', 'text-oklch(0.70 0 0)')}`}>
            Z Code User Guide — Руководство пользователя
          </p>
          <p className={`text-xs ${th('text-white/15', 'text-oklch(0.75 0 0)')} mt-1`}>
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
        </footer>
      </main>

      <ScrollToTop />
    </div>
  );
}

export default function GuidePage() {
  return (
    <ThemeProvider>
      <GuideContent />
    </ThemeProvider>
  );
}
