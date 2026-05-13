"use client";

import {
  HeroSection,
  QuickStartSection,
  CodingHelperSection,
  SkillsGuideSection,
  ZCodeSection,
  ToolsSection,
  InstallSection,
  McpSection,
  PlanSection,
  ModelsSection,
  TroubleshootSection,
  SourcesSection,
  SidebarNav,
  SearchDialog,
  ReadingProgress,
  ScrollToTop,
} from "@/components/guide";
import { MobileHeader } from "./MobileHeader";
import { MobileMenu } from "./MobileMenu";
import { Footer } from "./Footer";
import { ZCodePromoCard } from "./ZCodePromoCard";
import { CodingHelperPromoCard } from "./CodingHelperPromoCard";
import { usePageState } from "../hooks/usePageState";

export function GuideLayout() {
  const {
    mobileMenuOpen,
    currentPage,
    setCurrentPage,
    setMobileMenuOpen,
    setSearchOpen,
    handleNavigate,
    handleBack,
  } = usePageState();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ReadingProgress />
      <SidebarNav
        onSearchOpen={() => setSearchOpen(true)}
        onNavigate={handleNavigate}
        onGoToGuide={handleBack}
        currentPage={currentPage === "zcode" ? "zcode" : currentPage === "helper" ? "helper" : currentPage === "skills" ? "skills" : undefined}
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

      {currentPage === "guide" && (
        <>
          {/* Hero — full width */}
          <div className="md:ml-14 pt-14 md:pt-0">
            <HeroSection />
          </div>

          {/* Content sections */}
          <main className="md:ml-14 md:pr-18 lg:pr-18 w-full px-4 sm:px-6 pb-20 flex-1 break-words">
            <QuickStartSection />
            <CodingHelperPromoCard onNavigate={() => handleNavigate("coding-helper")} />
            <ZCodePromoCard onNavigate={() => handleNavigate("zcode-desktop")} />
            <ToolsSection />
            <InstallSection />
            <McpSection />
            <PlanSection />
            <ModelsSection />
            <TroubleshootSection />
            <SourcesSection />
            <Footer />
          </main>
        </>
      )}

      {currentPage === "helper" && (
        <main className="md:ml-14 md:pr-18 lg:pr-18 w-full px-4 sm:px-6 pb-20 flex-1 pt-14 md:pt-0 break-words">
          <CodingHelperSection onBack={handleBack} />
          <Footer />
        </main>
      )}

      {currentPage === "skills" && (
        <main className="md:ml-14 md:pr-18 lg:pr-18 w-full px-4 sm:px-6 pb-20 flex-1 pt-14 md:pt-0 break-words">
          <SkillsGuideSection onBack={handleBack} />
          <Footer />
        </main>
      )}

      {currentPage === "zcode" && (
        <main className="md:ml-14 md:pr-18 lg:pr-18 w-full px-4 sm:px-6 pb-20 flex-1 pt-14 md:pt-0 break-words">
          <ZCodeSection onBack={handleBack} />
          <Footer />
        </main>
      )}

      <ScrollToTop />
    </div>
  );
}
