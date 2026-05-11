export interface Tool {
  name: string;
  id: string;
  description: string;
  type: "cli" | "ide" | "agent";
  configFormat: "anthropic" | "openai" | "custom";
  note?: string;
}

export const tools: Tool[] = [
  {
    name: "Claude Code",
    id: "claude-code",
    description: "Официальный CLI-клиент Anthropic с поддержкой Z.AI через API-прокси",
    type: "cli",
    configFormat: "anthropic",
  },
  {
    name: "OpenCode",
    id: "opencode",
    description: "Открытый CLI-инструмент для AI-кодинга с поддержкой множества провайдеров",
    type: "cli",
    configFormat: "openai",
  },
  {
    name: "Crush",
    id: "crush",
    description: "AI-агент для автоматизации разработки с поддержкой MCP",
    type: "agent",
    configFormat: "openai",
  },
  {
    name: "Factory Droid",
    id: "factory-droid",
    description: "Автоматизированный AI-агент для CI/CD и код-ревью",
    type: "agent",
    configFormat: "openai",
  },
  {
    name: "Roo Code",
    id: "roo-code",
    description: "Расширение VS Code для AI-ассистированной разработки",
    type: "ide",
    configFormat: "openai",
  },
  {
    name: "Kilo Code",
    id: "kilo-code",
    description: "Лёгкий AI-кодинг-ассистент для VS Code",
    type: "ide",
    configFormat: "openai",
  },
  {
    name: "Cline",
    id: "cline",
    description: "Автономный AI-кодинг-агент для VS Code с поддержкой MCP",
    type: "ide",
    configFormat: "openai",
  },
  {
    name: "OpenClaw",
    id: "openclaw",
    description: "Открытый фреймворк для AI-кодинг-агентов",
    type: "agent",
    configFormat: "openai",
  },
  {
    name: "Goose",
    id: "goose",
    description: "Модульный AI-агент с расширяемой архитектурой",
    type: "agent",
    configFormat: "openai",
  },
  {
    name: "Cursor",
    id: "cursor",
    description: "AI-редактор кода с встроенным чатом и автодополнением",
    type: "ide",
    configFormat: "openai",
  },
  {
    name: "TRAE",
    id: "trae",
    description: "AI-редактор для быстрой разработки с контекстным пониманием кода",
    type: "ide",
    configFormat: "openai",
  },
  {
    name: "Qoder",
    id: "qoder",
    description: "Платформа агрессивного AI-кодинга с автоматизацией задач",
    type: "agent",
    configFormat: "openai",
  },
  {
    name: "Eigent",
    id: "eigent",
    description: "Десктопный AI-агент с мультиагентной архитектурой",
    type: "agent",
    configFormat: "openai",
    note: "Универсальный агент — возможны ограничения в пиковые часы",
  },
  {
    name: "Hermes Agent",
    id: "hermes-agent",
    description: "Открытый развивающийся AI-агент общего назначения",
    type: "agent",
    configFormat: "openai",
    note: "Универсальный агент — возможны ограничения в пиковые часы",
  },
  {
    name: "SillyTavern",
    id: "sillytavern",
    description: "Настраиваемый AI-чат фронтенд общего назначения",
    type: "agent",
    configFormat: "openai",
    note: "Универсальный агент — возможны ограничения в пиковые часы",
  },
];

export const claudeCodeConfig = {
  title: "settings.json (Claude Code)",
  lang: "json",
  code: `{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_zai_api_key",
    "ANTHROPIC_BASE_URL": "https://api.z.ai/api/anthropic",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1,
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-4.7",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.7",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air"
  }
}`,
};

export const openaiCompatConfig = {
  title: "Общая конфигурация (OpenAI Compatible)",
  lang: "yaml",
  code: `API Provider: OpenAI Compatible
Base URL: https://api.z.ai/api/coding/paas/v4
API Key: your_zai_api_key
Model: GLM-4.7

# Внимание: используйте coding-эндпоинт для GLM Coding Plan
# Общий API: https://api.z.ai/api/paas/v4 (не для Coding Plan)`,
};
