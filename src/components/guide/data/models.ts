export interface GLMModel {
  name: string;
  id: string;
  level: "opus" | "sonnet" | "haiku";
  description: string;
  useCase: string;
  quotaPeak: string;
  quotaOffPeak: string;
  speed: string;
  quality: string;
}

export const models: GLMModel[] = [
  {
    name: "GLM-5.1",
    id: "glm-5.1",
    level: "opus",
    description: "Флагманская модель с максимальным качеством рассуждений и глубоким пониманием кода",
    useCase: "Сложная архитектура, рефакторинг, отладка сложных багов",
    quotaPeak: "3x",
    quotaOffPeak: "2x",
    speed: "Медленная",
    quality: "Максимальная",
  },
  {
    name: "GLM-5-Turbo",
    id: "glm-5-turbo",
    level: "opus",
    description: "Быстрая Opus-модель с теми же лимитами, оптимизированная для скорости",
    useCase: "Быстрый кодинг с высоким качеством, итеративная разработка",
    quotaPeak: "3x",
    quotaOffPeak: "2x",
    speed: "Средняя",
    quality: "Высокая",
  },
  {
    name: "GLM-4.7",
    id: "glm-4.7",
    level: "sonnet",
    description: "Базовая модель по умолчанию, оптимальный баланс скорости и качества",
    useCase: "Повседневная разработка, написание функций, автодополнение",
    quotaPeak: "1x",
    quotaOffPeak: "1x",
    speed: "Быстрая",
    quality: "Хорошая",
  },
  {
    name: "GLM-4.5-Air",
    id: "glm-4.5-air",
    level: "haiku",
    description: "Лёгкая и быстрая модель для простых задач и автодополнения",
    useCase: "Автодополнение, простые правки, быстрые ответы",
    quotaPeak: "1x",
    quotaOffPeak: "1x",
    speed: "Очень быстрая",
    quality: "Базовая",
  },
];

export const modelMapping = {
  anthropic: {
    opus: "glm-5.1",
    sonnet: "glm-4.7",
    haiku: "glm-4.5-air",
  },
  openai: {
    default: "GLM-4.7",
  },
};
