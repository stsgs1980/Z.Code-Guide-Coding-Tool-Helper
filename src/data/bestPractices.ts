export interface BestPractice {
  principle: string;
  description: string;
  details: string[];
}

export const bestPractices: BestPractice[] = [
  {
    principle: "Относитесь к агентам как к соавторам",
    description: "Не как к одноразовым ассистентам — настраивайте их со временем через guidance-файлы, интеграции инструментов и переиспользуемые Skills",
    details: [
      "Создавайте .claude/CLAUDE.md и правила проекта",
      "Используйте Skills для типовых задач",
      "Настройте MCP-инструменты под проект",
    ],
  },
  {
    principle: "Структурируйте входные данные задач",
    description: "Чётко определяйте: Цель, Контекст, Ограничения и Критерий завершения",
    details: [
      "Цель: что именно нужно сделать",
      "Контекст: какие файлы и модули затрагиваются",
      "Ограничения: какие технологии и стили использовать",
      "Done-when: как определить, что задача выполнена",
    ],
  },
  {
    principle: "Планируйте перед выполнением",
    description: "Для сложных задач используйте Plan Mode — пусть Agent сначала составит план, затем утверждайте его",
    details: [
      "Активируйте Plan Mode в чате ZCode",
      "Просмотрите план Agent перед выполнением",
      "Утверждайте или корректируйте план",
    ],
  },
  {
    principle: "Зафиксируйте повторяющиеся правила",
    description: "Сохраняйте типовые правила и паттерны в конфигурационных файлах проекта",
    details: [
      "Файл .claude/CLAUDE.md для Claude Code",
      "Правила в настройках инструментов",
      "Skills для повторяющихся подходов",
    ],
  },
  {
    principle: "Подключайте внешние инструменты",
    description: "Используйте MCP, Plugins и Skills для автоматизации рабочих процессов",
    details: [
      "MCP: Vision, Web Search, Web Reader, Zread",
      "Plugins: расширяют возможности системы",
      "Skills: направляют поведение Agent",
    ],
  },
];

export interface MemoryType {
  name: string;
  scope: string;
  description: string;
  storage: string;
}

export const memoryTypes: MemoryType[] = [
  {
    name: "Session Memory",
    scope: "Краткосрочная",
    description: "Контекст текущей задачи: история диалога, выводы инструментов, план выполнения",
    storage: "Текущий диалог",
  },
  {
    name: "Project Memory",
    scope: "Долгосрочная",
    description: "Информация о кодовой базе: архитектура, стандарты, рабочие процессы",
    storage: "Файлы .md в проекте",
  },
  {
    name: "Semantic Memory",
    scope: "Долгосрочная",
    description: "Фактические знания через RAG: документация API, правила языка",
    storage: "Векторная база / RAG",
  },
  {
    name: "Episodic Memory",
    scope: "Долгосрочная",
    description: "Прошлый опыт: исправления багов, корневые причины ошибок, стратегии",
    storage: "История задач",
  },
  {
    name: "Procedural Memory",
    scope: "Долгосрочная",
    description: "Пошаговые процессы: workflow отладки, процедуры выполнения задач",
    storage: "Skills и правила",
  },
];
