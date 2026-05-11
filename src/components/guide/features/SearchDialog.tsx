"use client";

import { useSearch } from "../hooks/useSearch";
import { useTheme } from "../hooks/useTheme";
import { Search, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

export function SearchDialog() {
  const { query, setQuery, isOpen, openSearch, closeSearch, results, navigateToResult } = useSearch();
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) closeSearch();
        else openSearch();
      }
      if (e.key === "Escape" && isOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openSearch, closeSearch]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 backdrop-blur-sm ${th('bg-black/60', 'bg-oklch(0 0 0 / 40%)')}`}
            onClick={closeSearch}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-lg"
          >
            <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-white shadow-lg')} overflow-hidden`}>
              <div className={`flex items-center gap-3 px-4 py-3 border-b ${th('border-white/5', 'border-oklch(0.88 0 0)')}`}>
                <Search className="h-4 w-4 text-nyc-taxi flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Поиск по руководству..."
                  className={`flex-1 bg-transparent text-sm outline-none ${th('placeholder:text-white/30', 'placeholder:text-oklch(0.60 0 0)')}`}
                />
                <button onClick={closeSearch} className={`${th('text-white/30', 'text-oklch(0.60 0 0)')} ${th('hover:text-white/60', 'hover:text-oklch(0.35 0 0)')}`}>
                  <X className="h-4 w-4" />
                </button>
              </div>
              {results.length > 0 && (
                <div className="max-h-80 overflow-y-auto p-2">
                  {results.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => navigateToResult(result.sectionId)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center gap-3 group ${th('hover:bg-white/5', 'hover:bg-oklch(0.90 0 0)')}`}
                    >
                      <ArrowRight className="h-3 w-3 text-nyc-taxi flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{result.title}</div>
                        <div className={`text-xs truncate ${th('text-white/30', 'text-oklch(0.60 0 0)')}`}>{result.snippet}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {query && results.length === 0 && (
                <div className={`px-4 py-8 text-center text-sm ${th('text-white/30', 'text-oklch(0.60 0 0)')}`}>
                  Ничего не найдено
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
