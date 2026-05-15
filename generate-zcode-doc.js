const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, BorderStyle, ShadingType, WidthType, PageBreak } = require('docx');
const fs = require('fs');

// Палитра DM-1 Deep Cyan (Tech / AI)
const palette = {
  primary: "#162235",
  body: "#000000", 
  secondary: "#5A6080",
  accent: "#37DCF2",
  surface: "#F8F9FF",
  cover: {
    titleColor: "FFFFFF",
    subtitleColor: "B0B8C0",
    metaColor: "90989F",
    footerColor: "687078"
  },
  table: {
    headerBg: "1B6B7A",
    headerText: "FFFFFF",
    accentLine: "1B6B7A",
    innerLine: "C8DDE2",
    surface: "EDF3F5"
  }
};

// Данные групп скриншотов
const screenshotGroups = [
  {
    id: 1,
    title: "Welcome / First Run",
    screenshots: ["Screenshot_001.png"],
    translations: [
      { en: "First run setup", ru: "Настройка при первом запуске" },
      { en: "Welcome ZCode", ru: "Добро пожаловать в ZCode" },
      { en: "Start ZCode", ru: "Запустить ZCode" },
      { en: "Migration Guide", ru: "Руководство по миграции" },
      { en: "Import existing tool settings now, or skip and continue later from Settings.", ru: "Импортируйте существующие настройки инструментов сейчас или пропустите и сделайте это позже в Настройках." },
      { en: "Open fast. Stay focused.", ru: "Открывайте быстро. Оставайтесь сосредоточенными." },
      { en: "Pick a workspace, jump back in, and keep the surface clean.", ru: "Выберите рабочее пространство, вернитесь к работе и держите интерфейс чистым." }
    ]
  },
  {
    id: 2,
    title: "Open Workspace",
    screenshots: ["Screenshot_00.png"],
    translations: [
      { en: "Open Workspace", ru: "Открыть рабочее пространство" },
      { en: "Open Folder", ru: "Открыть папку" },
      { en: "Remote Connect", ru: "Удалённое подключение" },
      { en: "RECENT PROJECTS", ru: "НЕДАВНИЕ ПРОЕКТЫ" },
      { en: "Local Projects", ru: "Локальные проекты" }
    ]
  },
  {
    id: 3,
    title: "Remote Connect",
    screenshots: ["Screenshot_1.png", "Screenshot_2.png"],
    translations: [
      { en: "REMOTE CONNECT", ru: "УДАЛЁННОЕ ПОДКЛЮЧЕНИЕ" },
      { en: "Choose Method", ru: "Выбрать метод" },
      { en: "Fill Settings", ru: "Заполнить настройки" },
      { en: "Connecting", ru: "Подключение" },
      { en: "Choose Directory", ru: "Выбрать директорию" },
      { en: "SSH", ru: "SSH" },
      { en: "Remote host", ru: "Удалённый хост" },
      { en: "Docker", ru: "Docker" },
      { en: "Local container", ru: "Локальный контейнер" },
      { en: "Connection Settings", ru: "Настройки подключения" },
      { en: "Host", ru: "Хост" },
      { en: "Port", ru: "Порт" },
      { en: "Username", ru: "Имя пользователя" },
      { en: "Authentication Method", ru: "Метод аутентификации" },
      { en: "Password", ru: "Пароль" },
      { en: "Private Key", ru: "Приватный ключ" },
      { en: "Start Connection", ru: "Начать подключение" }
    ]
  },
  {
    id: 4,
    title: "Migration Guide",
    screenshots: ["Screenshot_012.png"],
    translations: [
      { en: "MIGRATION GUIDE", ru: "РУКОВОДСТВО ПО МИГРАЦИИ" },
      { en: "Sessions", ru: "Сессии" },
      { en: "Agent settings", ru: "Настройки агента" },
      { en: "Migration", ru: "Миграция" },
      { en: "Claude CLI only", ru: "Только Claude CLI" },
      { en: "Review what we found and choose sessions and workspaces to migrate.", ru: "Просмотрите найденное и выберите сессии и рабочие пространства для миграции." },
      { en: "Last 30 days", ru: "Последние 30 дней" },
      { en: "Scan sessions", ru: "Сканировать сессии" },
      { en: "Choose workspace", ru: "Выбрать рабочее пространство" },
      { en: "Select all", ru: "Выбрать всё" },
      { en: "Continue", ru: "Продолжить" }
    ]
  },
  {
    id: 5,
    title: "Task Interface / Commands",
    screenshots: ["Screenshot_002.png", "Screenshot_23.png", "Screenshot_24.png"],
    translations: [
      { en: "New Task", ru: "Новая задача" },
      { en: "Create Task", ru: "Создать задачу" },
      { en: "Open Workspace", ru: "Открыть рабочее пространство" },
      { en: "Skills", ru: "Навыки" },
      { en: "Bots", ru: "Боты" },
      { en: "Tasks", ru: "Задачи" },
      { en: "No tasks yet", ru: "Задач пока нет" },
      { en: "Start a new task in", ru: "Начать новую задачу в" },
      { en: "workspace", ru: "рабочем пространстве" },
      { en: "Ask ZCode anything. @ to add files, / for commands, $ for skills", ru: "Спросите ZCode о чём угодно. @ для добавления файлов, / для команд, $ для навыков" },
      { en: "Type to search for slash commands", ru: "Введите для поиска слеш-команд" },
      { en: "COMMANDS", ru: "КОМАНДЫ" },
      { en: "/help", ru: "/help" },
      { en: "Show available ZCode ACP commands.", ru: "Показать доступные ACP команды ZCode." },
      { en: "/compact", ru: "/compact" },
      { en: "Compact the current conversation with optional extra instructions.", ru: "Сжать текущий разговор с дополнительными инструкциями." },
      { en: "/goal", ru: "/goal" },
      { en: "Set, pause, resume, or clear the long-running session goal.", ru: "Установить, приостановить, возобновить или очистить долгосрочную цель сессии." },
      { en: "/skill", ru: "/skill" },
      { en: "Load a named skill before continuing the task.", ru: "Загрузить именованный навык перед продолжением задачи." },
      { en: "Open in File Explorer", ru: "Открыть в проводнике" },
      { en: "About ZCode", ru: "О ZCode" },
      { en: "Check for Updates", ru: "Проверить обновления" },
      { en: "Process Monitor", ru: "Монитор процессов" },
      { en: "Feedback", ru: "Обратная связь" },
      { en: "Community", ru: "Сообщество" },
      { en: "Export Logs", ru: "Экспорт логов" },
      { en: "Close Window", ru: "Закрыть окно" }
    ]
  },
  {
    id: 6,
    title: "Settings — General",
    screenshots: ["Screenshot_4.png", "Screenshot_5.png"],
    translations: [
      { en: "Settings", ru: "Настройки" },
      { en: "General", ru: "Общие" },
      { en: "Code Preview", ru: "Предпросмотр кода" },
      { en: "Agent CLI", ru: "Agent CLI" },
      { en: "Model Providers", ru: "Провайдеры моделей" },
      { en: "Plugins", ru: "Плагины" },
      { en: "Skills", ru: "Навыки" },
      { en: "MCP Servers", ru: "MCP Серверы" },
      { en: "Subagents", ru: "Субагенты" },
      { en: "Commands", ru: "Команды" },
      { en: "Hooks", ru: "Хуки" },
      { en: "Memory", ru: "Память" },
      { en: "Output Style", ru: "Стиль вывода" },
      { en: "Onboard", ru: "Онбординг" },
      { en: "App Theme", ru: "Тема приложения" },
      { en: "Choose which theme the application interface should use.", ru: "Выберите, какую тему должен использовать интерфейс приложения." },
      { en: "Dark", ru: "Тёмная" },
      { en: "Language", ru: "Язык" },
      { en: "Choose the display language used by the application UI.", ru: "Выберите язык отображения интерфейса приложения." },
      { en: "English", ru: "Английский" },
      { en: "Interface Zoom", ru: "Масштаб интерфейса" },
      { en: "Adjust the overall size of text and controls in the current window.", ru: "Настройте общий размер текста и элементов управления в текущем окне." },
      { en: "Smaller", ru: "Меньше" },
      { en: "Default", ru: "По умолчанию" },
      { en: "Larger", ru: "Больше" },
      { en: "Task Notifications", ru: "Уведомления о задачах" },
      { en: "Send desktop notifications when a task completes, fails, or needs approval.", ru: "Отправлять уведомления на рабочий стол при завершении, ошибке или необходимости одобрения задачи." },
      { en: "Notification Sound", ru: "Звук уведомления" },
      { en: "Auto-archive Old Tasks", ru: "Автоархивация старых задач" },
      { en: "Archive Retention", ru: "Срок хранения архива" },
      { en: "Archive after 14 days", ru: "Архивировать через 14 дней" },
      { en: "ACP Proxy", ru: "ACP Прокси" },
      { en: "Data Storage Path", ru: "Путь хранения данных" },
      { en: "Choose Folder", ru: "Выбрать папку" },
      { en: "Save", ru: "Сохранить" },
      { en: "Reopen the onboarding flow to review migration options and import settings.", ru: "Открыть онбординг для просмотра опций миграции и импорта настроек." },
      { en: "Open onboarding", ru: "Открыть онбординг" }
    ]
  },
  {
    id: 7,
    title: "Settings — Code Preview",
    screenshots: ["Screenshot_6.png"],
    translations: [
      { en: "Code Preview", ru: "Предпросмотр кода" },
      { en: "Light Code Theme", ru: "Светлая тема кода" },
      { en: "Theme used for code blocks while the interface is in light mode.", ru: "Тема для блоков кода, когда интерфейс в светлом режиме." },
      { en: "GitHub Light", ru: "GitHub Light" },
      { en: "Dark Code Theme", ru: "Тёмная тема кода" },
      { en: "Theme used for code blocks while the interface is in dark mode.", ru: "Тема для блоков кода, когда интерфейс в тёмном режиме." },
      { en: "GitHub Dark", ru: "GitHub Dark" },
      { en: "Show Line Numbers", ru: "Показать номера строк" },
      { en: "Display line numbers in code previews.", ru: "Отображать номера строк в предпросмотре кода." },
      { en: "Wrap Long Lines", ru: "Перенос длинных строк" },
      { en: "Wrap long content inside the preview area automatically.", ru: "Автоматически переносить длинный контент в области предпросмотра." },
      { en: "Code Font Size", ru: "Размер шрифта кода" },
      { en: "Adjust the default font size used by code previews.", ru: "Настройте размер шрифта по умолчанию для предпросмотра кода." },
      { en: "Live Preview", ru: "Живой предпросмотр" },
      { en: "Light Preview", ru: "Светлый предпросмотр" },
      { en: "Dark Preview", ru: "Тёмный предпросмотр" }
    ]
  },
  {
    id: 8,
    title: "Settings — Agent CLI",
    screenshots: ["Screenshot_7.png"],
    translations: [
      { en: "Agent CLI", ru: "Agent CLI" },
      { en: "Manage built-in Agent CLI entries.", ru: "Управление встроенными записями Agent CLI." },
      { en: "CLI items marked Install are bundled with the app and become selectable after you enable them.", ru: "Элементы CLI с отметкой Install поставляются с приложением и становятся доступными после включения." },
      { en: "Refresh", ru: "Обновить" },
      { en: "ZCode Agent", ru: "ZCode Agent" },
      { en: "ZCode Agent is the built-in default agent, ready out of the box for everyday use.", ru: "ZCode Agent — встроенный агент по умолчанию, готовый к использованию из коробки." },
      { en: "Always enabled", ru: "Всегда включён" },
      { en: "Claude CLI", ru: "Claude CLI" },
      { en: "Claude CLI works well for long-context reasoning, careful code edits, and collaborative workflows.", ru: "Claude CLI подходит для длинного контекста, точного редактирования кода и совместной работы." },
      { en: "Installed", ru: "Установлено" },
      { en: "Uninstall", ru: "Удалить" },
      { en: "Codex CLI", ru: "Codex CLI" },
      { en: "Codex CLI is optimized for coding and execution-heavy workflows.", ru: "Codex CLI оптимизирован для кодинга и задач с активным выполнением." },
      { en: "Gemini CLI", ru: "Gemini CLI" },
      { en: "Gemini CLI is a flexible general-purpose assistant for multimodal understanding.", ru: "Gemini CLI — гибкий ассистент общего назначения для мультимодального понимания." },
      { en: "OpenCode CLI", ru: "OpenCode CLI" },
      { en: "OpenCode CLI offers a more open-ended coding assistant experience.", ru: "OpenCode CLI предлагает более открытый опыт работы с кодовым ассистентом." }
    ]
  },
  {
    id: 9,
    title: "Settings — Model Providers",
    screenshots: ["Screenshot_8.png"],
    translations: [
      { en: "Model Providers", ru: "Провайдеры моделей" },
      { en: "Providers", ru: "Провайдеры" },
      { en: "Z ZAI", ru: "Z ZAI" },
      { en: "Enabled", ru: "Включено" },
      { en: "Disable", ru: "Отключить" },
      { en: "Anthropic Endpoint", ru: "Anthropic Endpoint" },
      { en: "OpenAI Endpoint", ru: "OpenAI Endpoint" },
      { en: "API Key", ru: "API Ключ" },
      { en: "Model List", ru: "Список моделей" },
      { en: "Add model", ru: "Добавить модель" },
      { en: "Claude Model Mapping", ru: "Соответствие моделей Claude" },
      { en: "Opus (complex tasks)", ru: "Opus (сложные задачи)" },
      { en: "Sonnet (general tasks)", ru: "Sonnet (общие задачи)" },
      { en: "Bigmodel", ru: "Bigmodel" },
      { en: "Custom Providers", ru: "Пользовательские провайдеры" },
      { en: "Add Provider", ru: "Добавить провайдера" }
    ]
  },
  {
    id: 10,
    title: "Plugins",
    screenshots: ["Screenshot_9.png", "Screenshot_10.png"],
    translations: [
      { en: "Plugins", ru: "Плагины" },
      { en: "Manage Claude CLI plugins and marketplaces.", ru: "Управление плагинами и маркетплейсами Claude CLI." },
      { en: "Discover", ru: "Обзор" },
      { en: "Installed", ru: "Установленные" },
      { en: "Marketplace", ru: "Маркетплейс" },
      { en: "Search plugin name, description, or marketplace", ru: "Поиск по имени, описанию или маркетплейсу" },
      { en: "Agent", ru: "Агент" },
      { en: "Command", ru: "Команда" },
      { en: "Skill", ru: "Навык" },
      { en: "User", ru: "Пользователь" },
      { en: "No description", ru: "Без описания" },
      { en: "Marketplace source, for example owner/repo", ru: "Источник маркетплейса, например owner/repo" },
      { en: "Add marketplace", ru: "Добавить маркетплейс" },
      { en: "Examples: anthropics/claude-plugins-official", ru: "Примеры: anthropics/claude-plugins-official" },
      { en: "available", ru: "доступно" },
      { en: "Updated at", ru: "Обновлено" }
    ]
  },
  {
    id: 11,
    title: "Skills",
    screenshots: ["Screenshot_3.png", "Screenshot_11.png", "Screenshot_12.png"],
    translations: [
      { en: "Skills", ru: "Навыки" },
      { en: "Manage workspace and user skills. Enabled skills can be referenced in chat with $skill-name.", ru: "Управление навыками рабочего пространства и пользователя. Включённые навыки можно вызывать в чате через $имя-навыка." },
      { en: "New Skill", ru: "Новый навык" },
      { en: "Search skills...", ru: "Поиск навыков..." },
      { en: "Source Filter", ru: "Фильтр по источнику" },
      { en: "No skills found", ru: "Навыки не найдены" },
      { en: "Plugin", ru: "Плагин" },
      { en: "algorithmic-art", ru: "algorithmic-art (алгоритмическое искусство)" },
      { en: "Creating algorithmic art using p5.js with seeded randomness.", ru: "Создание алгоритмического искусства с использованием p5.js." },
      { en: "canvas-design", ru: "canvas-design (дизайн холста)" },
      { en: "Create beautiful visual art in .png and .pdf documents.", ru: "Создание визуального искусства в .png и .pdf документах." },
      { en: "docx", ru: "docx (документы Word)" },
      { en: "Use this skill whenever the user wants to create, read, edit Word documents.", ru: "Используйте для создания, чтения, редактирования документов Word." },
      { en: "frontend-design", ru: "frontend-design (фронтенд-дизайн)" },
      { en: "Create distinctive, production-grade frontend interfaces.", ru: "Создание отличных production-готовых фронтенд-интерфейсов." },
      { en: "pdf", ru: "pdf (PDF документы)" },
      { en: "Use this skill whenever the user wants to do anything with PDF files.", ru: "Используйте для работы с PDF файлами." },
      { en: "pptx", ru: "pptx (презентации)" },
      { en: "Use this skill any time a .pptx file is involved.", ru: "Используйте для работы с .pptx файлами." },
      { en: "skill-creator", ru: "skill-creator (создатель навыков)" },
      { en: "Create new skills, modify and improve existing skills.", ru: "Создание новых навыков, изменение и улучшение существующих." },
      { en: "xlsx", ru: "xlsx (таблицы Excel)" },
      { en: "Use this skill any time a spreadsheet file is the primary input or output.", ru: "Используйте для работы с электронными таблицами." },
      { en: "webapp-testing", ru: "webapp-testing (тестирование веб-приложений)" },
      { en: "Toolkit for interacting with and testing local web applications using Playwright.", ru: "Инструментарий для взаимодействия и тестирования локальных веб-приложений." }
    ]
  },
  {
    id: 12,
    title: "MCP Servers",
    screenshots: ["Screenshot_13.png", "Screenshot_14.png"],
    translations: [
      { en: "MCP Servers", ru: "MCP Серверы" },
      { en: "Manage MCP server configurations for common, Claude CLI, Gemini, Codex, and OpenCode.", ru: "Управление конфигурациями MCP серверов для Claude CLI, Gemini, Codex и OpenCode." },
      { en: "Add MCP Server", ru: "Добавить MCP сервер" },
      { en: "Search MCP servers...", ru: "Поиск MCP серверов..." },
      { en: "User", ru: "Пользователь" },
      { en: "Workspace", ru: "Рабочее пространство" },
      { en: "Load to Workspace", ru: "Загрузить в рабочее пространство" },
      { en: "zai-mcp-server", ru: "zai-mcp-server" },
      { en: "stdio - npx -y @z.ai/mcp-server", ru: "stdio - npx -y @z.ai/mcp-server" },
      { en: "web-search-prime", ru: "web-search-prime" },
      { en: "web-reader", ru: "web-reader" },
      { en: "zread", ru: "zread" }
    ]
  },
  {
    id: 13,
    title: "Subagents",
    screenshots: ["Screenshot_15.png"],
    translations: [
      { en: "Subagents", ru: "Субагенты" },
      { en: "Manage subagent configuration files, including user-defined and plugin-provided agents.", ru: "Управление файлами конфигурации субагентов, включая пользовательские и предоставленные плагинами." },
      { en: "New", ru: "Новый" },
      { en: "Search skills...", ru: "Поиск навыков..." },
      { en: "Case Feedback Agent", ru: "Агент обратной связи по кейсам" },
      { en: "Submit case feedback to report issues or suggestions.", ru: "Отправить обратную связь по кейсу для сообщения о проблемах или предложениях." },
      { en: "Usage Query Agent", ru: "Агент запроса использования" },
      { en: "Query GLM Coding Plan usage statistics for the current account.", ru: "Запрос статистики использования GLM Coding Plan для текущего аккаунта." }
    ]
  },
  {
    id: 14,
    title: "Commands",
    screenshots: ["Screenshot_16.png"],
    translations: [
      { en: "Commands", ru: "Команды" },
      { en: "Back to command list", ru: "Назад к списку команд" },
      { en: "New Command", ru: "Новая команда" },
      { en: "Fill in the command name and prompt, then save to return to the list.", ru: "Заполните имя команды и промпт, затем сохраните для возврата к списку." },
      { en: "Name", ru: "Имя" },
      { en: "Will be invokable as /name", ru: "Будет доступна как /имя" },
      { en: "Description (optional)", ru: "Описание (опционально)" },
      { en: "Short description shown in command picker", ru: "Краткое описание, показываемое в выборе команд" },
      { en: "Argument hint (optional)", ru: "Подсказка аргумента (опционально)" },
      { en: "e.g. <file-path>", ru: "напр. <путь-к-файлу>" },
      { en: "Prompt", ru: "Промпт" },
      { en: "Write the prompt that will be sent when this command is invoked...", ru: "Напишите промпт, который будет отправлен при вызове этой команды..." },
      { en: "Cancel", ru: "Отмена" },
      { en: "Save", ru: "Сохранить" }
    ]
  },
  {
    id: 15,
    title: "Hooks",
    screenshots: ["Screenshot_17.png"],
    translations: [
      { en: "Hooks", ru: "Хуки" },
      { en: "Claude CLI only", ru: "Только Claude CLI" },
      { en: "Back to hooks list", ru: "Назад к списку хуков" },
      { en: "New Hook", ru: "Новый хук" },
      { en: "Event", ru: "Событие" },
      { en: "PreToolUse", ru: "PreToolUse (перед использованием инструмента)" },
      { en: "Matcher", ru: "Сопоставление" },
      { en: "e.g. Write, Edit, Bash", ru: "напр. Write, Edit, Bash" },
      { en: "Tool name or pattern to match (required for this event)", ru: "Имя инструмента или шаблон для сопоставления (обязательно для этого события)" },
      { en: "Command", ru: "Команда" },
      { en: "e.g. echo \"Hello from hook\"", ru: "напр. echo \"Привет от хука\"" },
      { en: "Timeout (seconds)", ru: "Таймаут (секунды)" },
      { en: "Timeout in seconds", ru: "Таймаут в секундах" }
    ]
  },
  {
    id: 16,
    title: "Memory",
    screenshots: ["Screenshot_18.png"],
    translations: [
      { en: "Memory", ru: "Память" },
      { en: "Claude CLI only", ru: "Только Claude CLI" },
      { en: "File Name", ru: "Имя файла" },
      { en: "MEMORY.md", ru: "MEMORY.md" },
      { en: "No memory configured", ru: "Память не настроена" },
      { en: "Cancel", ru: "Отмена" },
      { en: "Save", ru: "Сохранить" }
    ]
  },
  {
    id: 17,
    title: "Output Style",
    screenshots: ["Screenshot_19.png", "Screenshot_20.png"],
    translations: [
      { en: "Output Style", ru: "Стиль вывода" },
      { en: "Claude CLI only", ru: "Только Claude CLI" },
      { en: "Manage output styles to customize agent response styles.", ru: "Управление стилями вывода для настройки стиля ответов агента." },
      { en: "New Style", ru: "Новый стиль" },
      { en: "Built-in Styles", ru: "Встроенные стили" },
      { en: "Default", ru: "По умолчанию" },
      { en: "Claude completes coding tasks efficiently and provides concise responses", ru: "Claude эффективно выполняет задачи по кодингу и даёт краткие ответы" },
      { en: "Explanatory", ru: "Объясняющий" },
      { en: "Claude explains its implementation choices and codebase patterns", ru: "Claude объясняет свой выбор реализации и паттерны кодовой базы" },
      { en: "Learning", ru: "Обучающий" },
      { en: "Claude pauses and asks you to write small pieces of code for hands-on practice", ru: "Claude делает паузу и просит вас написать небольшие фрагменты кода для практики" },
      { en: "Back to output styles list", ru: "Назад к списку стилей вывода" },
      { en: "name: My Custom Style", ru: "имя: Мой пользовательский стиль" },
      { en: "description: A brief description of what this style does", ru: "описание: Краткое описание того, что делает этот стиль" },
      { en: "# Custom Style Instructions", ru: "# Инструкции пользовательского стиля" },
      { en: "You are an interactive CLI tool that helps users with software engineering tasks.", ru: "Вы интерактивный CLI инструмент, помогающий пользователям с задачами программной инженерии." },
      { en: "## Specific Behaviors", ru: "## Специфическое поведение" },
      { en: "[Define how the assistant should behave in this style...]", ru: "[Определите, как ассистент должен вести себя в этом стиле...]" },
      { en: "Use frontmatter (---) to define name and description fields", ru: "Используйте frontmatter (---) для определения полей name и description" }
    ]
  },
  {
    id: 18,
    title: "About ZCode",
    screenshots: ["Screenshot_25.png"],
    translations: [
      { en: "About ZCode", ru: "О ZCode" },
      { en: "ZCode 2.2.0", ru: "ZCode 2.2.0" },
      { en: "Version:", ru: "Версия:" },
      { en: "Commit:", ru: "Коммит:" },
      { en: "Build Time:", ru: "Время сборки:" },
      { en: "Environment:", ru: "Окружение:" },
      { en: "production", ru: "production" },
      { en: "Electron:", ru: "Electron:" },
      { en: "Electron Builder:", ru: "Electron Builder:" },
      { en: "Chromium:", ru: "Chromium:" },
      { en: "Node.js:", ru: "Node.js:" },
      { en: "V8:", ru: "V8:" },
      { en: "OS Type:", ru: "Тип ОС:" },
      { en: "OS Platform:", ru: "Платформа ОС:" },
      { en: "OS Release:", ru: "Релиз ОС:" },
      { en: "OS Version:", ru: "Версия ОС:" },
      { en: "OS Arch:", ru: "Архитектура ОС:" },
      { en: "Hostname:", ru: "Имя хоста:" },
      { en: "OK", ru: "OK" }
    ]
  }
];

// Создание таблицы переводов
function createTranslationTable(translations) {
  const rows = [
    // Заголовок таблицы
    new TableRow({
      children: [
        new TableCell({
          width: { size: 45, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: palette.table.headerBg },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({
            children: [new TextRun({ text: "English", bold: true, color: palette.table.headerText, size: 22, font: { ascii: "Calibri", eastAsia: "Microsoft YaHei" } })]
          })]
        }),
        new TableCell({
          width: { size: 55, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: palette.table.headerBg },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({
            children: [new TextRun({ text: "Русский", bold: true, color: palette.table.headerText, size: 22, font: { ascii: "Calibri", eastAsia: "Microsoft YaHei" } })]
          })]
        })
      ]
    })
  ];

  // Строки с переводами
  translations.forEach((t, index) => {
    const isEven = index % 2 === 0;
    rows.push(new TableRow({
      children: [
        new TableCell({
          width: { size: 45, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: isEven ? palette.table.surface : "FFFFFF" },
          margins: { top: 60, bottom: 60, left: 120, right: 120 },
          children: [new Paragraph({
            children: [new TextRun({ text: t.en, size: 21, font: { ascii: "Calibri", eastAsia: "Microsoft YaHei" } })]
          })]
        }),
        new TableCell({
          width: { size: 55, type: WidthType.PERCENTAGE },
          shading: { type: ShadingType.CLEAR, fill: isEven ? palette.table.surface : "FFFFFF" },
          margins: { top: 60, bottom: 60, left: 120, right: 120 },
          children: [new Paragraph({
            children: [new TextRun({ text: t.ru, size: 21, font: { ascii: "Calibri", eastAsia: "Microsoft YaHei" } })]
          })]
        })
      ]
    }));
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: palette.table.innerLine },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: palette.table.innerLine },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: palette.table.innerLine },
      insideVertical: { style: BorderStyle.NONE }
    },
    rows: rows
  });
}

// Создание документа
const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: { ascii: "Calibri", eastAsia: "Microsoft YaHei" },
          size: 24
        },
        paragraph: {
          spacing: { line: 312 }
        }
      },
      heading1: {
        run: {
          font: { ascii: "Calibri", eastAsia: "SimHei" },
          size: 32,
          bold: true,
          color: palette.primary.replace("#", "")
        }
      },
      heading2: {
        run: {
          font: { ascii: "Calibri", eastAsia: "SimHei" },
          size: 28,
          bold: true,
          color: palette.primary.replace("#", "")
        }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1440, bottom: 1440, left: 1701, right: 1417 }
      }
    },
    children: [
      // Заголовок документа
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 },
        children: [new TextRun({ text: "ZCode — Справочник переводов интерфейса", bold: true, size: 36 })]
      }),
      
      // Подзаголовок
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
        children: [new TextRun({ text: "Интерфейс ZCode 2.2.0 — Англо-русский словарь", size: 24, color: palette.secondary.replace("#", "") })]
      }),
      
      // Информация о скриншотах
      new Paragraph({
        spacing: { before: 400, after: 400 },
        children: [new TextRun({ text: `Всего обработано: 27 скриншотов, 18 функциональных групп`, size: 22, color: palette.secondary.replace("#", "") })]
      }),

      // Разделители по группам
      ...screenshotGroups.flatMap((group, index) => {
        const elements = [];
        
        // Заголовок группы
        elements.push(new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 600, after: 200 },
          children: [new TextRun({ text: `${group.id}. ${group.title}`, bold: true })]
        }));
        
        // Информация о скриншотах
        elements.push(new Paragraph({
          spacing: { after: 200 },
          children: [new TextRun({ 
            text: `Скриншоты: ${group.screenshots.join(", ")}`, 
            size: 20, 
            color: palette.secondary.replace("#", ""),
            italics: true
          })]
        }));
        
        // Таблица переводов
        elements.push(createTranslationTable(group.translations));
        
        return elements;
      })
    ]
  }]
});

// Сохранение документа
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/z/my-project/download/ZCode_Interface_Translations_RU.docx', buffer);
  console.log('Документ успешно создан: /home/z/my-project/download/ZCode_Interface_Translations_RU.docx');
});
