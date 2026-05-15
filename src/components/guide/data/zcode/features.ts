export const welcomeFeatures = [
  { icon: "MessageSquare", title: "Управление на естественном языке", desc: "Описывайте намерения на естественном языке вместо запоминания сложных аргументов CLI" },
  { icon: "Eye", title: "Полное понимание контекста", desc: "Агенты понимают структуру проекта, содержимое файлов и визуальные элементы UI" },
  { icon: "Shield", title: "Безопасность и управляемость", desc: "Все критические действия требуют вашего явного подтверждения" },
];

export const newReleaseStrengths = [
  { icon: "Layers", title: "Новая архитектура", desc: "Переработана с учётом рабочего пространства для лучшей отзывчивости и стабильности" },
  { icon: "ShieldCheck", title: "Повышенная стабильность", desc: "Интерфейс и конвейер взаимодействия перестроены для надёжной работы" },
  { icon: "Clock", title: "Длительные задачи", desc: "Лучше подходит для задач программирования и отладки с большим числом шагов" },
  { icon: "Users", title: "Мультиагентное взаимодействие", desc: "ZCode Agent + Claude, Gemini, GLM, OpenCode и Codex в одном рабочем процессе" },
  { icon: "Globe", title: "Удалённая разработка", desc: "Remote Workspace — часть основного функционала, а не дополнение" },
];

export const installPlatforms = [
  { platform: "macOS (Apple Silicon)", url: "#", ext: ".dmg" },
  { platform: "macOS (Intel)", url: "#", ext: ".dmg" },
  { platform: "Windows", url: "#", ext: ".exe" },
  { platform: "Linux", url: "#", ext: ".AppImage" },
];

export const installSteps = [
  { os: "Windows", steps: "Загрузите установочный файл, дважды щёлкните по нему и следуйте инструкциям мастера установки" },
  { os: "macOS", steps: "Откройте DMG-файл, перетащите Z Code.app в папку «Приложения», затем запустите из Launchpad" },
  { os: "Linux", steps: "Загрузите пакет для вашего дистрибутива и установите стандартным способом" },
];

export const apiSetupMethods = [
  { num: "1", title: "Через Connect", desc: "Нажмите «Continue with Z.AI» в приветственном диалоге — вход через аккаунт Z.AI", icon: "LogIn" },
  { num: "2", title: "Через селектор моделей", desc: "Щёлкните название модели в чате → «Manage Models» — настройте всех провайдеров ИИ", icon: "Settings" },
];

export const apiProviders = [
  { name: "Zhipu BigModel", key: "bigmodel", models: "glm-5.1, glm-5-turbo, glm-5", note: "Поддержка GLM Coding Plan", baseUrl: "" },
  { name: "Z.AI", key: "zai", models: "Модели Z.AI", note: "Требуется баланс или активный Coding Plan", baseUrl: "" },
  { name: "Anthropic (Claude)", key: "anthropic", models: "claude-sonnet-4.5, claude-opus-4.5", note: "Нативная подписка Claude Code", baseUrl: "" },
  { name: "OpenRouter", key: "openrouter", models: "Все модели OpenRouter", note: "Открытая платформа", baseUrl: "https://openrouter.ai/api" },
  { name: "Moonshot (KIMI)", key: "moonshot", models: "kimi-k2.5, kimi-k2-turbo-preview", note: "KIMI платформа", baseUrl: "https://api.moonshot.cn/anthropic" },
  { name: "Пользовательский", key: "custom", models: "Автообнаружение", note: "Любой совместимый с Anthropic/OpenAI API", baseUrl: "" },
];

export const permissionModes = [
  { name: "Автоматический", desc: "Автоматически выбирает стратегию выполнения, баланс эффективности и безопасности", best: "Рекомендуемый вариант по умолчанию", color: "green" },
  { name: "По умолчанию", desc: "Стандартная стратегия подтверждения с контрольными точками", best: "Стабильное повседневное использование", color: "blue" },
  { name: "Автопринятие правок", desc: "Прямое изменение файлов, подтверждение для конфиденциальных операций", best: "Написание кода, редактирование документации", color: "yellow" },
  { name: "Режим планирования", desc: "Сначала составляет план, затем выполняет", best: "Сложные многоэтапные задачи", color: "purple" },
  { name: "Тихий режим", desc: "Меньше подсказок, меньше прерываний", best: "Когда направление задачи уже ясно", color: "cyan" },
  { name: "Пропуск проверок", desc: "Прямое выполнение с минимумом вмешательства", best: "Только в доверенных средах", color: "red" },
];

export const editUseCases = [
  { title: "Исправление ошибок", desc: "Исправьте опечатки или логические ошибки в более ранней инструкции" },
  { title: "Добавление деталей", desc: "Укажите путь к файлу, параметр или пропущенное требование после того, как Agent уже начал работу" },
  { title: "Эксперимент и уточнение", desc: "Измените формулировку, чтобы сравнить результаты и найти лучший вариант" },
];
