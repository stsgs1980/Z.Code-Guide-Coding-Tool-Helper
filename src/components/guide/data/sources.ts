export interface Source {
  title: string;
  url: string;
  description: string;
  category: "docs" | "tools" | "api" | "community";
}

export const sources: Source[] = [
  {
    title: "Z.AI Документация",
    url: "https://docs.z.ai",
    description: "Официальная документация по всем продуктам Z.AI",
    category: "docs",
  },
  {
    title: "ZCode Desktop",
    url: "https://zcode.z.ai",
    description: "Agentic Development Environment — десктопное приложение ZCode",
    category: "tools",
  },
  {
    title: "ZCode Changelog",
    url: "https://zcode.z.ai/changelog",
    description: "История версий и обновлений ZCode",
    category: "tools",
  },
  {
    title: "ZCode Документация",
    url: "https://zcode.z.ai/newdocs",
    description: "Полная документация по ZCode Desktop",
    category: "docs",
  },
  {
    title: "Z.AI API Reference",
    url: "https://docs.z.ai/api-reference/introduction",
    description: "Справочник по API Z.AI",
    category: "api",
  },
  {
    title: "Quick Start Guide",
    url: "https://docs.z.ai/devpack/quick-start",
    description: "Руководство по быстрому старту",
    category: "docs",
  },
  {
    title: "Coding Tool Helper",
    url: "https://docs.z.ai/devpack/extension/coding-tool-helper",
    description: "Документация Coding Tool Helper",
    category: "tools",
  },
  {
    title: "GLM Coding Plan",
    url: "https://docs.z.ai/devpack/overview",
    description: "Обзор GLM Coding Plan и тарифов",
    category: "docs",
  },
  {
    title: "GLM Coding Plan FAQ",
    url: "https://docs.z.ai/devpack/faq",
    description: "Часто задаваемые вопросы о планах",
    category: "docs",
  },
  {
    title: "Best Practices",
    url: "https://docs.z.ai/devpack/resources/best-practice",
    description: "Лучшие практики работы с AI-кодинг-агентами",
    category: "docs",
  },
  {
    title: "Memory Mechanism",
    url: "https://docs.z.ai/devpack/resources/memory-mechanism",
    description: "Механизм памяти AI-агентов: типы и архитектура",
    category: "docs",
  },
  {
    title: "MCP Web Search",
    url: "https://docs.z.ai/devpack/mcp/search-mcp-server",
    description: "Документация MCP Web Search",
    category: "tools",
  },
  {
    title: "MCP Vision",
    url: "https://docs.z.ai/devpack/mcp/vision-mcp-server",
    description: "Документация MCP Vision",
    category: "tools",
  },
  {
    title: "MCP Web Reader",
    url: "https://docs.z.ai/devpack/mcp/reader-mcp-server",
    description: "Документация MCP Web Reader",
    category: "tools",
  },
  {
    title: "MCP Zread",
    url: "https://docs.z.ai/devpack/mcp/zread-mcp-server",
    description: "Документация MCP Zread",
    category: "tools",
  },
  {
    title: "Scenario Examples",
    url: "https://docs.z.ai/scenario-example/develop-tools/claude",
    description: "Примеры интеграции с различными инструментами",
    category: "docs",
  },
  {
    title: "Управление API-ключами",
    url: "https://z.ai/manage-apikey/apikey-list",
    description: "Создание и управление API-ключами",
    category: "api",
  },
  {
    title: "Биллинг и подписки",
    url: "https://z.ai/manage-apikey/billing",
    description: "Управление подпиской и оплатой",
    category: "api",
  },
];
