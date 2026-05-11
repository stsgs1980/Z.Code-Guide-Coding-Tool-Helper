export interface Command {
  cmd: string;
  description: string;
  category: "install" | "init" | "auth" | "lang" | "diagnostics";
}

export const commands: Command[] = [
  {
    cmd: "npx @z_ai/coding-helper",
    description: "Запуск без установки (одноразовый)",
    category: "install",
  },
  {
    cmd: "npm install -g @z_ai/coding-helper",
    description: "Глобальная установка",
    category: "install",
  },
  {
    cmd: "coding-helper init",
    description: "Запуск интерактивного мастера настройки",
    category: "init",
  },
  {
    cmd: "coding-helper lang show",
    description: "Показать текущий язык",
    category: "lang",
  },
  {
    cmd: "coding-helper lang set ru",
    description: "Установить русский язык",
    category: "lang",
  },
  {
    cmd: "coding-helper auth",
    description: "Интерактивная настройка API-ключа",
    category: "auth",
  },
  {
    cmd: 'coding-helper auth glm_coding_plan_global <token>',
    description: "Установить API-ключ напрямую",
    category: "auth",
  },
  {
    cmd: "coding-helper auth revoke",
    description: "Удалить API-ключ",
    category: "auth",
  },
  {
    cmd: "coding-helper auth reload claude",
    description: "Перезагрузить план для Claude Code",
    category: "auth",
  },
  {
    cmd: "coding-helper doctor",
    description: "Диагностика: проверка конфигурации и подключения",
    category: "diagnostics",
  },
];

export const helperInstallCode = `# Установка Coding Tool Helper
npm install -g @z_ai/coding-helper

# Запуск мастера настройки
coding-helper init`;

export const helperAuthCode = `# Настройка API-ключа (интерактивно)
coding-helper auth

# Или напрямую с токеном
coding-helper auth glm_coding_plan_global your_api_key_here

# Проверка
coding-helper doctor`;

export const helperLangCode = `# Показать текущий язык
coding-helper lang show

# Установить русский
coding-helper lang set ru

# Установить английский
coding-helper lang set en`;
