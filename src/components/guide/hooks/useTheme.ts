"use client";

import { useState, useCallback, useEffect } from "react";

export type Theme = "dark" | "light";

function applyThemeToDOM(newTheme: Theme) {
  const root = document.documentElement;
  const body = document.body;

  root.classList.add("theme-transitioning");

  if (newTheme === "dark") {
    root.classList.add("dark");
    body.classList.remove("nyc-light-mode");
  } else {
    root.classList.remove("dark");
    body.classList.add("nyc-light-mode");
  }

  localStorage.setItem("z-guide-theme", newTheme);

  setTimeout(() => {
    root.classList.remove("theme-transitioning");
  }, 350);
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("z-guide-theme") as Theme) || "dark";
  });

  // Apply theme to DOM on mount
  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    applyThemeToDOM(newTheme);
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    applyThemeToDOM(next);
    setThemeState(next);
  }, [theme]);

  return { theme, setTheme, toggleTheme };
}
