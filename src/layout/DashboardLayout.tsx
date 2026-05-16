/**
 * LAYOUT LAYER
 * DashboardLayout - main layout with phi-grid (3fr 5fr 2fr)
 * 
 * Anti-monolith: layout only, uses features and hooks
 * Phi-layout: Dashboard Golden pattern
 */

'use client';

import { usePageState } from '@/hooks/usePageState';
import { SidebarNav, MobileHeader, MobileMenu, ReadingProgress, ScrollToTop, SearchDialog, TableOfContents, Footer } from '@/features';
import { useTheme } from '@/providers/ThemeProvider';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: string;
  heroSlot?: ReactNode;
  tocSlot?: ReactNode;
  quickLinksSlot?: ReactNode;
}

export function DashboardLayout({
  children,
  currentPage,
  heroSlot,
  tocSlot,
  quickLinksSlot,
}: DashboardLayoutProps) {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === 'light' ? light : dark;

  return (
    <div className={`min-h-screen flex flex-col bg-background ${th('dark', 'light')}`}>
      {/* Reading progress bar */}
      <ReadingProgress />

      {/* Left sidebar - icon navigation */}
      <SidebarNav
        onSearchOpen={() => {}}
        currentPage={currentPage}
      />

      {/* Search dialog */}
      <SearchDialog />

      {/* Mobile header and menu */}
      <MobileHeader
        currentPage={currentPage as any}
        mobileMenuOpen={false}
        onBack={() => {}}
        onToggleMenu={() => {}}
      />

      {/* Main dashboard grid - Phi layout */}
      <div className="dashboard-layout flex-1">
        {/* Hero banner - spans all columns */}
        {heroSlot && (
          <div className="hero-banner col-span-full">
            {heroSlot}
          </div>
        )}

        {/* Main content area */}
        <main className="main-content flex-1 md:ml-14 px-4 sm:px-6 pb-20">
          {children}
          <Footer />
        </main>

        {/* Right sidebar - TOC and quick links */}
        <aside className="toc-sidebar hidden xl:block w-64 shrink-0 pr-4 pt-4">
          {tocSlot || <TableOfContents currentPage={currentPage} />}
          {quickLinksSlot && (
            <div className="quick-links mt-6">
              {quickLinksSlot}
            </div>
          )}
        </aside>
      </div>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}
