// ZCode Documentation Data - Based on official docs at zcode.z.ai/en/newdocs
// 12 Sections with 52 subsections

// ============================================
// 01. FEEDBACK
// ============================================

export const feedbackSectionData = {
  title: "Feedback",
  subtitle: "Отправка обратной связи и логов",
  subsections: {
    feedback: {
      title: "Отправка обратной связи",
      steps: [
        { step: 1, action: "Откройте меню приложения → Feedback" },
        { step: 2, action: "Заполните форму: опишите проблему или предложение" },
        { step: 3, action: "Прикрепите логи при необходимости" },
        { step: 4, action: "Нажмите Send для отправки" },
      ],
      image: "/images/zcode/feedback-in-app.jpg",
    },
    packageLogs: {
      title: "Экспорт логов",
      steps: [
        { step: 1, action: "Меню → Export Logs" },
        { step: 2, action: "Выберите тип логов для экспорта" },
        { step: 3, action: "Сохраните архив в нужную папку" },
      ],
      tip: "Логи необходимы для диагностики проблем разработчиками",
      image: "/images/zcode/feedback-macos.png",
    },
    windows: {
      title: "Логи на Windows",
      steps: [
        { step: 1, action: "Если Export Logs не работает: откройте Explorer" },
        { step: 2, action: "Перейдите в %USERPROFILE%\\.zcode" },
        { step: 3, action: "Запакуйте папку logs в архив" },
        { step: 4, action: "Прикрепите к форме обратной связи" },
      ],
      image: "/images/zcode/feedback-win.jpg",
    },
  },
  formUrl: "https://zhipu-ai.feishu.cn/share/base/form/shrcn6ZwXeNSwdfcJ6Q8XeWVb6C",
};

// ============================================
// 02. AGENTS
// ============================================

export const agentsSectionData = {
  title: "Agents",
  subtitle: "Работа с AI-агентами в ZCode",
  subsections: {
    agentChat: {
      title: "Agent Chat",
      desc: "Agent Chat — основной интерфейс взаимодействия с AI-агентом. Вы описываете задачу на естественном языке, агент выполняет кодинг, отладку и предпросмотр.",
      steps: [
        { step: 1, action: "Нажмите New Task для создания новой задачи" },
        { step: 2, action: "Введите ваш запрос в поле чата" },
        { step: 3, action: "Агент предложит решение или выполнит действия" },
        { step: 4, action: "Подтвердите или отклоните предложенные изменения" },
      ],
      image: "/images/zcode/task-new-interface.png",
    },
    permissions: {
      title: "Разрешения агента",
      desc: "Настройка разрешений определяет какие действия агент может выполнять автоматически, а какие требуют подтверждения.",
      steps: [
        { step: 1, action: "Откройте Settings → Agent Permissions" },
        { step: 2, action: "Выберите уровень доверия для агента" },
        { step: 3, action: "Настройте исключения для критических операций" },
      ],
      image: "/images/zcode/agent-permissions.png",
    },
    availableModes: {
      title: "Доступные режимы",
      modes: [
        { name: "Accept All", color: "green", desc: "Автоматическое выполнение всех действий", bestFor: "Рутина, доверенные операции" },
        { name: "Auto-accept Edits", color: "blue", desc: "Автоприём правок кода, подтверждение для остального", bestFor: "Активная разработка" },
        { name: "Standard", color: "yellow", desc: "Базовый режим с подтверждением критических действий", bestFor: "Баланс скорости и контроля" },
        { name: "Review", color: "purple", desc: "Подтверждение для всех действий", bestFor: "Незнакомый код, эксперименты" },
      ],
    },
  },
};

// ============================================
// 03. EDIT HISTORY
// ============================================

export const editHistorySectionData = {
  title: "Edit History",
  subtitle: "Редактирование отправленных сообщений",
  subsections: {
    editHistory: {
      title: "Что такое Edit History",
      desc: "Редактирование отправленных сообщений позволяет исправлять инструкции без начала нового диалога. Это экономит время и сохраняет контекст разговора.",
    },
    enterEdit: {
      title: "Как войти в режим редактирования",
      steps: [
        { step: 1, action: "Наведите курсор на своё сообщение в чате" },
        { step: 2, action: "Нажмите иконку карандаша (Edit Message)" },
        { step: 3, action: "Отредактируйте текст в появившемся поле" },
        { step: 4, action: "Нажмите Enter для отправки изменённого сообщения" },
      ],
      images: ["/images/zcode/edit-history-enter.png", "/images/zcode/edit-history-button.png"],
    },
    whatEditingSupports: {
      title: "Что поддерживает редактирование",
      items: [
        { name: "Текстовые инструкции", desc: "Основной текст вашего запроса" },
        { name: "Параметры задачи", desc: "Пути к файлам, настройки" },
        { name: "Вложенные файлы", desc: "Прикреплённые изображения и документы" },
      ],
    },
    interfaceBehavior: {
      title: "Поведение интерфейса",
      desc: "При редактировании сообщения агент пересчитывает ответ с учётом изменений. История сохраняет оригинальную и изменённую версии.",
    },
    usageScenarios: {
      title: "Сценарии использования",
      scenarios: [
        { title: "Исправление ошибок", desc: "Опечатки, неточные инструкции", icon: "Pencil" },
        { title: "Добавление деталей", desc: "Путь к файлу, параметры, требования", icon: "Plus" },
        { title: "Эксперименты", desc: "Сравнение результатов с разными формулировками", icon: "Flask" },
      ],
    },
  },
};

// ============================================
// 04. COMMANDS
// ============================================

export const commandsSectionData = {
  title: "Commands",
  subtitle: "Пользовательские команды и слэш-команды",
  subsections: {
    commands: {
      title: "Что такое Commands",
      desc: "Команды — это переиспользуемые ярлыки для часто используемых промптов. Создайте команду один раз и вызывайте её через /имя.",
      steps: [
        { step: 1, action: "Откройте Settings → Commands" },
        { step: 2, action: "Нажмите New Command" },
        { step: 3, action: "Заполните: Name, Description, Arguments, Prompt" },
        { step: 4, action: "Сохраните команду" },
      ],
      fields: [
        { name: "Name", desc: "Имя команды для вызова (без /)" },
        { name: "Description", desc: "Краткое описание" },
        { name: "Arguments", desc: "Подсказки для аргументов" },
        { name: "Prompt", desc: "Текст промпта с переменными {{arg}}" },
      ],
      usage: [
        { step: 1, action: "Введите / в поле ввода чата" },
        { step: 2, action: "Выберите команду из списка или введите имя" },
        { step: 3, action: "Заполните аргументы если есть" },
      ],
      images: ["/images/zcode/commands-new-form.png", "/images/zcode/slash-commands.png"],
    },
  },
};

// ============================================
// 05. PLUGIN
// ============================================

export const pluginSectionData = {
  title: "Plugins",
  subtitle: "Расширение возможностей ZCode",
  subsections: {
    plugin: {
      title: "Что такое Plugins",
      desc: "Плагины расширяют возможности ZCode — добавляют команды, сервисы, инструменты. Устанавливайте из marketplace или создавайте свои.",
    },
    discover: {
      title: "Discover — поиск плагинов",
      steps: [
        { step: 1, action: "Откройте Settings → Plugins → Discover" },
        { step: 2, action: "Используйте поиск и фильтры для навигации" },
        { step: 3, action: "Нажмите Install для установки" },
      ],
      features: ["Поиск по названию", "Фильтрация по категории", "Рейтинг и отзывы"],
      image: "/images/zcode/plugin-discover.png",
    },
    installed: {
      title: "Installed — установленные плагины",
      steps: [
        { step: 1, action: "Перейдите на вкладку Installed" },
        { step: 2, action: "Включите/выключите плагины тумблерами" },
        { step: 3, action: "Обновите или удалите при необходимости" },
      ],
      actions: ["Enable/Disable", "Update", "Uninstall", "Configure"],
      image: "/images/zcode/plugins-installed-tab.png",
    },
    marketplace: {
      title: "Marketplace — источники плагинов",
      steps: [
        { step: 1, action: "Откройте вкладку Marketplace" },
        { step: 2, action: "Добавьте новый источник (URL репозитория)" },
        { step: 3, action: "Управляйте списком источников" },
      ],
      image: "/images/zcode/plugins-marketplace-tab.png",
    },
    faq: {
      title: "FAQ по плагинам",
      items: [
        { q: "Plugin vs Skill?", a: "Plugin — добавляет возможности (что умеет система), Skill — направляет поведение (как делать задачу)" },
        { q: "Безопасно ли устанавливать плагины?", a: "Проверяйте источник и отзывы. Официальные плагины проходят модерацию" },
        { q: "Как создать свой плагин?", a: "Используйте Plugin Development Kit из документации" },
      ],
    },
  },
};

// ============================================
// 06. MCP SERVICES
// ============================================

export const mcpSectionData = {
  title: "MCP Services",
  subtitle: "Model Context Protocol — интеграция внешних сервисов",
  subsections: {
    mcpServices: {
      title: "Что такое MCP",
      desc: "MCP (Model Context Protocol) — протокол для интеграции внешних возможностей с Agent. MCP-серверы предоставляют инструменты, ресурсы и промпты.",
    },
    configGuide: {
      title: "Руководство по настройке",
      desc: "MCP-серверы настраиваются через Settings → MCP Servers. Конфигурация хранится в JSON-формате.",
    },
    configUi: {
      title: "Интерфейс настройки",
      steps: [
        { step: 1, action: "Откройте Settings → MCP Servers" },
        { step: 2, action: "Выберите существующий сервер или Add MCP Server" },
        { step: 3, action: "Заполните поля: Name, Type, Command, Args, Env" },
        { step: 4, action: "Используйте Form или JSON режим редактирования" },
      ],
      modes: ["Form — визуальная форма", "JSON — прямой редактор конфигурации"],
      image: "/images/zcode/mcp-servers-list.png",
    },
    serviceGroups: {
      title: "Группы сервисов",
      groups: ["Common — общие сервисы", "Claude CLI", "Gemini", "Codex", "OpenCode"],
      desc: "Сервисы группируются по агентам. Включайте нужные для вашего workflow.",
      image: "/images/zcode/mcp-servers-manage.png",
    },
    addMcp: {
      title: "Добавление MCP-сервера",
      steps: [
        { step: 1, action: "Нажмите Add MCP Server" },
        { step: 2, action: "Введите Name — название сервера" },
        { step: 3, action: "Выберите Type — тип конфигурации" },
        { step: 4, action: "Укажите Command — команда запуска" },
        { step: 5, action: "Добавьте Args — аргументы команды" },
        { step: 6, action: "Настройте Env vars — переменные окружения" },
      ],
      image: "/images/zcode/mcp-create.png",
    },
    editMcp: {
      title: "Редактирование MCP-сервера",
      steps: [
        { step: 1, action: "Выберите сервер из списка" },
        { step: 2, action: "Нажмите Edit для изменения конфигурации" },
        { step: 3, action: "Внесите изменения в Form или JSON режиме" },
        { step: 4, action: "Сохраните изменения" },
      ],
      image: "/images/zcode/mcp-edit.png",
    },
    coreMcp: {
      title: "Core MCP-серверы",
      desc: "Базовые MCP-серверы поставляются с ZCode:",
      servers: [
        { name: "Filesystem", desc: "Работа с файловой системой" },
        { name: "Git", desc: "Git операции" },
        { name: "Memory", desc: "Постоянная память агента" },
      ],
    },
    visionMcp: {
      title: "Vision MCP",
      desc: "Позволяет агенту понимать и анализировать изображения.",
      features: ["Анализ скриншотов", "Чтение диаграмм", "Описание изображений"],
      usage: "Прикрепите изображение к сообщению — агент автоматически использует Vision.",
    },
    searchMcp: {
      title: "Web Search MCP",
      desc: "Поиск в интернете в реальном времени.",
      features: ["Актуальная информация", "Поиск по запросу", "Извлечение данных"],
      usage: "Агент автоматически выполняет поиск при необходимости актуальных данных.",
    },
    webReaderMcp: {
      title: "Web Reader MCP",
      desc: "Извлечение контента из веб-страниц.",
      features: ["Чтение статей", "Извлечение метаданных", "Парсинг HTML"],
      usage: "Укажите URL — агент извлечёт и проанализирует содержимое.",
    },
  },
};

// ============================================
// 07. SKILL
// ============================================

export const skillSectionData = {
  title: "Skills",
  subtitle: "Переиспользуемые конфигурации возможностей",
  subsections: {
    skill: {
      title: "Что такое Skills",
      desc: "Skills — это переиспользуемые конфигурации возможностей. После включения вы можете ссылаться на них в чате через $skill-name.",
      example: { prompt: "$frontend-design создай кнопку", result: "Агент применит навык frontend-design к задаче" },
    },
    manage: {
      title: "Управление навыками",
      steps: [
        { step: 1, action: "Откройте Settings → Skills" },
        { step: 2, action: "Используйте поиск и фильтры для навигации" },
        { step: 3, action: "Включите/выключите навыки тумблерами" },
        { step: 4, action: "Фильтруйте по источнику (ZCode Agent, Claude CLI, etc.)" },
      ],
      sources: ["Workspace — навыки проекта", "User — личные навыки", "Plugin — от плагинов"],
      images: ["/images/zcode/skills-workspace-user.png", "/images/zcode/skills-filter-source.png", "/images/zcode/skills-plugins-list.png"],
    },
    usage: {
      title: "Использование в чате",
      steps: [
        { step: 1, action: "Введите $ в поле ввода чата" },
        { step: 2, action: "Выберите навык из списка или введите имя" },
        { step: 3, action: "Добавьте ваш запрос после имени навыка" },
      ],
      format: "$skill-name ваш запрос",
      image: "/images/zcode/skill-call.png",
    },
    faq: {
      title: "FAQ по навыкам",
      items: [
        { q: "Workspace vs User skills?", a: "Workspace — только в проекте, User — личные навыки" },
        { q: "Навык не появляется?", a: "Проверьте: включён ли навык, правильный ли фильтр источника" },
        { q: "Как создать свой навык?", a: "Используйте /skill-creator команду в чате" },
      ],
    },
  },
};

// ============================================
// 08. AGENT FRAMEWORK
// ============================================

export const agentFrameworkSectionData = {
  title: "Agent Framework",
  subtitle: "Выбор и переключение AI-фреймворков",
  subsections: {
    multiAgent: {
      title: "Multi-Agent",
      desc: "ZCode поддерживает несколько AI-агентов: Claude Code, Gemini CLI, Codex, OpenCode и другие. Каждый агент имеет свои особенности и требует отдельной настройки.",
      agents: [
        { name: "Claude CLI", provider: "Anthropic", features: "Мощный для сложных задач" },
        { name: "Gemini CLI", provider: "Google", features: "Быстрые ответы, мультимодальность" },
        { name: "Codex", provider: "OpenAI", features: "Специализация на коде" },
        { name: "ZCode Agent", provider: "Z.AI", features: "Оптимизирован для ZCode" },
      ],
    },
    selectAgent: {
      title: "Выбор агента",
      steps: [
        { step: 1, action: "В верхнем меню нажмите на имя текущего агента" },
        { step: 2, action: "Выберите агента из выпадающего списка" },
        { step: 3, action: "Убедитесь что API ключ настроен для выбранного агента" },
      ],
      image: "/images/zcode/cli-agents-select.png",
    },
    switchFramework: {
      title: "Переключение фреймворка",
      steps: [
        { step: 1, action: "Откройте Settings → Agent CLI" },
        { step: 2, action: "Найдите нужный фреймворк в списке" },
        { step: 3, action: "Включите его тумблером" },
        { step: 4, action: "При необходимости установите/обновите" },
      ],
      image: "/images/zcode/agent-cli-manage.png",
    },
    workflow: {
      title: "Workflow с несколькими агентами",
      desc: "Вы можете использовать разных агентов для разных типов задач:",
      examples: [
        { task: "Кодинг и рефакторинг", agent: "Claude CLI" },
        { task: "Быстрые вопросы", agent: "Gemini CLI" },
        { task: "Специализированные задачи", agent: "Custom Agent" },
      ],
    },
  },
};

// ============================================
// 09. SAFETY CONFIRM
// ============================================

export const safetyConfirmSectionData = {
  title: "Safety Confirm",
  subtitle: "Подтверждение безопасности операций",
  subsections: {
    safetyConfirm: {
      title: "Что такое Safety Confirm",
      desc: "Подтверждение безопасности — ручное подтверждение перед выполнением рискованных действий. Защищает от непреднамеренных изменений.",
    },
    workflow: {
      title: "Процесс подтверждения",
      steps: [
        { step: 1, action: "Agent пытается выполнить рискованное действие" },
        { step: 2, action: "Появляется панель с командой и предупреждениями" },
        { step: 3, action: "Пользователь выбирает: Allow, Always Allow или Reject" },
      ],
    },
    decisionOptions: {
      title: "Варианты решения",
      options: [
        { name: "Allow", color: "green", desc: "Разрешить один раз", scenario: "Разовые задачи" },
        { name: "Always Allow", color: "blue", desc: "Пропускать подобные команды", scenario: "Доверенные операции" },
        { name: "Reject", color: "red", desc: "Отклонить действие", scenario: "Команда не соответствует ожиданиям" },
      ],
    },
    scenarios: {
      title: "Сценарии срабатывания",
      items: [
        { icon: "Terminal", title: "Сторонние скрипты", desc: "Python, Shell, Node.js скрипты" },
        { icon: "Globe", title: "Сетевые запросы", desc: "curl, API calls, внешние сервисы" },
        { icon: "AlertTriangle", title: "Системные команды", desc: "Изменение конфигурации, удаление файлов" },
        { icon: "Database", title: "База данных", desc: "DROP, DELETE, TRUNCATE операции" },
      ],
      image: "/images/zcode/safety-confirm.png",
    },
  },
};

// ============================================
// 10. ADE TOOLS
// ============================================

export const adeToolsSectionData = {
  title: "ADE Tools",
  subtitle: "Встроенные инструменты Agent Development Environment",
  subsections: {
    adeTools: {
      title: "Что такое ADE Tools",
      desc: "ZCode предоставляет полный набор инструментов для разработки — от управления задачами до терминала и предпросмотра. Всё в одном месте, без переключения между приложениями.",
    },
    taskManager: {
      title: "Task Manager",
      desc: "Управление задачами и сессиями проекта.",
      features: ["История задач", "Архивирование завершённых", "Закрепление важных", "Группировка по проектам"],
      steps: [
        { step: 1, action: "Нажмите Tasks в левом меню" },
        { step: 2, action: "Выберите задачу из списка или создайте новую" },
        { step: 3, action: "Используйте контекстное меню для управления" },
      ],
      shortcut: "Cmd/Ctrl + N — новая задача",
      image: "/images/zcode/ade-task-manager.png",
    },
    remoteDev: {
      title: "Remote Development",
      desc: "Удалённая разработка через QR-код.",
      features: ["QR-код для быстрого подключения", "Мобильный доступ", "Синхронизация с десктопом"],
      steps: [
        { step: 1, action: "Откройте Remote Dev панель" },
        { step: 2, action: "Отсканируйте QR-код мобильным устройством" },
        { step: 3, action: "Работайте с проектом удалённо" },
      ],
      image: "/images/zcode/ade-remote-dev.png",
    },
    cliPanel: {
      title: "CLI Panel (Terminal)",
      desc: "Встроенный терминал для CLI-команд.",
      features: ["Запуск build/debug команд", "Git операции", "Скрипты автоматизации", "Множественные вкладки"],
      steps: [
        { step: 1, action: "Нажмите Cmd/Ctrl + J для открытия терминала" },
        { step: 2, action: "Введите команду и нажмите Enter" },
        { step: 3, action: "Используйте вкладки для нескольких сессий" },
      ],
      shortcut: "Cmd/Ctrl + J",
      image: "/images/zcode/ade-terminal.png",
    },
    webBrowser: {
      title: "Web Browser",
      desc: "Встроенный браузер для предпросмотра.",
      features: ["Live preview веб-страниц", "DevTools интеграция", "Responsive режим", "Автообновление"],
      steps: [
        { step: 1, action: "Запустите dev-сервер проекта" },
        { step: 2, action: "Браузер автоматически откроется с preview" },
        { step: 3, action: "Используйте DevTools для отладки" },
      ],
      image: "/images/zcode/ade-browser.png",
    },
    sidebar: {
      title: "Sidebar",
      desc: "Боковая панель с навигацией.",
      features: ["Быстрый доступ к файлам", "Поиск по проекту", "Git статус", "Расширения"],
      steps: [
        { step: 1, action: "Нажмите Cmd/Ctrl + B для переключения сайдбара" },
        { step: 2, action: "Выберите нужную вкладку (Files, Search, Git, etc.)" },
      ],
      shortcut: "Cmd/Ctrl + B",
      image: "/images/zcode/ade-menu.png",
    },
    diffPreview: {
      title: "Diff Preview",
      desc: "Просмотр изменений кода до применения.",
      features: ["До/После сравнение", "Подсветка изменений", "Статистика строк"],
      image: "/images/zcode/ade-diff-preview.png",
    },
  },
};

// ============================================
// 11. KEYBOARD SHORTCUTS
// ============================================

export const keyboardShortcutsSectionData = {
  title: "Keyboard Shortcuts",
  subtitle: "Горячие клавиши для быстрой работы",
  subsections: {
    keyboardShortcuts: {
      title: "Основные сочетания",
      desc: "Горячие клавиши ускоряют работу и позволяют не отвлекаться на мышь.",
    },
    globalShortcuts: {
      title: "Глобальные shortcuts",
      shortcuts: [
        { keys: ["Cmd/Ctrl", "K"], action: "Быстрый поиск / Command palette" },
        { keys: ["Cmd/Ctrl", "J"], action: "Открыть/закрыть терминал" },
        { keys: ["Cmd/Ctrl", "B"], action: "Открыть/закрыть сайдбар" },
        { keys: ["Cmd/Ctrl", "S"], action: "Сохранить" },
        { keys: ["Cmd/Ctrl", "N"], action: "Новая задача" },
        { keys: ["Cmd/Ctrl", "P"], action: "Быстрое открытие файла" },
        { keys: ["Cmd/Ctrl", "Shift", "P"], action: "Command palette" },
      ],
    },
    quickPickers: {
      title: "Quick Pickers",
      desc: "Быстрые панели выбора для различных действий.",
      pickers: [
        { keys: ["Cmd/Ctrl", "K"], desc: "Quick Open — поиск файлов и команд" },
        { keys: ["Cmd/Ctrl", "Shift", "F"], desc: "Global Search — поиск по всему проекту" },
        { keys: ["Cmd/Ctrl", "G"], desc: "Go to Line — переход к строке" },
      ],
    },
    chatShortcuts: {
      title: "Shortcuts для чата",
      shortcuts: [
        { keys: ["Enter"], action: "Отправить сообщение" },
        { keys: ["Shift", "Enter"], action: "Новая строка" },
        { keys: ["↑", "↓"], action: "Навигация по истории" },
        { keys: ["Esc"], action: "Отменить ввод" },
      ],
    },
    editorShortcuts: {
      title: "Shortcuts для редактора",
      shortcuts: [
        { keys: ["Cmd/Ctrl", "/"], action: "Комментировать строку" },
        { keys: ["Cmd/Ctrl", "D"], action: "Дублировать строку" },
        { keys: ["Alt", "↑/↓"], action: "Переместить строку" },
        { keys: ["Cmd/Ctrl", "Z"], action: "Отменить" },
        { keys: ["Cmd/Ctrl", "Shift", "Z"], action: "Повторить" },
      ],
    },
  },
};

// ============================================
// 12. QA
// ============================================

export const qaSectionData = {
  title: "Q&A",
  subtitle: "Часто задаваемые вопросы",
  subsections: {
    qa: {
      title: "Общие вопросы",
    },
    productPositioning: {
      title: "Что такое ZCode?",
      a: "ZCode — Agentic Development Environment (ADE). В отличие от традиционных IDE, ZCode ставит AI-агентов в центр рабочего процесса. Вы описываете задачу на естественном языке, а Agent выполняет полный цикл: кодинг, отладка, предпросмотр.",
    },
    isItFree: {
      title: "ZCode бесплатный?",
      a: "Приложение ZCode полностью бесплатное. Однако вам нужен собственный API ключ или подписка на AI-сервисы (Z.AI, Anthropic, OpenAI и др.).",
    },
    reConfig: {
      title: "Терминал уже настроен с GLM API. Нужно ли настраивать в ZCode?",
      a: "Да. Claude Code и ZCode — разные системы, конфигурация не синхронизируется автоматически. Настройте ключ в Model Providers.",
    },
    loadingIssue: {
      title: "Почему Codex или Gemini загружается после Connect?",
      a: "Для работы Codex и Gemini требуется: 1) API ключ провайдера, 2) Включённый MCP-сервер в настройках. Проверьте оба условия.",
    },
    otherQuestions: [
      { q: "Какие модели поддерживаются?", a: "ZCode поддерживает Claude, GPT, Gemini, GLM и другие модели через соответствующие CLI-агенты." },
      { q: "Можно ли использовать локальные модели?", a: "Да, через Ollama или другие локальные провайдеры, настроенные в Model Providers." },
      { q: "Где хранятся данные?", a: "Данные хранятся локально в ~/.zcode (macOS/Linux) или %USERPROFILE%\\.zcode (Windows)." },
    ],
  },
};

// ============================================
// NAVIGATION STRUCTURE
// ============================================

export const zcodeNavigation = [
  { id: "feedback", num: "01", title: "Feedback", icon: "MessageCircle" },
  { id: "agents", num: "02", title: "Agents", icon: "Bot" },
  { id: "edit-history", num: "03", title: "Edit History", icon: "History" },
  { id: "commands", num: "04", title: "Commands", icon: "Terminal" },
  { id: "plugin", num: "05", title: "Plugins", icon: "Puzzle" },
  { id: "mcp", num: "06", title: "MCP Services", icon: "Server" },
  { id: "skill", num: "07", title: "Skills", icon: "Sparkles" },
  { id: "agent-framework", num: "08", title: "Agent Framework", icon: "Cpu" },
  { id: "safety-confirm", num: "09", title: "Safety Confirm", icon: "Shield" },
  { id: "ade-tools", num: "10", title: "ADE Tools", icon: "Wrench" },
  { id: "shortcuts", num: "11", title: "Shortcuts", icon: "Keyboard" },
  { id: "qa", num: "12", title: "Q&A", icon: "HelpCircle" },
];
