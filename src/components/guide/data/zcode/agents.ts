export const agentFrameworks = [
  {
    name: "Claude Code",
    provider: "Anthropic",
    strength: "Уверенное мышление в многофайловой среде, структурированное автономное выполнение",
    models: "Sonnet 4.5, Opus 4.6",
    bestFor: "Рефакторинг архитектуры, сложные изменения в нескольких файлах",
    color: "orange",
  },
  {
    name: "Gemini CLI",
    provider: "Google",
    strength: "Фронтенд-разработка, большие контекстные окна, мультимодальный ввод, веб-поиск",
    models: "Gemini 3 Pro, Gemini 3 Flash",
    bestFor: "Разработка фронтенда, задачи от проектирования до кодирования",
    color: "blue",
  },
  {
    name: "Codex",
    provider: "OpenAI",
    strength: "Исправление ошибок и глубокая диагностика проблем",
    models: "GPT-Codex-5.3, GPT-5.2",
    bestFor: "Исправление багов, детальная диагностика, оптимизация",
    color: "green",
  },
  {
    name: "OpenCode",
    provider: "Open Source",
    strength: "Гибкий агент с открытым исходным кодом, поддержка нескольких LLM-бэкендов",
    models: "Множество моделей",
    bestFor: "Open source, интеграция пользовательских моделей",
    color: "purple",
  },
];

export const workflowSuggestions = [
  { agent: "Claude Code", task: "Архитектура и рефакторинг", models: "Sonnet 4.5 / Opus 4.6" },
  { agent: "Gemini CLI", task: "Фронтенд-разработка", models: "Gemini 3 Pro / Flash" },
  { agent: "Codex", task: "Исправление багов", models: "GPT-Codex-5.3 / GPT-5.2" },
  { agent: "OpenCode", task: "Настраиваемые рабочие процессы", models: "Пользовательские модели" },
];
