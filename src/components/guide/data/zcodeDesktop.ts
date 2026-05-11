export interface PermissionMode {
  name: string;
  id: string;
  description: string;
  bestFor: string;
}

export const permissionModes: PermissionMode[] = [
  {
    name: "Auto",
    id: "auto",
    description: "Автоматически выбирает стратегию выполнения, балансирует эффективность и безопасность",
    bestFor: "Рекомендуемый режим по умолчанию",
  },
  {
    name: "Default",
    id: "default",
    description: "Стандартная стратегия подтверждения — Agent спрашивает перед ключевыми действиями",
    bestFor: "Повседневная стабильная работа",
  },
  {
    name: "Auto Accept Edits",
    id: "auto-accept",
    description: "Agent изменяет файлы напрямую, подтверждает только чувствительные операции",
    bestFor: "Написание кода, редактирование документов",
  },
  {
    name: "Plan",
    id: "plan",
    description: "Agent сначала составляет план, затем выполняет — вы утверждаете план перед запуском",
    bestFor: "Сложные многошаговые задачи",
  },
  {
    name: "Quiet",
    id: "quiet",
    description: "Меньше интерактивных подсказок — Agent действует с минимальными перерывами",
    bestFor: "Задачи с понятным направлением",
  },
  {
    name: "Skip Permission Checks",
    id: "skip",
    description: "Минимальное ручное вмешательство — все действия выполняются автоматически",
    bestFor: "Только в доверенных средах!",
  },
];

export interface AgentFramework {
  name: string;
  id: string;
  provider: string;
  coreStrength: string;
  recommendedModels: string;
}

export const agentFrameworks: AgentFramework[] = [
  {
    name: "Claude Code",
    id: "claude-code",
    provider: "Anthropic",
    coreStrength: "Многофайловое рассуждение, структурированное автономное выполнение",
    recommendedModels: "Sonnet 4.5, Opus 4.6",
  },
  {
    name: "Gemini CLI",
    id: "gemini-cli",
    provider: "Google",
    coreStrength: "Фронтенд, большой контекст, мультимодальность, встроенный веб-поиск",
    recommendedModels: "Gemini 3 Pro/Flash",
  },
  {
    name: "Codex",
    id: "codex",
    provider: "OpenAI",
    coreStrength: "Исправление багов, глубокая диагностика проблем",
    recommendedModels: "GPT-Codex-5.3, GPT-5.2",
  },
  {
    name: "OpenCode",
    id: "opencode",
    provider: "Open-source",
    coreStrength: "Гибкость, поддержка множества LLM-бэкендов",
    recommendedModels: "Множество моделей",
  },
];

export const workflowSuggestions = [
  { task: "Архитектура и планирование", agent: "Claude Code", reason: "Лучшее понимание структуры проекта" },
  { task: "Фронтенд-разработка", agent: "Gemini CLI", reason: "Мультимодальность и большой контекст" },
  { task: "Отладка и диагностика", agent: "Codex", reason: "Глубокий анализ багов" },
  { task: "Кастомная интеграция", agent: "OpenCode", reason: "Гибкая настройка и множество бэкендов" },
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
    description: "Управление задачами и историей диалогов",
    details: [
      "История диалогов сохраняется как задачи",
      "Архивирование, закрепление, переименование",
      "Открытие в файловом менеджере",
      "Копирование пути к задаче",
    ],
  },
  {
    name: "Remote Development",
    id: "remote-dev",
    description: "Управление рабочим столом с мобильного устройства",
    details: [
      "Генерация QR-кода / удалённой ссылки из десктопа",
      "Продолжение работы с мобильного устройства",
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
      "Запуск команд сборки и деплоя",
      "Мульти-терминал (несколько окон)",
      "Отображение процесса Python и других языков",
    ],
  },
  {
    name: "Browser Panel",
    id: "browser",
    description: "Превью фронтенда с инструментами разработчика",
    details: [
      "Живой предпросмотр фронтенда",
      "DevTools: Elements, Console, Sources",
      "Адресная строка и отладка страниц",
    ],
  },
  {
    name: "Diff Preview",
    id: "diff-preview",
    description: "Просмотр изменений кода с подсветкой различий",
    shortcut: "⌥⌘B / Ctrl+Alt+B",
    details: [
      "Просмотр diff-изменений в реальном времени",
      "Сохранение состояния и подсчёт изменений",
      "Фокус на важных изменениях",
      "Гибкое переключение макета",
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
  { action: "Назад", mac: "⌘[", windows: "Ctrl+[" },
  { action: "Вперёд", mac: "⌘]", windows: "Ctrl+]" },
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
    a: "ZCode — это Agentic Development Environment (ADE), полноценная среда разработки с AI-агентами в центре рабочего процесса. В отличие от CLI-инструментов, ZCode предоставляет десктопный интерфейс с Task Manager, встроенным терминалом, браузером, diff-просмотром и удалённой разработкой. Вы можете переключаться между разными AI-агентами (Claude Code, Gemini CLI, Codex, OpenCode) в рамках одной задачи.",
  },
  {
    q: "Бесплатен ли ZCode?",
    a: "Да, приложение ZCode бесплатно. Однако для использования AI-сервисов вам нужен собственный API-ключ или подписка на GLM Coding Plan. Само приложение можно скачать и использовать без оплаты.",
  },
  {
    q: "Как настроить API-ключ в ZCode?",
    a: "Есть два способа:\n1. Через «Connect» — войдите с аккаунтом Z.AI, ключ настроится автоматически\n2. Через Model Selector → Manage Models → Agents Settings/Models — введите ключ вручную\n\nПримечание: настройки GLM-терминала не синхронизируются с ZCode автоматически — настройте ключ отдельно.",
  },
  {
    q: "Можно ли использовать несколько AI-агентов в одной задаче?",
    a: "Да! ZCode поддерживает мультиагентную работу. Вы можете переключаться между Claude Code, Gemini CLI, Codex и OpenCode в рамках одного диалога, не создавая новую задачу. Рекомендация: Claude Code для архитектуры, Gemini для фронтенда, Codex для отладки, OpenCode для кастомной интеграции.",
  },
  {
    q: "Как работает удалённая разработка в ZCode?",
    a: "ZCode позволяет генерировать QR-код или удалённую ссылку прямо из десктопного приложения. Отсканируйте QR-код с мобильного устройства, чтобы продолжить работу с задачами удалённо. Поддерживается автоматическое переподключение при обрыве связи.",
  },
  {
    q: "Что такое Skills и чем отличаются от Plugins?",
    a: "Plugin — это «что система может делать»: добавляет команды, сервисы и инструменты (расширяет возможности). Skill — это «как Agent должен это делать»: направляет поведение агента, задавая инструкции и подход к задаче. Skills можно вызывать через формат $skill-name в чате.",
  },
  {
    q: "Codex или Gemini CLI не загружаются — что делать?",
    a: "Убедитесь, что у вас корректная сетевая среда (VPN при необходимости) и учётная запись доступна. Некоторые агенты требуют отдельной настройки учётных данных. Проверьте статус агента через Model Selector → Manage Models.",
  },
];

export const zcodeDownloadLinks = [
  { platform: "macOS (Apple Silicon)", url: "https://cdn.zcode-ai.com/zcode/electron/releases/2.0.0/ZCode-2.0.0-mac-arm64.dmg", ext: ".dmg" },
  { platform: "macOS (Intel)", url: "https://cdn.zcode-ai.com/zcode/electron/releases/2.0.0/ZCode-2.0.0-mac-x64.dmg", ext: ".dmg" },
  { platform: "Windows", url: "https://cdn.zcode-ai.com/zcode/electron/releases/2.0.0/ZCode-2.0.0-win-x64.exe", ext: ".exe" },
  { platform: "Linux", url: "https://cdn.zcode-ai.com/zcode/electron/releases/2.0.0/ZCode-2.0.0-linux-x64.AppImage", ext: ".AppImage" },
];

export interface ZcodeFeature {
  icon: string;
  title: string;
  description: string;
}

export const zcodeCoreFeatures: ZcodeFeature[] = [
  { icon: "brain", title: "Полное понимание кодовой базы", description: "ZCode отслеживает контекст между репозиториями, позволяя Agent рассуждать обо всём стеке" },
  { icon: "review", title: "Автоматический код-ревью", description: "Inline-предложения, которые отлавливают регрессии до открытия PR" },
  { icon: "integration", title: "Бесшовная интеграция", description: "ZCode подключается к редакторам, трекерам задач и рабочим процессам" },
  { icon: "remote", title: "Удалённая разработка", description: "Управление десктопом с мобильного — работа из любой точки" },
  { icon: "multi-agent", title: "Мультиагентная работа", description: "Переключайте агентов в одном диалоге — Claude, Gemini, Codex, OpenCode" },
  { icon: "safety", title: "Безопасность и контроль", description: "Все критические действия требуют явного подтверждения" },
];

export interface SafetyScenario {
  action: string;
  risk: string;
  confirmation: string;
}

export const safetyScenarios: SafetyScenario[] = [
  { action: "Выполнение сторонних скриптов", risk: "Потенциально вредоносный код", confirmation: "Разрешить / Всегда разрешать / Отклонить" },
  { action: "Сетевые запросы", risk: "Утечка данных", confirmation: "Разрешить / Всегда разрешать / Отклонить" },
  { action: "Системные команды", risk: "Повреждение системы", confirmation: "Разрешить / Всегда разрешать / Отклонить" },
  { action: "Изменение файлов проекта", risk: "Потеря данных", confirmation: "Разрешить / Всегда разрешать / Отклонить" },
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
