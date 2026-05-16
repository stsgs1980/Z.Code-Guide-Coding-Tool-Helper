export const commandExamples = [
  { cmd: "/review", desc: "Запустить ревью кода в текущем проекте" },
  { cmd: "/test", desc: "Запустить тесты для текущего проекта" },
  { cmd: "/fix", desc: "Исправить ошибки lint и типизации" },
  { cmd: "/deploy", desc: "Развернуть проект на выбранной платформе" },
  { cmd: "/explain", desc: "Объяснить выбранный фрагмент кода" },
];

export const codingHelperCommands = [
  { command: "npx @z_ai/coding-helper", description: "Запуск без установки (одноразовый)" },
  { command: "npm install -g @z_ai/coding-helper", description: "Глобальная установка" },
  { command: "coding-helper init", description: "Запуск мастера настройки" },
  { command: "chelper init", description: "Альтернативное имя команды" },
  { command: "coding-helper auth", description: "Интерактивная настройка API-ключа" },
  { command: "coding-helper auth glm_coding_plan_global <token>", description: "Установить API-ключ для Global плана" },
  { command: "coding-helper auth revoke", description: "Удалить сохранённый API-ключ" },
  { command: "coding-helper auth reload claude", description: "Загрузить последний план в Claude Code" },
  { command: "coding-helper lang show", description: "Показать текущий язык" },
  { command: "coding-helper lang set en_US", description: "Установить английский язык" },
  { command: "coding-helper lang set ru_RU", description: "Установить русский язык" },
  { command: "coding-helper doctor", description: "Диагностика: проверка конфигурации и подключения" },
  { command: "coding-helper --help", description: "Показать справку" },
  { command: "coding-helper --version", description: "Показать версию" },
];
