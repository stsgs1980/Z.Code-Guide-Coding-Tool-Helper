"use client";

import { useState, useEffect, useCallback } from "react";

export type PageType = "guide" | "zcode" | "helper" | "skills";

export interface PageState {
  mobileMenuOpen: boolean;
  searchOpen: boolean;
  currentPage: PageType;
  setMobileMenuOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setCurrentPage: (page: PageType) => void;
  handleNavigate: (page: string) => void;
  handleBack: () => void;
}

export function usePageState(): PageState {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>("guide");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [currentPage]);

  const handleNavigate = useCallback((page: string) => {
    if (page === "zcode-desktop") {
      setCurrentPage("zcode");
      setMobileMenuOpen(false);
    } else if (page === "coding-helper") {
      setCurrentPage("helper");
      setMobileMenuOpen(false);
    } else if (page === "skills-guide") {
      setCurrentPage("skills");
      setMobileMenuOpen(false);
    }
  }, []);

  const handleBack = useCallback(() => {
    setCurrentPage("guide");
  }, []);

  return {
    mobileMenuOpen,
    searchOpen,
    currentPage,
    setMobileMenuOpen,
    setSearchOpen,
    setCurrentPage,
    handleNavigate,
    handleBack,
  };
}
