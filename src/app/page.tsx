'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
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
  { id: 'hero', label: '00', title: 'Обзор' },
  { id: 'matrix', label: '01', title: 'Матрица инструментов' },
  { id: 'platforms', label: '02', title: 'Платформы' },
  { id: 'helper', label: '03', title: 'Coding Tool Helper' },
  { id: 'stagewise', label: '04', title: 'Stagewise' },
  { id: 'install', label: '05', title: 'Установка' },
  { id: 'mcp', label: '06', title: 'MCP-серверы' },
  { id: 'prompts', label: '07', title: 'Промпт-шаблоны' },
  { id: 'cost', label: '08', title: 'Стоимость' },
  { id: 'troubleshoot', label: '09', title: 'Диагностика' },
  { id: 'architecture', label: '10', title: 'Архитектура' },
  { id: 'checklist', label: '11', title: 'Чек-лист' },
]

const TOOLS = [
  { name: '21st.dev Magic', type: 'MCP Server', price: 'Free / $20/мес', mcp: true, desc: 'React компоненты через AI' },
  { name: 'Stitch MCP', type: 'CLI + MCP', price: 'Free (350 gen/мес)', mcp: true, desc: 'Full-page дизайн из промпта' },
  { name: 'UI UX Pro Max', type: 'AI Skill', price: 'Free (OSS)', mcp: false, desc: 'Design рекомендации' },
  { name: 'v0.dev', type: 'Web SaaS', price: '$5 credit/мес', mcp: false, desc: 'shadcn/ui генерация' },
  { name: 'Z.AI Coding Helper', type: 'CLI Tool', price: 'Free', mcp: false, desc: 'Автоматизация настройки' },
  { name: 'OpenCode CLI', type: 'AI Agent', price: 'Free + API', mcp: true, desc: 'Терминальный AI-агент' },
  { name: 'Stagewise', type: 'Desktop', price: 'Free', mcp: false, desc: 'AI-браузер для веб-разработки' },
]

const PLATFORMS = [
  { name: 'OpenCode CLI', desc: 'Терминальный AI-агент', features: ['95K+ GitHub stars', 'MCP Native', '75+ LLM'] },
  { name: 'Coding Tool Helper', desc: 'Мастер настройки', features: ['npx @z_ai/coding-helper', 'GLM Coding Plan'] },
  { name: 'chat.z.ai', desc: 'Веб-чат', features: ['Без установки', 'MCP совместимость'] },
  { name: 'zcode.z.ai', desc: 'Web IDE', features: ['Full IDE', 'Git поддержка', 'MCP интеграция'] },
  { name: 'Stagewise', desc: 'AI Browser', features: ['Electron + React 19', 'Визуальный контекст'] },
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
  { name: 'GLM-4.5-Air', tier: 'Haiku', use: 'Быстрые задачи, автодополнение' },
  { name: 'GLM-4.7', tier: 'Sonnet', use: 'Основная разработка, кодинг' },
  { name: 'GLM-4.7', tier: 'Opus', use: 'Сложные задачи, архитектура' },
]

const PLAN_LIMITS = [
  { plan: 'Lite', fiveHour: '~80 промптов', weekly: '~400 промптов', price: '$18/мес', pct: 10 },
  { plan: 'Pro', fiveHour: '~400 промптов', weekly: '~2000 промптов', price: '$38/мес', pct: 50 },
  { plan: 'Max', fiveHour: '~1600 промптов', weekly: '~8000 промптов', price: '$98/мес', pct: 100 },
]

const MCP_SERVERS = [
  { name: 'Web Search MCP', tool: 'webSearchPrime', desc: 'Поиск веб-информации', icon: Search },
  { name: 'Vision MCP', tool: 'vision', desc: 'Анализ изображений и скриншотов', icon: Eye },
  { name: 'Web Reader MCP', tool: 'read', desc: 'Чтение содержимого веб-страниц', icon: BookOpen },
  { name: 'Zread MCP', tool: 'search_doc, search_code, read_file', desc: 'Поиск по репозиторию', icon: FileCode },
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
  {
    name: 'Free Stack',
    price: '$0/мес',
    tools: 'OpenCode + Ollama (local) + Stitch (free) + v0.dev free',
    keys: 'None (или только free tiers)',
    purpose: 'Прототипирование, обучение, личные проекты',
    color: 'var(--nyc-steel)',
    pct: 0,
  },
  {
    name: 'Budget',
    price: '$18-20/мес',
    tools: 'OpenCode/Cline + GLM Coding Plan Lite + Stitch (free)',
    keys: 'Z.AI API Key',
    purpose: 'Регулярная разработка, фриланс',
    color: 'var(--nyc-concrete)',
    pct: 25,
  },
  {
    name: 'Professional',
    price: '$38-60/мес',
    tools: 'Cursor/Cline + GLM Pro ($38) или Claude + Magic Pro ($20) + Stitch',
    keys: 'Z.AI или Anthropic + 21st.dev Magic',
    purpose: 'Коммерческие проекты, высокая продуктивность',
    color: 'var(--nyc-amber)',
    pct: 55,
  },
  {
    name: 'Team/Enterprise',
    price: '$100+/мес',
    tools: 'Z Code / Cursor Team + GLM Max ($98) + все MCP серверы',
    keys: 'Все вышеперечисленные',
    purpose: 'Команды, enterprise, production workloads',
    color: 'var(--nyc-taxi)',
    pct: 100,
  },
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
  { id: 'node', label: 'Node.js 18+ установлен' },
  { id: 'opencode', label: 'OpenCode установлен' },
  { id: 'stitch', label: 'Stitch MCP инициализирован' },
  { id: 'config', label: 'Config файл создан' },
  { id: 'apikeys', label: 'API ключи настроены' },
  { id: 'helper', label: 'Coding Tool Helper запущен' },
  { id: 'plan', label: 'GLM Coding Plan выбран' },
  { id: 'shadcn', label: 'shadcn/ui добавлены' },
]

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
      className="absolute top-2 right-2 p-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
      aria-label="Copy code"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
    </button>
  )
}

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  return (
    <div className="relative group">
      <div className="code-block p-4 pr-12 overflow-x-auto text-sm leading-relaxed">
        <span className="text-[var(--nyc-taxi)] text-xs font-mono mb-2 block opacity-60">{lang}</span>
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
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center gap-4 mb-2">
        <span className="section-number font-mono">{number}</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="text-[var(--nyc-steel)] mt-1 text-sm font-mono">{subtitle}</p>}
    </motion.div>
  )
}

function TaxiDivider() {
  return (
    <div className="flex items-center gap-2 my-12">
      <div className="h-px flex-1 bg-white/5" />
      <div className="w-2 h-2 bg-[var(--nyc-taxi)] rotate-45" />
      <div className="h-px flex-1 bg-white/5" />
    </div>
  )
}

/* ───────────────────── MAIN PAGE ───────────────────── */

export default function Home() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileNav, setMobileNav] = useState(false)

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    const handleScroll = () => {
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

  const checkedCount = Object.values(checkedItems).filter(Boolean).length

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col bg-background nyc-grid-bg">
        {/* ── SIDE NAV (Desktop) ── */}
        <nav className="hidden lg:flex fixed left-0 top-0 h-full w-16 flex-col items-center py-8 gap-1 z-50 bg-background/80 backdrop-blur-sm border-r border-white/5">
          <div className="w-3 h-3 bg-[var(--nyc-taxi)] rotate-45 mb-8" />
          {TOC_ITEMS.map(item => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <a
                  href={`#${item.id}`}
                  className={`w-10 h-10 flex items-center justify-center rounded text-xs font-mono transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-[var(--nyc-taxi)] text-black font-bold'
                      : 'text-white/30 hover:text-white/70 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </a>
              </TooltipTrigger>
              <TooltipContent side="right" className="font-mono text-xs">
                {item.title}
              </TooltipContent>
            </Tooltip>
          ))}
          <div className="mt-auto">
            <div className="w-2 h-2 rounded-full bg-[var(--nyc-taxi)] animate-pulse" />
          </div>
        </nav>

        {/* ── MOBILE NAV ── */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-white/5">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-[var(--nyc-taxi)] rotate-45" />
              <span className="font-mono text-sm font-bold">GUIDE</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileNav(!mobileNav)}
              className="text-white/60 hover:text-white"
            >
              {mobileNav ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
          <AnimatePresence>
            {mobileNav && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-white/5"
              >
                <div className="max-h-80 overflow-y-auto p-4 space-y-1">
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
                      <span className="font-mono text-xs w-5">{item.label}</span>
                      <span>{item.title}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 lg:ml-16 pt-14 lg:pt-0">
          {/* ═══════════════ HERO ═══════════════ */}
          <section id="hero" className="relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src="/nyc-hero.png"
                alt="New York City industrial skyline"
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-[var(--nyc-taxi)] rotate-45" />
                  <span className="font-mono text-xs text-[var(--nyc-taxi)] tracking-widest uppercase">
                    UI Generation Stack + Coding Tool Helper
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-none mb-4">
                  ЕДИНОЕ
                  <br />
                  <span className="text-[var(--nyc-taxi)]">РУКОВОДСТВО</span>
                </h1>
                <p className="text-lg sm:text-xl text-[var(--nyc-steel)] max-w-2xl mb-8 font-light">
                  Подробный гайд по установке и настройке AI-инструментов
                  разработки. Coding Tool Helper, OpenCode, Stagewise и MCP-серверы.
                </p>

                {/* Key Facts Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {[
                    { label: 'Версия', value: '1.0', icon: Shield },
                    { label: 'Пакет', value: '0.0.7', icon: Box },
                    { label: 'Node.js', value: '≥ 18.0.0', icon: Cpu },
                    { label: 'Зависимости', value: '6 пакетов', icon: Layers },
                  ].map(fact => (
                    <div key={fact.label} className="bg-white/3 border border-white/8 rounded p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <fact.icon className="w-3.5 h-3.5 text-[var(--nyc-taxi)]" />
                        <span className="text-xs text-[var(--nyc-steel)] font-mono uppercase">{fact.label}</span>
                      </div>
                      <span className="text-lg font-bold">{fact.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="#install">
                    <Button className="bg-[var(--nyc-taxi)] text-black hover:bg-[var(--nyc-amber)] font-bold gap-2">
                      <Terminal className="w-4 h-4" />
                      Начать установку
                    </Button>
                  </a>
                  <a href="#checklist">
                    <Button variant="outline" className="border-white/20 hover:bg-white/5 gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Чек-лист
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* ═══════════════ 01 — TOOL MATRIX ═══════════════ */}
            <section id="matrix" className="py-16">
              <SectionHeader number="01" title="Матрица инструментов" subtitle="tools_matrix" />
              <div className="grid gap-3">
                {TOOLS.map((tool, i) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group"
                  >
                    <Card className="bg-white/2 border-white/8 hover:border-[var(--nyc-taxi)]/30 transition-all duration-300">
                      <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm">{tool.name}</span>
                            {tool.mcp && (
                              <Badge className="bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] border-[var(--nyc-taxi)]/30 text-[10px] px-1.5 py-0">
                                MCP
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-[var(--nyc-steel)]">{tool.desc}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs shrink-0">
                          <span className="font-mono text-[var(--nyc-concrete)]">{tool.type}</span>
                          <span className="text-[var(--nyc-taxi)] font-mono font-bold">{tool.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Free Alternatives */}
              <div className="mt-8 p-4 border border-white/8 rounded bg-white/2">
                <div className="flex items-center gap-2 mb-3">
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
                    <div key={name} className="flex items-center justify-between p-2 rounded bg-white/3">
                      <span className="font-mono text-[var(--nyc-concrete)]">{name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[var(--nyc-taxi)]">{price}</span>
                        <span className="text-white/30">{compat}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[var(--nyc-taxi)] text-xs mt-2 font-mono">
                  Экономия: $240/год по сравнению с 21st Magic Pro ($20/мес)
                </p>
              </div>
            </section>

            <TaxiDivider />

            {/* ═══════════════ 02 — PLATFORMS ═══════════════ */}
            <section id="platforms" className="py-16">
              <SectionHeader number="02" title="Платформы и совместимость" subtitle="compatibility_matrix" />

              {/* Compatibility Matrix */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 pr-4 font-mono text-[var(--nyc-steel)]">Функция</th>
                      <th className="text-center py-3 px-2 font-mono text-[var(--nyc-steel)]">OpenCode</th>
                      <th className="text-center py-3 px-2 font-mono text-[var(--nyc-steel)]">VS Code+Cline</th>
                      <th className="text-center py-3 px-2 font-mono text-[var(--nyc-steel)]">Z Code</th>
                      <th className="text-center py-3 px-2 font-mono text-[var(--nyc-steel)]">chat.z.ai</th>
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
                      <tr key={name as string} className="border-b border-white/5">
                        <td className="py-2.5 pr-4 font-mono">{name as string}</td>
                        {vals.map((v, i) => (
                          <td key={i} className="text-center py-2.5 px-2">
                            {v === true ? (
                              <span className="text-green-400">✓</span>
                            ) : v === false ? (
                              <span className="text-red-400/50">✗</span>
                            ) : (
                              <span className="text-[var(--nyc-amber)] text-[10px] font-mono">{v as string}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Platform Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {PLATFORMS.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="bg-white/2 border-white/8 h-full hover:border-[var(--nyc-taxi)]/20 transition-colors">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm font-bold">{p.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-xs text-[var(--nyc-steel)] mb-2">{p.desc}</p>
                        <div className="flex flex-wrap gap-1">
                          {p.features.map(f => (
                            <Badge key={f} variant="secondary" className="text-[10px] bg-white/5 text-white/60 border-0">
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
              <Card className="bg-white/2 border-white/8 mb-6">
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
                      <div key={i} className="flex items-center gap-3 text-xs">
                        <span className="w-5 h-5 rounded bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] flex items-center justify-center font-mono text-[10px] shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-[var(--nyc-concrete)]">{step}</span>
                      </div>
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
                <div className="space-y-2">
                  {HELPER_COMMANDS.map(cmd => (
                    <div key={cmd.cmd} className="group relative">
                      <div className="code-block px-4 py-2.5 pr-12 flex items-center gap-3 text-xs">
                        <span className="text-[var(--nyc-taxi)] font-mono shrink-0">$</span>
                        <span className="text-[var(--nyc-concrete)] font-mono">{cmd.cmd}</span>
                        <span className="text-white/20 hidden sm:inline">— {cmd.desc}</span>
                      </div>
                      <CopyButton text={cmd.cmd} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Config File */}
              <Card className="bg-white/2 border-white/8 mb-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[var(--nyc-taxi)]" />
                    Конфигурационный файл
                    <Badge className="text-[10px] bg-white/5 text-white/40 border-0 ml-auto">~/.chelper/config.yaml</Badge>
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
                  {GLM_MODELS.map(model => (
                    <div key={model.tier} className="p-3 border border-white/8 rounded bg-white/2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-[var(--nyc-taxi)] text-xs">{model.tier}</span>
                        <Badge className="text-[10px] bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] border-0">
                          {model.name}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--nyc-steel)]">{model.use}</p>
                    </div>
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
                {PLAN_LIMITS.map(plan => (
                  <div key={plan.plan} className="p-3 border border-white/8 rounded bg-white/2">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{plan.plan}</span>
                        <span className="text-[var(--nyc-taxi)] font-mono text-xs">{plan.price}</span>
                      </div>
                    </div>
                    <Progress value={plan.pct} className="h-1.5 mb-2 [&>div]:bg-[var(--nyc-taxi)]" />
                    <div className="flex justify-between text-xs text-[var(--nyc-steel)]">
                      <span>5ч: {plan.fiveHour}</span>
                      <span>Неделя: {plan.weekly}</span>
                    </div>
                  </div>
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
                ].map(stat => (
                  <div key={stat.label} className="p-3 border border-white/8 rounded bg-white/2 text-center">
                    <stat.icon className="w-4 h-4 text-[var(--nyc-taxi)] mx-auto mb-1" />
                    <div className="font-bold text-sm">{stat.value}</div>
                    <div className="text-[10px] text-[var(--nyc-steel)] font-mono">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  { title: 'Визуальный контекст', desc: 'AI агент «видит» ваш DOM в реальном времени', icon: Eye },
                  { title: 'Console Monitoring', desc: 'Автоматический анализ ошибок консоли', icon: AlertTriangle },
                  { title: 'Element Selection', desc: 'Выбор UI элементов для редактирования', icon: Monitor },
                  { title: 'Code Generation', desc: 'Прямая генерация кода на основе визуального контекста', icon: Sparkles },
                ].map(feat => (
                  <div key={feat.title} className="p-3 border border-white/8 rounded bg-white/2 flex items-start gap-3 hover:border-[var(--nyc-taxi)]/20 transition-colors">
                    <feat.icon className="w-4 h-4 text-[var(--nyc-taxi)] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-bold">{feat.title}</div>
                      <div className="text-xs text-[var(--nyc-steel)]">{feat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Installation */}
              <Card className="bg-white/2 border-white/8 mb-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm">Установка</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <span className="text-xs text-[var(--nyc-steel)] font-mono mb-1 block">Desktop приложение</span>
                    <CodeBlock code="# Скачать с официального сайта\n# https://stagewise.io\n\n# Или через npm (toolbar extension)\nnpx stagewise@latest" />
                  </div>
                  <div>
                    <span className="text-xs text-[var(--nyc-steel)] font-mono mb-1 block">IDE Extension (Cursor, Windsurf, VS Code)</span>
                    <CodeBlock code={'# Установка расширения через marketplace\n# Search: "stagewise" или "21st.dev"'} />
                  </div>
                </CardContent>
              </Card>

              {/* Workflow */}
              <div className="mb-6">
                <h3 className="text-sm font-bold mb-3">Workflow</h3>
                <div className="space-y-1">
                  {[
                    'Открыть Stagewise Browser',
                    'Загрузить URL работающего приложения (localhost:3000)',
                    'Нажать на элемент для выбора (или использовать toolbar)',
                    'AI агент получает контекст: DOM, стили, console errors',
                    'Описать желаемые изменения на естественном языке',
                    'AI генерирует код изменений',
                    'Применить изменения к локальному проекту',
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs py-1">
                      <div className="w-6 h-6 rounded bg-[var(--nyc-taxi)]/10 flex items-center justify-center shrink-0">
                        <span className="text-[var(--nyc-taxi)] font-mono text-[10px]">{i + 1}</span>
                      </div>
                      <span className="text-[var(--nyc-concrete)]">{step}</span>
                      {i < 6 && <ArrowRight className="w-3 h-3 text-white/10 hidden sm:block ml-auto shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2.5 pr-3 font-mono text-[var(--nyc-steel)]">Функция</th>
                      <th className="text-center py-2.5 px-2 font-mono text-[var(--nyc-taxi)]">Stagewise</th>
                      <th className="text-center py-2.5 px-2 font-mono text-[var(--nyc-steel)]">Cursor AI</th>
                      <th className="text-center py-2.5 px-2 font-mono text-[var(--nyc-steel)]">Cline</th>
                      <th className="text-center py-2.5 px-2 font-mono text-[var(--nyc-steel)]">OpenCode</th>
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
                      <tr key={name as string} className="border-b border-white/5">
                        <td className="py-2 pr-3 font-mono">{name as string}</td>
                        {vals.map((v, i) => (
                          <td key={i} className="text-center py-2 px-2">
                            {v === true ? (
                              <span className="text-green-400">✓</span>
                            ) : v === false ? (
                              <span className="text-red-400/50">✗</span>
                            ) : (
                              <span className="text-[var(--nyc-amber)] text-[10px] font-mono">{v as string}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                    <div key={k.key} className="p-3 border border-white/8 rounded bg-white/2 flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                      <span className="font-bold text-[var(--nyc-taxi)] min-w-[120px]">{k.key}</span>
                      <span className="text-[var(--nyc-concrete)] flex-1">{k.purpose}</span>
                      <span className="text-white/30 font-mono">{k.source}</span>
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

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[var(--nyc-taxi)]">01</span>
                    <span className="text-sm font-bold">OpenCode</span>
                  </div>
                  <CodeBlock code="curl -fsSL https://opencode.ai/install | bash\nopencode --version" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[var(--nyc-taxi)]">02</span>
                    <span className="text-sm font-bold">Coding Tool Helper</span>
                  </div>
                  <CodeBlock code="npx @z_ai/coding-helper\n# Follow wizard: language -> plan -> API key -> tools -> MCP" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[var(--nyc-taxi)]">03</span>
                    <span className="text-sm font-bold">Stitch MCP</span>
                  </div>
                  <CodeBlock code="npx @_davideast/stitch-mcp init" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[var(--nyc-taxi)]">04</span>
                    <span className="text-sm font-bold">UI UX Pro Max Skill</span>
                  </div>
                  <CodeBlock code="npx skills add nextlevelbuilder/ui-ux-pro-max-skill --global" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono text-[var(--nyc-taxi)]">05</span>
                    <span className="text-sm font-bold">Cline (VS Code)</span>
                  </div>
                  <div className="p-4 border border-white/8 rounded bg-white/2 text-xs space-y-1 text-[var(--nyc-concrete)]">
                    <p>1. Open VS Code</p>
                    <p>2. Ctrl+Shift+X → Search &quot;Cline&quot; → Install</p>
                    <p>3. Restart VS Code</p>
                    <p>4. Open Cline panel → Settings → Configure MCP</p>
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
                  <TabsList className="bg-white/5 border border-white/10 mb-3">
                    <TabsTrigger value="opencode" className="text-xs data-[state=active]:bg-[var(--nyc-taxi)] data-[state=active]:text-black">
                      OpenCode
                    </TabsTrigger>
                    <TabsTrigger value="cline" className="text-xs data-[state=active]:bg-[var(--nyc-taxi)] data-[state=active]:text-black">
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
                {MCP_SERVERS.map(server => (
                  <Card key={server.name} className="bg-white/2 border-white/8 hover:border-[var(--nyc-taxi)]/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <server.icon className="w-4 h-4 text-[var(--nyc-taxi)]" />
                        <span className="font-bold text-sm">{server.name}</span>
                      </div>
                      <p className="text-xs text-[var(--nyc-steel)] mb-2">{server.desc}</p>
                      <Badge className="text-[10px] bg-white/5 text-[var(--nyc-concrete)] font-mono border-0">
                        {server.tool}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Transport Protocols */}
              <div className="p-4 border border-white/8 rounded bg-white/2">
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
                    <div key={client} className="flex items-center justify-between p-2 rounded bg-white/3">
                      <span className="font-mono text-[var(--nyc-concrete)]">{client}</span>
                      <span className="text-white/40">{transport}</span>
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
                {PROMPT_TEMPLATES.map(tmpl => (
                  <Card key={tmpl.category} className="bg-white/2 border-white/8">
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
                ))}
              </div>

              {/* Ready Prompts */}
              <div className="p-4 border border-white/8 rounded bg-white/2">
                <h3 className="text-sm font-bold mb-3">Готовые промпты</h3>
                <div className="space-y-2">
                  {READY_PROMPTS.map(p => (
                    <div key={p.cat} className="flex items-start gap-3 text-xs">
                      <Badge className="text-[10px] bg-[var(--nyc-taxi)]/15 text-[var(--nyc-taxi)] border-0 shrink-0 mt-0.5">
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
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className={`bg-white/2 border-white/8 h-full ${i === 3 ? 'nyc-glow border-[var(--nyc-taxi)]/30' : ''}`}>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">{scenario.name}</CardTitle>
                          <span className="text-lg font-black text-[var(--nyc-taxi)]">{scenario.price}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-3">
                        <Progress value={scenario.pct} className="h-1 [&>div]:bg-[var(--nyc-taxi)]" />
                        <div className="space-y-2 text-xs">
                          <div>
                            <span className="text-[var(--nyc-steel)] font-mono">Инструменты:</span>
                            <p className="text-[var(--nyc-concrete)] mt-0.5">{scenario.tools}</p>
                          </div>
                          <div>
                            <span className="text-[var(--nyc-steel)] font-mono">API ключи:</span>
                            <p className="text-[var(--nyc-concrete)] mt-0.5">{scenario.keys}</p>
                          </div>
                          <div>
                            <span className="text-[var(--nyc-steel)] font-mono">Назначение:</span>
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
              <Card className="bg-white/2 border-white/8 mb-6">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[var(--nyc-taxi)]" />
                    Диагностические команды
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  {[
                    { cmd: 'node --version', note: '# need >= 18.0.0' },
                    { cmd: 'opencode --version', note: '' },
                    { cmd: 'coding-helper doctor', note: '' },
                    { cmd: 'npx @_davideast/stitch-mcp --help', note: '' },
                    { cmd: 'npx skills list --global', note: '' },
                  ].map(diag => (
                    <div key={diag.cmd} className="code-block px-3 py-2 text-xs flex items-center gap-2">
                      <span className="text-[var(--nyc-taxi)]">$</span>
                      <span className="text-[var(--nyc-concrete)] font-mono">{diag.cmd}</span>
                      {diag.note && <span className="text-white/20">{diag.note}</span>}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Error Table */}
              <Accordion type="multiple" className="space-y-2">
                {ERRORS.map((err, i) => (
                  <AccordionItem
                    key={i}
                    value={`error-${i}`}
                    className="border border-white/8 rounded bg-white/2 px-4 data-[state=open]:border-[var(--nyc-taxi)]/30"
                  >
                    <AccordionTrigger className="text-xs hover:no-underline py-3 gap-2">
                      <div className="flex items-center gap-2 text-left">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400/60 shrink-0" />
                        <span className="font-mono text-[var(--nyc-concrete)]">{err.error}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-xs pb-3 space-y-2">
                      <div>
                        <span className="text-red-400/80 font-mono text-[10px] uppercase">Причина:</span>
                        <p className="text-[var(--nyc-steel)]">{err.cause}</p>
                      </div>
                      <div>
                        <span className="text-green-400/80 font-mono text-[10px] uppercase">Решение:</span>
                        <p className="text-[var(--nyc-concrete)]">{err.fix}</p>
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

              <Card className="bg-white/2 border-white/8 overflow-hidden">
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
                  <div key={tool.name} className="p-3 border border-white/8 rounded bg-white/2">
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

              <Card className="bg-white/2 border-white/8">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold">Прогресс</span>
                    <span className="text-[var(--nyc-taxi)] font-mono text-sm">
                      {checkedCount}/{CHECKLIST_ITEMS.length}
                    </span>
                  </div>
                  <Progress
                    value={(checkedCount / CHECKLIST_ITEMS.length) * 100}
                    className="h-2 mb-6 [&>div]:bg-[var(--nyc-taxi)]"
                  />
                  <div className="space-y-1">
                    {CHECKLIST_ITEMS.map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className="w-full flex items-center gap-3 p-3 rounded hover:bg-white/3 transition-colors text-left group"
                      >
                        {checkedItems[item.id] ? (
                          <CheckCircle2 className="w-5 h-5 text-[var(--nyc-taxi)] shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-white/20 group-hover:text-white/40 shrink-0" />
                        )}
                        <span className={`text-sm transition-colors ${
                          checkedItems[item.id]
                            ? 'text-[var(--nyc-taxi)] line-through opacity-60'
                            : 'text-[var(--nyc-concrete)]'
                        }`}>
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>

        {/* ── FOOTER ── */}
        <footer className="mt-auto border-t border-white/5 bg-background/80 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:ml-16">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-[var(--nyc-taxi)] rotate-45" />
                <span className="font-mono text-xs text-[var(--nyc-steel)]">
                  UI Generation Stack + Coding Tool Helper — v1.1
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-white/30">
                <span className="font-mono">22.04.2026</span>
                <span>•</span>
                <span>Production Ready</span>
                <span>•</span>
                <a
                  href="https://docs.z.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--nyc-taxi)] transition-colors flex items-center gap-1"
                >
                  docs.z.ai <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  )
}
