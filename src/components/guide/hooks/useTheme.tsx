"use client";

import { useState, useCallback, useEffect, createContext, useContext, type ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  toggleTheme: () => {},
});

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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("z-guide-theme") as Theme) || "dark";
  });

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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
