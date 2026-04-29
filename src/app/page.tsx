'use client'

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  Terminal,
  Copy,
  Check,
  ChevronDown,
  Zap,
  DollarSign,
  Settings,
  BookOpen,
  AlertTriangle,
  Box,
  Cpu,
  Globe,
  Key,
  Layers,
  Wrench,
  ArrowRight,
  ExternalLink,
  Monitor,
  Shield,
  Clock,
  Users,
  Sparkles,
  Database,
  FileCode,
  Search,
  Eye,
  MessageSquare,
  CheckCircle2,
  Circle,
  Menu,
  X,
  ArrowUp,
  Hash,
  Rocket,
  Building2,
  Cable,
  Compass,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  ClipboardList,
  List,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import CommandCenter from '@/components/CommandCenter'
import type { SectionConfig } from '@/components/command-center-types'

/* ───────────────────── DATA ───────────────────── */

const TOC_ITEMS = [
  { id: 'hero', label: '00', title: 'Обзор', icon: Rocket },
  { id: 'matrix', label: '01', title: 'Матрица инструментов', icon: Layers },
  { id: 'platforms', label: '02', title: 'Платформы', icon: Building2 },
  { id: 'helper', label: '03', title: 'Coding Tool Helper', icon: Settings },
  { id: 'stagewise', label: '04', title: 'Stagewise', icon: Eye },
  { id: 'install', label: '05', title: 'Установка', icon: Terminal },
  { id: 'mcp', label: '06', title: 'MCP-серверы', icon: Cable },
  { id: 'prompts', label: '07', title: 'Промпт-шаблоны', icon: Sparkles },
  { id: 'cost', label: '08', title: 'Стоимость', icon: DollarSign },
  { id: 'wizard', label: '08.5', title: 'Мастер плана', icon: Zap },
  { id: 'troubleshoot', label: '09', title: 'Диагностика', icon: AlertTriangle },
  { id: 'faq', label: '09.5', title: 'FAQ', icon: MessageSquare },
  { id: 'architecture', label: '10', title: 'Архитектура', icon: Cpu },
  { id: 'checklist', label: '11', title: 'Чек-лист', icon: CheckCircle2 },
]

const TOOLS = [
  { name: '21st.dev Magic', type: 'MCP Server', price: 'Free / $20/мес', mcp: true, desc: 'React компоненты через AI', color: '#FF6B6B' },
  { name: 'Stitch MCP', type: 'CLI + MCP', price: 'Free (350 gen/мес)', mcp: true, desc: 'Full-page дизайн из промпта', color: '#4ECDC4' },
  { name: 'UI UX Pro Max', type: 'AI Skill', price: 'Free (OSS)', mcp: false, desc: 'Design рекомендации', color: '#45B7D1' },
  { name: 'v0.dev', type: 'Web SaaS', price: '$5 credit/мес', mcp: false, desc: 'shadcn/ui генерация', color: '#96CEB4' },
  { name: 'Z.AI Coding Helper', type: 'CLI Tool', price: 'Free', mcp: false, desc: 'Автоматизация настройки', color: '#FFC107' },
  { name: 'OpenCode CLI', type: 'AI Agent', price: 'Free + API', mcp: true, desc: 'Терминальный AI-агент', color: '#DDA0DD' },
  { name: 'Stagewise', type: 'Desktop', price: 'Free', mcp: false, desc: 'AI-браузер для веб-разработки', color: '#98D8C8' },
]

const PLATFORMS = [
  { name: 'OpenCode CLI', desc: 'Терминальный AI-агент', features: ['95K+ GitHub stars', 'MCP Native', '75+ LLM'], icon: Terminal },
  { name: 'Coding Tool Helper', desc: 'Мастер настройки', features: ['npx @z_ai/coding-helper', 'GLM Coding Plan'], icon: Settings },
  { name: 'chat.z.ai', desc: 'Веб-чат', features: ['Без установки', 'MCP совместимость'], icon: MessageSquare },
  { name: 'zcode.z.ai', desc: 'Web IDE', features: ['Full IDE', 'Git поддержка', 'MCP интеграция'], icon: FileCode },
  { name: 'Stagewise', desc: 'AI Browser', features: ['Electron + React 19', 'Визуальный контекст'], icon: Eye },
]

const HELPER_COMMANDS = [
  { cmd: 'coding-helper init', desc: 'Запуск мастера настройки' },
  { cmd: 'coding-helper lang show/set', desc: 'Управление языком интерфейса' },
  { cmd: 'coding-helper auth', desc: 'Интерактивный ввод API-ключа' },
  { cmd: 'coding-helper auth glm_coding_plan_global <token>', desc: 'Прямая установка ключа' },
  { cmd: 'coding-helper auth revoke', desc: 'Удаление сохраненного ключа' },
  { cmd: 'coding-helper auth reload claude', desc: 'Перезагрузка информации о плане' },
  { cmd: 'coding-helper doctor', desc: 'Проверка системной конфигурации' },
]

const GLM_MODELS = [
  { name: 'GLM-4.5-Air', tier: 'Haiku', use: 'Быстрые задачи, автодополнение', speed: 95 },
  { name: 'GLM-4.7', tier: 'Sonnet', use: 'Основная разработка, кодинг', speed: 70 },
  { name: 'GLM-4.7', tier: 'Opus', use: 'Сложные задачи, архитектура', speed: 40 },
]

const PLAN_LIMITS = [
  { plan: 'Lite', fiveHour: '~80 промптов', weekly: '~400 промптов', price: '$18/мес', pct: 10 },
  { plan: 'Pro', fiveHour: '~400 промптов', weekly: '~2000 промптов', price: '$38/мес', pct: 50 },
  { plan: 'Max', fiveHour: '~1600 промптов', weekly: '~8000 промптов', price: '$98/мес', pct: 100 },
]

const MCP_SERVERS = [
  { name: 'Web Search MCP', tool: 'webSearchPrime', desc: 'Поиск веб-информации', icon: Search, port: 3001 },
  { name: 'Vision MCP', tool: 'vision', desc: 'Анализ изображений и скриншотов', icon: Eye, port: 3002 },
  { name: 'Web Reader MCP', tool: 'read', desc: 'Чтение содержимого веб-страниц', icon: BookOpen, port: 3003 },
  { name: 'Zread MCP', tool: 'search_doc, search_code, read_file', desc: 'Поиск по репозиторию', icon: FileCode, port: 3004 },
]

const PROMPT_TEMPLATES = [
  {
    category: 'Генерация компонентов (Magic)',
    prompt: '/ui create a modern [component name] with [features].\nStyle: shadcn/ui, dark mode, responsive.',
    icon: Sparkles,
  },
  {
    category: 'Дизайн страниц (Stitch)',
    prompt: 'Use stitch MCP to design a [page type] for [product description]:\n- Sections: [list sections]\n- Style: [style reference]\n- Colors: [palette preference]\nAfter design, convert to React components.',
    icon: Layers,
  },
  {
    category: 'Design рекомендации (UI UX Pro Max)',
    prompt: 'Check ui-ux-pro-max skill and recommend:\n1. Color palette for [industry] product\n2. Font pairings\n3. UI style direction\nRequirements: WCAG AA, dark mode, mobile-first.',
    icon: Monitor,
  },
]

const READY_PROMPTS = [
  { cat: 'Landing', prompt: 'Generate a SaaS landing page with hero section, features grid, testimonials and pricing table' },
  { cat: 'Dashboard', prompt: 'Create a modern analytics dashboard with sidebar navigation, stat cards, charts and data table' },
  { cat: 'Components', prompt: '/ui create glassmorphism pricing cards with 3 tiers: Free, Pro, Enterprise' },
  { cat: 'Navigation', prompt: '/ui build responsive navbar with logo, navigation links, search and mobile menu' },
]

const COST_SCENARIOS = [
  { name: 'Free Stack', price: '$0/мес', tools: 'OpenCode + Ollama (local) + Stitch (free) + v0.dev free', keys: 'None (или только free tiers)', purpose: 'Прототипирование, обучение, личные проекты', pct: 0, emoji: '🆓' },
  { name: 'Budget', price: '$18-20/мес', tools: 'OpenCode/Cline + GLM Coding Plan Lite + Stitch (free)', keys: 'Z.AI API Key', purpose: 'Регулярная разработка, фриланс', pct: 25, emoji: '💡' },
  { name: 'Professional', price: '$38-60/мес', tools: 'Cursor/Cline + GLM Pro ($38) или Claude + Magic Pro ($20) + Stitch', keys: 'Z.AI или Anthropic + 21st.dev Magic', purpose: 'Коммерческие проекты, высокая продуктивность', pct: 55, emoji: '⚡' },
  { name: 'Team/Enterprise', price: '$100+/мес', tools: 'Z Code / Cursor Team + GLM Max ($98) + все MCP серверы', keys: 'Все вышеперечисленные', purpose: 'Команды, enterprise, production workloads', pct: 100, emoji: '🏢' },
]

const ERRORS = [
  { error: 'EACCES: permission denied', cause: 'Global npm install без sudo', fix: 'Использовать sudo или npx без установки' },
  { error: 'MCP connection failed', cause: 'Неверный путь конфигурации', fix: 'Проверить ~/.config/opencode/config.json' },
  { error: 'Stitch auth error', cause: 'Истекший OAuth токен', fix: 'Re-run: npx @_davideast/stitch-mcp init' },
  { error: 'Magic API key invalid', cause: 'Неверный ключ', fix: 'Регенерировать на 21st.dev/magic console' },
  { error: 'Skill not found', cause: 'Не установлен', fix: 'npx skills add ... --global' },
  { error: 'Network error', cause: 'Требуется прокси', fix: 'Установить HTTP_PROXY и HTTPS_PROXY' },
  { error: 'Model not found', cause: 'Неверное имя модели', fix: 'Проверить поддерживаемые модели провайдера' },
]

const CHECKLIST_ITEMS = [
  { id: 'node', label: 'Node.js 18+ установлен', icon: Box },
  { id: 'opencode', label: 'OpenCode установлен', icon: Terminal },
  { id: 'stitch', label: 'Stitch MCP инициализирован', icon: Cable },
  { id: 'config', label: 'Config файл создан', icon: FileCode },
  { id: 'apikeys', label: 'API ключи настроены', icon: Key },
  { id: 'helper', label: 'Coding Tool Helper запущен', icon: Settings },
  { id: 'plan', label: 'GLM Coding Plan выбран', icon: Shield },
  { id: 'shadcn', label: 'shadcn/ui добавлены', icon: Layers },
]

const FAQ_ITEMS = [
  { q: 'Нужен ли платный аккаунт для начала работы?', a: 'Нет. Вы можете использовать бесплатный стек: OpenCode + Ollama (локальный LLM) + Stitch (free tier) + v0.dev free. Платные планы нужны только для продакшн-использования.' },
  { q: 'Чем отличается Coding Tool Helper от OpenCode?', a: 'Coding Tool Helper — это мастер настройки (CLI), который автоматизирует конфигурацию инструментов. OpenCode — терминальный AI-агент для написания кода. Они работают вместе: Helper настраивает, OpenCode выполняет.' },
  { q: 'Что такое MCP и зачем он нужен?', a: 'Model Context Protocol (MCP) — стандарт подключения внешних инструментов к AI-агентам. MCP-серверы расширяют возможности: поиск в интернете, анализ изображений, чтение веб-страниц.' },
  { q: 'Можно ли использовать локальные модели?', a: 'Да! Через Ollama можно запускать модели локально (Llama 3, Mistral, Qwen). Это бесплатно, но требует 8+ GB RAM. Coding Tool Helper поддерживает настройку локальных моделей.' },
  { q: 'Как сбросить конфигурацию при ошибках?', a: 'Запустите: coding-helper auth revoke для удаления API-ключей, затем coding-helper init для повторной настройки. Также проверьте coding-helper doctor для диагностики.' },
  { q: 'Совместим ли Stagewise с VS Code?', a: 'Stagewise — отдельный Electron-браузер, но интегрируется с VS Code через MCP. Вы можете использовать Stagewise для визуального контекста параллельно с разработкой в VS Code + Cline.' },
]

const SOURCES = [
  { id: 'S1', url: 'https://www.npmjs.com/package/@z_ai/coding-helper', desc: 'NPM Package' },
  { id: 'S2', url: 'https://docs.z.ai/devpack/extension/coding-tool-helper', desc: 'Coding Tool Helper Docs' },
  { id: 'S3', url: 'https://docs.z.ai/devpack/quick-start', desc: 'Quick Start Guide' },
  { id: 'S4', url: 'https://docs.z.ai/devpack/tool/others', desc: 'Other Tools' },
  { id: 'S5', url: 'https://docs.z.ai/devpack/overview', desc: 'DevPack Overview' },
  { id: 'S6', url: 'https://docs.z.ai/scenario-example/develop-tools/claude', desc: 'Claude Integration' },
  { id: 'S7', url: 'https://docs.z.ai/devpack/extension/usage-query-plugin', desc: 'Usage Query Plugin' },
  { id: 'S8', url: 'https://github.com/zai-org/zai-coding-plugins', desc: 'ZAI Coding Plugins' },
  { id: 'S9', url: 'https://docs.z.ai/devpack/extension/usage-query-plugin', desc: 'Usage Query Plugin' },
  { id: 'S10', url: 'https://www.reddit.com/r/ZaiGLM/comments/1ron472/ensuring_the_model_in_claude_code_cli_w_zai', desc: 'Reddit Discussion' },
  { id: 'S11', url: 'https://docs.z.ai/devpack/tool/others', desc: 'Manual Setup Instructions' },
  { id: 'S12', url: 'https://docs.z.ai/devpack/mcp/search-mcp-server', desc: 'Search MCP Server' },
  { id: 'S13', url: 'https://docs.z.ai/devpack/mcp/vision-mcp-server', desc: 'Vision MCP Server' },
  { id: 'S14', url: 'https://docs.z.ai/devpack/mcp/reader-mcp-server', desc: 'Reader MCP Server' },
  { id: 'S15', url: 'https://jpcaparas.medium.com/search-vs-reader-vs-zread-a-claude-code-guide-to-z-ai-mcp-servers-134cece1ad96', desc: 'MCP Servers Guide' },
  { id: 'S16', url: 'https://docs.z.ai/devpack/quick-start', desc: 'Setup Methods' },
  { id: 'S17', url: 'https://docs.z.ai/devpack/resources/best-practice', desc: 'Best Practices' },
  { id: 'S18', url: 'https://github.com/zai-org', desc: 'ZAI Organization' },
  { id: 'S19', url: 'https://docs.z.ai/', desc: 'Z.AI Documentation' },
  { id: 'S20', url: 'https://docs.z.ai/devpack/using5.1', desc: 'Using GLM-5.1' },
  { id: 'S21', url: 'https://stagewise.io', desc: 'Stagewise Official Site' },
  { id: 'S22', url: 'https://docs.stagewise.io', desc: 'Stagewise Documentation' },
  { id: 'S23', url: 'https://github.com/stagewise-io/stagewise', desc: 'Stagewise GitHub' },
  { id: 'S24', url: 'https://www.npmjs.com/package/@stagewise/agent-interface', desc: 'Stagewise Agent Interface' },
]

/* ───────────────────── COMMAND CENTER SECTIONS ───────────────────── */

const CC_SECTIONS: SectionConfig[] = [
  {
    id: 'tools',
    label: 'TOOLS',
    icon: Wrench,
    accent: '#FFC107',
    items: [
      { id: 'cc-opencode', label: 'OpenCode CLI', icon: Terminal, content: <div className="p-5"><h3 className="text-base font-semibold mb-2" style={{color:'#FFC107'}}>OpenCode CLI</h3><p className="text-sm text-[#c3cee3] mb-3">Terminal-based AI agent with 95K+ GitHub stars. MCP native, supports 75+ LLM providers.</p><CodeBlock code="curl -fsSL https://opencode.ai/install | bash" /></div>, isFavorite: true, shortcut: '1' },
      { id: 'cc-helper', label: 'Coding Tool Helper', icon: Settings, content: <div className="p-5"><h3 className="text-base font-semibold mb-2" style={{color:'#FFC107'}}>Coding Tool Helper</h3><p className="text-sm text-[#c3cee3] mb-3">Configuration wizard for Z.AI ecosystem. Initializes, authenticates, and diagnoses your setup.</p><CodeBlock code="npx @z_ai/coding-helper init" /></div>, shortcut: '2' },
      { id: 'cc-stitch', label: 'Stitch MCP', icon: Layers, content: <div className="p-5"><h3 className="text-base font-semibold mb-2" style={{color:'#FFC107'}}>Stitch MCP</h3><p className="text-sm text-[#c3cee3] mb-3">Full-page design generation from prompts. Free tier: 350 generations/month.</p><CodeBlock code="npx @_davideast/stitch-mcp init" /></div>, shortcut: '3' },
      { id: 'cc-magic', label: '21st.dev Magic', icon: Sparkles, content: <div className="p-5"><h3 className="text-base font-semibold mb-2" style={{color:'#FFC107'}}>21st.dev Magic</h3><p className="text-sm text-[#c3cee3] mb-3">React component generation through AI. MCP server integration for direct code insertion.</p><CodeBlock code="npx -y 21st-dev/magic-mcp" /></div> },
      { id: 'cc-stagewise', label: 'Stagewise', icon: Eye, content: <div className="p-5"><h3 className="text-base font-semibold mb-2" style={{color:'#FFC107'}}>Stagewise</h3><p className="text-sm text-[#c3cee3] mb-3">AI Browser for web development. Electron + React 19, provides visual context for AI agents.</p><CodeBlock code="npx @stagewise/agent-interface" /></div> },
    ],
  },
  {
    id: 'mcp',
    label: 'MCP',
    icon: Cable,
    accent: '#4ECDC4',
    items: [
      { id: 'cc-search', label: 'Web Search', icon: Search, content: <div className="p-5"><h3 className="text-base font-semibold mb-2" style={{color:'#4ECDC4'}}>Web Search MCP</h3><p className="text-sm text-[#c3cee3] mb-3">Search the web for real-time information. Port 3001.</p><CodeBlock code={`{\n  "mcpServers": {\n    "web-search": {\n      "command": "npx",\n      "args": ["-y", "@z-ai/web-search-mcp"]\n    }\n  }\n}`} lang="json" /></div>, badge: 1 },
      { id: 'cc-vision', label: 'Vision MCP', icon: Eye, content: <div className="p-5"><h3 className="text-base font-semibold mb-2" style={{color:'#4ECDC4'}}>Vision MCP</h3><p className="text-sm text-[#c3cee3] mb-3">Analyze images and screenshots with AI. Port 3002.</p><CodeBlock code={`{\n  "mcpServers": {\n    "vision": {\n      "command": "npx",\n      "args": ["-y", "@z-ai/vision-mcp"]\n    }\n  }\n}`} lang="json" /></div> },
      { id: 'cc-reader', label: 'Web Reader', icon: BookOpen, content: <div className="p-5"><h3 className="text-base font-semibold mb-2" style={{color:'#4ECDC4'}}>Web Reader MCP</h3><p className="text-sm text-[#c3cee3] mb-3">Extract content from web pages. Port 3003.</p><CodeBlock code={`{\n  "mcpServers": {\n    "web-reader": {\n      "command": "npx",\n      "args": ["-y", "@z-ai/reader-mcp"]\n    }\n  }\n}`} lang="json" /></div> },
    ],
  },
  {
    id: 'setup',
    label: 'SETUP',
    icon: Rocket,
    accent: '#c792ea',
    items: [
      { id: 'cc-quickstart', label: 'Quick Start', icon: Zap, content: <div className="p-5"><h3 className="text-base font-semibold mb-2" style={{color:'#c792ea'}}>Quick Start</h3><p className="text-sm text-[#c3cee3] mb-3">Get up and running in 3 steps:</p><CodeBlock code={`# Step 1: Install Coding Tool Helper\nnpx @z_ai/coding-helper init\n\n# Step 2: Set your API key\ncoding-helper auth\n\n# Step 3: Verify setup\ncoding-helper doctor`} /></div>, isFavorite: true },
      { id: 'cc-doctor', label: 'Doctor', icon: Shield, content: <div className="p-5"><h3 className="text-base font-semibold mb-2" style={{color:'#c792ea'}}>System Diagnostic</h3><p className="text-sm text-[#c3cee3] mb-3">Check your system configuration for common issues.</p><CodeBlock code="coding-helper doctor" /></div>, shortcut: 'D' },
      { id: 'cc-config', label: 'Config', icon: FileCode, content: <div className="p-5"><h3 className="text-base font-semibold mb-2" style={{color:'#c792ea'}}>Configuration</h3><p className="text-sm text-[#c3cee3] mb-3">Manage your Coding Tool Helper configuration.</p><CodeBlock code={`# View current language\ncoding-helper lang show\n\n# Set language to Russian\ncoding-helper lang set ru\n\n# Revoke API key\ncoding-helper auth revoke`} /></div> },
    ],
  },
]

/* ───────────────────── CONTEXTS ───────────────────── */

const ToastContext = React.createContext<{
  addToast: (message: string, type: 'success' | 'info') => void;
}>({ addToast: () => {} });

const BookmarkContext = React.createContext<{
  bookmarks: Set<string>;
  toggleBookmark: (sectionId: string) => void;
}>({ bookmarks: new Set(), toggleBookmark: () => {} });

/* ───────────────────── INSTALL SCRIPT TOOLS ───────────────────── */

const INSTALL_TOOLS = [
  { name: 'OpenCode', command: 'curl -fsSL https://opencode.ai/install | bash' },
  { name: 'Coding Tool Helper', command: 'npx @z_ai/coding-helper' },
  { name: 'Stitch MCP', command: 'npx @_davideast/stitch-mcp init' },
  { name: 'UI UX Pro Max Skill', command: 'npx skills add nextlevelbuilder/ui-ux-pro-max-skill --global' },
  { name: 'Magic MCP', command: 'npx -y 21st-dev/magic-mcp' },
  { name: 'Cline (VS Code)', command: '# Install Cline from VS Code Marketplace\n# Search: "Cline" in Extensions' },
]

/* ───────────────────── READING PROGRESS ───────────────────── */

function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const [width, setWidth] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setWidth(latest * 100)
  })

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
      <motion.div
        className="h-full bg-[var(--nyc-taxi)]"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

/* ───────────────────── SEARCH DIALOG ───────────────────── */

function SearchDialog({ open, onClose, theme }: { open: boolean; onClose: () => void; theme: 'dark' | 'light' }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClose = useCallback(() => {
    setQuery('')
    setSelectedIndex(0)
    onClose()
  }, [onClose])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        handleClose()
      }
      if (e.key === 'Escape' && open) handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, handleClose])

  const results = query.length > 0
    ? TOC_ITEMS.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : TOC_ITEMS

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    }
    if (e.key === 'Enter' && results[selectedIndex]) {
      handleClose()
      document.getElementById(results[selectedIndex].id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className={`fixed top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-[101] ${theme === 'light' ? 'bg-[oklch(0.98_0_0)] border-oklch(0.85_0_0)' : 'bg-[oklch(0.17_0_0)] border-white/10'} rounded-lg shadow-2xl overflow-hidden`}
          >
            <div className={`flex items-center gap-3 px-4 py-3 border-b ${theme === 'light' ? 'border-oklch(0.85_0_0)' : 'border-white/10'}`}>
              <Search className="w-4 h-4 text-[var(--nyc-taxi)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Поиск по разделам..."
                className={`flex-1 bg-transparent text-sm ${theme === 'light' ? 'text-oklch(0.15_0_0) placeholder:text-oklch(0.5_0_0)' : 'text-white placeholder:text-white/30'} outline-none`}
              />
              <div className="flex items-center gap-1">
                <kbd className={`text-[10px] font-mono px-1 py-0.5 rounded ${theme === 'light' ? 'text-oklch(0.45_0_0) bg-oklch(0.92_0_0)' : 'text-white/20 bg-white/5'}`}>↑↓</kbd>
                <kbd className={`text-[10px] font-mono px-1 py-0.5 rounded ${theme === 'light' ? 'text-oklch(0.45_0_0) bg-oklch(0.92_0_0)' : 'text-white/20 bg-white/5'}`}>↵</kbd>
                <kbd className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${theme === 'light' ? 'text-oklch(0.45_0_0) bg-oklch(0.92_0_0)' : 'text-white/30 bg-white/5'}`}>ESC</kbd>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {results.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    index === selectedIndex
                      ? 'bg-[var(--nyc-taxi)]/10 text-[var(--nyc-taxi)]'
                      : theme === 'light' ? 'hover:bg-oklch(0.93_0_0)' : 'hover:bg-white/5'
                  }`}
                >
                  <span className="font-mono text-xs w-5 shrink-0">{item.label}</span>
                  <item.icon className={`w-3.5 h-3.5 shrink-0 ${index === selectedIndex ? 'text-[var(--nyc-taxi)]' : theme === 'light' ? 'text-oklch(0.45_0_0)' : 'text-white/40'}`} />
                  <span className={index === selectedIndex ? 'text-[var(--nyc-taxi)]' : theme === 'light' ? 'text-oklch(0.3_0_0)' : 'text-white/70'}>{item.title}</span>
                </a>
              ))}
              {results.length === 0 && (
                <div className={`px-3 py-6 text-center text-sm ${theme === 'light' ? 'text-oklch(0.5_0_0)' : 'text-white/30'}`}>Ничего не найдено</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


/* ───────────────────── GUIDE TOUR ───────────────────── */

const TOUR_STEPS = [
  {
    target: 'hero',
    title: 'Добро пожаловать!',
    description: 'Это единое руководство по установке AI-инструментов разработки. Здесь вы найдёте всё, что нужно для старта.',
    position: 'center' as const,
  },
  {
    target: 'matrix',
    title: 'Матрица инструментов',
    description: 'Обзор всех доступных AI-инструментов: их типы, цены и совместимость с MCP.',
    position: 'top' as const,
  },
  {
    target: 'helper',
    title: 'Coding Tool Helper',
    description: 'Центральный узел интеграции — мастер настройки, система команд и конфигурация моделей GLM.',
    position: 'top' as const,
  },
  {
    target: 'install',
    title: 'Установка и настройка',
    description: 'Пошаговые команды установки и шаблоны конфигурации для всех платформ.',
    position: 'top' as const,
  },
  {
    target: 'mcp',
    title: 'MCP-серверы',
    description: 'Серверы Model Context Protocol: Web Search, Vision, Reader и Zread — расширяют возможности AI.',
    position: 'top' as const,
  },
  {
    target: 'cost',
    title: 'Сценарии стоимости',
    description: 'Сравнение планов от Free Stack до Enterprise — выберите оптимальный вариант.',
    position: 'top' as const,
  },
  {
    target: 'checklist',
    title: 'Чек-лист',
    description: 'Интерактивный чек-лист для отслеживания прогресса настройки. Отмечайте выполненные шаги!',
    position: 'top' as const,
  },
]

function GuideTour({ open, onClose, currentStep, onNext, onPrev, theme }: {
  open: boolean
  onClose: () => void
  currentStep: number
  onNext: () => void
  onPrev: () => void
  theme: 'dark' | 'light'
}) {
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null)
  const step = TOUR_STEPS[currentStep]
  const isFirst = currentStep === 0
  const isLast = currentStep === TOUR_STEPS.length - 1

  useEffect(() => {
    if (open && step) {
      const el = document.getElementById(step.target)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        setTimeout(() => {
          const rect = el.getBoundingClientRect()
          setHighlightRect(rect)
        }, 500)
      }
    }
  }, [open, currentStep, step])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' || e.key === 'Enter') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose, onNext, onPrev])

  if (!highlightRect || !open) return null

  const padding = 12
  const tooltipTop = highlightRect.bottom + padding + 8
  const tooltipLeft = Math.max(16, Math.min(
    highlightRect.left + highlightRect.width / 2 - 200,
    window.innerWidth - 432
  ))

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[199] pointer-events-auto"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Highlight border */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-[200] rounded-lg pointer-events-none"
            style={{
              top: highlightRect.top - padding,
              left: highlightRect.left - padding,
              width: highlightRect.width + padding * 2,
              height: highlightRect.height + padding * 2,
              border: '2px solid var(--nyc-taxi)',
              boxShadow: '0 0 20px oklch(0.78 0.16 85 / 20%), inset 0 0 20px oklch(0.78 0.16 85 / 5%)',
            }}
          />

          {/* Tooltip card */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed z-[202] w-[400px] max-w-[calc(100vw-32px)] pointer-events-auto"
            style={{
              top: tooltipTop,
              left: tooltipLeft,
            }}
          >
            <div className={`${theme === 'light' ? 'bg-[oklch(0.98_0_0)]' : 'bg-[oklch(0.14_0_0)]'} border border-[var(--nyc-taxi)]/20 rounded-xl shadow-2xl overflow-hidden`}>
              {/* Header */}
              <div className={`flex items-center gap-3 px-5 py-4 border-b ${th('border-white/[0.06]', 'border-oklch(0.85_0_0)')}`}>
                <div className="w-8 h-8 rounded-lg bg-[var(--nyc-taxi)]/15 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-[var(--nyc-taxi)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold truncate">{step.title}</h3>
                  <span className="text-[10px] text-[var(--nyc-steel)] font-mono">
                    Шаг {currentStep + 1} из {TOUR_STEPS.length}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className={`p-1.5 rounded ${th('hover:bg-white/5 text-white/30 hover:text-white/60', 'hover:bg-oklch(0.9_0_0) text-oklch(0.4_0_0) hover:text-oklch(0.2_0_0)')} transition-colors`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Body */}
              <div className="px-5 py-4">
                <p className="text-sm text-[var(--nyc-concrete)] leading-relaxed">{step.description}</p>
              </div>

              {/* Progress dots */}
              <div className="px-5 pb-2 flex items-center justify-center gap-1.5">
                {TOUR_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${
                      i === currentStep
                        ? 'w-6 h-1.5 bg-[var(--nyc-taxi)]'
                        : i < currentStep
                          ? 'w-1.5 h-1.5 bg-[var(--nyc-taxi)]/40'
                          : `w-1.5 h-1.5 ${th('bg-white/10', 'bg-oklch(0.8_0_0)')}`
                    }`}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className={`flex items-center justify-between px-5 py-3 border-t ${th('border-white/[0.06]', 'border-oklch(0.85_0_0)')}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onPrev}
                  disabled={isFirst}
                  className={`${th('text-white/40 hover:text-white', 'text-oklch(0.4_0_0) hover:text-oklch(0.15_0_0)')} gap-1 h-7 px-2 text-xs disabled:opacity-20`}
                >
                  <ChevronLeft className="w-3 h-3" />
                  Назад
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className={`${th('text-white/30 hover:text-white/60', 'text-oklch(0.4_0_0) hover:text-oklch(0.2_0_0)')} h-7 px-2 text-xs`}
                  >
                    Пропустить
                  </Button>
                  {isLast ? (
                    <Button
                      size="sm"
                      onClick={onClose}
                      className="bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] font-bold h-7 px-4 text-xs gap-1.5"
                    >
                      <Check className="w-3 h-3" />
                      Завершить
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={onNext}
                      className="bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] font-bold h-7 px-4 text-xs gap-1.5"
                    >
                      Далее
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ───────────────────── SECTION NAVIGATION ───────────────────── */

function SectionNav({ currentId, theme }: { currentId: string; theme: string }) {
  const th = (dark: string, light: string) => theme === 'light' ? light : dark
  const currentIndex = TOC_ITEMS.findIndex(item => item.id === currentId)
  if (currentIndex < 0) return null
  const prev = currentIndex > 0 ? TOC_ITEMS[currentIndex - 1] : null
  const next = currentIndex < TOC_ITEMS.length - 1 ? TOC_ITEMS[currentIndex + 1] : null

  return (
    <div className="flex items-center justify-between mt-8 mb-2">
      {prev ? (
        <a
          href={`#${prev.id}`}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${th('text-white/40 hover:text-[var(--nyc-taxi)] hover:bg-white/5', 'text-oklch(0.45_0_0) hover:text-[var(--nyc-taxi)] hover:bg-oklch(0.93_0_0)')} transition-all group/nav`}
        >
          <ChevronLeft className="w-3.5 h-3.5 group-hover/nav:-translate-x-0.5 transition-transform" />
          <span className="font-mono">{prev.label}</span>
          <span className="hidden sm:inline">{prev.title}</span>
        </a>
      ) : <div />}
      {next ? (
        <a
          href={`#${next.id}`}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${th('text-white/40 hover:text-[var(--nyc-taxi)] hover:bg-white/5', 'text-oklch(0.45_0_0) hover:text-[var(--nyc-taxi)] hover:bg-oklch(0.93_0_0)')} transition-all group/nav`}
        >
          <span className="hidden sm:inline">{next.title}</span>
          <span className="font-mono">{next.label}</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover/nav:translate-x-0.5 transition-transform" />
        </a>
      ) : <div />}
    </div>
  )
}

/* ───────────────────── COMPONENTS ───────────────────── */

function CopyButton({ text, className = '', onCopied, theme }: { text: string; className?: string; onCopied?: () => void; theme?: string }) {
  const th = (dark: string, light: string) => theme === 'light' ? light : dark
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    onCopied?.()
    setTimeout(() => setCopied(false), 2000)
  }, [text, onCopied])
  return (
    <button
      onClick={handleCopy}
      className={`p-1 rounded ${theme ? th('bg-white/5', 'bg-oklch(0.9_0_0)') : 'bg-white/5'} hover:bg-[var(--nyc-taxi)]/10 transition-all duration-200 group/copy ${className}`}
      aria-label="Copy code"
    >
      {copied
        ? <Check className="w-3 h-3 text-green-400" />
        : <Copy className={`w-3 h-3 ${theme ? th('text-white/30', 'text-oklch(0.5_0_0)') : 'text-white/30'} group-hover/copy:text-[var(--nyc-taxi)]`} />
      }
    </button>
  )
}

/* ───────────────────── COPY ALL BUTTON ───────────────────── */

function CopyAllButton() {
  const { addToast } = React.useContext(ToastContext)
  const allCommands = `npx @z_ai/coding-helper init
coding-helper auth
coding-helper lang set ru
coding-helper doctor

# OpenCode config
npx @anthropic-ai/opencode@latest

# Stitch MCP
npx @_davideast/stitch-mcp init

# Magic MCP (optional)
npx skills add @anthropic-ai/magic-mcp --global`

  const handleCopy = () => {
    navigator.clipboard.writeText(allCommands)
    addToast('Все команды скопированы!', 'success')
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--nyc-taxi)]/10 border border-[var(--nyc-taxi)]/20 text-[var(--nyc-taxi)] text-xs font-mono hover:bg-[var(--nyc-taxi)]/20 transition-all duration-200 mb-6"
    >
      <ClipboardList className="w-3.5 h-3.5" />
      Скопировать все команды
    </button>
  )
}

/* ───────────────────── SYNTAX HIGHLIGHTING ───────────────────── */

function highlightLine(line: string, lang: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  let key = 0
  const trimmed = line.trimStart()

  // Comment handling
  if (lang === 'bash' && trimmed.startsWith('#')) {
    parts.push(<span key={key} className="token-comment">{line}</span>)
    return parts
  }
  if (lang === 'yaml' && trimmed.startsWith('#')) {
    parts.push(<span key={key} className="token-comment">{line}</span>)
    return parts
  }
  if ((lang === 'typescript' || lang === 'javascript' || lang === 'ts' || lang === 'js') && trimmed.startsWith('//')) {
    parts.push(<span key={key} className="token-comment">{line}</span>)
    return parts
  }

  // Empty line
  if (line.length === 0) {
    parts.push(' ')
    return parts
  }

  if (lang === 'bash') {
    let remaining = line
    const patterns: { regex: RegExp; cls: string }[] = [
      { regex: /^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'/, cls: 'token-string' },
      { regex: /^(npx|npm|curl|export|echo|cd|sudo|git|docker|yarn|pnpm|bun|pip|python|node|rm|mkdir|chmod|cat|ls|grep|sed|awk|find|source|sh|bash)\b/, cls: 'token-keyword' },
      { regex: /^--[a-zA-Z][\w-]*/, cls: 'token-variable' },
      { regex: /^-[a-zA-Z]\b/, cls: 'token-variable' },
      { regex: /^\s+/, cls: '' },
      { regex: /^./, cls: '' },
    ]
    while (remaining.length > 0) {
      let matched = false
      for (const { regex, cls } of patterns) {
        const match = remaining.match(regex)
        if (match) {
          const text = match[0]
          if (cls) {
            parts.push(<span key={key++} className={cls}>{text}</span>)
          } else {
            parts.push(text)
          }
          remaining = remaining.slice(text.length)
          matched = true
          break
        }
      }
      if (!matched) {
        parts.push(remaining[0])
        remaining = remaining.slice(1)
      }
    }
  } else if (lang === 'json') {
    let remaining = line
    const patterns: { regex: RegExp; cls: string }[] = [
      { regex: /^\s+/, cls: '' },
      { regex: /^"(?:[^"\\]|\\.)*"\s*:/, cls: 'token-property' },
      { regex: /^"(?:[^"\\]|\\.)*"/, cls: 'token-string' },
      { regex: /^-?\d+(\.\d+)?([eE][+-]?\d+)?/, cls: 'token-number' },
      { regex: /^(true|false|null)\b/, cls: 'token-boolean' },
      { regex: /^[}{\[\]:,]/, cls: 'token-punctuation' },
      { regex: /^./, cls: '' },
    ]
    while (remaining.length > 0) {
      let matched = false
      for (const { regex, cls } of patterns) {
        const match = remaining.match(regex)
        if (match) {
          const text = match[0]
          if (cls) {
            parts.push(<span key={key++} className={cls}>{text}</span>)
          } else {
            parts.push(text)
          }
          remaining = remaining.slice(text.length)
          matched = true
          break
        }
      }
      if (!matched) {
        parts.push(remaining[0])
        remaining = remaining.slice(1)
      }
    }
  } else if (lang === 'yaml') {
    let remaining = line
    const patterns: { regex: RegExp; cls: string }[] = [
      { regex: /^\s+/, cls: '' },
      { regex: /^[\w][\w.-]*\s*:/, cls: 'token-property' },
      { regex: /^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'/, cls: 'token-string' },
      { regex: /^-?\d+(\.\d+)?/, cls: 'token-number' },
      { regex: /^(true|false|null)\b/, cls: 'token-boolean' },
      { regex: /^#.*$/, cls: 'token-comment' },
      { regex: /^./, cls: '' },
    ]
    while (remaining.length > 0) {
      let matched = false
      for (const { regex, cls } of patterns) {
        const match = remaining.match(regex)
        if (match) {
          const text = match[0]
          if (cls) {
            parts.push(<span key={key++} className={cls}>{text}</span>)
          } else {
            parts.push(text)
          }
          remaining = remaining.slice(text.length)
          matched = true
          break
        }
      }
      if (!matched) {
        parts.push(remaining[0])
        remaining = remaining.slice(1)
      }
    }
  } else {
    parts.push(line)
  }

  return parts
}

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const lines = code.split('\n')
  return (
    <div className="relative group rounded-lg overflow-hidden border border-white/[0.08] shadow-lg shadow-black/20 code-block code-block-hover-glow">
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[oklch(0.14_0_0)] border-b border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
        </div>
        <span className="font-mono text-[10px] text-white/25 tracking-wider uppercase ml-2">{lang}</span>
        <div className="ml-auto flex items-center gap-2">
          <CopyButton text={code} />
        </div>
      </div>
      {/* Terminal body */}
      <div className="bg-[oklch(0.08_0_0)] p-0 overflow-x-auto">
        {lines.map((line, i) => {
          const isComment = line.trimStart().startsWith('#') || line.trimStart().startsWith('//')
          const isCommand = !isComment && line.trim().length > 0 && i === lines.findIndex(l => l.trim().length > 0)
          return (
            <div
              key={i}
              className="flex items-start gap-0 px-4 py-0 hover:bg-white/[0.02] transition-colors group/line"
            >
              {/* Line number */}
              <span className="w-8 shrink-0 text-right pr-3 select-none font-mono text-[11px] leading-[1.8] text-white/15 group-hover/line:text-white/20 transition-colors">
                {i + 1}
              </span>
              {/* Prompt + content */}
              <div className="flex items-start gap-2 min-w-0 flex-1">
                {(isCommand || (lang === 'bash' && line.trim().length > 0 && !isComment)) && (
                  <span className="text-[var(--nyc-taxi)] font-mono text-sm leading-[1.8] shrink-0 select-none">❯</span>
                )}
                <pre className="font-mono text-[13px] leading-[1.8] whitespace-pre text-[var(--nyc-concrete)]">
                  {highlightLine(line, lang)}
                </pre>
              </div>
            </div>
          )
        })}
        {/* Blinking cursor line */}
        <div className="flex items-start gap-0 px-4 py-0">
          <span className="w-8 shrink-0 text-right pr-3 select-none font-mono text-[11px] leading-[1.8] text-white/15">&nbsp;</span>
          <div className="flex items-center gap-2">
            <span className="text-[var(--nyc-taxi)] font-mono text-sm leading-[1.8] shrink-0 select-none">❯</span>
            <span className="nyc-typing-cursor font-mono text-sm leading-[1.8] text-[var(--nyc-concrete)]" />
          </div>
        </div>
      </div>
    </div>
  )
}



function SectionHeader({ number, title, subtitle, theme }: { number: string; title: string; subtitle?: string; theme: string }) {
  const th = (dark: string, light: string) => theme === 'light' ? light : dark
  const [shareCopied, setShareCopied] = useState(false)
  const { addToast } = React.useContext(ToastContext)
  const { bookmarks, toggleBookmark } = React.useContext(BookmarkContext)

  const sectionMap: Record<string, string> = {
    '00': 'hero', '01': 'matrix', '02': 'platforms', '03': 'helper',
    '04': 'stagewise', '05': 'install', '06': 'mcp', '07': 'prompts',
    '08': 'cost', '08.5': 'wizard', '09': 'troubleshoot', '09.5': 'faq', '10': 'architecture', '11': 'checklist',
  }
  const sectionId = sectionMap[number.trim()] || 'hero'
  const isBookmarked = bookmarks.has(sectionId)

  const handleShare = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#${sectionId}`
    navigator.clipboard.writeText(shareUrl)
    setShareCopied(true)
    addToast('Ссылка скопирована!', 'success')
    setTimeout(() => setShareCopied(false), 2000)
  }

  const handleBookmark = () => {
    toggleBookmark(sectionId)
    addToast(isBookmarked ? 'Закладка удалена' : 'Закладка добавлена', isBookmarked ? 'info' : 'success')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="mb-8 relative"
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[var(--nyc-taxi)] rotate-45" />
          <span className="section-number font-mono text-sm">{number}</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[var(--nyc-taxi)]/30 to-transparent" />
        <button
          onClick={handleBookmark}
          className={`p-1 rounded transition-all ${isBookmarked ? 'text-[var(--nyc-taxi)]' : th('text-white/15 hover:text-[var(--nyc-taxi)] hover:bg-white/5', 'text-oklch(0.55_0_0) hover:text-[var(--nyc-taxi)] hover:bg-oklch(0.93_0_0)')}`}
          title={isBookmarked ? 'Удалить закладку' : 'Добавить закладку'}
        >
          {isBookmarked ? <Star className="w-3 h-3 fill-[var(--nyc-taxi)]" /> : <Star className="w-3 h-3" />}
        </button>
        <div className="relative">
          <button
            onClick={handleShare}
            className={`p-1 rounded ${th('text-white/15 hover:text-[var(--nyc-taxi)] hover:bg-white/5', 'text-oklch(0.55_0_0) hover:text-[var(--nyc-taxi)] hover:bg-oklch(0.93_0_0)')} transition-all`}
            title="Скопировать ссылку на раздел"
          >
            {shareCopied ? <Check className="w-3 h-3 text-green-400" /> : <Hash className="w-3 h-3" />}
          </button>
        </div>
      </div>
      <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">{title}</h2>
      {subtitle && (
        <p className="text-[oklch(0.6_0_0)] mt-2 text-xs font-mono tracking-widest uppercase">
          {'<'}{subtitle}{' />'}
        </p>
      )}
    </motion.div>
  )
}

function TaxiDivider({ theme }: { theme: string }) {
  const th = (dark: string, light: string) => theme === 'light' ? light : dark
  return (
    <div className="flex items-center gap-3 my-12 relative">
      <motion.div
        className={`h-px flex-1 bg-gradient-to-r from-transparent ${th('via-white/15', 'via-oklch(0.75_0_0)')} to-transparent`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="flex items-center gap-1.5"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="w-1 h-1 bg-[var(--nyc-taxi)]/50" />
        <div className="w-2.5 h-2.5 bg-[var(--nyc-taxi)] rotate-45 shadow-sm shadow-[var(--nyc-taxi)]/30" />
        <div className="w-1 h-1 bg-[var(--nyc-taxi)]/50" />
      </motion.div>
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
    </div>
  )
}

function StatusDot({ status }: { status: boolean | string }) {
  if (status === true) return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-green-500/15 text-green-400 text-xs font-bold border border-green-500/20">✓</span>
  )
  if (status === false) return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-red-500/10 text-red-400/70 text-xs font-bold border border-red-500/15">✗</span>
  )
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--nyc-taxi)]/10 text-[var(--nyc-taxi)] border border-[var(--nyc-taxi)]/15">{status as string}</span>
  )
}

/* ───────────────────── COPY SUMMARY BUTTON ───────────────────── */

function generateSummary(): string {
  const lines: string[] = []

  lines.push('UI Generation Stack — Единое руководство v1.0')
  lines.push('')

  // 01. Матрица инструментов
  lines.push('01. Матрица инструментов')
  for (const tool of TOOLS) {
    lines.push(`- ${tool.name} (${tool.type}) — ${tool.price}${tool.mcp ? ' [MCP]' : ''}`)
  }
  lines.push('')

  // 02. Платформы
  lines.push('02. Платформы')
  for (const p of PLATFORMS) {
    lines.push(`- ${p.name} — ${p.desc}`)
  }
  lines.push('')

  // 03. Coding Tool Helper
  lines.push('03. Coding Tool Helper')
  for (const cmd of HELPER_COMMANDS) {
    lines.push(`  ${cmd.cmd} — ${cmd.desc}`)
  }
  lines.push('')

  // 04. Stagewise (brief mention)
  lines.push('04. Stagewise — AI-браузер для веб-разработки (Free)')
  lines.push('')

  // 05. Установка
  lines.push('05. Установка')
  lines.push('npx @z_ai/coding-helper init')
  lines.push('coding-helper auth')
  lines.push('coding-helper lang set ru')
  lines.push('coding-helper doctor')
  lines.push('')

  // 06. MCP-серверы
  lines.push('06. MCP-серверы')
  for (const server of MCP_SERVERS) {
    lines.push(`- ${server.name} (${server.tool}) — ${server.desc}`)
  }
  lines.push('')

  // 07. Промпт-шаблоны
  lines.push('07. Промпт-шаблоны')
  for (const tmpl of PROMPT_TEMPLATES) {
    lines.push(`- ${tmpl.category}`)
  }
  lines.push('')

  // 08. Стоимость
  lines.push('08. Стоимость')
  for (const scenario of COST_SCENARIOS) {
    lines.push(`- ${scenario.name}: ${scenario.price} — ${scenario.tools}`)
  }
  lines.push('')

  // 09. Диагностика
  lines.push('09. Диагностика')
  for (const err of ERRORS) {
    lines.push(`- ${err.error} → ${err.fix}`)
  }
  lines.push('')

  // Checklist
  lines.push('11. Чек-лист')
  for (const item of CHECKLIST_ITEMS) {
    lines.push(`☐ ${item.label}`)
  }

  return lines.join('\n')
}

function CopySummaryButton({ theme }: { theme: string }) {
  const th = (dark: string, light: string) => theme === 'light' ? light : dark
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generateSummary())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      className={`${th('border-white/20 hover:bg-white/5', 'border-oklch(0.7_0_0) hover:bg-oklch(0.93_0_0)')} hover:border-[var(--nyc-taxi)]/30 gap-2`}
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <ClipboardList className="w-4 h-4" />}
      {copied ? 'Скопировано!' : 'Скопировать сводку'}
    </Button>
  )
}

/* ───────────────────── TOAST CONTAINER ───────────────────── */

function ToastContainer({ toasts }: { toasts: Array<{ id: string; message: string; type: 'success' | 'info' }> }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] flex flex-col-reverse items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.slice(-3).map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto px-4 py-2.5 rounded-lg shadow-lg shadow-black/30 backdrop-blur-sm text-sm font-mono flex items-center gap-2 border-l-2 ${
              toast.type === 'success'
                ? 'bg-[oklch(0.14_0_0)] border-l-[var(--nyc-taxi)] text-[oklch(0.85_0_0)]'
                : 'bg-[oklch(0.14_0_0)] border-l-[var(--nyc-steel)] text-[oklch(0.75_0_0)]'
            }`}
          >
            {toast.type === 'success' ? <Check className="w-3.5 h-3.5 text-[var(--nyc-taxi)] shrink-0" /> : <Hash className="w-3.5 h-3.5 text-[var(--nyc-steel)] shrink-0" />}
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/* ───────────────────── INSTALL SCRIPT GENERATOR ───────────────────── */

function InstallScriptGenerator({ installSelections, setInstallSelections, theme }: {
  installSelections: Record<string, boolean>;
  setInstallSelections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  theme: string;
}) {
  const th = (dark: string, light: string) => theme === 'light' ? light : dark
  const { addToast } = React.useContext(ToastContext)

  const allSelected = INSTALL_TOOLS.every(t => installSelections[t.name])
  const noneSelected = INSTALL_TOOLS.every(t => !installSelections[t.name])
  const selectedCount = INSTALL_TOOLS.filter(t => installSelections[t.name]).length

  const toggleTool = (name: string) => {
    setInstallSelections(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const selectAll = () => {
    setInstallSelections(prev => {
      const next = { ...prev }
      INSTALL_TOOLS.forEach(t => { next[t.name] = true })
      return next
    })
  }

  const deselectAll = () => {
    setInstallSelections(prev => {
      const next = { ...prev }
      INSTALL_TOOLS.forEach(t => { next[t.name] = false })
      return next
    })
  }

  const generatedScript = useMemo(() => {
    if (noneSelected) return ''
    const selected = INSTALL_TOOLS.filter(t => installSelections[t.name])
    const date = new Date().toISOString().split('T')[0]
    const lines = [
      '#!/bin/bash',
      '# UI Generation Stack — Auto-generated Install Script',
      `# Generated: ${date}`,
      '',
      'echo "🚀 Starting UI Generation Stack installation..."',
      '',
    ]
    for (const tool of selected) {
      lines.push(`# ${tool.name}`)
      lines.push(`echo "\\n📦 Installing ${tool.name}..."`)
      for (const cmdLine of tool.command.split('\n')) {
        lines.push(cmdLine)
      }
      lines.push('')
    }
    lines.push('echo "\\n✅ Installation complete!"')
    lines.push('echo "Run \'coding-helper doctor\' to verify your setup."')
    return lines.join('\n')
  }, [installSelections, noneSelected])

  const handleCopyScript = () => {
    if (!generatedScript) return
    navigator.clipboard.writeText(generatedScript)
    addToast('Скрипт скопирован!', 'success')
  }

  return (
    <div className="nyc-card-enhanced p-6 mt-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 rounded-lg bg-[var(--nyc-taxi)]/15 flex items-center justify-center">
          <Terminal className="w-3.5 h-3.5 text-[var(--nyc-taxi)]" />
        </div>
        <div>
          <h3 className="text-base font-semibold tracking-tight">Генератор скрипта установки</h3>
          <p className="text-xs text-[oklch(0.6_0_0)]">Выберите инструменты и скопируйте готовый bash-скрипт</p>
        </div>
      </div>

      {/* Select All / Deselect All */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={selectAll}
          className="text-[10px] font-mono text-[var(--nyc-taxi)] hover:text-[var(--nyc-amber)] px-2 py-1 rounded bg-[var(--nyc-taxi)]/5 hover:bg-[var(--nyc-taxi)]/10 transition-colors"
        >
          Выбрать все
        </button>
        <button
          onClick={deselectAll}
          className={`text-[10px] font-mono text-[var(--nyc-steel)] ${th('hover:text-white/60', 'hover:text-oklch(0.2_0_0)')} px-2 py-1 rounded ${th('bg-white/[0.02] hover:bg-white/5', 'bg-oklch(0.95_0_0) hover:bg-oklch(0.9_0_0)')} transition-colors`}
        >
          Снять все
        </button>
        {selectedCount > 0 && (
          <span className="text-[10px] font-mono text-[var(--nyc-taxi)] ml-auto">
            {selectedCount}/{INSTALL_TOOLS.length}
          </span>
        )}
      </div>

      {/* Tool checkboxes */}
      <div className="grid sm:grid-cols-2 gap-2 mb-5">
        {INSTALL_TOOLS.map(tool => (
          <label
            key={tool.name}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all border ${
              installSelections[tool.name]
                ? 'bg-[var(--nyc-taxi)]/8 border-[var(--nyc-taxi)]/20'
                : th('bg-white/[0.02] border-white/[0.06] hover:border-white/10', 'bg-oklch(0.95_0_0) border-oklch(0.82_0_0) hover:border-oklch(0.7_0_0)')
            }`}
          >
            <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0 ${
              installSelections[tool.name]
                ? 'bg-[var(--nyc-taxi)] border-[var(--nyc-taxi)]'
                : th('border-white/20', 'border-oklch(0.7_0_0)')
            }`}>
              {installSelections[tool.name] && <Check className="w-2.5 h-2.5 text-black" />}
            </div>
            <input
              type="checkbox"
              checked={!!installSelections[tool.name]}
              onChange={() => toggleTool(tool.name)}
              className="sr-only"
            />
            <span className={`text-xs font-mono ${installSelections[tool.name] ? 'text-[var(--nyc-taxi)]' : 'text-[oklch(0.7_0_0)]'}`}>
              {tool.name}
            </span>
          </label>
        ))}
      </div>

      {/* Generated script */}
      {generatedScript && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-[var(--nyc-steel)] uppercase tracking-wider">Сгенерированный скрипт</span>
            <button
              onClick={handleCopyScript}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--nyc-taxi)]/10 border border-[var(--nyc-taxi)]/20 text-[var(--nyc-taxi)] text-[11px] font-mono hover:bg-[var(--nyc-taxi)]/20 transition-all"
            >
              <Copy className="w-3 h-3" />
              Copy Script
            </button>
          </div>
          <CodeBlock code={generatedScript} lang="bash" />
        </div>
      )}
    </div>
  )
}

/* ───────────────────── MAIN PAGE ───────────────────── */

export default function Home() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileNav, setMobileNav] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showQuickStart, setShowQuickStart] = useState(false)
  const [tourOpen, setTourOpen] = useState(false)
  const [tourStep, setTourStep] = useState(0)
  const [tourCompleted, setTourCompleted] = useState(false)
  const [wizardUsage, setWizardUsage] = useState('')
  const [wizardBudget, setWizardBudget] = useState('')
  const [wizardTools, setWizardTools] = useState<string[]>([])
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  // Theme helper: returns dark value in dark mode, light value in light mode
  const th = useCallback((dark: string, light: string) => theme === 'light' ? light : dark, [theme])
  const [helperFilter, setHelperFilter] = useState('')
  const [runningCmd, setRunningCmd] = useState('')
  const [errorExpanded, setErrorExpanded] = useState<string[]>([])
  const [faqExpanded, setFaqExpanded] = useState<string[]>([])
  const [readingProgress, setReadingProgress] = useState(0)
  const [tocPanelOpen, setTocPanelOpen] = useState(false)
  const [quickJumpOpen, setQuickJumpOpen] = useState(false)
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set())
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'info' }>>([])
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [installSelections, setInstallSelections] = useState<Record<string, boolean>>({})
  const quickJumpRef = useRef<HTMLDivElement>(null)

  const addToast = useCallback((message: string, type: 'success' | 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  const toggleBookmark = useCallback((sectionId: string) => {
    setBookmarks(prev => {
      const next = new Set(prev)
      if (next.has(sectionId)) next.delete(sectionId)
      else next.add(sectionId)
      return next
    })
  }, [])

  // Close quick jump on click outside
  useEffect(() => {
    if (!quickJumpOpen) return
    const handleClick = (e: MouseEvent) => {
      if (quickJumpRef.current && !quickJumpRef.current.contains(e.target as Node)) {
        setQuickJumpOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [quickJumpOpen])

  const toggleWizardTool = (tool: string) => {
    setWizardTools(prev =>
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    )
  }

  const wizardRecommendation = useMemo(() => {
    if (!wizardUsage || !wizardBudget) return null
    const key = `${wizardUsage}-${wizardBudget}`
    const recs: Record<string, { name: string; price: string; plan: string }> = {
      'learn-free': { name: 'Free Stack', price: '$0/мес', plan: 'None' },
      'learn-mid': { name: 'Budget', price: '$18-20/мес', plan: 'GLM Coding Plan Lite' },
      'freelance-free': { name: 'Budget', price: '$18-20/мес', plan: 'GLM Coding Plan Lite' },
      'freelance-mid': { name: 'Professional', price: '$38-60/мес', plan: 'GLM Coding Plan Pro' },
      'freelance-pro': { name: 'Professional', price: '$38-60/мес', plan: 'GLM Coding Plan Pro' },
      'team-mid': { name: 'Professional', price: '$38-60/мес', plan: 'GLM Coding Plan Pro' },
      'team-pro': { name: 'Team/Enterprise', price: '$100+/мес', plan: 'GLM Coding Plan Max' },
    }
    return recs[key] || { name: 'Professional', price: '$38-60/мес', plan: 'GLM Coding Plan Pro' }
  }, [wizardUsage, wizardBudget])

  const toggleTheme = useCallback(() => {
    document.body.classList.add('theme-transitioning')
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning')
    }, 350)
  }, [])

  // Sync html class with theme state (critical for shadcn/ui CSS variables)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600)
      setShowQuickStart(window.scrollY > 400 && activeSection !== 'install' && activeSection !== 'hero')
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollHeight > 0 ? Math.round((window.scrollY / scrollHeight) * 100) : 0
      setReadingProgress(progress)
      const sections = TOC_ITEMS.map(item => document.getElementById(item.id))
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 200) {
            const sectionId = TOC_ITEMS[i].id
            setActiveSection(sectionId)
            setVisitedSections(prev => {
              if (prev.has(sectionId)) return prev
              return new Set([...prev, sectionId])
            })
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Hydrate from localStorage after mount (prevents SSR mismatch)
  // Loading persisted state on mount is a legitimate use case
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const st = localStorage.getItem('nyc-theme') as 'dark' | 'light' | null
      if (st) setTheme(st)
      const sc = localStorage.getItem('nyc-checklist')
      if (sc) setCheckedItems(JSON.parse(sc))
      const stour = localStorage.getItem('nyc-tour-completed')
      if (stour === 'true') setTourCompleted(true)
      const sv = localStorage.getItem('nyc-visited')
      if (sv) setVisitedSections(new Set(JSON.parse(sv)))
      const sb = localStorage.getItem('nyc-bookmarks')
      if (sb) setBookmarks(new Set(JSON.parse(sb)))
      const si = localStorage.getItem('nyc-install-selections')
      if (si) setInstallSelections(JSON.parse(si))
    } catch { /* ignore parse errors */ }
  }, [])
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    localStorage.setItem('nyc-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('nyc-checklist', JSON.stringify(checkedItems))
  }, [checkedItems])

  useEffect(() => {
    localStorage.setItem('nyc-tour-completed', String(tourCompleted))
  }, [tourCompleted])

  useEffect(() => {
    localStorage.setItem('nyc-visited', JSON.stringify([...visitedSections]))
  }, [visitedSections])

  useEffect(() => {
    localStorage.setItem('nyc-bookmarks', JSON.stringify([...bookmarks]))
  }, [bookmarks])

  useEffect(() => {
    localStorage.setItem('nyc-install-selections', JSON.stringify(installSelections))
  }, [installSelections])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      const currentIndex = TOC_ITEMS.findIndex(item => item.id === activeSection)

      if (e.key === 't' && !e.metaKey && !e.ctrlKey) {
        toggleTheme()
      }
      if (e.key === 'j' && !e.metaKey && !e.ctrlKey) {
        const next = TOC_ITEMS[Math.min(currentIndex + 1, TOC_ITEMS.length - 1)]
        document.getElementById(next.id)?.scrollIntoView({ behavior: 'smooth' })
      }
      if (e.key === 'k' && !e.metaKey && !e.ctrlKey) {
        const prev = TOC_ITEMS[Math.max(currentIndex - 1, 0)]
        document.getElementById(prev.id)?.scrollIntoView({ behavior: 'smooth' })
      }
      if (e.key === 'Escape') {
        setTocPanelOpen(false)
        setQuickJumpOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection])

  useEffect(() => {
    if (activeSection && window.location.hash !== `#${activeSection}`) {
      history.replaceState(null, '', `#${activeSection}`)
    }
  }, [activeSection])

  const checkedCount = Object.values(checkedItems).filter(Boolean).length

  return (
    <ToastContext.Provider value={{ addToast }}>
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
    <TooltipProvider>
      <div className={`min-h-screen flex flex-col ${theme === 'light' ? 'nyc-light-mode bg-[oklch(0.97_0_0)]' : 'bg-background'}`}>
        <ReadingProgress />

        <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} theme={theme} />
        <GuideTour
          open={tourOpen}
          onClose={() => {
            if (tourStep === TOUR_STEPS.length - 1) {
              setTourCompleted(true)
            }
            setTourOpen(false)
          }}
          currentStep={tourStep}
          onNext={() => setTourStep(prev => Math.min(prev + 1, TOUR_STEPS.length - 1))}
          onPrev={() => setTourStep(prev => Math.max(prev - 1, 0))}
          theme={theme}
        />

        {/* ── SIDE NAV (Desktop) ── */}
        <nav className={`hidden lg:flex fixed left-0 top-0 h-full w-14 flex-col items-center py-5 gap-1 z-50 ${th('bg-[oklch(0.1_0_0)]/80 border-white/5', 'bg-[oklch(0.97_0_0)]/80 border-oklch(0.88_0_0)')} backdrop-blur-md border-r`}>
          <div className="w-2.5 h-2.5 bg-[var(--nyc-taxi)] rotate-45 mb-4" />
          {TOC_ITEMS.map(item => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <a
                  href={`#${item.id}`}
                  className={`w-9 h-9 flex items-center justify-center rounded-md text-[11px] font-mono transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] font-bold nyc-sidebar-active'
                      : th('text-white/35 hover:text-white/60 hover:bg-white/5', 'text-oklch(0.4_0_0) hover:text-oklch(0.2_0_0) hover:bg-oklch(0.9_0_0)')
                  }`}
                >
                  {item.label}
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className={`font-mono text-xs ${th('bg-[oklch(0.17_0_0)] border-white/10', 'bg-[oklch(0.98_0_0)] border-oklch(0.82_0_0)')}`}>
                {item.title}
              </TooltipContent>
            </Tooltip>
          ))}

          {/* Utility buttons */}
          <div className={`w-8 border-t ${th('border-white/[0.06]', 'border-oklch(0.85_0_0)')} my-1`} />
          <button
            onClick={() => setSearchOpen(true)}
            className={`w-9 h-9 flex items-center justify-center rounded-md ${th('text-white/35 hover:text-[var(--nyc-taxi)] hover:bg-white/5', 'text-oklch(0.4_0_0) hover:text-[var(--nyc-taxi)] hover:bg-oklch(0.9_0_0)')} transition-colors`}
          >
            <Search className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setTocPanelOpen(prev => !prev)}
            className={`w-9 h-9 flex items-center justify-center rounded-md transition-colors ${tocPanelOpen ? 'text-[var(--nyc-taxi)] bg-[var(--nyc-taxi)]/15' : th('text-white/35 hover:text-[var(--nyc-taxi)] hover:bg-white/5', 'text-oklch(0.4_0_0) hover:text-[var(--nyc-taxi)] hover:bg-oklch(0.9_0_0)')}`}
            title="Оглавление"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 flex items-center justify-center rounded-md ${th('text-white/35 hover:text-[var(--nyc-taxi)] hover:bg-white/5', 'text-oklch(0.4_0_0) hover:text-[var(--nyc-taxi)] hover:bg-oklch(0.9_0_0)')} transition-colors`}
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <div className="mt-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--nyc-taxi)]/40 mx-auto" />
          </div>
        </nav>

        {/* ── TOC PANEL (Desktop) ── */}
        <AnimatePresence>
          {tocPanelOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 z-[50] hidden lg:block"
                onClick={() => setTocPanelOpen(false)}
              />
              <motion.div
                initial={{ x: -240 }}
                animate={{ x: 0 }}
                exit={{ x: -240 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`fixed left-14 top-0 bottom-0 w-60 z-[51] ${th('bg-[oklch(0.12_0_0)] border-white/10', 'bg-[oklch(0.97_0_0)] border-oklch(0.85_0_0)')} hidden lg:flex flex-col`}
              >
                <div className={`flex items-center justify-between px-4 py-3 border-b ${th('border-white/[0.06]', 'border-oklch(0.85_0_0)')}`}>
                  <span className="font-mono text-xs font-bold tracking-wider text-[var(--nyc-taxi)]">ОГЛАВЛЕНИЕ</span>
                  <button
                    onClick={() => setTocPanelOpen(false)}
                    className={`p-1.5 rounded ${th('hover:bg-white/5 text-white/30 hover:text-white/60', 'hover:bg-oklch(0.9_0_0) text-oklch(0.4_0_0) hover:text-oklch(0.2_0_0)')} transition-colors`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                  {TOC_ITEMS.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setTocPanelOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeSection === item.id
                          ? 'bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)]'
                          : th('text-white/50 hover:text-white/80 hover:bg-white/5', 'text-oklch(0.4_0_0) hover:text-oklch(0.2_0_0) hover:bg-oklch(0.93_0_0)')
                      }`}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span className="font-mono text-xs w-6 shrink-0">{item.label}</span>
                      <span className="truncate flex-1">{item.title}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── MOBILE NAV BAR ── */}
        <div className="lg:hidden fixed top-0.5 left-0 right-0 z-50 mx-2 mt-1">
          <div className={`${th('bg-[oklch(0.1_0_0)]/90 border-white/10', 'bg-[oklch(0.97_0_0)]/90 border-oklch(0.85_0_0)')} backdrop-blur-md border rounded-lg shadow-lg`}>
            <div className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[var(--nyc-taxi)] rotate-45" />
                <span className="font-mono text-xs font-bold tracking-wider">GUIDE</span>
                {readingProgress > 0 && (
                  <span className="text-[9px] font-mono text-[var(--nyc-steel)]">{readingProgress}%</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSearchOpen(true)}
                  className={`p-2 ${th('text-white/40 hover:text-[var(--nyc-taxi)]', 'text-oklch(0.4_0_0) hover:text-[var(--nyc-taxi)]')} transition-colors`}
                >
                  <Search className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleTheme}
                  className={`p-2 ${th('text-white/40 hover:text-[var(--nyc-taxi)]', 'text-oklch(0.4_0_0) hover:text-[var(--nyc-taxi)]')} transition-colors`}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileNav(!mobileNav)}
                  className={`${th('text-white/60 hover:text-white', 'text-oklch(0.3_0_0) hover:text-oklch(0.15_0_0)')} h-8 w-8`}
                >
                  {mobileNav ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            {/* Mobile reading progress bar */}
            <div className={`h-0.5 ${th('bg-white/5', 'bg-oklch(0.85_0_0)')}`}>
              <motion.div
                className="h-full bg-[var(--nyc-taxi)]"
                style={{ width: `${readingProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </div>
        </div>

        {/* ── MOBILE TOC DRAWER ── */}
        <AnimatePresence>
          {mobileNav && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99] lg:hidden"
                onClick={() => setMobileNav(false)}
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`fixed left-0 top-0 bottom-0 w-72 z-[100] ${th('bg-[oklch(0.12_0_0)] border-white/10', 'bg-[oklch(0.97_0_0)] border-oklch(0.85_0_0)')} lg:hidden flex flex-col`}
              >
                {/* Drawer header */}
                <div className={`flex items-center justify-between px-5 py-4 border-b ${th('border-white/[0.06]', 'border-oklch(0.85_0_0)')}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[var(--nyc-taxi)] rotate-45" />
                    <span className="font-mono text-xs font-bold tracking-wider">GUIDE</span>
                  </div>
                  <button
                    onClick={() => setMobileNav(false)}
                    className={`p-1.5 rounded ${th('hover:bg-white/5 text-white/30 hover:text-white/60', 'hover:bg-oklch(0.9_0_0) text-oklch(0.4_0_0) hover:text-oklch(0.2_0_0)')} transition-colors`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Drawer TOC list */}
                <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
                  {TOC_ITEMS.map(item => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMobileNav(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        activeSection === item.id
                          ? 'bg-[var(--nyc-taxi)]/10 text-[var(--nyc-taxi)]'
                          : th('text-white/50 hover:text-white/80 hover:bg-white/5', 'text-oklch(0.4_0_0) hover:text-oklch(0.2_0_0) hover:bg-oklch(0.93_0_0)')
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="font-mono text-xs w-6">{item.label}</span>
                      <span className="flex-1">{item.title}</span>
                      {visitedSections.has(item.id) && (
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/40 shrink-0" />
                      )}
                    </a>
                  ))}
                </div>

                {/* Drawer footer with progress */}
                <div className={`border-t ${th('border-white/[0.06]', 'border-oklch(0.85_0_0)')} p-4 space-y-3`}>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[var(--nyc-steel)] uppercase tracking-wider">Прочитано</span>
                    <span className="text-[var(--nyc-taxi)] font-bold">{visitedSections.size}/{TOC_ITEMS.length}</span>
                  </div>
                  <div className={`h-1 ${th('bg-white/5', 'bg-oklch(0.85_0_0)')} rounded-full overflow-hidden`}>
                    <div
                      className="h-full bg-[var(--nyc-taxi)] rounded-full transition-all duration-300"
                      style={{ width: `${(visitedSections.size / TOC_ITEMS.length) * 100}%` }}
                    />
                  </div>
                  <button
                    onClick={() => { setMobileNav(false); setTourCompleted(false); setTourStep(0); setTourOpen(true) }}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm ${th('text-white/50 hover:text-[var(--nyc-taxi)] hover:bg-white/5', 'text-oklch(0.4_0_0) hover:text-[var(--nyc-taxi)] hover:bg-oklch(0.93_0_0)')} transition-colors`}
                  >
                    <Compass className="w-4 h-4" />
                    <span>Guide Tour</span>
                  </button>
                  <button
                    onClick={() => { setMobileNav(false); toggleTheme() }}
                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm ${th('text-white/50 hover:text-[var(--nyc-taxi)] hover:bg-white/5', 'text-oklch(0.4_0_0) hover:text-[var(--nyc-taxi)] hover:bg-oklch(0.93_0_0)')} transition-colors`}
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 nyc-ambient-bg lg:ml-14 pt-16 lg:pt-10 relative z-10">
          {/* Sticky Section Indicator */}
          <AnimatePresence>
            {activeSection !== 'hero' && (
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`hidden lg:flex fixed top-1 left-14 right-0 z-40 h-10 items-center px-6 nyc-section-indicator ${th('bg-[oklch(0.1_0_0)]/90 border-white/[0.06]', 'bg-[oklch(0.97_0_0)]/90 border-oklch(0.88_0_0)')}`}
              >
                <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-[var(--nyc-taxi)] rotate-45" />
                  <span className="font-mono text-[10px] text-[var(--nyc-taxi)] tracking-wider">
                    § {TOC_ITEMS.find(item => item.id === activeSection)?.label || '00'}
                  </span>
                  <span className={`text-sm font-semibold tracking-tight ${th('text-white/70', 'text-oklch(0.25_0_0)')}`}>
                    {TOC_ITEMS.find(item => item.id === activeSection)?.title || ''}
                  </span>
                  <div className="flex-1" />
                  <span className={`text-[10px] font-mono ${th('text-white/20', 'text-oklch(0.5_0_0)')}`}>
                    {readingProgress}% прочитано
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* ═══════════════ HERO ═══════════════ */}
          <section id="hero" className="relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="/nyc-hero.png"
                alt="New York City industrial skyline"
                className="w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Version + reading badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-[var(--nyc-taxi)]/10 border border-[var(--nyc-taxi)]/30 mb-6"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--nyc-taxi)] animate-pulse" />
                  <span className="font-mono text-[10px] text-[var(--nyc-taxi)] tracking-widest uppercase">
                    v1.0 · Production Ready
                  </span>
                  <span className={th('text-white/10', 'text-oklch(0.7_0_0)')}>|</span>
                  <BookOpen className="w-3 h-3 text-[var(--nyc-taxi)]/60" />
                  <span className="font-mono text-[10px] text-[var(--nyc-taxi)]/60 tracking-widest">
                    ~14 мин
                  </span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-5 nyc-text-shadow-strong">
                  ЕДИНОЕ
                  <br />
                  <span className="nyc-gradient-text inline-block">РУКОВОДСТВО</span>
                </h1>
                <p className="text-lg sm:text-xl text-[oklch(0.75_0_0)] max-w-2xl mb-8 leading-relaxed nyc-text-readable">
                  Подробный гайд по установке и настройке AI-инструментов
                  разработки. <span className="text-[var(--nyc-concrete)]">Coding Tool Helper</span>, <span className="text-[var(--nyc-concrete)]">OpenCode</span>, <span className="text-[var(--nyc-concrete)]">Stagewise</span> и <span className="text-[var(--nyc-concrete)]">MCP-серверы</span>.
                </p>

                {/* Key Facts Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {[
                    { label: 'Версия', value: '1.0', icon: Shield },
                    { label: 'Пакет', value: '0.0.7', icon: Box },
                    { label: 'Node.js', value: '≥ 18.0.0', icon: Cpu },
                    { label: 'Зависимости', value: '6 пакетов', icon: Layers },
                  ].map((fact, i) => (
                    <motion.div
                      key={fact.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className={`nyc-card-inner-light nyc-hero-card nyc-hero-card-glow ${th('bg-[oklch(0.14_0_0)] border-white/[0.10] shadow-black/30 hover:shadow-black/40', 'bg-[oklch(0.96_0_0)] border-oklch(0.82_0_0) shadow-black/5 hover:shadow-black/10')} rounded-lg p-3.5 hover:border-[var(--nyc-taxi)]/25 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <fact.icon className="w-3.5 h-3.5 text-[var(--nyc-taxi)]" />
                        <span className="text-[10px] text-[var(--nyc-steel)] font-mono uppercase tracking-wider">{fact.label}</span>
                      </div>
                      <span className={`text-xl font-black ${th('text-[oklch(0.95_0_0)]', 'text-[oklch(0.15_0_0)]')}`}>{fact.value}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                  <a href="#install">
                    <Button className="bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] font-bold gap-2 shadow-xl shadow-[var(--nyc-taxi)]/30 nyc-cta-glow">
                      <Terminal className="w-4 h-4" />
                      Начать установку
                    </Button>
                  </a>
                  <a href="#checklist">
                    <Button variant="outline" className={`${th('border-white/20 hover:bg-white/5', 'border-oklch(0.7_0_0) hover:bg-oklch(0.93_0_0)')} hover:border-[var(--nyc-taxi)]/30 gap-2`}>
                      <CheckCircle2 className="w-4 h-4" />
                      Чек-лист
                    </Button>
                  </a>
                  <CopySummaryButton theme={theme} />
                </div>
              </motion.div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ═══════════════ 01 — TOOL MATRIX ═══════════════ */}
            <section id="matrix" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="01" title="Матрица инструментов" subtitle="tools_matrix"  theme={theme} />
              <div className="grid gap-4">
                {TOOLS.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Card className="nyc-card-enhanced nyc-card-tilt nyc-card-glow-hover rounded-xl group" style={{ borderLeftColor: tool.color, borderLeftWidth: '2px' }}>
                      <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div
                            className="w-1.5 h-10 rounded-full shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: tool.color }}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-sm font-semibold tracking-tight">{tool.name}</span>
                              {tool.mcp && (
                                <Badge className="bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] border-[var(--nyc-taxi)]/30 text-[10px] px-1.5 py-0">
                                  MCP
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-[oklch(0.7_0_0)] leading-relaxed">{tool.desc}</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-4 text-xs shrink-0 sm:pl-4 sm:border-l ${th('border-white/5', 'border-oklch(0.82_0_0)')}`}>
                          <span className="font-mono text-[var(--nyc-concrete)]">{tool.type}</span>
                          <span className="text-[var(--nyc-taxi)] font-mono font-bold text-xs">{tool.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Free Alternatives */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 p-6 border border-[var(--nyc-taxi)]/10 rounded-lg bg-[var(--nyc-taxi)]/[0.02]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  <span className="text-sm font-semibold tracking-tight">Бесплатные альтернативы 21st Magic</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  {[
                    ['Google Stitch', '$0 (350 gen/мес)', 'Полная'],
                    ['v0.dev Free', '$0 ($5 credit/мес)', 'Через clipboard'],
                    ['Bolt.diy', '$0 (self-hosted)', 'Полная'],
                    ['Ollama + Local LLM', '$0', 'Полная'],
                  ].map(([name, price, compat]) => (
                    <div key={name} className={`flex items-center justify-between p-2.5 rounded ${th('bg-[oklch(0.12_0_0)] border-white/[0.08] hover:shadow-black/10', 'bg-[oklch(0.97_0_0)] border-oklch(0.85_0_0) hover:shadow-black/3')} hover:border-[var(--nyc-taxi)]/15 hover:shadow-md transition-all duration-200`}>
                      <span className="font-mono text-[var(--nyc-concrete)]">{name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--nyc-taxi)] font-bold text-xs">{price}</span>
                        <Badge variant="secondary" className={`text-[10px] ${th('bg-white/5 text-white/40', 'bg-oklch(0.93_0_0) text-oklch(0.35_0_0)')} border-0`}>{compat}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[var(--nyc-taxi)] text-xs mt-3 font-mono flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  Экономия: $240/год по сравнению с 21st Magic Pro ($20/мес)
                </p>
              </motion.div>
            </section>

            <SectionNav currentId="matrix" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 02 — PLATFORMS ═══════════════ */}
            <section id="platforms" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="02" title="Платформы и совместимость" subtitle="compatibility_matrix"  theme={theme} />

              {/* Compatibility Matrix */}
              <Card className="nyc-card-enhanced rounded-xl mb-8 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b border-[var(--nyc-taxi)]/15 ${th('bg-[oklch(0.14_0_0)]', 'bg-[oklch(0.95_0_0)]')}`}>
                        <th className={`text-left py-5 px-5 font-mono text-sm font-semibold ${th('text-[oklch(0.8_0_0)]', 'text-[oklch(0.3_0_0)]')}`}>Функция</th>
                        <th className="text-center py-5 px-5 font-mono text-sm text-[var(--nyc-taxi)] font-semibold">OpenCode</th>
                        <th className={`text-center py-5 px-5 font-mono text-sm font-semibold ${th('text-[oklch(0.8_0_0)]', 'text-[oklch(0.3_0_0)]')}`}>VS Code+Cline</th>
                        <th className={`text-center py-5 px-5 font-mono text-sm font-semibold ${th('text-[oklch(0.8_0_0)]', 'text-[oklch(0.3_0_0)]')}`}>Z Code</th>
                        <th className={`text-center py-5 px-5 font-mono text-sm font-semibold ${th('text-[oklch(0.8_0_0)]', 'text-[oklch(0.3_0_0)]')}`}>chat.z.ai</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Magic MCP', true, true, true, false],
                        ['Stitch MCP', true, true, true, false],
                        ['UI UX Pro Max', true, true, true, 'partial'],
                        ['GLM Coding Plan', true, true, 'native', 'builtin'],
                        ['File system', true, true, true, false],
                        ['Visual preview', false, true, true, false],
                      ].map(([name, ...vals]) => (
                        <tr key={name as string} className={`border-b ${th('border-white/[0.1]', 'border-oklch(0.85_0_0)')} hover:bg-[var(--nyc-taxi)]/[0.03] transition-colors`}>
                          <td className={`py-5 px-5 font-mono font-semibold text-sm ${th('text-[oklch(0.85_0_0)]', 'text-[oklch(0.2_0_0)]')}`}>{name as string}</td>
                          {vals.map((v, i) => (
                            <td key={i} className="text-center py-5 px-5 min-w-[60px]">
                              <StatusDot status={v as boolean | string} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Platform Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {PLATFORMS.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="nyc-card-enhanced nyc-card-glow-hover rounded-xl h-full">
                      <CardHeader className="p-5 pb-2">
                        <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                          <p.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                          {p.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-5 pt-0">
                        <p className="text-sm text-[oklch(0.7_0_0)] leading-relaxed mb-3">{p.desc}</p>
                        <div className="flex flex-wrap gap-1">
                          {p.features.map(f => (
                            <Badge key={f} variant="secondary" className={`text-[10px] ${th('bg-white/[0.08] text-white/70 border-white/[0.06]', 'bg-oklch(0.93_0_0) text-oklch(0.3_0_0) border-oklch(0.82_0_0)')} border`}>
                              {f}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            <SectionNav currentId="platforms" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 03 — CODING TOOL HELPER ═══════════════ */}
            <section id="helper" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="03" title="Coding Tool Helper" subtitle="@z_ai/coding-helper — центральный узел интеграции"  theme={theme} />

              {/* Setup Wizard */}
              <Card className="nyc-card-enhanced mb-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                    <Settings className="w-4 h-4 text-[var(--nyc-taxi)]" />
                    Интерактивный мастер настройки
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {[
                      'Выбор языка интерфейса (zh_CN, en_US)',
                      'Выбор типа плана GLM Coding Plan (global/china)',
                      'Ввод API-ключа',
                      'Выбор инструментов разработки',
                      'Автоматическая установка и настройка',
                      'Управление MCP-серверами (опционально)',
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 text-xs"
                      >
                        <span className="w-5 h-5 rounded-sm bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] flex items-center justify-center font-mono text-[10px] shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-[oklch(0.72_0_0)]">{step}</span>
                        {i < 5 && <div className="hidden sm:block w-px h-3 bg-[var(--nyc-taxi)]/20 ml-[-10px] mt-5" />}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Commands */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  Система команд
                </h3>
                <div className="mb-3">
                  <input
                    type="text"
                    value={helperFilter}
                    onChange={(e) => setHelperFilter(e.target.value)}
                    placeholder="Фильтр команд..."
                    className={`w-full ${th('bg-[oklch(0.08_0_0)] border-white/[0.08]', 'bg-[oklch(0.97_0_0)] border-oklch(0.82_0_0)')} rounded-md px-3 py-2 text-xs ${th('text-white/80 placeholder:text-white/20', 'text-oklch(0.15_0_0) placeholder:text-oklch(0.5_0_0)')} outline-none focus:border-[var(--nyc-taxi)]/30 transition-colors`}
                  />
                </div>
                <div className="space-y-1.5">
                  {HELPER_COMMANDS.filter(cmd => !helperFilter || cmd.cmd.toLowerCase().includes(helperFilter.toLowerCase()) || cmd.desc.toLowerCase().includes(helperFilter.toLowerCase())).map((cmd, i) => (
                    <motion.div
                      key={cmd.cmd}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="group relative"
                    >
                      <div className={`flex items-center gap-3 text-xs rounded-md ${th('bg-[oklch(0.08_0_0)] border-white/[0.06]', 'bg-[oklch(0.97_0_0)] border-oklch(0.85_0_0)')} px-4 py-2.5 pr-12 transition-all duration-300 ${
                        runningCmd === cmd.cmd ? 'border-[var(--nyc-taxi)]/30 shadow-md shadow-[var(--nyc-taxi)]/5' : 'hover:border-[var(--nyc-taxi)]/15'
                      }`}>
                        <span className="text-[var(--nyc-taxi)] font-mono shrink-0">❯</span>
                        <span className="text-[var(--nyc-concrete)] font-mono">{cmd.cmd}</span>
                        <span className={`${th('text-white/30', 'text-oklch(0.45_0_0)')} hidden sm:inline`}>— {cmd.desc}</span>
                        {runningCmd === cmd.cmd && (
                          <span className="ml-auto flex items-center gap-1 text-[10px] text-green-400/80 font-mono">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            copied
                          </span>
                        )}
                      </div>
                      <CopyButton text={cmd.cmd} className="absolute top-1.5 right-1.5" theme={theme} onCopied={() => {
                        setRunningCmd(cmd.cmd)
                        setTimeout(() => setRunningCmd(''), 1500)
                      }} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Config File */}
              <Card className="nyc-card-enhanced mb-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[var(--nyc-taxi)]" />
                    Конфигурационный файл
                    <Badge className={`text-[10px] ${th('bg-white/5 text-white/30', 'bg-oklch(0.93_0_0) text-oklch(0.4_0_0)')} border-0 ml-auto font-mono`}>~/.chelper/config.yaml</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <CodeBlock
                    code={`lang: zh_CN          # UI язык\nplan: glm_coding_plan_global  # Тип плана\ntoken: your-api-key-here      # API ключ`}
                    lang="yaml"
                  />
                </CardContent>
              </Card>

              {/* GLM Models */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  Доступные модели GLM
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {GLM_MODELS.map((model, i) => (
                    <motion.div
                      key={model.tier}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className={`p-4 border ${th('border-white/[0.06]', 'border-oklch(0.82_0_0)')} rounded-lg nyc-card-enhanced hover:border-[var(--nyc-taxi)]/15 transition-colors`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[var(--nyc-taxi)] text-xs font-bold">{model.tier}</span>
                        <Badge className="text-[10px] bg-[var(--nyc-taxi)]/10 text-[var(--nyc-taxi)] border-0">
                          {model.name}
                        </Badge>
                      </div>
                      <p className="text-sm text-[oklch(0.7_0_0)] leading-relaxed mb-3">{model.use}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] ${th('text-white/20', 'text-oklch(0.5_0_0)')} font-mono`}>Скорость</span>
                        <div className={`flex-1 h-1 ${th('bg-white/5', 'bg-oklch(0.85_0_0)')} rounded-full overflow-hidden`}>
                          <motion.div
                            className="h-full bg-[var(--nyc-taxi)] rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${model.speed}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Model Mapping */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3">Маппинг моделей для Claude Code</h3>
                <CodeBlock
                  code={`{\n  "env": {\n    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air",\n    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.7",\n    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-4.7"\n  }\n}`}
                  lang="json"
                />
              </div>

              {/* Plan Limits */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  Лимиты планов
                </h3>
                {PLAN_LIMITS.map((plan, i) => (
                  <motion.div
                    key={plan.plan}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 border ${th('border-white/[0.06]', 'border-oklch(0.82_0_0)')} rounded-lg nyc-card-enhanced`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold tracking-tight">{plan.plan}</span>
                        <span className="text-[var(--nyc-taxi)] font-mono text-xs font-bold">{plan.price}</span>
                      </div>
                    </div>
                    <Progress value={plan.pct} className={`h-1 mb-3 [&>div]:${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-400' : 'bg-[var(--nyc-taxi)]'}`} />
                    <div className="flex justify-between text-xs text-[oklch(0.6_0_0)]">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5ч: {plan.fiveHour}</span>
                      <span>Неделя: {plan.weekly}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <SectionNav currentId="helper" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 04 — STAGEWISE ═══════════════ */}
            <section id="stagewise" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="04" title="Stagewise" subtitle="AI Browser для веб-разработчиков"  theme={theme} />

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Пользователи', value: '130K+', icon: Users },
                  { label: 'Технологии', value: 'Electron + React 19', icon: Cpu },
                  { label: 'Статус', value: 'Open Source', icon: Shield },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="nyc-card-enhanced rounded-xl p-5 text-center hover:border-[var(--nyc-taxi)]/15 transition-colors"
                  >
                    <stat.icon className="w-5 h-5 text-[var(--nyc-taxi)] mx-auto mb-2" />
                    <div className="font-black text-xl">{stat.value}</div>
                    <div className="text-[10px] text-[var(--nyc-steel)] font-mono uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { title: 'Визуальный контекст', desc: 'AI агент «видит» ваш DOM в реальном времени', icon: Eye },
                  { title: 'Console Monitoring', desc: 'Автоматический анализ ошибок консоли', icon: AlertTriangle },
                  { title: 'Element Selection', desc: 'Выбор UI элементов для редактирования', icon: Monitor },
                  { title: 'Code Generation', desc: 'Прямая генерация кода на основе визуального контекста', icon: Sparkles },
                ].map((feat, i) => (
                  <motion.div
                    key={feat.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="nyc-card-enhanced rounded-xl p-5 flex items-start gap-3 hover:border-[var(--nyc-taxi)]/15 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded bg-[var(--nyc-taxi)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--nyc-taxi)]/20 transition-colors">
                      <feat.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold tracking-tight mb-0.5">{feat.title}</div>
                      <div className="text-sm text-[oklch(0.7_0_0)] leading-relaxed">{feat.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Installation */}
              <Card className="nyc-card-enhanced rounded-xl mb-6">
                <CardHeader className="p-5 pb-2">
                  <CardTitle className="text-sm font-semibold tracking-tight">Установка</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <span className="text-[10px] text-[var(--nyc-steel)] font-mono uppercase tracking-wider mb-1.5 block">Desktop приложение</span>
                    <CodeBlock code="# Скачать с официального сайта\n# https://stagewise.io\n\n# Или через npm (toolbar extension)\nnpx stagewise@latest" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--nyc-steel)] font-mono uppercase tracking-wider mb-1.5 block">IDE Extension (Cursor, Windsurf, VS Code)</span>
                    <CodeBlock code={'# Установка расширения через marketplace\n# Search: "stagewise" или "21st.dev"'} />
                  </div>
                </CardContent>
              </Card>

              {/* Workflow */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-4">Workflow</h3>
                <div className="relative">
                  <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[var(--nyc-taxi)]/15" />
                  <div className="space-y-3">
                    {[
                      'Открыть Stagewise Browser',
                      'Загрузить URL работающего приложения (localhost:3000)',
                      'Нажать на элемент для выбора (или использовать toolbar)',
                      'AI агент получает контекст: DOM, стили, console errors',
                      'Описать желаемые изменения на естественном языке',
                      'AI генерирует код изменений',
                      'Применить изменения к локальному проекту',
                    ].map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-4 text-xs pl-1"
                      >
                        <div className="w-6 h-6 rounded-full bg-background border-2 border-[var(--nyc-taxi)]/30 flex items-center justify-center shrink-0 z-10">
                          <span className="text-[var(--nyc-taxi)] font-mono text-[10px] font-bold">{i + 1}</span>
                        </div>
                        <span className="text-[var(--nyc-concrete)] pt-1">{step}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <Card className="nyc-card-enhanced overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className={`border-b border-[var(--nyc-taxi)]/15 ${th('bg-[oklch(0.14_0_0)]', 'bg-[oklch(0.95_0_0)]')}`}>
                        <th className={`text-left py-3 px-4 font-mono ${th('text-[oklch(0.75_0_0)]', 'text-[oklch(0.3_0_0)]')}`}>Функция</th>
                        <th className="text-center py-3 px-3 font-mono text-[var(--nyc-taxi)]">Stagewise</th>
                        <th className={`text-center py-3 px-3 font-mono ${th('text-[oklch(0.75_0_0)]', 'text-[oklch(0.3_0_0)]')}`}>Cursor AI</th>
                        <th className={`text-center py-3 px-3 font-mono ${th('text-[oklch(0.75_0_0)]', 'text-[oklch(0.3_0_0)]')}`}>Cline</th>
                        <th className={`text-center py-3 px-3 font-mono ${th('text-[oklch(0.75_0_0)]', 'text-[oklch(0.3_0_0)]')}`}>OpenCode</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Визуальный контекст', true, false, false, false],
                        ['DOM Analysis', true, false, false, false],
                        ['Console Integration', true, false, false, false],
                        ['Desktop App', true, true, false, false],
                        ['File System Access', true, true, true, true],
                        ['MCP Support', 'plugin', true, true, true],
                        ['Open Source', true, false, true, true],
                      ].map(([name, ...vals]) => (
                        <tr key={name as string} className={`border-b ${th('border-white/[0.08] hover:bg-white/[0.04]', 'border-oklch(0.85_0_0) hover:bg-oklch(0.93_0_0)')} transition-colors`}>
                          <td className={`py-4 px-4 font-mono font-semibold text-sm ${th('text-[oklch(0.85_0_0)]', 'text-[oklch(0.2_0_0)]')}`}>{name as string}</td>
                          {vals.map((v, i) => (
                            <td key={i} className="text-center py-2.5 px-3">
                              <StatusDot status={v as boolean | string} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            <SectionNav currentId="stagewise" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 05 — INSTALLATION ═══════════════ */}
            <section id="install" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="05" title="Установка и настройка" subtitle="step_by_step_guide"  theme={theme} />

              {/* API Keys */}
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Key className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  API ключи
                </h3>
                <div className="space-y-2">
                  {[
                    { key: 'Z.AI API Key', source: 'z.ai', purpose: 'GLM Coding Plan', store: 'coding-helper auth' },
                    { key: 'Magic API Key', source: '21st.dev/magic console', purpose: 'Magic MCP', store: 'mcpServers.magic.env' },
                    { key: 'Google OAuth', source: 'Auto via stitch-mcp init', purpose: 'Stitch авторизация', store: 'Автоматически' },
                    { key: 'Anthropic Key', source: 'console.anthropic.com', purpose: 'Claude модели', store: 'config provider' },
                    { key: 'OpenAI Key', source: 'platform.openai.com', purpose: 'GPT модели', store: 'config provider' },
                  ].map(k => (
                    <div key={k.key} className={`p-3 border ${th('border-white/[0.06] bg-[oklch(0.12_0_0)]', 'border-oklch(0.85_0_0) bg-[oklch(0.97_0_0)]')} rounded-lg flex flex-col sm:flex-row sm:items-center gap-2 text-xs hover:border-[var(--nyc-taxi)]/10 transition-colors`}>
                      <span className="font-bold text-[var(--nyc-taxi)] min-w-[130px] flex items-center gap-2">
                        <Key className="w-3 h-3" />
                        {k.key}
                      </span>
                      <span className="text-[var(--nyc-concrete)] flex-1">{k.purpose}</span>
                      <span className={`${th('text-white/25', 'text-oklch(0.5_0_0)')} font-mono text-[10px]`}>{k.source}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Install Commands */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-base font-semibold flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[var(--nyc-taxi)]" />
                    Команды установки
                  </h3>
                  <CopyAllButton />
                </div>

                {[
                  { num: '01', title: 'OpenCode', code: 'curl -fsSL https://opencode.ai/install | bash\nopencode --version' },
                  { num: '02', title: 'Coding Tool Helper', code: 'npx @z_ai/coding-helper\n# Follow wizard: language -> plan -> API key -> tools -> MCP' },
                  { num: '03', title: 'Stitch MCP', code: 'npx @_davideast/stitch-mcp init' },
                  { num: '04', title: 'UI UX Pro Max Skill', code: 'npx skills add nextlevelbuilder/ui-ux-pro-max-skill --global' },
                ].map((step) => (
                  <div key={step.num}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-[var(--nyc-taxi)] font-bold">{step.num}</span>
                      <span className="text-sm font-semibold tracking-tight">{step.title}</span>
                    </div>
                    <CodeBlock code={step.code} />
                  </div>
                ))}

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[var(--nyc-taxi)] font-bold">05</span>
                    <span className="text-sm font-semibold tracking-tight">Cline (VS Code)</span>
                  </div>
                  <div className={`p-4 border ${th('border-white/[0.06] bg-white/[0.04]', 'border-oklch(0.82_0_0) bg-oklch(0.95_0_0)')} rounded-lg text-xs space-y-1.5 text-[var(--nyc-concrete)]`}>
                    <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">1.</span> Open VS Code</p>
                    <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">2.</span> Ctrl+Shift+X → Search &quot;Cline&quot; → Install</p>
                    <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">3.</span> Restart VS Code</p>
                    <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">4.</span> Open Cline panel → Settings → Configure MCP</p>
                  </div>
                </div>
              </div>

              {/* Config Templates */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  Шаблоны конфигурации
                </h3>

                <Tabs defaultValue="opencode" className="w-full">
                  <TabsList className={`${th('bg-white/[0.03] border-white/[0.06]', 'bg-oklch(0.95_0_0) border-oklch(0.82_0_0)')} border mb-3 h-9`}>
                    <TabsTrigger value="opencode" className="text-xs data-[state=active]:bg-[var(--nyc-taxi)] data-[state=active]:text-black data-[state=active]:font-bold h-7 px-3">
                      OpenCode
                    </TabsTrigger>
                    <TabsTrigger value="cline" className="text-xs data-[state=active]:bg-[var(--nyc-taxi)] data-[state=active]:text-black data-[state=active]:font-bold h-7 px-3">
                      Cline/VS Code
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="opencode">
                    <CodeBlock
                      code={`// ~/.config/opencode/config.json
{
  "provider": "anthropic",
  "model": "claude-sonnet-4-20250514",
  "mcpServers": {
    "magic": {
      "command": "npx",
      "args": ["-y", "21st-dev/magic-mcp"],
      "env": { "MAGIC_API_KEY": "your-key-here" }
    },
    "stitch": {
      "command": "npx",
      "args": ["@_davideast/stitch-mcp", "proxy"]
    }
  },
  "rules": [
    "Use shadcn/ui components when available",
    "Use Tailwind CSS for styling",
    "Generate TypeScript with proper types"
  ]
}`}
                      lang="json"
                    />
                  </TabsContent>
                  <TabsContent value="cline">
                    <CodeBlock
                      code={`// ~/.cline/data/settings/cline_mcp_settings.json
{
  "mcpServers": {
    "magic": {
      "command": "npx",
      "args": ["-y", "21st-dev/magic-mcp"],
      "env": { "MAGIC_API_KEY": "your-key-here" }
    },
    "stitch": {
      "command": "npx",
      "args": ["@_davideast/stitch-mcp", "proxy"]
    }
  }
}`}
                      lang="json"
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Install Script Generator */}
              <InstallScriptGenerator installSelections={installSelections} setInstallSelections={setInstallSelections} theme={theme} />
            </section>

            <SectionNav currentId="install" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 06 — MCP SERVERS ═══════════════ */}
            <section id="mcp" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="06" title="MCP-серверы" subtitle="model_context_protocol_servers"  theme={theme} />

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {MCP_SERVERS.map((server, i) => (
                  <motion.div
                    key={server.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="nyc-card-enhanced rounded-xl h-full border-l-2 border-l-taxi-accent">
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded bg-[var(--nyc-taxi)]/10 flex items-center justify-center">
                            <server.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                          </div>
                          <span className="text-sm font-semibold tracking-tight">{server.name}</span>
                        </div>
                        <p className="text-sm text-[oklch(0.7_0_0)] leading-relaxed mb-2">{server.desc}</p>
                        <Badge className="text-[10px] bg-white/5 text-[var(--nyc-concrete)] font-mono border-0">
                          {server.tool}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Transport Protocols */}
              <div className={`p-4 border ${th('border-white/[0.06]', 'border-oklch(0.82_0_0)')} rounded-lg nyc-card-enhanced`}>
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  Транспортные протоколы
                </h3>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  {[
                    ['Claude Code', 'HTTP с заголовком авторизации'],
                    ['Cline (VS Code)', 'Streamable HTTP'],
                    ['Roo Code, Kilo Code', 'SSE'],
                    ['Crush', 'JSON Schema'],
                  ].map(([client, transport]) => (
                    <div key={client} className={`flex items-center justify-between p-2.5 rounded ${th('bg-white/[0.03] border-white/[0.04]', 'bg-oklch(0.95_0_0) border-oklch(0.85_0_0)')} border`}>
                      <span className="font-mono text-[oklch(0.72_0_0)]">{client}</span>
                      <span className={`${th('text-white/45', 'text-oklch(0.45_0_0)')} text-[10px]`}>{transport}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <SectionNav currentId="mcp" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 07 — PROMPT TEMPLATES ═══════════════ */}
            <section id="prompts" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="07" title="Промпт-шаблоны" subtitle="ready_to_use_prompt_templates"  theme={theme} />

              <div className="space-y-4 mb-8">
                {PROMPT_TEMPLATES.map((tmpl, i) => (
                  <motion.div
                    key={tmpl.category}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="nyc-card-enhanced">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <tmpl.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                          {tmpl.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="relative">
                          <div className={`relative rounded-md ${th('bg-[oklch(0.08_0_0)] border-white/[0.06]', 'bg-[oklch(0.97_0_0)] border-oklch(0.85_0_0)')} p-3 pr-12 text-xs`}>
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]/60" />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]/60" />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F]/60" />
                            </div>
                            <pre className="text-[var(--nyc-concrete)] font-mono whitespace-pre-wrap">{tmpl.prompt}</pre>
                          </div>
                          <CopyButton text={tmpl.prompt} className="absolute top-1.5 right-1.5" theme={theme} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Ready Prompts */}
              <div className={`p-5 border ${th('border-white/[0.06]', 'border-oklch(0.82_0_0)')} rounded-lg nyc-card-enhanced`}>
                <h3 className="text-base font-semibold mb-3">Готовые промпты</h3>
                <div className="space-y-2.5">
                  {READY_PROMPTS.map(p => (
                    <div key={p.cat} className="flex items-start gap-3 text-xs">
                      <Badge className="text-[10px] bg-[var(--nyc-taxi)]/10 text-[var(--nyc-taxi)] border-0 shrink-0 mt-0.5 font-bold">
                        {p.cat}
                      </Badge>
                      <span className="text-[var(--nyc-concrete)] font-mono leading-relaxed">{p.prompt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <SectionNav currentId="prompts" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 08 — COST SCENARIOS ═══════════════ */}
            <section id="cost" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="08" title="Сценарии стоимости" subtitle="cost_scenarios"  theme={theme} />

              <div className="grid sm:grid-cols-2 gap-5">
                {COST_SCENARIOS.map((scenario, i) => (
                  <motion.div
                    key={scenario.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className={`${i === 3 ? 'nyc-card-highlight-enhanced shadow-xl shadow-[var(--nyc-taxi)]/10' : i === 0 ? 'nyc-card-enhanced border-l-2 border-l-green-500/30' : i === 1 ? 'nyc-card-enhanced border-l-2 border-l-blue-400/30' : 'nyc-card-enhanced border-l-2 border-l-[var(--nyc-taxi)]/40'} rounded-xl h-full nyc-card-inner-light`}>
                      <CardHeader className="p-5 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <span className="text-xl">{scenario.emoji}</span>
                            {scenario.name}
                          </CardTitle>
                          <span className="text-lg font-black text-[var(--nyc-taxi)]">{scenario.price}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-5 space-y-3">
                        <Progress value={scenario.pct} className={`h-1.5 [&>div]:${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-blue-400' : i === 2 ? 'bg-[var(--nyc-taxi)]' : 'bg-[var(--nyc-subway)]'}`} />
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-[var(--nyc-steel)] font-mono text-[10px] uppercase tracking-wider">Инструменты</span>
                            <p className="text-[var(--nyc-concrete)] mt-0.5 leading-relaxed">{scenario.tools}</p>
                          </div>
                          <div>
                            <span className="text-[var(--nyc-steel)] font-mono text-[10px] uppercase tracking-wider">API ключи</span>
                            <p className="text-[var(--nyc-concrete)] mt-0.5">{scenario.keys}</p>
                          </div>
                          <div>
                            <span className="text-[var(--nyc-steel)] font-mono text-[10px] uppercase tracking-wider">Назначение</span>
                            <p className="text-[var(--nyc-concrete)] mt-0.5">{scenario.purpose}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            <SectionNav currentId="cost" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 08.5 — PLAN WIZARD ═══════════════ */}
            <section id="wizard" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="08.5" title="Мастер выбора плана" subtitle="plan_comparison_wizard"  theme={theme} />

              <Card className="nyc-card-enhanced p-6">
                <CardContent className="p-0">
                  <p className="text-sm text-[var(--nyc-concrete)] mb-6 nyc-text-readable">Ответьте на несколько вопросов, чтобы подобрать оптимальный план:</p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-mono text-[var(--nyc-taxi)] uppercase tracking-wider mb-2">Тип использования</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: 'Обучение', value: 'learn' },
                          { label: 'Фриланс', value: 'freelance' },
                          { label: 'Команда', value: 'team' },
                        ].map(opt => (
                          <motion.div
                            key={opt.value}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setWizardUsage(opt.value)}
                            className={`p-3 rounded-lg border text-center text-xs cursor-pointer transition-all nyc-hover-lift ${
                              wizardUsage === opt.value
                                ? 'border-[var(--nyc-taxi)]/30 bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)]'
                                : th('border-white/[0.06] bg-white/[0.02] hover:border-[var(--nyc-taxi)]/20 hover:bg-[var(--nyc-taxi)]/[0.03]', 'border-oklch(0.82_0_0) bg-oklch(0.96_0_0) hover:border-[var(--nyc-taxi)]/20 hover:bg-[var(--nyc-taxi)]/[0.03]')
                            }`}
                          >
                            <span className={wizardUsage === opt.value ? 'text-[var(--nyc-taxi)] font-bold' : 'text-[var(--nyc-concrete)]'}>{opt.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono text-[var(--nyc-taxi)] uppercase tracking-wider mb-2">Бюджет</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: '$0', value: 'free' },
                          { label: '$20-60', value: 'mid' },
                          { label: '$100+', value: 'pro' },
                        ].map(opt => (
                          <motion.div
                            key={opt.value}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setWizardBudget(opt.value)}
                            className={`p-3 rounded-lg border text-center text-xs cursor-pointer transition-all nyc-hover-lift ${
                              wizardBudget === opt.value
                                ? 'border-[var(--nyc-taxi)]/30 bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)]'
                                : th('border-white/[0.06] bg-white/[0.02] hover:border-[var(--nyc-taxi)]/20 hover:bg-[var(--nyc-taxi)]/[0.03]', 'border-oklch(0.82_0_0) bg-oklch(0.96_0_0) hover:border-[var(--nyc-taxi)]/20 hover:bg-[var(--nyc-taxi)]/[0.03]')
                            }`}
                          >
                            <span className={wizardBudget === opt.value ? 'text-[var(--nyc-taxi)] font-bold' : 'text-[var(--nyc-concrete)]'}>{opt.label}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono text-[var(--nyc-taxi)] uppercase tracking-wider mb-2">Ключевые инструменты</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Magic MCP', 'Stitch MCP', 'UI UX Pro Max', 'OpenCode', 'Stagewise', 'GLM Coding Plan'].map(tool => (
                          <Badge
                            key={tool}
                            onClick={() => toggleWizardTool(tool)}
                            className={`text-[10px] cursor-pointer transition-all ${
                              wizardTools.includes(tool)
                                ? 'bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] border-[var(--nyc-taxi)]/20'
                                : th('bg-white/[0.03] text-[var(--nyc-concrete)] border-white/[0.06] hover:bg-[var(--nyc-taxi)]/10 hover:text-[var(--nyc-taxi)] hover:border-[var(--nyc-taxi)]/20', 'bg-oklch(0.95_0_0) text-oklch(0.35_0_0) border-oklch(0.82_0_0) hover:bg-[var(--nyc-taxi)]/10 hover:text-[var(--nyc-taxi)] hover:border-[var(--nyc-taxi)]/20')
                            }`}
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className={`pt-4 border-t ${th('border-white/[0.06]', 'border-oklch(0.82_0_0)')}`}>
                      {wizardRecommendation ? (
                        <motion.div
                          key={`${wizardUsage}-${wizardBudget}`}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-[var(--nyc-taxi)]/[0.05] border border-[var(--nyc-taxi)]/10"
                        >
                          <Zap className="w-4 h-4 text-[var(--nyc-taxi)] shrink-0" />
                          <div className="text-xs">
                            <span className="text-[var(--nyc-concrete)]">Рекомендация: </span>
                            <span className="text-[var(--nyc-taxi)] font-bold">{wizardRecommendation.plan}</span>
                            <span className="text-[var(--nyc-steel)]"> — {wizardRecommendation.name} ({wizardRecommendation.price})</span>
                          </div>
                        </motion.div>
                      ) : (
                        <div className={`flex items-center gap-3 p-3 rounded-lg ${th('bg-white/[0.02] border-white/[0.06]', 'bg-oklch(0.96_0_0) border-oklch(0.82_0_0)')} border`}>
                          <Hash className="w-4 h-4 text-[var(--nyc-steel)] shrink-0" />
                          <div className="text-xs text-[var(--nyc-steel)]">
                            Выберите тип использования и бюджет для получения рекомендации
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <SectionNav currentId="wizard" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 09 — TROUBLESHOOTING ═══════════════ */}
            <section id="troubleshoot" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="09" title="Диагностика и решение проблем" subtitle="troubleshooting_guide"  theme={theme} />

              {/* Diagnostic Commands */}
              <Card className="nyc-card-enhanced mb-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-semibold tracking-tight flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[var(--nyc-taxi)]" />
                    Диагностические команды
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-1.5">
                  {[
                    { cmd: 'node --version', note: '# need >= 18.0.0' },
                    { cmd: 'opencode --version', note: '' },
                    { cmd: 'coding-helper doctor', note: '' },
                    { cmd: 'npx @_davideast/stitch-mcp --help', note: '' },
                    { cmd: 'npx skills list --global', note: '' },
                  ].map(diag => (
                    <div key={diag.cmd} className={`flex items-center gap-2 rounded-md ${th('bg-[oklch(0.08_0_0)] border-white/[0.06]', 'bg-[oklch(0.97_0_0)] border-oklch(0.85_0_0)')} px-3 py-2 text-xs`}>
                      <span className="text-[var(--nyc-taxi)]">❯</span>
                      <span className="text-[var(--nyc-concrete)] font-mono">{diag.cmd}</span>
                      {diag.note && <span className={th('text-white/15', 'text-oklch(0.55_0_0)')}>{diag.note}</span>}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Error Accordion */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold">Ошибки и решения</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setErrorExpanded(ERRORS.map((_, i) => `error-${i}`))}
                    className={`text-[10px] font-mono text-[var(--nyc-steel)] hover:text-[var(--nyc-taxi)] px-2 py-1 rounded ${th('hover:bg-white/5', 'hover:bg-oklch(0.93_0_0)')} transition-colors`}
                  >
                    Раскрыть все
                  </button>
                  <span className={th('text-white/10', 'text-oklch(0.7_0_0)')}>|</span>
                  <button
                    onClick={() => setErrorExpanded([])}
                    className={`text-[10px] font-mono text-[var(--nyc-steel)] hover:text-[var(--nyc-taxi)] px-2 py-1 rounded ${th('hover:bg-white/5', 'hover:bg-oklch(0.93_0_0)')} transition-colors`}
                  >
                    Свернуть все
                  </button>
                </div>
              </div>
              <Accordion type="multiple" value={errorExpanded} onValueChange={setErrorExpanded} className="space-y-1.5">
                {ERRORS.map((err, i) => (
                  <AccordionItem
                    key={i}
                    value={`error-${i}`}
                    className={`border ${th('border-white/[0.08] bg-[oklch(0.11_0_0)]', 'border-oklch(0.85_0_0) bg-[oklch(0.97_0_0)]')} rounded-lg px-4 data-[state=open]:border-[var(--nyc-taxi)]/20 data-[state=open]:bg-[var(--nyc-taxi)]/[0.04]`}
                  >
                    <AccordionTrigger className="text-xs hover:no-underline py-3 gap-2">
                      <div className="flex items-center gap-2 text-left">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400/60 shrink-0" />
                        <span className="font-mono text-[var(--nyc-concrete)]">{err.error}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs pb-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-red-400/70 font-mono text-[10px] uppercase shrink-0 mt-0.5">Причина:</span>
                        <span className="text-[var(--nyc-steel)]">{err.cause}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400/70 font-mono text-[10px] uppercase shrink-0 mt-0.5">Решение:</span>
                        <span className="text-[var(--nyc-concrete)]">{err.fix}</span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <SectionNav currentId="troubleshoot" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 09.5 — FAQ ═══════════════ */}
            <section id="faq" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="09.5" title="Часто задаваемые вопросы" subtitle="faq"  theme={theme} />

              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold">Ответы</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFaqExpanded(FAQ_ITEMS.map((_, i) => `faq-${i}`))}
                    className={`text-[10px] font-mono text-[var(--nyc-steel)] hover:text-[var(--nyc-taxi)] px-2 py-1 rounded ${th('hover:bg-white/5', 'hover:bg-oklch(0.93_0_0)')} transition-colors`}
                  >
                    Раскрыть все
                  </button>
                  <span className={th('text-white/10', 'text-oklch(0.7_0_0)')}>|</span>
                  <button
                    onClick={() => setFaqExpanded([])}
                    className={`text-[10px] font-mono text-[var(--nyc-steel)] hover:text-[var(--nyc-taxi)] px-2 py-1 rounded ${th('hover:bg-white/5', 'hover:bg-oklch(0.93_0_0)')} transition-colors`}
                  >
                    Свернуть все
                  </button>
                </div>
              </div>
              <Accordion type="multiple" value={faqExpanded} onValueChange={setFaqExpanded} className="space-y-1.5">
                {FAQ_ITEMS.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className={`border ${th('border-white/[0.08] bg-[oklch(0.11_0_0)]', 'border-oklch(0.85_0_0) bg-[oklch(0.97_0_0)]')} rounded-lg px-4 data-[state=open]:border-[var(--nyc-taxi)]/20 data-[state=open]:bg-[var(--nyc-taxi)]/[0.04]`}
                  >
                    <AccordionTrigger className="text-xs hover:no-underline py-3 gap-2">
                      <div className="flex items-center gap-2 text-left">
                        <MessageSquare className="w-3.5 h-3.5 text-[var(--nyc-taxi)]/80 shrink-0" />
                        <span className="font-bold text-[var(--nyc-concrete)]">{faq.q}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs pb-3">
                      <span className="text-[var(--nyc-steel)] leading-relaxed">{faq.a}</span>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <SectionNav currentId="faq" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 10 — ARCHITECTURE ═══════════════ */}
            <section id="architecture" className="py-16 lg:py-24 nyc-section-hover-border">
              <SectionHeader number="10" title="Архитектура системы" subtitle="system_architecture_diagram"  theme={theme} />

              <Card className="nyc-card-enhanced rounded-xl overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className={`rounded-md ${th('bg-[oklch(0.08_0_0)] border-white/[0.06]', 'bg-[oklch(0.96_0_0)] border-oklch(0.85_0_0)')} p-4 text-xs sm:text-sm overflow-x-auto`}>
                    <pre className="text-[var(--nyc-concrete)] font-mono leading-relaxed whitespace-pre">{`┌──────────────────────────────────────────────────┐
│                  YOUR WORKSTATION                 │
├──────────────────────────────────────────────────┤
│                                                   │
│  ┌─────────────┐ ┌─────────────┐ ┌────────────┐ │
│  │  chat.z.ai  │ │  zcode.z.ai │ │  VS Code   │ │
│  │ (consult)   │ │  (full IDE) │ │  + Cline   │ │
│  └──────┬──────┘ └──────┬──────┘ └─────┬──────┘ │
│         └───────────────┼──────────────┘        │
│                         │                        │
│              ┌──────────▼──────────┐             │
│              │    OPENCODE (CLI)   │             │
│              └──────────┬──────────┘             │
│                         │                        │
│    ┌──────┬──────┬──────┼──────┬──────┐         │
│    ▼      ▼      ▼      ▼      ▼      ▼         │
│  Magic  Stitch  UI UX  v0.dev  Ollama          │
│   MCP    MCP   Pro Max  Free  (local)          │
│    │      │      │      │      │                │
│    └──────┴──────┴──────┴──────┘                │
│                    │                              │
│          ┌─────────▼─────────┐                   │
│          │   YOUR PROJECT    │                   │
│          │   (output code)   │                   │
│          └───────────────────┘                   │
└──────────────────────────────────────────────────┘`}</pre>
                  </div>
                </CardContent>
              </Card>

              {/* Supported Tools */}
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { name: 'Claude Code', status: 'Основной', desc: 'Полный маппинг моделей GLM' },
                  { name: 'OpenCode', status: 'Поддерживается', desc: 'Настройка endpoint и API-ключа' },
                  { name: 'Crush', status: 'Поддерживается', desc: 'JSON Schema конфигурация' },
                  { name: 'Factory Droid', status: 'Поддерживается', desc: 'Конфигурационные файлы' },
                ].map(tool => (
                  <div key={tool.name} className={`p-4 border ${th('border-white/[0.08] bg-[oklch(0.12_0_0)]', 'border-oklch(0.85_0_0) bg-[oklch(0.97_0_0)]')} rounded-lg hover:border-[var(--nyc-taxi)]/15 hover:shadow-md hover:shadow-black/10 transition-all duration-200`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold tracking-tight">{tool.name}</span>
                      <Badge className={`text-[10px] border-0 ${
                        tool.status === 'Основной'
                          ? 'bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)]'
                          : 'bg-white/5 text-[var(--nyc-steel)]'
                      }`}>
                        {tool.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-[var(--nyc-steel)]">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <SectionNav currentId="architecture" theme={theme} />
            <TaxiDivider theme={theme} />

            {/* ═══════════════ 11 — CHECKLIST ═══════════════ */}
            <section id="checklist" className="py-12 pb-16 lg:py-20 lg:pb-20">
              <SectionHeader number="11" title="Чек-лист перед началом работы" subtitle="pre_launch_checklist"  theme={theme} />

              <Card className="nyc-card-enhanced">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-sm font-semibold tracking-tight">Прогресс настройки</span>
                      {checkedCount > 0 && (
                        <button
                          onClick={() => setCheckedItems({})}
                          className={`ml-auto text-[10px] font-mono ${th('text-white/20', 'text-oklch(0.5_0_0)')} hover:text-red-400 transition-colors px-2 py-0.5 rounded hover:bg-red-400/5`}
                        >
                          Сбросить
                        </button>
                      )}
                    </div>
                    <span className="text-[var(--nyc-taxi)] font-mono font-bold text-xs">{checkedCount}/{CHECKLIST_ITEMS.length}</span>
                  </div>
                  <Progress
                    value={(checkedCount / CHECKLIST_ITEMS.length) * 100}
                    className="h-2 mb-6 [&>div]:bg-[var(--nyc-taxi)]"
                  />
                  {checkedCount === CHECKLIST_ITEMS.length && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-4 p-3 rounded-lg bg-green-400/10 border border-green-400/20 text-center text-xs text-green-400 font-bold"
                    >
                      🎉 Все готово! Среда разработки настроена.
                    </motion.div>
                  )}
                  <div className="space-y-1">
                    {CHECKLIST_ITEMS.map((item, i) => (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => toggleCheck(item.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg ${th('hover:bg-white/[0.03]', 'hover:bg-oklch(0.93_0_0)')} transition-all duration-200 text-left group`}
                      >
                        {checkedItems[item.id] ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 rounded-md bg-[var(--nyc-taxi)] flex items-center justify-center"
                          >
                            <Check className="w-3 h-3 text-black" />
                          </motion.div>
                        ) : (
                          <div className={`w-5 h-5 rounded-md border-2 ${th('border-white/10', 'border-oklch(0.75_0_0)')} group-hover:border-[var(--nyc-taxi)]/30 transition-colors`} />
                        )}
                        <item.icon className={`w-4 h-4 transition-colors ${checkedItems[item.id] ? 'text-[var(--nyc-taxi)]' : th('text-white/20', 'text-oklch(0.55_0_0)')}`} />
                        <span className={`text-sm transition-colors ${
                          checkedItems[item.id]
                            ? 'text-[var(--nyc-taxi)] line-through opacity-60'
                            : 'text-[var(--nyc-concrete)]'
                        }`}>
                          {item.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sources */}
              <Card className="nyc-card-enhanced mt-8">
                <CardContent className="p-5">
                  <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[var(--nyc-taxi)]" />
                    Источники
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs max-h-80 overflow-y-auto">
                    {SOURCES.map(s => (
                      <a
                        key={s.id}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`nyc-link-hover flex items-center gap-2 p-2 rounded ${th('bg-white/[0.02] hover:bg-white/[0.05]', 'bg-oklch(0.96_0_0) hover:bg-oklch(0.93_0_0)')} transition-colors group`}
                      >
                        <span className="text-[var(--nyc-taxi)] font-mono text-[10px]">{s.id}</span>
                        <span className="text-[var(--nyc-concrete)] group-hover:text-[var(--nyc-taxi)] transition-colors">{s.desc}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-[var(--nyc-taxi)]/30 group-hover:text-[var(--nyc-taxi)] ml-auto transition-colors" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>

        {/* ── QUICK JUMP WIDGET ── */}
        <AnimatePresence>
          {showQuickStart && (
            <div ref={quickJumpRef} className="fixed bottom-20 right-6 lg:bottom-6 z-30 flex flex-col items-end gap-2">
              <AnimatePresence>
                {quickJumpOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`${th('bg-[oklch(0.14_0_0)] border-white/10', 'bg-[oklch(0.97_0_0)] border-oklch(0.85_0_0)')} rounded-xl shadow-2xl overflow-hidden w-48`}
                  >
                    <div className={`px-3 py-2 border-b ${th('border-white/[0.06]', 'border-oklch(0.85_0_0)')}`}>
                      <span className="font-mono text-[10px] text-[var(--nyc-steel)] tracking-wider uppercase">Быстрый переход</span>
                    </div>
                    {[
                      { label: 'Установка', id: 'install', icon: Terminal },
                      { label: 'MCP Серверы', id: 'mcp', icon: Cable },
                      { label: 'Чек-лист', id: 'checklist', icon: CheckCircle2 },
                    ].map(item => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setQuickJumpOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 text-sm ${th('text-white/60 hover:text-[var(--nyc-taxi)] hover:bg-white/5', 'text-oklch(0.35_0_0) hover:text-[var(--nyc-taxi)] hover:bg-oklch(0.93_0_0)')} transition-colors`}
                      >
                        <item.icon className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setQuickJumpOpen(prev => !prev)}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--nyc-taxi)] text-black shadow-lg shadow-[var(--nyc-taxi)]/25 hover:bg-[var(--nyc-amber)] transition-all nyc-pulse-ring"
                aria-label="Быстрый переход"
              >
                <Rocket className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </AnimatePresence>

        {/* ── SCROLL TO TOP ── */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full ${th('bg-[oklch(0.14_0_0)] border-white/10 text-white/60 shadow-black/30', 'bg-[oklch(0.97_0_0)] border-oklch(0.82_0_0) text-oklch(0.4_0_0) shadow-black/5')} hover:text-[var(--nyc-taxi)] hover:border-[var(--nyc-taxi)]/20 shadow-lg backdrop-blur-sm transition-all`}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span className="text-xs font-mono">Наверх</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── FOOTER ── */}
        <footer className="mt-auto relative z-10">
          <div className={`${th('bg-gradient-to-b from-[oklch(0.08_0_0)] to-[oklch(0.06_0_0)] border-white/5', 'bg-gradient-to-b from-[oklch(0.95_0_0)] to-[oklch(0.93_0_0)] border-oklch(0.85_0_0)')} border-t`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-14">
              <div className="grid sm:grid-cols-3 gap-6 items-start">
                {/* Left: Brand */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-[var(--nyc-taxi)] rotate-45 nyc-glow-subtle" />
                    <span className="font-mono text-xs font-bold tracking-wider text-[var(--nyc-taxi)]">
                      UI GENERATION STACK
                    </span>
                  </div>
                  <p className="text-xs text-[var(--nyc-steel)] leading-relaxed max-w-xs">
                    Единое руководство по установке и настройке AI-инструментов разработки. Coding Tool Helper, OpenCode, Stagewise и MCP-серверы.
                  </p>
                </div>
                {/* Center: Quick Nav */}
                <div className="flex flex-col items-center gap-2">
                  <span className={`font-mono text-[10px] ${th('text-white/25', 'text-oklch(0.5_0_0)')} uppercase tracking-widest mb-1`}>Навигация</span>
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                    {[
                      { href: '#matrix', label: 'Матрица' },
                      { href: '#install', label: 'Установка' },
                      { href: '#cost', label: 'Стоимость' },
                      { href: '#faq', label: 'FAQ' },
                      { href: '#checklist', label: 'Чек-лист' },
                    ].map(link => (
                      <a key={link.href} href={link.href} className="text-xs text-[var(--nyc-steel)] hover:text-[var(--nyc-taxi)] transition-colors">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                {/* Right: Meta */}
                <div className="flex flex-col items-start sm:items-end gap-1.5">
                  <div className={`flex items-center gap-2 text-[10px] ${th('text-white/25', 'text-oklch(0.45_0_0)')} font-mono`}>
                    <span>v1.0</span>
                    <span className={th('text-white/10', 'text-oklch(0.7_0_0)')}>·</span>
                    <span>22.04.2026</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400/70 text-[11px]">PRODUCTION READY</span>
                  </div>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--nyc-steel)] hover:text-[var(--nyc-taxi)] transition-colors mt-2"
                  >
                    <ArrowUp className="w-2.5 h-2.5" /> НАВЕРХ
                  </button>
                  <a
                    href="https://docs.z.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] text-[var(--nyc-steel)] hover:text-[var(--nyc-taxi)] transition-colors font-mono mt-1"
                  >
                    DOCS.Z.AI <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <span className={`text-[9px] ${th('text-white/15', 'text-oklch(0.6_0_0)')} font-mono mt-2`}>© 2026 Z.AI</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Section completion toast */}
      <AnimatePresence>
        {visitedSections.size === TOC_ITEMS.length && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-green-500/10 border border-green-500/20 shadow-lg shadow-green-500/5 backdrop-blur-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-sm font-bold text-green-400">Все разделы прочитаны!</div>
              <div className="text-xs text-green-400/60">Вы ознакомились со всеми разделами руководства</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} />

      {/* Command Center Panel */}
      <CommandCenter
        sections={CC_SECTIONS}
        theme={{ accent: '#FFC107', bg: '#0c0c14' }}
        animation="slide-up"
        trigger={{ position: 'right', size: 44, accent: '#FFC107' }}
        persistState="guide"
        searchable={true}
        showShortcuts={true}
        maxWidth="960px"
      />
    </TooltipProvider>
    </BookmarkContext.Provider>
    </ToastContext.Provider>
  )
}
