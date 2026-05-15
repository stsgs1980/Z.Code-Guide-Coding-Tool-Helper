// ZCode Documentation Data - Based on official docs at zcode.z.ai/en/newdocs

// ============================================
// 01. GETTING STARTED
// ============================================

export const gettingStartedSteps = [
  {
    step: 1,
    title: "Первый запуск",
    description: "При первом запуске ZCode покажет приветственный экран с опциями:",
    options: [
      { label: "Start ZCode", desc: "Начать работу с настройками по умолчанию" },
      { label: "Migration Guide", desc: "Перенести данные из предыдущей версии" },
    ],
    image: "/images/zcode/first-run.png",
  },
  {
    step: 2,
    title: "Выбор workspace",
    description: "Выберите папку проекта или подключитесь к удалённому серверу:",
    options: [
      { label: "Open Folder", desc: "Открыть локальную папку" },
      { label: "Remote Connect", desc: "Подключиться через SSH или Docker" },
    ],
    image: "/images/zcode/workspace-open.png",
  },
  {
    step: 3,
    title: "Миграция данных",
    description: "Если у вас есть данные из предыдущей версии, используйте Migration Guide для переноса сессий и настроек.",
    image: "/images/zcode/migration-guide.png",
  },
];

// ============================================
// 02. AGENT CHAT
// ============================================

export const agentChatModes = [
  {
    name: "Accept All",
    color: "green",
    desc: "Автоматически выполнять все действия без подтверждения",
    bestFor: "Рутина, доверенные операции",
  },
  {
    name: "Auto-accept Edits",
    color: "blue",
    desc: "Автоматически принимать правки кода, спрашивать для остального",
    bestFor: "Активная разработка",
  },
  {
    name: "Standard",
    color: "yellow",
    desc: "Базовый режим — подтверждение для критических действий",
    bestFor: "Баланс скорости и контроля",
  },
  {
    name: "Review",
    color: "purple",
    desc: "Подтверждение для всех действий",
    bestFor: "Незнакомый код, эксперименты",
  },
];

export const agentChatSteps = [
  {
    step: 1,
    title: "Создать задачу",
    action: "Нажмите New Task в меню проекта",
    image: "/images/zcode/task-new.png",
  },
  {
    step: 2,
    title: "Выбрать агента",
    action: "В верхнем меню выберите Agent (Claude Code, Gemini CLI, Codex, OpenCode)",
    image: "/images/zcode/cli-agents-select.png",
  },
  {
    step: 3,
    title: "Настроить режим разрешений",
    action: "Выберите режим в зависимости от сложности задачи",
    image: "/images/zcode/agent-permissions.png",
  },
  {
    step: 4,
    title: "Начать диалог",
    action: "Введите запрос в чат и нажмите Enter",
    image: "/images/zcode/task-start.png",
  },
];

// ============================================
// 03. REMOTE DEVELOPMENT
// ============================================

export const remoteConnectSteps = [
  {
    step: 1,
    title: "Выбрать метод",
    description: "Remote Connect → Choose Method",
    options: ["SSH — подключение к серверу", "Docker — контейнер"],
    image: "/images/zcode/remote-connect-method.png",
  },
  {
    step: 2,
    title: "Настроить подключение",
    description: "Заполните параметры:",
    fields: ["Host — адрес сервера", "Port — порт (22 по умолчанию)", "Username — имя пользователя", "Auth Method — пароль или SSH-ключ"],
    image: "/images/zcode/remote-connect-ssh.png",
  },
  {
    step: 3,
    title: "Выбрать директорию",
    description: "После подключения выберите рабочую директорию на сервере",
    image: null,
  },
];

// ============================================
// 04. TASKS MANAGEMENT
// ============================================

export const taskManagerFeatures = [
  { icon: "ListTodo", title: "История задач", desc: "Все сессии сохраняются как задачи" },
  { icon: "Archive", title: "Архивирование", desc: "Завершённые задачи можно архивировать" },
  { icon: "Pin", title: "Закрепление", desc: "Важные задачи можно закрепить" },
  { icon: "Trash", title: "Удаление", desc: "Удаляйте ненужные задачи" },
];

export const autoArchiveSettings = {
  title: "Auto-archive Old Tasks",
  description: "Автоматически архивировать старые задачи через указанный период",
  options: ["Retention window: 7-30 дней", "Scan interval: периодичность проверки", "Exclude pinned: не архивировать закреплённые"],
  image: "/images/zcode/tasks-auto-archive.png",
};

// ============================================
// 05. SKILLS
// ============================================

export const skillsData = {
  whatIs: {
    title: "Что такое Skills?",
    desc: "Skills — это переиспользуемые конфигурации возможностей. После включения вы можете ссылаться на них в чате через $skill-name.",
    example: "$frontend-design создай кнопку",
  },
  manage: {
    title: "Управление навыками",
    steps: [
      "Откройте Settings → Skills",
      "Используйте поиск и фильтры для навигации",
      "Включите/выключите навыки тумблерами",
    ],
    image: "/images/zcode/skills-manage.png",
  },
  usage: {
    title: "Использование в чате",
    format: "$skill-name",
    desc: "Введите $ и имя навыка для добавления в запрос",
    image: "/images/zcode/skill-call.png",
  },
  faq: [
    { q: "Workspace vs User skills?", a: "Workspace — только в проекте, User — личные навыки" },
    { q: "Навык не появляется?", a: "Проверьте: включён ли, правильный ли фильтр источника" },
  ],
};

// ============================================
// 06. COMMANDS
// ============================================

export const commandsData = {
  whatIs: "Команды — это переиспользуемые ярлыки для часто используемых промптов.",
  howTo: {
    create: [
      "Откройте Settings → Commands",
      "Нажмите New Command",
      "Заполните: Name, Description, Arguments, Prompt",
    ],
    call: [
      "Введите / в поле ввода",
      "Выберите команду из списка или введите имя",
    ],
  },
  fields: [
    { name: "Name", desc: "Имя команды для вызова" },
    { name: "Description", desc: "Краткое описание" },
    { name: "Arguments", desc: "Подсказки для аргументов" },
    { name: "Prompt", desc: "Текст промпта с переменными" },
  ],
  images: {
    new: "/images/zcode/commands-new.png",
    call: "/images/zcode/slash-commands.png",
  },
};

// ============================================
// 07. PLUGINS
// ============================================

export const pluginsData = {
  whatIs: "Плагины расширяют возможности ZCode — добавляют команды, сервисы, инструменты.",
  tabs: [
    {
      name: "Discover",
      desc: "Просмотр доступных плагинов из marketplace",
      actions: ["Поиск по названию", "Фильтрация", "Установка в один клик"],
      image: "/images/zcode/plugins-marketplace.png",
    },
    {
      name: "Installed",
      desc: "Управление установленными плагинами",
      actions: ["Включить/выключить", "Обновить", "Удалить"],
      image: "/images/zcode/plugins-installed.png",
    },
    {
      name: "Marketplace",
      desc: "Настройка источников плагинов",
      actions: ["Добавить источник", "Управлять списком"],
      image: "/images/zcode/plugins-marketplace.png",
    },
  ],
  faq: {
    q: "Plugin vs Skill?",
    a: "Plugin — добавляет возможности (что умеет система), Skill — направляет поведение (как делать задачу)",
  },
};

// ============================================
// 08. MCP SERVICES
// ============================================

export const mcpData = {
  whatIs: "MCP (Model Context Protocol) — протокол для интеграции внешних возможностей с Agent.",
  entry: {
    path: "Settings → MCP Servers",
    desc: "Просмотр, добавление и редактирование MCP-сервисов",
    image: "/images/zcode/mcp-servers.png",
  },
  groups: ["Common", "Claude CLI", "Gemini", "Codex", "OpenCode"],
  addSteps: [
    "Нажмите Add MCP Server",
    "Заполните: Name, Type, Command, Args, Env vars",
    "Выберите Form или JSON режим",
    "Сохраните",
  ],
  services: [
    {
      name: "Vision MCP",
      id: "zai-mcp-server",
      desc: "Понимание и анализ изображений",
      icon: "Eye",
    },
    {
      name: "Web Search MCP",
      id: "web-search-prime",
      desc: "Поиск в интернете в реальном времени",
      icon: "Globe",
    },
    {
      name: "Web Reader MCP",
      id: "web-reader",
      desc: "Извлечение контента из веб-страниц",
      icon: "FileText",
    },
  ],
};

// ============================================
// 09. SUBAGENTS & HOOKS
// ============================================

export const subagentsData = {
  whatIs: "Subagents — это специализированные агенты для конкретных задач.",
  manage: "Settings → Subagents",
  types: ["User-defined", "Plugin-provided"],
  examples: ["Case Feedback Agent", "Usage Query Agent"],
  image: "/images/zcode/subagents.png",
};

export const hooksData = {
  whatIs: "Hooks — автоматические действия при событиях в Agent.",
  events: [
    { event: "PreToolUse", desc: "Перед использованием инструмента" },
    { event: "PostToolUse", desc: "После использования инструмента" },
    { event: "Notification", desc: "При уведомлениях" },
  ],
  image: "/images/zcode/hooks-new.png",
};

// ============================================
// 10. SETTINGS
// ============================================

export const settingsData = {
  codePreview: {
    title: "Code Preview",
    options: ["Theme — тема кода", "Line Numbers — нумерация строк", "Line Wrapping — перенос строк", "Font Size — размер шрифта"],
    image: "/images/zcode/code-preview-settings.png",
  },
  memory: {
    title: "Memory",
    desc: "Настройка постоянной памяти через MEMORY.md файл (только Claude CLI)",
    image: "/images/zcode/memory-settings.png",
  },
  outputStyle: {
    title: "Output Style",
    desc: "Настройка стиля ответов Agent",
    fields: ["Name", "Description", "Instructions", "Behaviors"],
    image: "/images/zcode/output-style-config.png",
  },
  modelProviders: {
    title: "Model Providers",
    desc: "Управление AI-провайдерами и моделями",
    actions: ["Добавить провайдера", "Настроить API ключ", "Выбрать модели"],
    image: "/images/zcode/model-providers.png",
  },
};

// ============================================
// 11. ADE TOOLS
// ============================================

export const adeToolsData = [
  {
    name: "Task Manager",
    icon: "ListTodo",
    desc: "Управление задачами и сессиями проекта",
    features: ["История задач", "Архивирование", "Закрепление", "Группировка"],
    image: "/images/zcode/ade-task-manager.png",
  },
  {
    name: "Terminal",
    icon: "Terminal",
    desc: "Встроенный терминал для CLI-команд",
    shortcut: "Cmd/Ctrl + J",
    features: ["Запуск build/debug", "Git операции", "Скрипты"],
    image: "/images/zcode/ade-terminal.png",
  },
  {
    name: "Browser",
    icon: "Globe",
    desc: "Встроенный браузер для предпросмотра",
    features: ["Live preview", "DevTools", "Responsive"],
    image: "/images/zcode/ade-browser.png",
  },
  {
    name: "Diff Preview",
    icon: "GitCompare",
    desc: "Просмотр изменений кода",
    features: ["До/После", "Подсветка изменений", "Статистика строк"],
    image: "/images/zcode/ade-diff-preview.png",
  },
  {
    name: "Remote Dev",
    icon: "Wifi",
    desc: "Удалённая разработка",
    features: ["QR-код для подключения", "Мобильный доступ", "Синхронизация"],
    image: "/images/zcode/ade-remote-dev.png",
  },
];

// ============================================
// 12. KEYBOARD SHORTCUTS
// ============================================

export const shortcutsData = {
  global: [
    { keys: ["Cmd/Ctrl", "K"], action: "Быстрый поиск / Command palette" },
    { keys: ["Cmd/Ctrl", "J"], action: "Открыть/закрыть терминал" },
    { keys: ["Cmd/Ctrl", "B"], action: "Открыть/закрыть сайдбар" },
    { keys: ["Cmd/Ctrl", "S"], action: "Сохранить" },
    { keys: ["Cmd/Ctrl", "N"], action: "Новая задача" },
  ],
  chat: [
    { keys: ["Enter"], action: "Отправить сообщение" },
    { keys: ["Shift", "Enter"], action: "Новая строка" },
    { keys: ["↑", "↓"], action: "Навигация по истории" },
  ],
  editor: [
    { keys: ["Cmd/Ctrl", "/"], action: "Комментировать строку" },
    { keys: ["Cmd/Ctrl", "D"], action: "Дублировать строку" },
    { keys: ["Alt", "↑/↓"], action: "Переместить строку" },
  ],
};

// ============================================
// 13. FEEDBACK & SUPPORT
// ============================================

export const feedbackData = {
  methods: [
    {
      platform: "Встроенная форма",
      steps: ["Меню приложения → Feedback", "Заполните форму", "Прикрепите логи при необходимости"],
      image: "/images/zcode/feedback-in-app.jpg",
    },
    {
      platform: "macOS",
      steps: ["Меню → Export Logs", "Если не работает: Finder → Go to Folder → ~/.zcode", "Запакуйте папку logs"],
      image: "/images/zcode/feedback-macos.png",
    },
    {
      platform: "Windows",
      steps: ["Меню → Export Logs", "Если не работает: Explorer → %USERPROFILE%\\.zcode", "Запакуйте папку logs"],
      image: "/images/zcode/feedback-win.jpg",
    },
  ],
  formUrl: "https://zhipu-ai.feishu.cn/share/base/form/shrcn6ZwXeNSwdfcJ6Q8XeWVb6C",
};

// ============================================
// 14. FAQ
// ============================================

export const faqData = [
  {
    q: "Что такое ZCode?",
    a: "ZCode — Agentic Development Environment (ADE). В отличие от традиционных IDE, ZCode ставит AI-агентов в центр рабочего процесса. Вы описываете задачу на естественном языке, а Agent выполняет полный цикл: кодинг, отладка, предпросмотр.",
  },
  {
    q: "ZCode бесплатный?",
    a: "Приложение ZCode полностью бесплатное. Однако вам нужен собственный API ключ или подписка на AI-сервисы (Z.AI, Anthropic, OpenAI и др.).",
  },
  {
    q: "Терминал уже настроен с GLM API. Нужно ли настраивать в ZCode?",
    a: "Да. Claude Code и ZCode — разные системы, конфигурация не синхронизируется автоматически. Настройте ключ в Model Providers.",
  },
  {
    q: "Почему Codex или Gemini загружается после Connect?",
    a: "Для работы Codex и Gemini требуется: 1) API ключ провайдера, 2) Включённый MCP-сервер в настройках. Проверьте оба условия.",
  },
];

// ============================================
// 15. EDIT HISTORY
// ============================================

export const editHistoryData = {
  whatIs: "Редактирование отправленных сообщений позволяет исправлять инструкции без начала нового диалога.",
  howTo: [
    { step: 1, action: "Наведите курсор на своё сообщение", image: "/images/zcode/edit-history-enter.png" },
    { step: 2, action: "Нажмите иконку карандаша (Edit Message)", image: "/images/zcode/edit-history-button.png" },
    { step: 3, action: "Отредактируйте текст и отправьте", image: null },
  ],
  useCases: [
    { title: "Исправление ошибок", desc: "Опечатки, неточные инструкции" },
    { title: "Добавление деталей", desc: "Путь к файлу, параметры, требования" },
    { title: "Эксперименты", desc: "Сравнение результатов с разными формулировками" },
  ],
};

// ============================================
// 16. SAFETY CONFIRMATION
// ============================================

export const safetyData = {
  whatIs: "Подтверждение безопасности — ручное подтверждение перед выполнением рискованных действий.",
  workflow: [
    { step: 1, title: "Триггер", desc: "Agent пытается выполнить рискованное действие" },
    { step: 2, title: "Отображение", desc: "Панель показывает команду и предупреждения" },
    { step: 3, title: "Решение", desc: "Пользователь выбирает действие" },
  ],
  options: [
    { name: "Allow", color: "green", desc: "Разрешить один раз", scenario: "Разовые задачи" },
    { name: "Always Allow", color: "blue", desc: "Пропускать подобные команды", scenario: "Доверенные операции" },
    { name: "Reject", color: "red", desc: "Отклонить действие", scenario: "Команда не соответствует ожиданиям" },
  ],
  scenarios: [
    { icon: "Terminal", title: "Сторонние скрипты", desc: "Python, Shell, Node.js скрипты" },
    { icon: "Globe", title: "Сетевые запросы", desc: "curl, API calls" },
    { icon: "AlertTriangle", title: "Системные команды", desc: "Изменение конфигурации, удаление файлов" },
  ],
  image: "/images/zcode/safety-confirm.png",
};

// ============================================
// NAVIGATION STRUCTURE
// ============================================

export const zcodeNavigation = [
  { id: "getting-started", num: "01", title: "Начало работы", icon: "Rocket" },
  { id: "agent-chat", num: "02", title: "Agent Chat", icon: "MessageSquare" },
  { id: "remote-connect", num: "03", title: "Remote Development", icon: "Wifi" },
  { id: "tasks", num: "04", title: "Задачи", icon: "ListTodo" },
  { id: "skills", num: "05", title: "Skills", icon: "Sparkles" },
  { id: "commands", num: "06", title: "Commands", icon: "Terminal" },
  { id: "plugins", num: "07", title: "Plugins", icon: "Puzzle" },
  { id: "mcp", num: "08", title: "MCP Services", icon: "Server" },
  { id: "subagents", num: "09", title: "Subagents & Hooks", icon: "Cpu" },
  { id: "settings", num: "10", title: "Settings", icon: "Settings" },
  { id: "ade-tools", num: "11", title: "ADE Tools", icon: "Wrench" },
  { id: "shortcuts", num: "12", title: "Shortcuts", icon: "Keyboard" },
  { id: "feedback", num: "13", title: "Feedback", icon: "MessageCircle" },
  { id: "faq", num: "14", title: "FAQ", icon: "HelpCircle" },
];
