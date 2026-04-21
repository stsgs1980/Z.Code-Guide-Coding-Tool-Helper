'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  Terminal,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
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
  Command,
  Hash,
  Rocket,
  Building2,
  Cable,
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
  { id: 'troubleshoot', label: '09', title: 'Диагностика', icon: AlertTriangle },
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

const SOURCES = [
  { id: 'S1', url: 'https://www.npmjs.com/package/@z_ai/coding-helper', desc: 'NPM Package' },
  { id: 'S2', url: 'https://docs.z.ai/devpack/extension/coding-tool-helper', desc: 'Coding Tool Helper Docs' },
  { id: 'S3', url: 'https://docs.z.ai/devpack/quick-start', desc: 'Quick Start Guide' },
  { id: 'S5', url: 'https://docs.z.ai/devpack/overview', desc: 'DevPack Overview' },
  { id: 'S19', url: 'https://docs.z.ai/', desc: 'Z.AI Documentation' },
  { id: 'S21', url: 'https://stagewise.io', desc: 'Stagewise Official Site' },
]

/* ───────────────────── FLOATING PARTICLES ───────────────────── */

function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    })), []
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--nyc-taxi)]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.1,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

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

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClose = useCallback(() => {
    setQuery('')
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
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-[101] bg-[oklch(0.17_0_0)] border border-white/10 rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search className="w-4 h-4 text-[var(--nyc-taxi)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по разделам..."
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />
              <kbd className="text-[10px] text-white/30 font-mono bg-white/5 px-1.5 py-0.5 rounded">ESC</kbd>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {results.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleClose}
                  className="flex items-center gap-3 px-3 py-2 rounded text-sm hover:bg-white/5 transition-colors"
                >
                  <span className="font-mono text-[var(--nyc-taxi)] text-xs w-5">{item.label}</span>
                  <item.icon className="w-3.5 h-3.5 text-white/40" />
                  <span className="text-white/70">{item.title}</span>
                </a>
              ))}
              {results.length === 0 && (
                <div className="px-3 py-6 text-center text-white/30 text-sm">Ничего не найдено</div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ───────────────────── COMPONENTS ───────────────────── */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded bg-white/5 hover:bg-[var(--nyc-taxi)]/10 transition-all duration-200 group"
      aria-label="Copy code"
    >
      {copied
        ? <Check className="w-3.5 h-3.5 text-green-400" />
        : <Copy className="w-3.5 h-3.5 text-white/30 group-hover:text-[var(--nyc-taxi)]" />
      }
    </button>
  )
}

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  return (
    <div className="relative group">
      <div className="code-block p-4 pr-12 overflow-x-auto text-sm leading-relaxed">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[var(--nyc-taxi)] text-[10px] font-mono uppercase tracking-wider opacity-70">{lang}</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-400/40" />
            <div className="w-2 h-2 rounded-full bg-yellow-400/40" />
            <div className="w-2 h-2 rounded-full bg-green-400/40" />
          </div>
        </div>
        <pre className="text-[var(--nyc-concrete)] font-mono whitespace-pre-wrap">{code}</pre>
      </div>
      <CopyButton text={code} />
    </div>
  )
}

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle?: string }) {
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
          <span className="section-number font-mono">{number}</span>
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-[var(--nyc-taxi)]/30 to-transparent" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-[var(--nyc-steel)] mt-1 text-xs font-mono tracking-wider">
          {'<'}{subtitle}{' />'}
        </p>
      )}
    </motion.div>
  )
}

function TaxiDivider() {
  return (
    <div className="flex items-center gap-3 my-16">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="flex items-center gap-1.5">
        <div className="w-1 h-1 bg-[var(--nyc-taxi)]/40" />
        <div className="w-2 h-2 bg-[var(--nyc-taxi)] rotate-45" />
        <div className="w-1 h-1 bg-[var(--nyc-taxi)]/40" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}

function StatusDot({ status }: { status: boolean | string }) {
  if (status === true) return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-400/10 text-green-400 text-xs">✓</span>
  if (status === false) return <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-400/10 text-red-400/50 text-xs">✗</span>
  return <span className="text-[var(--nyc-amber)] text-[10px] font-mono">{status as string}</span>
}

/* ───────────────────── MAIN PAGE ───────────────────── */

export default function Home() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileNav, setMobileNav] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600)
      const sections = TOC_ITEMS.map(item => document.getElementById(item.id))
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section) {
          const rect = section.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(TOC_ITEMS[i].id)
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

  const checkedCount = Object.values(checkedItems).filter(Boolean).length

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-background nyc-grid-bg">
        <FloatingParticles />
        <ReadingProgress />
        <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />

        {/* ── SIDE NAV (Desktop) ── */}
        <nav className="hidden lg:flex fixed left-0 top-0 h-full w-16 flex-col items-center py-6 gap-1 z-50 bg-background/80 backdrop-blur-md border-r border-white/5">
          <div className="w-3 h-3 bg-[var(--nyc-taxi)] rotate-45 mb-6 nyc-glow-subtle" />
          {TOC_ITEMS.map(item => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <a
                  href={`#${item.id}`}
                  className={`w-10 h-10 flex items-center justify-center rounded text-xs font-mono transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-[var(--nyc-taxi)] text-black font-bold nyc-glow-subtle'
                      : 'text-white/30 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-mono text-xs bg-[oklch(0.17_0_0)] border-white/10">
                {item.title}
              </TooltipContent>
            </Tooltip>
          ))}

          {/* Search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="w-10 h-10 flex items-center justify-center rounded text-xs text-white/30 hover:text-[var(--nyc-taxi)] hover:bg-white/5 transition-colors mt-2"
          >
            <Search className="w-3.5 h-3.5" />
          </button>

          <div className="mt-auto flex flex-col items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[var(--nyc-taxi)] animate-pulse" />
            <span className="text-[8px] text-white/20 font-mono writing-mode-vertical hidden xl:block" style={{ writingMode: 'vertical-rl' }}>Z.AI</span>
          </div>
        </nav>

        {/* ── MOBILE NAV ── */}
        <div className="lg:hidden fixed top-0.5 left-0 right-0 z-50 mx-2 mt-1">
          <div className="bg-background/90 backdrop-blur-md border border-white/10 rounded-lg shadow-lg">
            <div className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[var(--nyc-taxi)] rotate-45" />
                <span className="font-mono text-xs font-bold tracking-wider">GUIDE</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-white/40 hover:text-[var(--nyc-taxi)] transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileNav(!mobileNav)}
                  className="text-white/60 hover:text-white h-8 w-8"
                >
                  {mobileNav ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <AnimatePresence>
              {mobileNav && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-t border-white/5"
                >
                  <div className="max-h-80 overflow-y-auto p-3 space-y-0.5">
                    {TOC_ITEMS.map(item => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setMobileNav(false)}
                        className={`flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                          activeSection === item.id
                            ? 'bg-[var(--nyc-taxi)]/10 text-[var(--nyc-taxi)]'
                            : 'text-white/50 hover:text-white/80'
                        }`}
                      >
                        <item.icon className="w-3.5 h-3.5" />
                        <span className="font-mono text-xs w-5">{item.label}</span>
                        <span>{item.title}</span>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 lg:ml-16 pt-16 lg:pt-0 relative z-10">
          {/* ═══════════════ HERO ═══════════════ */}
          <section id="hero" className="relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="/nyc-hero.png"
                alt="New York City industrial skyline"
                className="w-full h-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
            </div>
            <div className="absolute inset-0 nyc-grid-dense opacity-50 z-[1]" />
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Version badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--nyc-taxi)]/10 border border-[var(--nyc-taxi)]/20 mb-6"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--nyc-taxi)] animate-pulse" />
                  <span className="font-mono text-[10px] text-[var(--nyc-taxi)] tracking-widest uppercase">
                    v1.0 · Production Ready · 22.04.2026
                  </span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] mb-5">
                  ЕДИНОЕ
                  <br />
                  <span className="text-[var(--nyc-taxi)] nyc-glow-subtle inline-block">РУКОВОДСТВО</span>
                </h1>
                <p className="text-base sm:text-lg text-[var(--nyc-steel)] max-w-2xl mb-8 leading-relaxed">
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
                      className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-3 hover:border-[var(--nyc-taxi)]/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <fact.icon className="w-3.5 h-3.5 text-[var(--nyc-taxi)]" />
                        <span className="text-[10px] text-[var(--nyc-steel)] font-mono uppercase tracking-wider">{fact.label}</span>
                      </div>
                      <span className="text-lg font-black">{fact.value}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="#install">
                    <Button className="bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] font-bold gap-2 shadow-lg shadow-[var(--nyc-taxi)]/20">
                      <Terminal className="w-4 h-4" />
                      Начать установку
                    </Button>
                  </a>
                  <a href="#checklist">
                    <Button variant="outline" className="border-white/20 hover:bg-white/5 hover:border-[var(--nyc-taxi)]/30 gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Чек-лист
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    className="text-white/40 hover:text-[var(--nyc-taxi)] gap-2"
                    onClick={() => setSearchOpen(true)}
                  >
                    <Command className="w-3.5 h-3.5" />
                    <span className="text-xs">Ctrl+K</span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ═══════════════ 01 — TOOL MATRIX ═══════════════ */}
            <section id="matrix" className="py-16">
              <SectionHeader number="01" title="Матрица инструментов" subtitle="tools_matrix" />
              <div className="grid gap-2">
                {TOOLS.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Card className="bg-white/[0.02] border-white/[0.06] hover:border-[var(--nyc-taxi)]/20 hover:bg-white/[0.04] transition-all duration-300 group">
                      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div
                            className="w-1 h-8 rounded-full shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: tool.color }}
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-bold text-sm">{tool.name}</span>
                              {tool.mcp && (
                                <Badge className="bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] border-[var(--nyc-taxi)]/30 text-[10px] px-1.5 py-0">
                                  MCP
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-[var(--nyc-steel)]">{tool.desc}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs shrink-0 sm:pl-4 sm:border-l border-white/5">
                          <span className="font-mono text-[var(--nyc-concrete)]">{tool.type}</span>
                          <span className="text-[var(--nyc-taxi)] font-mono font-bold">{tool.price}</span>
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
                className="mt-8 p-5 border border-[var(--nyc-taxi)]/10 rounded-lg bg-[var(--nyc-taxi)]/[0.02]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  <span className="font-bold text-sm">Бесплатные альтернативы 21st Magic</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  {[
                    ['Google Stitch', '$0 (350 gen/мес)', 'Полная'],
                    ['v0.dev Free', '$0 ($5 credit/мес)', 'Через clipboard'],
                    ['Bolt.diy', '$0 (self-hosted)', 'Полная'],
                    ['Ollama + Local LLM', '$0', 'Полная'],
                  ].map(([name, price, compat]) => (
                    <div key={name} className="flex items-center justify-between p-2.5 rounded bg-white/[0.03] border border-white/[0.05]">
                      <span className="font-mono text-[var(--nyc-concrete)]">{name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--nyc-taxi)] font-bold">{price}</span>
                        <Badge variant="secondary" className="text-[10px] bg-white/5 text-white/40 border-0">{compat}</Badge>
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

            <TaxiDivider />

            {/* ═══════════════ 02 — PLATFORMS ═══════════════ */}
            <section id="platforms" className="py-16">
              <SectionHeader number="02" title="Платформы и совместимость" subtitle="compatibility_matrix" />

              {/* Compatibility Matrix */}
              <Card className="bg-white/[0.02] border-white/[0.06] mb-8 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        <th className="text-left py-3 px-4 font-mono text-[var(--nyc-steel)]">Функция</th>
                        <th className="text-center py-3 px-3 font-mono text-[var(--nyc-taxi)]">OpenCode</th>
                        <th className="text-center py-3 px-3 font-mono text-[var(--nyc-steel)]">VS Code+Cline</th>
                        <th className="text-center py-3 px-3 font-mono text-[var(--nyc-steel)]">Z Code</th>
                        <th className="text-center py-3 px-3 font-mono text-[var(--nyc-steel)]">chat.z.ai</th>
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
                        <tr key={name as string} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-3 px-4 font-mono text-[var(--nyc-concrete)]">{name as string}</td>
                          {vals.map((v, i) => (
                            <td key={i} className="text-center py-3 px-3">
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
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PLATFORMS.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="bg-white/[0.02] border-white/[0.06] h-full hover:border-[var(--nyc-taxi)]/15 hover:bg-white/[0.04] transition-all duration-300">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-bold flex items-center gap-2">
                          <p.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                          {p.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-xs text-[var(--nyc-steel)] mb-3">{p.desc}</p>
                        <div className="flex flex-wrap gap-1">
                          {p.features.map(f => (
                            <Badge key={f} variant="secondary" className="text-[10px] bg-white/5 text-white/50 border-0">
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

            <TaxiDivider />

            {/* ═══════════════ 03 — CODING TOOL HELPER ═══════════════ */}
            <section id="helper" className="py-16">
              <SectionHeader number="03" title="Coding Tool Helper" subtitle="@z_ai/coding-helper — центральный узел интеграции" />

              {/* Setup Wizard */}
              <Card className="bg-white/[0.02] border-white/[0.06] mb-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
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
                        <span className="text-[var(--nyc-concrete)]">{step}</span>
                        {i < 5 && <div className="hidden sm:block w-px h-3 bg-[var(--nyc-taxi)]/20 ml-[-10px] mt-5" />}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Commands */}
              <div className="mb-6">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  Система команд
                </h3>
                <div className="space-y-1.5">
                  {HELPER_COMMANDS.map((cmd, i) => (
                    <motion.div
                      key={cmd.cmd}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="group relative"
                    >
                      <div className="code-block px-4 py-2.5 pr-12 flex items-center gap-3 text-xs hover:border-[var(--nyc-taxi)]/15 transition-colors">
                        <span className="text-[var(--nyc-taxi)] font-mono shrink-0">❯</span>
                        <span className="text-[var(--nyc-concrete)] font-mono">{cmd.cmd}</span>
                        <span className="text-white/15 hidden sm:inline">— {cmd.desc}</span>
                      </div>
                      <CopyButton text={cmd.cmd} />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Config File */}
              <Card className="bg-white/[0.02] border-white/[0.06] mb-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[var(--nyc-taxi)]" />
                    Конфигурационный файл
                    <Badge className="text-[10px] bg-white/5 text-white/30 border-0 ml-auto font-mono">~/.chelper/config.yaml</Badge>
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
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  Доступные модели GLM
                </h3>
                <div className="grid sm:grid-cols-3 gap-3">
                  {GLM_MODELS.map((model, i) => (
                    <motion.div
                      key={model.tier}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="p-4 border border-white/[0.06] rounded-lg bg-white/[0.02] hover:border-[var(--nyc-taxi)]/15 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[var(--nyc-taxi)] text-xs font-bold">{model.tier}</span>
                        <Badge className="text-[10px] bg-[var(--nyc-taxi)]/10 text-[var(--nyc-taxi)] border-0">
                          {model.name}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--nyc-steel)] mb-3">{model.use}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-white/20 font-mono">Скорость</span>
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
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
                <h3 className="text-sm font-bold mb-3">Маппинг моделей для Claude Code</h3>
                <CodeBlock
                  code={`{\n  "env": {\n    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air",\n    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.7",\n    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-4.7"\n  }\n}`}
                  lang="json"
                />
              </div>

              {/* Plan Limits */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold flex items-center gap-2">
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
                    className="p-4 border border-white/[0.06] rounded-lg bg-white/[0.02]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm">{plan.plan}</span>
                        <span className="text-[var(--nyc-taxi)] font-mono text-xs font-bold">{plan.price}</span>
                      </div>
                    </div>
                    <Progress value={plan.pct} className="h-1 mb-3 [&>div]:bg-[var(--nyc-taxi)]" />
                    <div className="flex justify-between text-xs text-[var(--nyc-steel)]">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 5ч: {plan.fiveHour}</span>
                      <span>Неделя: {plan.weekly}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <TaxiDivider />

            {/* ═══════════════ 04 — STAGEWISE ═══════════════ */}
            <section id="stagewise" className="py-16">
              <SectionHeader number="04" title="Stagewise" subtitle="AI Browser для веб-разработчиков" />

              <div className="grid sm:grid-cols-3 gap-3 mb-6">
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
                    className="p-4 border border-white/[0.06] rounded-lg bg-white/[0.02] text-center hover:border-[var(--nyc-taxi)]/15 transition-colors"
                  >
                    <stat.icon className="w-5 h-5 text-[var(--nyc-taxi)] mx-auto mb-2" />
                    <div className="font-black text-lg">{stat.value}</div>
                    <div className="text-[10px] text-[var(--nyc-steel)] font-mono uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
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
                    className="p-4 border border-white/[0.06] rounded-lg bg-white/[0.02] flex items-start gap-3 hover:border-[var(--nyc-taxi)]/15 hover:bg-white/[0.04] transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded bg-[var(--nyc-taxi)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--nyc-taxi)]/20 transition-colors">
                      <feat.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold mb-0.5">{feat.title}</div>
                      <div className="text-xs text-[var(--nyc-steel)]">{feat.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Installation */}
              <Card className="bg-white/[0.02] border-white/[0.06] mb-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">Установка</CardTitle>
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
                <h3 className="text-sm font-bold mb-4">Workflow</h3>
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
              <Card className="bg-white/[0.02] border-white/[0.06] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-white/[0.02]">
                        <th className="text-left py-3 px-4 font-mono text-[var(--nyc-steel)]">Функция</th>
                        <th className="text-center py-3 px-3 font-mono text-[var(--nyc-taxi)]">Stagewise</th>
                        <th className="text-center py-3 px-3 font-mono text-[var(--nyc-steel)]">Cursor AI</th>
                        <th className="text-center py-3 px-3 font-mono text-[var(--nyc-steel)]">Cline</th>
                        <th className="text-center py-3 px-3 font-mono text-[var(--nyc-steel)]">OpenCode</th>
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
                        <tr key={name as string} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-2.5 px-4 font-mono text-[var(--nyc-concrete)]">{name as string}</td>
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

            <TaxiDivider />

            {/* ═══════════════ 05 — INSTALLATION ═══════════════ */}
            <section id="install" className="py-16">
              <SectionHeader number="05" title="Установка и настройка" subtitle="step_by_step_guide" />

              {/* API Keys */}
              <div className="mb-8">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
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
                    <div key={k.key} className="p-3 border border-white/[0.06] rounded-lg bg-white/[0.02] flex flex-col sm:flex-row sm:items-center gap-2 text-xs hover:border-[var(--nyc-taxi)]/10 transition-colors">
                      <span className="font-bold text-[var(--nyc-taxi)] min-w-[130px] flex items-center gap-2">
                        <Key className="w-3 h-3" />
                        {k.key}
                      </span>
                      <span className="text-[var(--nyc-concrete)] flex-1">{k.purpose}</span>
                      <span className="text-white/25 font-mono text-[10px]">{k.source}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Install Commands */}
              <div className="space-y-6 mb-8">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  Команды установки
                </h3>

                {[
                  { num: '01', title: 'OpenCode', code: 'curl -fsSL https://opencode.ai/install | bash\nopencode --version' },
                  { num: '02', title: 'Coding Tool Helper', code: 'npx @z_ai/coding-helper\n# Follow wizard: language -> plan -> API key -> tools -> MCP' },
                  { num: '03', title: 'Stitch MCP', code: 'npx @_davideast/stitch-mcp init' },
                  { num: '04', title: 'UI UX Pro Max Skill', code: 'npx skills add nextlevelbuilder/ui-ux-pro-max-skill --global' },
                ].map((step) => (
                  <div key={step.num}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-[var(--nyc-taxi)] font-bold">{step.num}</span>
                      <span className="text-sm font-bold">{step.title}</span>
                    </div>
                    <CodeBlock code={step.code} />
                  </div>
                ))}

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[var(--nyc-taxi)] font-bold">05</span>
                    <span className="text-sm font-bold">Cline (VS Code)</span>
                  </div>
                  <div className="p-4 border border-white/[0.06] rounded-lg bg-white/[0.02] text-xs space-y-1.5 text-[var(--nyc-concrete)]">
                    <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">1.</span> Open VS Code</p>
                    <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">2.</span> Ctrl+Shift+X → Search &quot;Cline&quot; → Install</p>
                    <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">3.</span> Restart VS Code</p>
                    <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">4.</span> Open Cline panel → Settings → Configure MCP</p>
                  </div>
                </div>
              </div>

              {/* Config Templates */}
              <div className="mb-6">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  Шаблоны конфигурации
                </h3>

                <Tabs defaultValue="opencode" className="w-full">
                  <TabsList className="bg-white/[0.03] border border-white/[0.06] mb-3 h-9">
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
            </section>

            <TaxiDivider />

            {/* ═══════════════ 06 — MCP SERVERS ═══════════════ */}
            <section id="mcp" className="py-16">
              <SectionHeader number="06" title="MCP-серверы" subtitle="model_context_protocol_servers" />

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {MCP_SERVERS.map((server, i) => (
                  <motion.div
                    key={server.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="bg-white/[0.02] border-white/[0.06] hover:border-[var(--nyc-taxi)]/15 transition-colors h-full">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded bg-[var(--nyc-taxi)]/10 flex items-center justify-center">
                            <server.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                          </div>
                          <span className="font-bold text-sm">{server.name}</span>
                        </div>
                        <p className="text-xs text-[var(--nyc-steel)] mb-2">{server.desc}</p>
                        <Badge className="text-[10px] bg-white/5 text-[var(--nyc-concrete)] font-mono border-0">
                          {server.tool}
                        </Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Transport Protocols */}
              <div className="p-4 border border-white/[0.06] rounded-lg bg-white/[0.02]">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
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
                    <div key={client} className="flex items-center justify-between p-2.5 rounded bg-white/[0.03] border border-white/[0.04]">
                      <span className="font-mono text-[var(--nyc-concrete)]">{client}</span>
                      <span className="text-white/30 text-[10px]">{transport}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <TaxiDivider />

            {/* ═══════════════ 07 — PROMPT TEMPLATES ═══════════════ */}
            <section id="prompts" className="py-16">
              <SectionHeader number="07" title="Промпт-шаблоны" subtitle="ready_to_use_prompt_templates" />

              <div className="space-y-4 mb-8">
                {PROMPT_TEMPLATES.map((tmpl, i) => (
                  <motion.div
                    key={tmpl.category}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className="bg-white/[0.02] border-white/[0.06]">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <tmpl.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                          {tmpl.category}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="relative">
                          <div className="code-block p-3 pr-12 text-xs">
                            <pre className="text-[var(--nyc-concrete)] font-mono whitespace-pre-wrap">{tmpl.prompt}</pre>
                          </div>
                          <CopyButton text={tmpl.prompt} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Ready Prompts */}
              <div className="p-5 border border-white/[0.06] rounded-lg bg-white/[0.02]">
                <h3 className="text-sm font-bold mb-3">Готовые промпты</h3>
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

            <TaxiDivider />

            {/* ═══════════════ 08 — COST SCENARIOS ═══════════════ */}
            <section id="cost" className="py-16">
              <SectionHeader number="08" title="Сценарии стоимости" subtitle="cost_scenarios" />

              <div className="grid sm:grid-cols-2 gap-4">
                {COST_SCENARIOS.map((scenario, i) => (
                  <motion.div
                    key={scenario.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card className={`bg-white/[0.02] border-white/[0.06] h-full hover:border-[var(--nyc-taxi)]/15 transition-all duration-300 ${
                      i === 3 ? 'nyc-glow border-[var(--nyc-taxi)]/20' : ''
                    }`}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <span>{scenario.emoji}</span>
                            {scenario.name}
                          </CardTitle>
                          <span className="text-lg font-black text-[var(--nyc-taxi)]">{scenario.price}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-3">
                        <Progress value={scenario.pct} className="h-1.5 [&>div]:bg-[var(--nyc-taxi)]" />
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

            <TaxiDivider />

            {/* ═══════════════ 09 — TROUBLESHOOTING ═══════════════ */}
            <section id="troubleshoot" className="py-16">
              <SectionHeader number="09" title="Диагностика и решение проблем" subtitle="troubleshooting_guide" />

              {/* Diagnostic Commands */}
              <Card className="bg-white/[0.02] border-white/[0.06] mb-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
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
                    <div key={diag.cmd} className="code-block px-3 py-2 text-xs flex items-center gap-2">
                      <span className="text-[var(--nyc-taxi)]">❯</span>
                      <span className="text-[var(--nyc-concrete)] font-mono">{diag.cmd}</span>
                      {diag.note && <span className="text-white/15">{diag.note}</span>}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Error Accordion */}
              <Accordion type="multiple" className="space-y-1.5">
                {ERRORS.map((err, i) => (
                  <AccordionItem
                    key={i}
                    value={`error-${i}`}
                    className="border border-white/[0.06] rounded-lg bg-white/[0.02] px-4 data-[state=open]:border-[var(--nyc-taxi)]/20 data-[state=open]:bg-[var(--nyc-taxi)]/[0.02]"
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

            <TaxiDivider />

            {/* ═══════════════ 10 — ARCHITECTURE ═══════════════ */}
            <section id="architecture" className="py-16">
              <SectionHeader number="10" title="Архитектура системы" subtitle="system_architecture_diagram" />

              <Card className="bg-white/[0.02] border-white/[0.06] overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="code-block p-4 text-xs sm:text-sm overflow-x-auto">
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
                  <div key={tool.name} className="p-3 border border-white/[0.06] rounded-lg bg-white/[0.02] hover:border-[var(--nyc-taxi)]/10 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold">{tool.name}</span>
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

            <TaxiDivider />

            {/* ═══════════════ 11 — CHECKLIST ═══════════════ */}
            <section id="checklist" className="py-16 pb-24">
              <SectionHeader number="11" title="Чек-лист перед началом работы" subtitle="pre_launch_checklist" />

              <Card className="bg-white/[0.02] border-white/[0.06]">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold">Прогресс настройки</span>
                    <span className="text-[var(--nyc-taxi)] font-mono text-sm font-bold">
                      {checkedCount}/{CHECKLIST_ITEMS.length}
                    </span>
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
                        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-all duration-200 text-left group"
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
                          <div className="w-5 h-5 rounded-md border-2 border-white/10 group-hover:border-[var(--nyc-taxi)]/30 transition-colors" />
                        )}
                        <item.icon className={`w-4 h-4 transition-colors ${checkedItems[item.id] ? 'text-[var(--nyc-taxi)]' : 'text-white/20'}`} />
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
              <div className="mt-8 p-4 border border-white/[0.06] rounded-lg bg-white/[0.02]">
                <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--nyc-taxi)]" />
                  Источники
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                  {SOURCES.map(s => (
                    <a
                      key={s.id}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
                    >
                      <span className="text-[var(--nyc-taxi)] font-mono text-[10px]">{s.id}</span>
                      <span className="text-[var(--nyc-concrete)] group-hover:text-white transition-colors">{s.desc}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-white/20 ml-auto" />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>

        {/* ── SCROLL TO TOP ── */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-lg bg-[var(--nyc-taxi)] text-black flex items-center justify-center shadow-lg shadow-[var(--nyc-taxi)]/20 hover:bg-[var(--nyc-amber)] transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* ── FOOTER ── */}
        <footer className="mt-auto border-t border-white/5 bg-background/80 backdrop-blur-sm relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:ml-16">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-[var(--nyc-taxi)] rotate-45" />
                <span className="font-mono text-[10px] text-[var(--nyc-steel)] tracking-wider">
                  UI GENERATION STACK + CODING TOOL HELPER — V1.1
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-white/25 font-mono">
                <span>22.04.2026</span>
                <span className="text-white/10">|</span>
                <span>PRODUCTION READY</span>
                <span className="text-white/10">|</span>
                <a
                  href="https://docs.z.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--nyc-taxi)] transition-colors flex items-center gap-1"
                >
                  DOCS.Z.AI <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}
