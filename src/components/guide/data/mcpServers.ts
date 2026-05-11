export interface McpServer {
  name: string;
  id: string;
  type: "local" | "remote";
  description: string;
  capabilities: string[];
  tools?: string[];
  bestPractice?: string;
  prerequisites?: string;
  package?: string;
  version?: string;
  oneClickInstall?: string;
  configClaudeCode: string;
  configCline: string;
  configOpenCode: string;
}

export const mcpServers: McpServer[] = [
  {
    name: "Vision MCP Server",
    id: "vision",
    type: "local",
    description:
      "Анализ изображений и видео с помощью AI-зрения прямо из вашего кодинг-инструмента",
    capabilities: [
      "Анализ изображений",
      "Понимание видео",
      "Интеграция с MCP-клиентами",
    ],
    tools: [
      "ui_to_artifact",
      "extract_text_from_screenshot",
      "diagnose_error_screenshot",
      "understand_technical_diagram",
      "analyze_data_visualization",
      "ui_diff_check",
      "image_analysis",
      "video_analysis",
    ],
    bestPractice:
      "Размещайте изображения в локальной директории и указывайте ссылку по имени/пути — не вставляйте изображения напрямую.",
    prerequisites: "Node.js >= v22.0.0",
    package: "@z_ai/mcp-server",
    version: ">= 0.1.2",
    configClaudeCode: `{
  "mcpServers": {
    "zai-vision": {
      "command": "npx",
      "args": ["-y", "@z_ai/mcp-server@latest"],
      "env": {
        "ZAI_API_KEY": "your_zai_api_key"
      }
    }
  }
}`,
    configCline: `{
  "mcpServers": {
    "zai-vision": {
      "command": "npx",
      "args": ["-y", "@z_ai/mcp-server@latest"],
      "env": {
        "ZAI_API_KEY": "your_zai_api_key"
      }
    }
  }
}`,
    configOpenCode: `{
  "mcpServers": {
    "zai-vision": {
      "command": "npx",
      "args": ["-y", "@z_ai/mcp-server@latest"],
      "env": {
        "ZAI_API_KEY": "your_zai_api_key"
      }
    }
  }
}`,
  },
  {
    name: "Web Search MCP Server",
    id: "web-search",
    type: "remote",
    description:
      "Поиск в интернете в реальном времени — заголовки, URL, краткое содержание результатов",
    capabilities: [
      "Поиск веб-информации в реальном времени",
      "Результаты: заголовки, URL, краткое содержание",
      "Интеграция с любым MCP-клиентом",
    ],
    tools: ["webSearchPrime"],
    oneClickInstall:
      'claude mcp add -s user -t http web-search-prime https://api.z.ai/api/mcp/web_search_prime/mcp --header "Authorization: Bearer your_api_key"',
    configClaudeCode: `claude mcp add -s user -t http web-search-prime \\
  https://api.z.ai/api/mcp/web_search_prime/mcp \\
  --header "Authorization: Bearer your_api_key"`,
    configCline: `{
  "mcpServers": {
    "web-search-prime": {
      "url": "https://api.z.ai/api/mcp/web_search_prime/mcp",
      "headers": {
        "Authorization": "Bearer your_api_key"
      }
    }
  }
}`,
    configOpenCode: `{
  "mcpServers": {
    "web-search-prime": {
      "url": "https://api.z.ai/api/mcp/web_search_prime/mcp",
      "headers": {
        "Authorization": "Bearer your_api_key"
      }
    }
  }
}`,
  },
  {
    name: "Web Reader MCP Server",
    id: "web-reader",
    type: "remote",
    description:
      "Извлечение содержимого веб-страниц: заголовок, основное содержание, метаданные, список ссылок",
    capabilities: [
      "Извлечение заголовка и основного содержания",
      "Получение метаданных страницы",
      "Извлечение списка ссылок",
      "Интеграция с любым MCP-клиентом",
    ],
    tools: ["webReader"],
    oneClickInstall:
      'claude mcp add -s user -t http web-reader https://api.z.ai/api/mcp/web_reader/mcp --header "Authorization: Bearer your_api_key"',
    configClaudeCode: `claude mcp add -s user -t http web-reader \\
  https://api.z.ai/api/mcp/web_reader/mcp \\
  --header "Authorization: Bearer your_api_key"`,
    configCline: `{
  "mcpServers": {
    "web-reader": {
      "url": "https://api.z.ai/api/mcp/web_reader/mcp",
      "headers": {
        "Authorization": "Bearer your_api_key"
      }
    }
  }
}`,
    configOpenCode: `{
  "mcpServers": {
    "web-reader": {
      "url": "https://api.z.ai/api/mcp/web_reader/mcp",
      "headers": {
        "Authorization": "Bearer your_api_key"
      }
    }
  }
}`,
  },
];
