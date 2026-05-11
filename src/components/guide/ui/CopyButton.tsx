"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-md transition-colors ${
        copied
          ? "bg-green-500/20 text-green-400"
          : `${th('hover:bg-white/10', 'hover:bg-oklch(0.90 0 0)')} ${th('text-white/40', 'text-oklch(0.50 0 0)')} ${th('hover:text-white/70', 'hover:text-oklch(0.25 0 0)')}`
      } ${className}`}
      aria-label={copied ? "Скопировано" : "Копировать"}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}
