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
    title: "Z Code",
    url: "https://zcode.z.ai",
    description: "Страница продукта Z Code",
    category: "tools",
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
    title: "GLM Coding Plan FAQ",
    url: "https://docs.z.ai/devpack/faq",
    description: "Часто задаваемые вопросы о планах",
    category: "docs",
  },
  {
    title: "MCP Web Search",
    url: "https://docs.z.ai/devpack/extension/mcp-server-web-search",
    description: "Документация MCP Web Search",
    category: "tools",
  },
  {
    title: "MCP Vision",
    url: "https://docs.z.ai/devpack/extension/mcp-server-vision",
    description: "Документация MCP Vision",
    category: "tools",
  },
  {
    title: "MCP Web Reader",
    url: "https://docs.z.ai/devpack/extension/mcp-server-web-reader",
    description: "Документация MCP Web Reader",
    category: "tools",
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
