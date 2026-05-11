import {
  Home, Zap, Wrench, Monitor, Code2, Download, Server,
  CreditCard, Brain, AlertTriangle, BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TocItem {
  id: string;
  num: string;
  title: string;
  icon: LucideIcon;
  isPage?: boolean;
}

export const tocItems: TocItem[] = [
  { id: "hero", num: "00", title: "Z Code", icon: Home },
  { id: "quick-start", num: "01", title: "Быстрый старт", icon: Zap },
  { id: "helper", num: "02", title: "Coding Tool Helper", icon: Wrench },
  { id: "zcode-desktop", num: "03", title: "ZCode Desktop", icon: Monitor, isPage: true },
  { id: "tools", num: "04", title: "Инструменты", icon: Code2 },
  { id: "install", num: "05", title: "Установка", icon: Download },
  { id: "mcp", num: "06", title: "MCP-серверы", icon: Server },
  { id: "plan", num: "07", title: "GLM Coding Plan", icon: CreditCard },
  { id: "models", num: "08", title: "Модели GLM", icon: Brain },
  { id: "troubleshoot", num: "09", title: "Решение проблем", icon: AlertTriangle },
  { id: "sources", num: "10", title: "Источники", icon: BookOpen },
];
