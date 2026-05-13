"use client";

import { ThemeProvider } from "@/components/guide/hooks/useTheme";
import { GuideLayout } from "@/components/guide/features/GuideLayout";

export default function GuidePage() {
  return (
    <ThemeProvider>
      <GuideLayout />
    </ThemeProvider>
  );
}
