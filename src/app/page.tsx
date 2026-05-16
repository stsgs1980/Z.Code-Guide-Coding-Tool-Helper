/**
 * MAIN PAGE
 * Uses the new anti-monolith architecture with phi-layout
 */

'use client';

import { ThemeProvider } from '@/providers/ThemeProvider';
import { usePageState } from '@/hooks/usePageState';
import {
  SidebarNav,
  MobileHeader,
  MobileMenu,
  ReadingProgress,
  ScrollToTop,
  SearchDialog,
  TableOfContents,
  Footer,
} from '@/features';
import {
  HeroSection,
  QuickStartSection,
  ToolsSection,
  InstallSection,
  McpSection,
  PlanSection,
  ModelsSection,
  TroubleshootSection,
  SourcesSection,
} from '@/sections';
import { useTheme } from '@/providers/ThemeProvider';

// Import subpages
import { CodingHelperSection } from '@/components/guide/sections/CodingHelperSection';
import { ZCodeSection } from '@/components/guide/sections/ZCodeSection';
import { SkillsGuideSection } from '@/components/guide/sections/SkillsGuideSection';
import { ZCodePromoCard } from '@/components/guide/features/ZCodePromoCard';
import { CodingHelperPromoCard } from '@/components/guide/features/CodingHelperPromoCard';

function GuideContent() {
  const {
    mobileMenuOpen,
    currentPage,
    setCurrentPage,
    setMobileMenuOpen,
    setSearchOpen,
    handleNavigate,
    handleBack,
  } = usePageState();
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === 'light' ? light : dark;

  return (
    <div className={`min-h-screen flex flex-col bg-background`}>
      <ReadingProgress />
      
      <SidebarNav
        onSearchOpen={() => setSearchOpen(true)}
        onNavigate={handleNavigate}
        onGoToGuide={handleBack}
        currentPage={currentPage === 'zcode' ? 'zcode' : currentPage === 'helper' ? 'helper' : currentPage === 'skills' ? 'skills' : undefined}
      />
      
      <SearchDialog />

      <MobileHeader
        currentPage={currentPage}
        mobileMenuOpen={mobileMenuOpen}
        onBack={handleBack}
        onToggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      <MobileMenu
        open={mobileMenuOpen}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onClose={() => setMobileMenuOpen(false)}
        onSetCurrentPage={setCurrentPage}
      />

      {/* Dashboard Layout with phi-grid */}
      <div className="flex-1 flex">
        {/* Main content area */}
        <main className="flex-1 md:ml-14 px-4 sm:px-6 lg:pr-64 pb-20 pt-14 md:pt-0">
          {currentPage === 'guide' && (
            <>
              <HeroSection />
              <QuickStartSection />
              <CodingHelperPromoCard onNavigate={() => handleNavigate('coding-helper')} />
              <ZCodePromoCard onNavigate={() => handleNavigate('zcode-desktop')} />
              <ToolsSection />
              <InstallSection />
              <McpSection />
              <PlanSection />
              <ModelsSection />
              <TroubleshootSection />
              <SourcesSection />
            </>
          )}

          {currentPage === 'helper' && (
            <CodingHelperSection onBack={handleBack} />
          )}

          {currentPage === 'skills' && (
            <SkillsGuideSection onBack={handleBack} />
          )}

          {currentPage === 'zcode' && (
            <ZCodeSection onBack={handleBack} />
          )}

          <Footer />
        </main>

        {/* Right sidebar - TOC (desktop only) */}
        <aside className="hidden xl:block fixed right-0 top-0 h-full w-64 pt-4 pr-4 overflow-y-auto">
          <TableOfContents 
            currentPage={currentPage} 
            onNavigate={handleNavigate}
            onGoToGuide={handleBack}
          />
        </aside>
      </div>

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
