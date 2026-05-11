export interface Command {
  cmd: string;
  description: string;
  category: "install" | "init" | "auth" | "lang" | "diagnostics" | "mcp";
}

export const commands: Command[] = [
  { cmd: "npx @z_ai/coding-helper", description: "Запуск без установки (одноразовый)", category: "install" },
  { cmd: "npm install -g @z_ai/coding-helper", description: "Глобальная установка", category: "install" },
  { cmd: "coding-helper init", description: "Запуск мастера настройки", category: "init" },
  { cmd: "chelper init", description: "Альтернативное имя команды", category: "init" },
  { cmd: "coding-helper lang show", description: "Показать текущий язык", category: "lang" },
  { cmd: "coding-helper lang set en_US", description: "Установить английский язык", category: "lang" },
  { cmd: "coding-helper lang set ru", description: "Установить русский язык", category: "lang" },
  { cmd: "coding-helper auth", description: "Интерактивная настройка API-ключа", category: "auth" },
  { cmd: "coding-helper auth glm_coding_plan_global <token>", description: "Установить API-ключ для Global плана", category: "auth" },
  { cmd: "coding-helper auth revoke", description: "Удалить сохранённый API-ключ", category: "auth" },
  { cmd: "coding-helper auth reload claude", description: "Загрузить последний план в Claude Code", category: "auth" },
  { cmd: "coding-helper doctor", description: "Диагностика: проверка конфигурации и подключения", category: "diagnostics" },
  { cmd: "coding-helper --help", description: "Показать справку", category: "diagnostics" },
  { cmd: "coding-helper --version", description: "Показать версию", category: "diagnostics" },
];

export const helperInstallCode = `# Способ 1: Запуск без установки (рекомендуется для разового использования)
npx @z_ai/coding-helper

# Способ 2: Глобальная установка (для частого использования)
npm install -g @z_ai/coding-helper

# Затем запускайте:
coding-helper
# или короткая команда:
chelper

# Если npm install выдаёт ошибку прав, используйте sudo:
sudo npm install -g @z_ai/coding-helper`;

export const helperAuthCode = `# Интерактивная настройка API-ключа
coding-helper auth

# Прямая установка ключа для Global плана
coding-helper auth glm_coding_plan_global your_api_key_here

# Перезагрузить план в Claude Code
coding-helper auth reload claude

# Удалить сохранённый ключ
coding-helper auth revoke`;

export const helperLangCode = `# Показать текущий язык
coding-helper lang show

# Установить русский язык
coding-helper lang set ru

# Установить английский язык
coding-helper lang set en_US`;
