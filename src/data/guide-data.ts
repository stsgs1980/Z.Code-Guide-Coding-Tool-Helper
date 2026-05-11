import {
  Terminal,
  Settings,
  DollarSign,
  BookOpen,
  AlertTriangle,
  Box,
  Cpu,
  Eye,
  Key,
  Layers,
  Sparkles,
  FileCode,
  Search,
  MessageSquare,
  CheckCircle2,
  Cable,
  Rocket,
  Building2,
  Monitor,
  Shield,
  Zap,
  Lightbulb,
  Gift,
  type LucideIcon,
} from 'lucide-react'

/* ───────────────────── DATA ───────────────────── */

export const TOC_ITEMS = [
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

export const TOOLS = [
  { name: '21st.dev Magic', type: 'MCP Server', price: 'Free / $20/мес', mcp: true, desc: 'React компоненты через AI', color: '#FF6B6B' },
  { name: 'Stitch MCP', type: 'CLI + MCP', price: 'Free (350 gen/мес)', mcp: true, desc: 'Full-page дизайн из промпта', color: '#4ECDC4' },
  { name: 'UI UX Pro Max', type: 'AI Skill', price: 'Free (OSS)', mcp: false, desc: 'Design рекомендации', color: '#45B7D1' },
  { name: 'v0.dev', type: 'Web SaaS', price: '$5 credit/мес', mcp: false, desc: 'shadcn/ui генерация', color: '#96CEB4' },
  { name: 'Z.AI Coding Helper', type: 'CLI Tool', price: 'Free', mcp: false, desc: 'Автоматизация настройки', color: '#FFC107' },
  { name: 'OpenCode CLI', type: 'AI Agent', price: 'Free + API', mcp: true, desc: 'Терминальный AI-агент', color: '#DDA0DD' },
  { name: 'Stagewise', type: 'Desktop', price: 'Free', mcp: false, desc: 'AI-браузер для веб-разработки', color: '#98D8C8' },
]

export const PLATFORMS = [
  { name: 'OpenCode CLI', desc: 'Терминальный AI-агент', features: ['95K+ GitHub stars', 'MCP Native', '75+ LLM'], icon: Terminal },
  { name: 'Coding Tool Helper', desc: 'Мастер настройки', features: ['npx @z_ai/coding-helper', 'GLM Coding Plan'], icon: Settings },
  { name: 'chat.z.ai', desc: 'Веб-чат', features: ['Без установки', 'MCP совместимость'], icon: MessageSquare },
  { name: 'zcode.z.ai', desc: 'Web IDE', features: ['Full IDE', 'Git поддержка', 'MCP интеграция'], icon: FileCode },
  { name: 'Stagewise', desc: 'AI Browser', features: ['Electron + React 19', 'Визуальный контекст'], icon: Eye },
]

export const HELPER_COMMANDS = [
  { cmd: 'coding-helper init', desc: 'Запуск мастера настройки' },
  { cmd: 'coding-helper lang show/set', desc: 'Управление языком интерфейса' },
  { cmd: 'coding-helper auth', desc: 'Интерактивный ввод API-ключа' },
  { cmd: 'coding-helper auth glm_coding_plan_global <token>', desc: 'Прямая установка ключа' },
  { cmd: 'coding-helper auth revoke', desc: 'Удаление сохраненного ключа' },
  { cmd: 'coding-helper auth reload claude', desc: 'Перезагрузка информации о плане' },
  { cmd: 'coding-helper doctor', desc: 'Проверка системной конфигурации' },
]

export const GLM_MODELS = [
  { name: 'GLM-4.5-Air', tier: 'Haiku', use: 'Быстрые задачи, автодополнение', speed: 95 },
  { name: 'GLM-4.7', tier: 'Sonnet', use: 'Основная разработка, кодинг', speed: 70 },
  { name: 'GLM-4.7', tier: 'Opus', use: 'Сложные задачи, архитектура', speed: 40 },
]

export const PLAN_LIMITS = [
  { plan: 'Lite', fiveHour: '~80 промптов', weekly: '~400 промптов', price: '$18/мес', pct: 10 },
  { plan: 'Pro', fiveHour: '~400 промптов', weekly: '~2000 промптов', price: '$38/мес', pct: 50 },
  { plan: 'Max', fiveHour: '~1600 промптов', weekly: '~8000 промптов', price: '$98/мес', pct: 100 },
]

export const MCP_SERVERS = [
  { name: 'Web Search MCP', tool: 'webSearchPrime', desc: 'Поиск веб-информации', icon: Search, port: 3001 },
  { name: 'Vision MCP', tool: 'vision', desc: 'Анализ изображений и скриншотов', icon: Eye, port: 3002 },
  { name: 'Web Reader MCP', tool: 'read', desc: 'Чтение содержимого веб-страниц', icon: BookOpen, port: 3003 },
  { name: 'Zread MCP', tool: 'search_doc, search_code, read_file', desc: 'Поиск по репозиторию', icon: FileCode, port: 3004 },
]

export const PROMPT_TEMPLATES = [
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

export const READY_PROMPTS = [
  { cat: 'Landing', prompt: 'Generate a SaaS landing page with hero section, features grid, testimonials and pricing table' },
  { cat: 'Dashboard', prompt: 'Create a modern analytics dashboard with sidebar navigation, stat cards, charts and data table' },
  { cat: 'Components', prompt: '/ui create glassmorphism pricing cards with 3 tiers: Free, Pro, Enterprise' },
  { cat: 'Navigation', prompt: '/ui build responsive navbar with logo, navigation links, search and mobile menu' },
]

export const COST_SCENARIOS = [
  { name: 'Free Stack', price: '$0/мес', tools: 'OpenCode + Ollama (local) + Stitch (free) + v0.dev free', keys: 'None (или только free tiers)', purpose: 'Прототипирование, обучение, личные проекты', pct: 0, icon: Gift },
  { name: 'Budget', price: '$18-20/мес', tools: 'OpenCode/Cline + GLM Coding Plan Lite + Stitch (free)', keys: 'Z.AI API Key', purpose: 'Регулярная разработка, фриланс', pct: 25, icon: Lightbulb },
  { name: 'Professional', price: '$38-60/мес', tools: 'Cursor/Cline + GLM Pro ($38) или Claude + Magic Pro ($20) + Stitch', keys: 'Z.AI или Anthropic + 21st.dev Magic', purpose: 'Коммерческие проекты, высокая продуктивность', pct: 55, icon: Zap },
  { name: 'Team/Enterprise', price: '$100+/мес', tools: 'Z Code / Cursor Team + GLM Max ($98) + все MCP серверы', keys: 'Все вышеперечисленные', purpose: 'Команды, enterprise, production workloads', pct: 100, icon: Building2 },
]

export const ERRORS = [
  { error: 'EACCES: permission denied', cause: 'Global npm install без sudo', fix: 'Использовать sudo или npx без установки' },
  { error: 'MCP connection failed', cause: 'Неверный путь конфигурации', fix: 'Проверить ~/.config/opencode/config.json' },
  { error: 'Stitch auth error', cause: 'Истекший OAuth токен', fix: 'Re-run: npx @_davideast/stitch-mcp init' },
  { error: 'Magic API key invalid', cause: 'Неверный ключ', fix: 'Регенерировать на 21st.dev/magic console' },
  { error: 'Skill not found', cause: 'Не установлен', fix: 'npx skills add ... --global' },
  { error: 'Network error', cause: 'Требуется прокси', fix: 'Установить HTTP_PROXY и HTTPS_PROXY' },
  { error: 'Model not found', cause: 'Неверное имя модели', fix: 'Проверить поддерживаемые модели провайдера' },
]

export const CHECKLIST_ITEMS = [
  { id: 'node', label: 'Node.js 18+ установлен', icon: Box },
  { id: 'opencode', label: 'OpenCode установлен', icon: Terminal },
  { id: 'stitch', label: 'Stitch MCP инициализирован', icon: Cable },
  { id: 'config', label: 'Config файл создан', icon: FileCode },
  { id: 'apikeys', label: 'API ключи настроены', icon: Key },
  { id: 'helper', label: 'Coding Tool Helper запущен', icon: Settings },
  { id: 'plan', label: 'GLM Coding Plan выбран', icon: Shield },
  { id: 'shadcn', label: 'shadcn/ui добавлены', icon: Layers },
]

export const FAQ_ITEMS = [
  { q: 'Нужен ли платный аккаунт для начала работы?', a: 'Нет. Вы можете использовать бесплатный стек: OpenCode + Ollama (локальный LLM) + Stitch (free tier) + v0.dev free. Платные планы нужны только для продакшн-использования.' },
  { q: 'Чем отличается Coding Tool Helper от OpenCode?', a: 'Coding Tool Helper — это мастер настройки (CLI), который автоматизирует конфигурацию инструментов. OpenCode — терминальный AI-агент для написания кода. Они работают вместе: Helper настраивает, OpenCode выполняет.' },
  { q: 'Что такое MCP и зачем он нужен?', a: 'Model Context Protocol (MCP) — стандарт подключения внешних инструментов к AI-агентам. MCP-серверы расширяют возможности: поиск в интернете, анализ изображений, чтение веб-страниц.' },
  { q: 'Можно ли использовать локальные модели?', a: 'Да! Через Ollama можно запускать модели локально (Llama 3, Mistral, Qwen). Это бесплатно, но требует 8+ GB RAM. Coding Tool Helper поддерживает настройку локальных моделей.' },
  { q: 'Как сбросить конфигурацию при ошибках?', a: 'Запустите: coding-helper auth revoke для удаления API-ключей, затем coding-helper init для повторной настройки. Также проверьте coding-helper doctor для диагностики.' },
  { q: 'Совместим ли Stagewise с VS Code?', a: 'Stagewise — отдельный Electron-браузер, но интегрируется с VS Code через MCP. Вы можете использовать Stagewise для визуального контекста параллельно с разработкой в VS Code + Cline.' },
]

export const SOURCES = [
  { id: 'S1', url: 'https://www.npmjs.com/package/@z_ai/coding-helper', desc: 'NPM Package' },
  { id: 'S2', url: 'https://docs.z.ai/devpack/extension/coding-tool-helper', desc: 'Coding Tool Helper Docs' },
  { id: 'S3', url: 'https://docs.z.ai/devpack/quick-start', desc: 'Quick Start Guide / Setup Methods' },
  { id: 'S4', url: 'https://docs.z.ai/devpack/tool/others', desc: 'Other Tools / Manual Setup' },
  { id: 'S5', url: 'https://docs.z.ai/devpack/overview', desc: 'DevPack Overview' },
  { id: 'S6', url: 'https://docs.z.ai/scenario-example/develop-tools/claude', desc: 'Claude Integration' },
  { id: 'S7', url: 'https://docs.z.ai/devpack/extension/usage-query-plugin', desc: 'Usage Query Plugin' },
  { id: 'S8', url: 'https://github.com/zai-org/zai-coding-plugins', desc: 'ZAI Coding Plugins' },
  { id: 'S9', url: 'https://www.reddit.com/r/ZaiGLM/comments/1ron472/ensuring_the_model_in_claude_code_cli_w_zai', desc: 'Reddit Discussion' },
  { id: 'S10', url: 'https://docs.z.ai/devpack/mcp/search-mcp-server', desc: 'Search MCP Server' },
  { id: 'S11', url: 'https://docs.z.ai/devpack/mcp/vision-mcp-server', desc: 'Vision MCP Server' },
  { id: 'S12', url: 'https://docs.z.ai/devpack/mcp/reader-mcp-server', desc: 'Reader MCP Server' },
  { id: 'S13', url: 'https://jpcaparas.medium.com/search-vs-reader-vs-zread-a-claude-code-guide-to-z-ai-mcp-servers-134cece1ad96', desc: 'MCP Servers Guide' },
  { id: 'S14', url: 'https://docs.z.ai/devpack/resources/best-practice', desc: 'Best Practices' },
  { id: 'S15', url: 'https://github.com/zai-org', desc: 'ZAI Organization' },
  { id: 'S16', url: 'https://docs.z.ai/', desc: 'Z.AI Documentation' },
  { id: 'S17', url: 'https://docs.z.ai/devpack/using5.1', desc: 'Using GLM-5.1' },
  { id: 'S18', url: 'https://stagewise.io', desc: 'Stagewise Official Site' },
  { id: 'S19', url: 'https://docs.stagewise.io', desc: 'Stagewise Documentation' },
  { id: 'S20', url: 'https://github.com/stagewise-io/stagewise', desc: 'Stagewise GitHub' },
  { id: 'S21', url: 'https://www.npmjs.com/package/@stagewise/agent-interface', desc: 'Stagewise Agent Interface' },
]

export const INSTALL_TOOLS = [
  { name: 'OpenCode', command: 'curl -fsSL https://opencode.ai/install | bash' },
  { name: 'Coding Tool Helper', command: 'npx @z_ai/coding-helper' },
  { name: 'Stitch MCP', command: 'npx @_davideast/stitch-mcp init' },
  { name: 'UI UX Pro Max Skill', command: 'npx skills add nextlevelbuilder/ui-ux-pro-max-skill --global' },
  { name: 'Magic MCP', command: 'npx -y 21st-dev/magic-mcp' },
  { name: 'Cline (VS Code)', command: '# Install Cline from VS Code Marketplace\n# Search: "Cline" in Extensions' },
]

export const TOUR_STEPS = [
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
