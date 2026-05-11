export interface Plan {
  name: string;
  id: string;
  price: string;
  priceNum: number;
  promptsPer5h: string;
  promptsPerWeek: string;
  mcpWebSearch: string;
  mcpVision: string;
  mcpReader: string;
  quotaMultiplier: string;
  highlight?: boolean;
}

export const plans: Plan[] = [
  {
    name: "Lite",
    id: "lite",
    price: "$18/мес",
    priceNum: 18,
    promptsPer5h: "~80",
    promptsPerWeek: "~400",
    mcpWebSearch: "100/мес",
    mcpVision: "100/мес",
    mcpReader: "100/мес",
    quotaMultiplier: "1x",
  },
  {
    name: "Pro",
    id: "pro",
    price: "$38/мес",
    priceNum: 38,
    promptsPer5h: "~400",
    promptsPerWeek: "~2000",
    mcpWebSearch: "1000/мес",
    mcpVision: "1000/мес",
    mcpReader: "1000/мес",
    quotaMultiplier: "1x",
    highlight: true,
  },
  {
    name: "Max",
    id: "max",
    price: "$98/мес",
    priceNum: 98,
    promptsPer5h: "~1600",
    promptsPerWeek: "~8000",
    mcpWebSearch: "4000/мес",
    mcpVision: "4000/мес",
    mcpReader: "4000/мес",
    quotaMultiplier: "1x",
  },
];

export const planFaqs = [
  {
    q: "Как переключиться между планами?",
    a: "Перейдите на z.ai, откройте раздел биллинга и выберите новый план. Изменения вступают в силу немедленно.",
  },
  {
    q: "Что происходит при понижении плана?",
    a: "Текущий период будет завершён на старом плане. Новый план начнётся со следующего расчётного цикла. Неиспользованные запросы не переносятся.",
  },
  {
    q: "Как проверить остаток запросов?",
    a: "Выполните coding-helper doctor или проверьте в панели управления на z.ai.",
  },
  {
    q: "Можно ли использовать MCP-серверы без подписки?",
    a: "Нет, MCP-серверы доступны только с активной подпиской GLM Coding Plan.",
  },
  {
    q: "Какие лимиты у моделей Opus-уровня?",
    a: "Модели GLM-5.1 и GLM-5-Turbo получают 3x лимит в пиковые часы и 2x в непиковые по сравнению с базовым тарифом плана.",
  },
];
