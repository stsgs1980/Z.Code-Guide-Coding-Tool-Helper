export interface ErrorItem {
  error: string;
  cause: string;
  fix: string;
  category: "auth" | "config" | "network" | "quota" | "tool";
}

export const errors: ErrorItem[] = [
  {
    error: "401 Unauthorized",
    cause: "Неверный или отсутствующий API-ключ",
    fix: "Проверьте ключ: coding-helper auth. Убедитесь, что ключ скопирован полностью без пробелов.",
    category: "auth",
  },
  {
    error: "403 Forbidden",
    cause: "Подписка неактивна или истекла",
    fix: "Проверьте статус подписки на z.ai. Обновите план при необходимости.",
    category: "auth",
  },
  {
    error: "429 Too Many Requests",
    cause: "Превышен лимит запросов (rate limit)",
    fix: "Дождитесь сброса лимита (обычно 5 часов). Рассмотрите переход на план выше.",
    category: "quota",
  },
  {
    error: "Connection refused / Timeout",
    cause: "Сервер недоступен или заблокирован сетевым экраном",
    fix: "Проверьте подключение к интернету. Убедитесь, что api.z.ai доступен. Попробуйте VPN.",
    category: "network",
  },
  {
    error: "Model not found",
    cause: "Указана несуществующая модель в конфигурации",
    fix: "Используйте корректные имена моделей: glm-5.1, glm-5-turbo, glm-4.7, glm-4.5-air",
    category: "config",
  },
  {
    error: "MCP server not responding",
    cause: "MCP-сервер не запущен или неправильно сконфигурирован",
    fix: "Убедитесь, что MCP-сервер установлен: npx -y @z_ai/mcp-server-web-search@latest. Проверьте API-ключ в env.",
    category: "tool",
  },
  {
    error: "coding-helper: command not found",
    cause: "Coding Tool Helper не установлен глобально",
    fix: "Установите: npm install -g @z_ai/coding-helper. Или используйте npx @z_ai/coding-helper",
    category: "tool",
  },
  {
    error: "Quota exceeded for current plan",
    cause: "Исчерпан лимит запросов текущего плана",
    fix: "Дождитесь сброса лимита или обновите план на z.ai. Проверьте лимит: coding-helper doctor",
    category: "quota",
  },
  {
    error: "SSL/TLS certificate error",
    cause: "Проблемы с сертификатом при подключении к API",
    fix: "Обновите Node.js до последней версии. Проверьте системные сертификаты. При необходимости установите NODE_TLS_REJECT_UNAUTHORIZED=0 (только для отладки!)",
    category: "network",
  },
  {
    error: "Invalid JSON in settings.json",
    cause: "Синтаксическая ошибка в файле конфигурации",
    fix: "Проверьте JSON на валидность (jsonlint.com). Убедитесь, что нет лишних запятых и кавычек.",
    category: "config",
  },
];
