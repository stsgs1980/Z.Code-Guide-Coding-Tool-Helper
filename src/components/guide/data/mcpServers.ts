export interface McpServer {
  name: string;
  id: string;
  port: number;
  description: string;
  capabilities: string[];
  configJson: string;
}

export const mcpServers: McpServer[] = [
  {
    name: "Web Search MCP",
    id: "web-search",
    port: 3001,
    description: "Поиск в интернете в реальном времени прямо из вашего кодинг-инструмента",
    capabilities: [
      "Веб-поиск по ключевым словам",
      "Поиск новостей и статей",
      "Актуальная информация из интернета",
      "Интеграция с любым MCP-клиентом",
    ],
    configJson: `{
  "mcpServers": {
    "zai-web-search": {
      "command": "npx",
      "args": [
        "-y",
        "@z_ai/mcp-server-web-search@latest"
      ],
      "env": {
        "ZAI_API_KEY": "your_zai_api_key"
      }
    }
  }
}`,
  },
  {
    name: "Vision MCP",
    id: "vision",
    port: 3002,
    description: "Анализ изображений и скриншотов с помощью AI-зрения",
    capabilities: [
      "Анализ скриншотов и изображений",
      "Чтение текста с изображений (OCR)",
      "Описание визуального содержимого",
      "Сравнение изображений",
    ],
    configJson: `{
  "mcpServers": {
    "zai-vision": {
      "command": "npx",
      "args": [
        "-y",
        "@z_ai/mcp-server-vision@latest"
      ],
      "env": {
        "ZAI_API_KEY": "your_zai_api_key"
      }
    }
  }
}`,
  },
  {
    name: "Web Reader MCP",
    id: "web-reader",
    port: 3003,
    description: "Чтение и извлечение контента с веб-страниц",
    capabilities: [
      "Извлечение текста с веб-страниц",
      "Чтение документации онлайн",
      "Парсинг HTML-контента",
      "Получение метаданных страниц",
    ],
    configJson: `{
  "mcpServers": {
    "zai-web-reader": {
      "command": "npx",
      "args": [
        "-y",
        "@z_ai/mcp-server-web-reader@latest"
      ],
      "env": {
        "ZAI_API_KEY": "your_zai_api_key"
      }
    }
  }
}`,
  },
];

export const mcpCombinedConfig = `{
  "mcpServers": {
    "zai-web-search": {
      "command": "npx",
      "args": ["-y", "@z_ai/mcp-server-web-search@latest"],
      "env": { "ZAI_API_KEY": "your_zai_api_key" }
    },
    "zai-vision": {
      "command": "npx",
      "args": ["-y", "@z_ai/mcp-server-vision@latest"],
      "env": { "ZAI_API_KEY": "your_zai_api_key" }
    },
    "zai-web-reader": {
      "command": "npx",
      "args": ["-y", "@z_ai/mcp-server-web-reader@latest"],
      "env": { "ZAI_API_KEY": "your_zai_api_key" }
    }
  }
}`;
