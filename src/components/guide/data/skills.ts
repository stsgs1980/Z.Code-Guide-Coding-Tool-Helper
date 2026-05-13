export const builtinSkills = [
  { name: "LLM", desc: "Чат-бот, генерация текста, диалоги", category: "AI" },
  { name: "VLM", desc: "Анализ и понимание изображений", category: "AI" },
  { name: "ASR", desc: "Распознавание речи (Speech-to-Text)", category: "AI" },
  { name: "TTS", desc: "Синтез речи (Text-to-Speech)", category: "AI" },
  { name: "image-generation", desc: "Генерация изображений из текста", category: "AI" },
  { name: "video-understand", desc: "Анализ и понимание видео", category: "AI" },
  { name: "web-search", desc: "Поиск информации в интернете", category: "Web" },
  { name: "web-reader", desc: "Чтение и извлечение контента с веб-страниц", category: "Web" },
  { name: "code-reviewer", desc: "Ревью кода, безопасность, оптимизация", category: "Dev" },
  { name: "fullstack-dev", desc: "Fullstack-разработка с Next.js", category: "Dev" },
  { name: "charts", desc: "Создание диаграмм и графиков", category: "Dev" },
  { name: "pdf", desc: "Создание и обработка PDF", category: "Doc" },
  { name: "docx", desc: "Создание и редактирование Word", category: "Doc" },
  { name: "xlsx", desc: "Работа с электронными таблицами", category: "Doc" },
  { name: "ppt", desc: "Создание презентаций", category: "Doc" },
  { name: "skill-creator", desc: "Создание и тестирование новых навыков", category: "Meta" },
  { name: "anti-monolith", desc: "Проверка модульности React-компонентов", category: "Dev" },
  { name: "git-checkpoint", desc: "Автоматические git-коммиты и откаты", category: "Dev" },
  { name: "sanitize-validate", desc: "Санитизация и валидация входных данных", category: "Sec" },
  { name: "health-check", desc: "Мониторинг доступности API и сервисов", category: "Ops" },
  { name: "api-retry", desc: "Повторные запросы при ошибках API", category: "Ops" },
  { name: "fallback", desc: "Резервные провайдеры при недоступности API", category: "Ops" },
];

export const categoryColors: Record<string, string> = {
  AI: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Web: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Dev: "bg-green-500/10 text-green-400 border-green-500/20",
  Doc: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Meta: "bg-nyc-taxi/10 text-nyc-taxi border-nyc-taxi/20",
  Sec: "bg-red-500/10 text-red-400 border-red-500/20",
  Ops: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

export const faqItems = [
  { q: "Сколько навыков можно создать?", a: "Без ограничений. Каждый навык — это папка с SKILL.md. Чем больше — тем шире возможности AI-ассистента." },
  { q: "Навык не срабатывает. Что делать?", a: "Проверьте: 1) Папка навыка лежит в skills/ проекта; 2) Файл называется SKILL.md; 3) Frontmatter содержит name и description; 4) Description содержит ключевые слова из вашего запроса." },
  { q: "Можно ли навык на другом языке?", a: "Да! SKILL.md может быть на любом языке — русский, английский, китайский. AI понимает инструкции на любом языке." },
  { q: "Зачем нужны навыки, если AI и так умеет?", a: "Навыки дают специализированные инструкции, которые AI не может угадать. Например, code-reviewer знает про OWASP Top 10, а performance-code-generator — про кэш-локальность и SIMD. Без навыка AI даст общий ответ." },
  { q: "Можно ли комбинировать несколько навыков?", a: "Да. Например, можно вызвать code-reviewer для проверки безопасности, а потом performance-code-generator для оптимизации hot path." },
];

export const whatIsCards = [
  { icon: "FileCode2" as const, title: "Формат", desc: "Markdown-файл SKILL.md с YAML frontmatter (name + description) и инструкциями в теле" },
  { icon: "FolderOpen" as const, title: "Структура", desc: "Папка в директории skills/ проекта. Имя папки = имя навыка" },
  { icon: "Sparkles" as const, title: "Суть", desc: "Специализированные знания, которые AI не может угадать из общих принципов" },
  { icon: "Zap" as const, title: "Триггер", desc: "AI автоматически выбирает навык по совпадению запроса с полем description" },
];

export const howItWorksSteps = [
  { step: "1", text: "Пользователь пишет запрос, например: «Сделай code review этого файла»" },
  { step: "2", text: "AI видит список доступных навыков (name + description из каждого SKILL.md)" },
  { step: "3", text: "AI сопоставляет запрос с description навыков и выбирает подходящий" },
  { step: "4", text: "AI загружает полное содержимое SKILL.md и следует инструкциям" },
  { step: "5", text: "AI выполняет задачу, используя специализированные знания из навыка" },
];

export const frontmatterFields = [
  { field: "name", required: true, desc: "Идентификатор навыка (латиница, дефисы)" },
  { field: "description", required: true, desc: "Главный триггер! Опишите ЧТО делает навык и КОГДА его вызывать. Включите ключевые слова и синонимы." },
  { field: "compatibility", required: false, desc: "Зависимости и требования" },
  { field: "allowed-tools", required: false, desc: "Ограничение доступных инструментов" },
];

export const invokeMethods = [
  { icon: "Terminal" as const, title: "Автоматический", desc: "Просто напишите запрос — AI сам подберёт навык по description", example: "«Сделай code review файла»", color: "bg-green-500/10" },
  { icon: "Search" as const, title: "По ключевым словам", desc: "Упомяните ключевые слова из description навыка", example: "«Найди уязвимости, проверь OWASP»", color: "bg-blue-500/10" },
  { icon: "Sparkles" as const, title: "Явный вызов", desc: "Попросите использовать конкретный навык", example: "«Используй code-reviewer для этого кода»", color: "bg-purple-500/10" },
];

export const queryExamples = [
  { skill: "code-reviewer", queries: ["Сделай code review файла", "Проверь код на уязвимости", "Найди SQL injection в проекте", "Оцени архитектуру этого компонента"] },
  { skill: "performance-code-generator", queries: ["Напиши быструю функцию поиска", "Оптимизируй — код медленный", "Как уменьшить аллокации в цикле?", "Big O этого алгоритма — улучшить"] },
  { skill: "LLM", queries: ["Создай чат-бот для сайта", "Сгенерируй текст для landing page", "Напиши system prompt для AI"] },
  { skill: "image-generation", queries: ["Сгенерируй логотип", "Создай иконку для кнопки", "Нарисуй иллюстрацию к статье"] },
  { skill: "web-search", queries: ["Найди последние новости о React 19", "Что нового в Next.js 16?", "Поиск: лучшие практики API design 2025"] },
];

export const installAiCommands = [
  { cmd: "«Скопируй навык code-reviewer в проект X»", desc: "AI сам выполнит копирование" },
  { cmd: "«Создай навык для автодокументирования кода»", desc: "AI напишет SKILL.md" },
  { cmd: "«Добавь в code-reviewer проверку на GDPR»", desc: "AI отредактирует файл" },
  { cmd: "«Покажи все навыки в проекте»", desc: "AI выведет список" },
  { cmd: "«Сохрани навыки в public/downloads/»", desc: "AI положит файлы для скачивания" },
];
