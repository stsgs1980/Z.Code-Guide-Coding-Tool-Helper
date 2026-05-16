/**
 * DATA LAYER
 * Table of Contents data
 * 
 * Anti-monolith: pure data, no logic, no UI
 */

import {
  Home, Zap, Wrench, Monitor, Code2, Download, Server,
  CreditCard, Brain, AlertTriangle, BookOpen, Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface TocItem {
  id: string;
  num: string;
  title: string;
  icon: LucideIcon;
  isPage?: boolean;
}

export const tocItems: TocItem[] = [
  { id: 'hero', num: '00', title: 'Z Code', icon: Home },
  { id: 'quick-start', num: '01', title: 'Быстрый старт', icon: Zap },
  { id: 'coding-helper', num: '02', title: 'Coding Tool Helper', icon: Wrench, isPage: true },
  { id: 'zcode-desktop', num: '03', title: 'ZCode Desktop', icon: Monitor, isPage: true },
  { id: 'skills-guide', num: '04', title: 'Skills — Шпаргалка', icon: Sparkles, isPage: true },
  { id: 'tools', num: '05', title: 'Инструменты', icon: Code2 },
  { id: 'install', num: '06', title: 'Установка', icon: Download },
  { id: 'mcp', num: '07', title: 'MCP-серверы', icon: Server },
  { id: 'plan', num: '08', title: 'GLM Coding Plan', icon: CreditCard },
  { id: 'models', num: '09', title: 'Модели GLM', icon: Brain },
  { id: 'troubleshoot', num: '10', title: 'Решение проблем', icon: AlertTriangle },
  { id: 'sources', num: '11', title: 'Источники', icon: BookOpen },
];
