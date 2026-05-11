import {
  Home, Zap, Wrench, Code2, Download, Server,
  CreditCard, Brain, Lightbulb, AlertTriangle, BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface TocItem {
  id: string;
  num: string;
  title: string;
  icon: LucideIcon;
}

export const tocItems: TocItem[] = [
  { id: "hero", num: "00", title: "Z Code", icon: Home },
  { id: "quick-start", num: "01", title: "Быстрый старт", icon: Zap },
  { id: "helper", num: "02", title: "Coding Tool Helper", icon: Wrench },
  { id: "tools", num: "03", title: "Инструменты", icon: Code2 },
  { id: "install", num: "04", title: "Установка", icon: Download },
  { id: "mcp", num: "05", title: "MCP-серверы", icon: Server },
  { id: "plan", num: "06", title: "GLM Coding Plan", icon: CreditCard },
  { id: "models", num: "07", title: "Модели GLM", icon: Brain },
  { id: "examples", num: "08", title: "Примеры", icon: Lightbulb },
  { id: "troubleshoot", num: "09", title: "Решение проблем", icon: AlertTriangle },
  { id: "sources", num: "10", title: "Источники", icon: BookOpen },
];
