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
  context?: string;
}

export const models: GLMModel[] = [
  {
    name: "GLM-5.1",
    id: "glm-5.1",
    level: "opus",
    description: "Флагманская модель с максимальным качеством рассуждений и глубоким пониманием кода. Кодинг на уровне Opus 4.6, 8-часовые одиночные задачи",
    useCase: "Сложная архитектура, рефакторинг, отладка сложных багов",
    quotaPeak: "3x",
    quotaOffPeak: "2x",
    speed: "Медленная",
    quality: "Максимальная",
    context: "200K",
  },
  {
    name: "GLM-5",
    id: "glm-5",
    level: "opus",
    description: "Модель Opus-уровня для программирования, агентного долгосрочного планирования и бэкенд-рефакторинга",
    useCase: "Сложные задачи кодинга, не требующие максимального качества GLM-5.1",
    quotaPeak: "3x",
    quotaOffPeak: "2x",
    speed: "Средняя",
    quality: "Высокая",
    context: "200K",
  },
  {
    name: "GLM-5-Turbo",
    id: "glm-5-turbo",
    level: "opus",
    description: "Быстрая Opus-модель, оптимизированная для скорости и непрерывности сложных задач",
    useCase: "Быстрый кодинг с высоким качеством, итеративная разработка",
    quotaPeak: "3x",
    quotaOffPeak: "2x",
    speed: "Средняя",
    quality: "Высокая",
    context: "200K",
  },
  {
    name: "GLM-4.7",
    id: "glm-4.7",
    level: "sonnet",
    description: "SOTA-модель общего назначения, оптимизированная для агентного кодинга. Базовая модель по умолчанию",
    useCase: "Повседневная разработка, написание функций, автодополнение",
    quotaPeak: "1x",
    quotaOffPeak: "1x",
    speed: "Быстрая",
    quality: "Хорошая",
    context: "200K",
  },
  {
    name: "GLM-4.5-Air",
    id: "glm-4.5-air",
    level: "haiku",
    description: "Лёгкая и быстрая модель для простых задач и автодополнения. Экономичная",
    useCase: "Автодополнение, простые правки, быстрые ответы",
    quotaPeak: "1x",
    quotaOffPeak: "1x",
    speed: "Очень быстрая",
    quality: "Базовая",
    context: "128K",
  },
];

export interface VisionModel {
  name: string;
  id: string;
  description: string;
  useCase: string;
  context: string;
}

export const visionModels: VisionModel[] = [
  {
    name: "GLM-5V-Turbo",
    id: "glm-5v-turbo",
    description: "Мультимодальная модель кодинга, 200K контекст, глубокая интеграция с агентными рабочими процессами",
    useCase: "Мультимодальный кодинг, анализ изображений в контексте разработки",
    context: "200K",
  },
  {
    name: "GLM-4.6V",
    id: "glm-4.6v",
    description: "Нативный вызов функций, переключение режима мышления",
    useCase: "Анализ изображений с function calling",
    context: "128K",
  },
  {
    name: "GLM-OCR",
    id: "glm-ocr",
    description: "Парсинг документов и извлечение информации",
    useCase: "Распознавание текста, сканов, документов",
    context: "Множественный",
  },
  {
    name: "GLM-4.5V",
    id: "glm-4.5v",
    description: "Мультимодальное гибкое рассуждение",
    useCase: "Гибкий анализ изображений и документов",
    context: "64K",
  },
];

export interface ImageGenModel {
  name: string;
  id: string;
  description: string;
}

export const imageGenModels: ImageGenModel[] = [
  {
    name: "GLM-Image",
    id: "glm-image",
    description: "Генерация изображений. Open-source SOTA качество рендеринга текста",
  },
  {
    name: "CogView-4",
    id: "cogview-4",
    description: "Генерация изображений высокого качества",
  },
];

export interface VideoGenModel {
  name: string;
  id: string;
  description: string;
}

export const videoGenModels: VideoGenModel[] = [
  {
    name: "CogVideoX-3",
    id: "cogvideox-3",
    description: "Генерация видео нового поколения",
  },
  {
    name: "Vidu Q1",
    id: "vidu-q1",
    description: "Генерация видео в разрешении 1080P",
  },
  {
    name: "Vidu 2",
    id: "vidu-2",
    description: "Генерация видео в разрешении 720P",
  },
];

export interface AudioModel {
  name: string;
  id: string;
  description: string;
}

export const audioModels: AudioModel[] = [
  {
    name: "GLM-ASR-2512",
    id: "glm-asr-2512",
    description: "Распознавание речи. CER 0.0717, поддержка множества языков и диалектов",
  },
];

export interface AgentModel {
  name: string;
  id: string;
  description: string;
  status: string;
}

export const agentModels: AgentModel[] = [
  {
    name: "GLM Slide/Poster Agent",
    id: "glm-slide-poster",
    description: "Генерация контента + профессиональный дизайн слайдов и постеров",
    status: "Beta",
  },
  {
    name: "Translation Agent",
    id: "translation-agent",
    description: "Перевод на 40+ языков с кастомизацией терминологии",
    status: "Доступен",
  },
  {
    name: "Video Effect Template Agent",
    id: "video-effect-agent",
    description: "Шаблоны видео со спецэффектами",
    status: "Доступен",
  },
];

export const modelMapping = {
  anthropic: {
    opus: "glm-4.7",
    sonnet: "glm-4.7",
    haiku: "glm-4.5-air",
  },
  openai: {
    default: "GLM-4.7",
  },
};

export const additionalTextModels = [
  { name: "GLM-4.7-FlashX", id: "glm-4.7-flashx", description: "Лёгкая и высокоскоростная", context: "200K", price: "Бесплатно" },
  { name: "GLM-4.5-Flash", id: "glm-4.5-flash", description: "Бесплатная, лёгкая, сильное рассуждение", context: "200K", price: "Бесплатно" },
  { name: "GLM-4-32B-0414-128K", id: "glm-4-32b-0414-128k", description: "Высокий интеллект, непревзойдённая экономичность", context: "128K", price: "Экономно" },
];
