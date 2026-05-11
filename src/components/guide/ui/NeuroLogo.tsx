"use client";

import { useTheme } from "../hooks/useTheme";

interface NeuroLogoProps {
  className?: string;
  variant?: "auto" | "dark" | "light";
  height?: number;
  showTagline?: boolean;
}

/**
 * NEURO brand logo component.
 * Automatically switches between dark/light variants based on the app theme.
 *
 * Variants available:
 * - auto: uses current app theme (default)
 * - dark: forces dark logo variant
 * - light: forces light logo variant
 *
 * Logo files are served from /logos/ directory with 7 variants:
 * light, dark, mono, mono-dark, outline, outline-dark, inverted
 */
export function NeuroLogo({
  className = "",
  variant = "auto",
  height = 32,
  showTagline = false,
}: NeuroLogoProps) {
  const { theme } = useTheme();

  // Resolve which logo variant to show
  let logoSrc: string;
  if (variant === "auto") {
    // Use outline variants for more visual interest, adapted to theme
    logoSrc = showTagline
      ? theme === "dark"
        ? "/logos/outline-dark.svg"
        : "/logos/outline.svg"
      : theme === "dark"
        ? "/logos/dark.svg"
        : "/logos/light.svg";
  } else if (variant === "dark") {
    logoSrc = showTagline ? "/logos/outline-dark.svg" : "/logos/dark.svg";
  } else {
    logoSrc = showTagline ? "/logos/outline.svg" : "/logos/light.svg";
  }

  return (
    <img
      src={logoSrc}
      alt="NEURO - Intelligence That Works For You"
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
