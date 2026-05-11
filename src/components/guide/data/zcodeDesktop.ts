export interface PermissionMode {
  name: string;
  id: string;
  description: string;
  bestFor: string;
}

export const permissionModes: PermissionMode[] = [
  {
    name: "Auto Mode",
    id: "auto",
    description: "Автоматически выбирает подходящую стратегию выполнения на основе задачи, балансируя эффективность и безопасность",
    bestFor: "Рекомендуемый режим по умолчанию для повседневной работы",
  },
  {
    name: "Default Mode",
    id: "default",
    description: "Стандартная стратегия подтверждения — сохраняет необходимые точки проверки, не прерывая слишком часто",
    bestFor: "Стабильная повседневная работа с привычным потоком взаимодействия",
  },
  {
    name: "Auto Accept Edits",
    id: "auto-accept",
    description: "Agent изменяет файлы напрямую, при этом запрашивая подтверждение для более чувствительных операций",
    bestFor: "Написание кода, редактирование документов, стилизация и файловые задачи",
  },
  {
    name: "Plan Mode",
    id: "plan",
    description: "Agent сначала понимает запрос и составляет план, затем начинает выполнение после вашего утверждения",
    bestFor: "Сложные многошаговые задачи, где нужно сначала согласовать подход",
  },
  {
    name: "Quiet Mode",
    id: "quiet",
    description: "Меньше интерактивных подсказок — Agent действует с минимальными перерывами при длинных задачах",
    bestFor: "Когда направление задачи уже ясно и нужно более плавное выполнение",
  },
  {
    name: "Skip Permission Checks",
    id: "skip",
    description: "Запускает действия напрямую и минимизирует ручное вмешательство",
    bestFor: "Только в доверенных средах, когда вы полностью понимаете риски!",
  },
];

export interface AgentFramework {
  name: string;
  id: string;
  provider: string;
  coreStrength: string;
  recommendedModels: string;
  bestUseCases: string;
}

export const agentFrameworks: AgentFramework[] = [
  {
    name: "Claude Code",
    id: "claude-code",
    provider: "Anthropic",
    coreStrength: "Многофайловое рассуждение, структурированное автономное выполнение сложных проектов",
    recommendedModels: "Sonnet 4.5, Opus 4.6",
    bestUseCases: "Рефакторинг архитектуры, миграция legacy, сложные многофайловые изменения",
  },
  {
    name: "Gemini CLI",
    id: "gemini-cli",
    provider: "Google",
    coreStrength: "Фронтенд, большие контекстные окна, мультимодальный ввод, встроенный веб-поиск",
    recommendedModels: "Gemini 3 Pro, Gemini 3 Flash",
    bestUseCases: "Фронтенд-разработка, дизайн-в-код, проекты экосистемы Google",
  },
  {
    name: "Codex",
    id: "codex",
    provider: "OpenAI",
    coreStrength: "Исправление багов, глубокая диагностика проблем",
    recommendedModels: "GPT-Codex-5.3, GPT-5.2",
    bestUseCases: "Исправление багов, глубокая диагностика, оптимизация",
  },
  {
    name: "OpenCode",
    id: "opencode",
    provider: "Open-source",
    coreStrength: "Гибкий open-source агент с поддержкой множества LLM-бэкендов",
    recommendedModels: "Множество моделей",
    bestUseCases: "Open-source workflows, кастомная интеграция моделей, гибкие рабочие процессы",
  },
];

export const workflowSuggestions = [
  { task: "Архитектура и планирование", agent: "Claude Code (Sonnet 4.5 / Opus 4.6)", reason: "Лучшее понимание структуры проекта и глубокий рефакторинг" },
  { task: "Фронтенд-разработка", agent: "Gemini CLI (Gemini 3 Pro / Flash)", reason: "Быстрый UI и реализация страниц, мультимодальность" },
  { task: "Отладка и диагностика", agent: "Codex (GPT-Codex-5.3 / GPT-5.2)", reason: "Целевая диагностика багов и оптимизация" },
  { task: "Кастомная интеграция", agent: "OpenCode", reason: "Кастомная интеграция моделей и гибкие рабочие процессы" },
];

export interface AdeTool {
  name: string;
  id: string;
  description: string;
  shortcut?: string;
  details: string[];
}

export const adeTools: AdeTool[] = [
  {
    name: "Task Manager",
    id: "task-manager",
    description: "Управление задачами и историей диалогов. Архивирование, закрепление, навигация",
    details: [
      "История диалогов сохраняется как задачи — вернитесь к предыдущей работе в любой момент",
      "Архивирование задач — уберите завершённые, но ценные задачи из основного списка",
      "Закрепление (Pin) — держите частые задачи ближе к верху",
      "Переименование / Архив / Пометить как непрочитанное",
      "Open in Finder — переход к локальной директории задачи",
      "Копирование путей: проект, задача, логи — для быстрого дебага",
      "Переход к настройкам / Перезагрузка сессии",
    ],
  },
  {
    name: "Remote Development",
    id: "remote-dev",
    description: "Управление рабочим столом с мобильного устройства через QR-код или удалённую ссылку",
    details: [
      "Генерация QR-кода или удалённой ссылки из десктопа",
      "Продолжение работы с мобильного без компьютера",
      "Мобильное удалённое управление интерфейсом",
      "Автоматическое переподключение при обрыве",
    ],
  },
  {
    name: "Terminal Panel",
    id: "terminal",
    description: "Встроенный терминал для сборки, отладки и деплоя",
    shortcut: "⌘J / Ctrl+J",
    details: [
      "Запуск команд сборки и деплоя прямо в рабочей области",
      "Мульти-терминал — несколько окон терминала",
      "Отображение процессов Python и других языков",
    ],
  },
  {
    name: "Browser Panel",
    id: "browser",
    description: "Живой предпросмотр фронтенда с полными DevTools",
    details: [
      "Живой предпросмотр — рендеринг фронтенд-проекта прямо в ZCode",
      "DevTools: Elements, Console, Sources — полный набор для отладки",
      "Адресная строка — открывайте локальные страницы и проверяйте структуру",
    ],
  },
  {
    name: "Diff Preview (Right Sidebar)",
    id: "diff-preview",
    description: "Просмотр изменений кода с подсветкой diff и подсчётом строк",
    shortcut: "⌥⌘B / Ctrl+Alt+B",
    details: [
      "Code Diff review — проверяйте изменения до и после AI-редактирования",
      "Сохранение состояния и подсчёт добавленных/удалённых строк",
      "Фокус на ключевых изменениях — особенно после генерации страниц и стилей",
      "Гибкое переключение макета — раскрывайте/сворачивайте боковую панель",
    ],
  },
];

export interface KeyboardShortcut {
  action: string;
  mac: string;
  windows: string;
}

export const keyboardShortcuts: KeyboardShortcut[] = [
  { action: "Новая задача", mac: "⌘N", windows: "Ctrl+N" },
  { action: "Переключить боковую панель", mac: "⌘B", windows: "Ctrl+B" },
  { action: "Переключить терминал", mac: "⌘J", windows: "Ctrl+J" },
  { action: "Переключить Git Diff", mac: "⌥⌘B", windows: "Ctrl+Alt+B" },
  { action: "Назад (предыдущая задача)", mac: "⌘[", windows: "Ctrl+[" },
  { action: "Вперёд (следующая задача)", mac: "⌘]", windows: "Ctrl+]" },
  { action: "Выбор модели", mac: "⌃M", windows: "Ctrl+M" },
  { action: "Выбор режима", mac: "⌃P", windows: "Ctrl+P" },
  { action: "Уровень мышления", mac: "⌃T", windows: "Ctrl+T" },
];

export interface ZcodeFaq {
  q: string;
  a: string;
}

export const zcodeFaqs: ZcodeFaq[] = [
  {
    q: "Что такое ZCode и чем отличается от CLI-инструментов?",
    a: "ZCode — это Agentic Development Environment (ADE), среда разработки, где AI-агенты находятся в центре рабочего процесса. В отличие от традиционной IDE с ручным кодингом, вы описываете задачу на естественном языке, а Agent управляет полным циклом: от кодинга и отладки до предпросмотра и итерации.\n\nZCode интегрирует основные CLI-инструменты (Claude Code, Codex, Gemini) с файловым менеджером, терминалом, Git-коммитами и живым предпросмотром браузера. Будущее направление — Vibe Coding платформа, где верхнеуровневый оркестратор координирует несколько специализированных CLI-агентов.",
  },
  {
    q: "Бесплатен ли ZCode?",
    a: "Приложение ZCode полностью бесплатно. Однако для использования AI-сервисов вам нужен собственный API-ключ или подписка. Поддерживаемые варианты:\n• Семейство Zhipu: GLM Coding Plan, BigModel, Z.AI\n• Нативные подписки: Claude Code / Codex / Gemini\n• Открытые платформы: OpenRouter\n• Кастомные сервисы: любой AI-сервис, совместимый с Anthropic/OpenAI протоколом",
  },
  {
    q: "Как настроить API-ключ в ZCode?",
    a: "Есть два способа:\n\n1. Quick Connect — нажмите «Continue with Z.AI» при запуске. Если у аккаунта есть активный план, подключение произойдёт автоматически.\n\n2. Через Model Selector — нажмите имя модели в чате → «Manage Models» → Agents Settings/Models. Добавьте провайдера, введите Base URL и API Key.\n\n⚠️ Важно: настройки GLM-терминала не синхронизируются с ZCode автоматически — настройте ключ отдельно в приложении.",
  },
  {
    q: "Можно ли использовать несколько AI-агентов в одной задаче?",
    a: "Да! ZCode поддерживает мультиагентную работу. Вы можете переключаться между Claude Code, Gemini CLI, Codex и OpenCode прямо в диалоге, не создавая новую задачу. Это позволяет получить лучшую помощь в рамках одного рабочего процесса:\n• Сложные проекты → Claude Code (архитектура, рефакторинг)\n• Фронтенд → Gemini CLI (UI, страницы)\n• Отладка → Codex (диагностика багов)\n• Кастомные workflow → OpenCode (гибкая интеграция)",
  },
  {
    q: "Как работает удалённая разработка в ZCode?",
    a: "После запуска удалённых сервисов в десктопном приложении ZCode генерирует QR-код или ссылку для удалённого управления. Откройте ссылку с мобильного устройства, чтобы продолжить работу без компьютера. Поддерживается автоматическое переподключение при обрыве связи.",
  },
  {
    q: "Что такое Skills и чем отличаются от Plugins?",
    a: "Plugin отвечает на вопрос «что система может делать» — добавляет команды, сервисы и инструменты (расширяет возможности).\n\nSkill отвечает на вопрос «как Agent должен это делать» — направляет поведение агента, задавая инструкции и стандарты выполнения задачи.\n\nSkills вызываются через формат $skill-name в чате. Workspace Skills — для конкретного проекта, User Skills — кросс-проектные, привязаны к личной области.",
  },
  {
    q: "Codex или Gemini CLI не загружаются — что делать?",
    a: "Использование Codex и Gemini требует двух условий:\n1. Сетевая среда — убедитесь, что машина использует сеть, которая может достичь нужных сервисов (возможно, потребуется VPN)\n2. Доступность аккаунта — убедитесь, что ваш Codex/Gemini аккаунт имеет необходимый доступ и уже успешно используется из локальной командной строки",
  },
  {
    q: "Как редактировать отправленные сообщения?",
    a: "Наведите курсор на своё сообщение в истории диалога и нажмите иконку карандаша (Edit Message) в правом верхнем углу. Сообщение переключится в режим редактирования. После сохранения Agent регенерирует цепочку ответов на основе обновлённого сообщения, сохраняя общую структуру диалога.\n\nИспользуйте для: исправления ошибок, добавления деталей, экспериментов с формулировками.",
  },
];

export const zcodeDownloadLinks = [
  { platform: "macOS (Apple Silicon)", url: "https://cdn.zcode-ai.com/zcode/electron/releases/2.0.0/ZCode-2.0.0-mac-arm64.dmg", ext: ".dmg", installNote: "Откройте DMG, перетащите Z Code.app в Applications" },
  { platform: "macOS (Intel)", url: "https://cdn.zcode-ai.com/zcode/electron/releases/2.0.0/ZCode-2.0.0-mac-x64.dmg", ext: ".dmg", installNote: "Откройте DMG, перетащите Z Code.app в Applications" },
  { platform: "Windows (x64)", url: "https://cdn.zcode-ai.com/zcode/electron/releases/2.0.0/ZCode-2.0.0-win-x64.exe", ext: ".exe", installNote: "Запустите installer, следуйте мастеру установки" },
  { platform: "Linux", url: "https://cdn.zcode-ai.com/zcode/electron/releases/2.0.0/ZCode-2.0.0-linux-x64.AppImage", ext: ".AppImage", installNote: "Скачайте пакет для вашего дистрибутива" },
];

export interface ZcodeFeature {
  icon: string;
  title: string;
  description: string;
}

export const zcodeCoreFeatures: ZcodeFeature[] = [
  { icon: "brain", title: "Полное понимание кодовой базы", description: "Agents понимают структуру проекта, содержимое файлов и визуальные элементы UI" },
  { icon: "review", title: "Автоматический код-ревью", description: "Inline-предложения, которые отлавливают регрессии до открытия PR" },
  { icon: "integration", title: "Бесшовная интеграция", description: "ZCode подключается к редакторам, трекерам задач и рабочим процессам" },
  { icon: "remote", title: "Удалённая разработка первого класса", description: "Remote Workspace — теперь часть основного продукта, а не дополнение" },
  { icon: "multi-agent", title: "Мультиагентная работа", description: "Встроенный ZCode Agent + Claude, Gemini, GLM, OpenCode, Codex в одном workflow" },
  { icon: "safety", title: "Безопасность и контроль", description: "Все критические действия требуют вашего явного подтверждения" },
];

export interface SafetyDecision {
  option: string;
  description: string;
  recommendedScenario: string;
}

export const safetyDecisions: SafetyDecision[] = [
  { option: "Allow", description: "Авторизовать только это одно действие", recommendedScenario: "Временные или разовые задачи, требующие проверки каждый раз" },
  { option: "Always Allow", description: "Пропустить будущие подтверждения для аналогичных команд", recommendedScenario: "Когда вы уже доверяете этот класс действий и ожидаете частое повторение" },
  { option: "Reject", description: "Остановить текущее действие", recommendedScenario: "Когда команда, путь или описание риска не соответствуют ожиданиям" },
];

export interface SafetyScenario {
  action: string;
  risk: string;
  confirmation: string;
}

export const safetyScenarios: SafetyScenario[] = [
  { action: "Выполнение сторонних скриптов (Python, Shell, Node.js)", risk: "Потенциально вредоносный код в проекте", confirmation: "Allow / Always Allow / Reject" },
  { action: "Сетевые запросы (curl и аналогичные)", risk: "Доступ к внешним API, утечка данных", confirmation: "Allow / Always Allow / Reject" },
  { action: "Системные команды (изменение конфигурации, удаление файлов)", risk: "Повреждение системы", confirmation: "Allow / Always Allow / Reject" },
];

export interface ZcodeVersion {
  version: string;
  date: string;
  features: string[];
  fixes: string[];
}

export const zcodeVersions: ZcodeVersion[] = [
  {
    version: "v2.0.0",
    date: "11 мая 2026",
    features: [
      "SSH-загрузка и установка удалённых ресурсов",
      "Отображение прогресса удалённой загрузки",
      "Оптимизация таймлайна задач и списка задач",
      "Улучшенный интерфейс мобильного удалённого управления",
    ],
    fixes: [
      "Оптимизация повторного использования и проверки удалённых ресурсов",
      "Исправление переключения методов удалённой установки",
      "Улучшение переподключения удалённого управления",
      "Исправление потери черновиков при переподключении на мобильных",
      "Исправление проблем фокуса клавиатуры на мобильных",
      "Исправление проблем макета (боковая панель, список задач, меню)",
    ],
  },
  {
    version: "v1.11.0",
    date: "9 мая 2026",
    features: [
      "Больше способов подключения агентов",
      "Карточки предпросмотра ассистентов",
      "Комментарии код-ревью (прикрепляются к диалогу)",
      "Сворачиваемое окно удалённого подключения",
      "Сортировка удалённых задач на мобильных",
      "Улучшения Markdown-предпросмотра и навигации по TOC",
      "Загрузка навыков (Skills) из пользовательской директории",
    ],
    fixes: [
      "Улучшение выбора ассистента по умолчанию",
      "Исправление совместимости моделей",
      "Улучшение стабильности удалённого подключения",
    ],
  },
  {
    version: "v1.9.0",
    date: "7 мая 2026",
    features: [
      "Мобильное удалённое управление",
      "Оптимизация взаимодействия с Feishu/WeChat ботами",
      "Мажорное обновление ZCode Agent — поддержка долгих задач",
      "Отладчик рабочих процессов (Workflow debugger)",
      "AI задаёт уточняющие вопросы при необходимости",
      "Управление диалогом (компактный/стандартный виды)",
      "Настройка Hooks, Memory и стиля вывода через UI",
      "Переключение модели автоматически связывает уровень мышления и параметры контекста",
      "Ввод поддерживает перетаскивание файлов",
    ],
    fixes: [],
  },
];

// API Key Setup providers
export interface ApiProvider {
  name: string;
  id: string;
  description: string;
  steps: string[];
  baseUrl?: string;
  models?: string;
}

export const apiProviders: ApiProvider[] = [
  {
    name: "Zhipu BigModel",
    id: "bigmodel",
    description: "Модели GLM-5.1, GLM-5-Turbo, GLM-5 и другие через BigModel платформу",
    steps: [
      "Agents Settings / Models → выберите BigModel",
      "Включите переключатель в правом верхнем углу",
      "Нажмите «Get API Key» или «Use Subscription» для привязки GLM Coding Plan",
      "Заполните API ключ и начните использовать модели",
    ],
    models: "glm-5.1, glm-5-turbo, glm-5",
  },
  {
    name: "Zhipu Z.AI",
    id: "zai",
    description: "Нативные подписки для Claude Code, Codex, Gemini через Z.AI",
    steps: [
      "Agents Settings / Models → выберите Z.AI",
      "Включите переключатель и завершите привязку аккаунта",
      "Требуется доступный баланс или активный GLM Coding Plan",
    ],
  },
  {
    name: "Anthropic (Claude API)",
    id: "anthropic",
    description: "Прямой доступ к моделям Claude через API Anthropic",
    steps: [
      "Agents Settings / Models → выберите Anthropic",
      "Нажмите «Get API Key» для получения ключа на платформе Anthropic",
      "Заполните ключ для использования claude-sonnet-4.5, claude-opus-4.5",
      "Добавляйте другие модели через «Add Model»",
    ],
    models: "claude-sonnet-4.5, claude-opus-4.5",
  },
  {
    name: "OpenRouter",
    id: "openrouter",
    description: "Доступ к множеству моделей через OpenRouter",
    steps: [
      "Создайте аккаунт на openrouter.ai и получите API ключ",
      "Agents Settings / Models → «Add Provider»",
      "Имя: OpenRouter",
      "Base URL: https://openrouter.ai/api",
      "Заполните API ключ и включите провайдер",
    ],
    baseUrl: "https://openrouter.ai/api",
  },
  {
    name: "Moonshot (KIMI)",
    id: "moonshot",
    description: "Модели KIMI через платформу Moonshot",
    steps: [
      "Создайте API ключ на platform.moonshot.cn",
      "Agents Settings / Models → «Add Provider»",
      "Имя: Moonshot",
      "Base URL: https://api.moonshot.cn/anthropic",
      "Заполните API ключ для kimi-k2.5, kimi-k2-turbo-preview",
    ],
    baseUrl: "https://api.moonshot.cn/anthropic",
    models: "kimi-k2.5, kimi-k2-turbo-preview",
  },
  {
    name: "Custom Provider",
    id: "custom",
    description: "Любой AI-сервис, совместимый с Anthropic/OpenAI протоколом, включая self-hosted",
    steps: [
      "Agents Settings / Models → «Add Provider»",
      "Задайте кастомное имя (например, deepseek)",
      "Выберите или введите Base URL",
      "Введите API Key",
      "Модели определяются автоматически после подтверждения эндпоинта",
      "Включите провайдер и начните использовать",
    ],
  },
];

// Edit History feature
export const editHistoryUseCases = [
  { title: "Исправление ошибок", desc: "Исправьте опечатки или логические ошибки в более ранней инструкции" },
  { title: "Добавление деталей", desc: "Укажите путь к файлу, параметр или пропущенное требование после того, как Agent уже начал работу" },
  { title: "Эксперимент и уточнение", desc: "Измените формулировку, чтобы сравнить результаты и найти лучший вариант" },
];

// /Commands feature
export interface ZcodeCommand {
  name: string;
  description: string;
}

export const zcodeCommands: ZcodeCommand[] = [
  { name: "/Commands", description: "Переиспользуемые ярлыки — сохраняйте сложные или частые промпты как команды для быстрого вызова" },
];

// Feedback & Support
export const feedbackInfo = {
  formUrl: "https://zhipu-ai.feishu.cn/share/base/form/shrcn6ZwXeNSwdfcJ6Q8XeWVb6C",
  logPaths: {
    macos: "~/.zcode",
    windows: "%USERPROFILE%\\.zcode",
  },
  inAppFeedback: "Меню приложения → Feedback",
  exportLogs: "Меню приложения → Export Logs",
};
