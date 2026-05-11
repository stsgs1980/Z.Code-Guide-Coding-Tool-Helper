import { NextResponse } from 'next/server';

// ──────────────────────────────────────────────
// 1. Keywords for each content theme
// ──────────────────────────────────────────────

const contentRules: Record<string, string[]> = {
  light: [
    'образование', 'education', 'обучен', 'курс', 'course',
    'школа', 'school', 'университет', 'university', 'учеб',
    'студенч', 'student', 'преподав', 'учитель', 'teacher',
    'школьн', 'академи', 'academy', 'лекци', 'lecture',
    'тренажёр', 'трениров', 'training', 'методич', 'учебник',
    'textbook', 'наставник', 'ментор', 'mentor', 'репетитор',
    'дошкольн', 'детски', 'воспитан', 'просвещен', 'enlighten',
  ],
  dark: [
    'ai', 'ии', 'искусственн', 'нейро', 'neuro',
    'ml', 'machine learning', 'глубок', 'deep',
    'data science', 'data', 'данн', 'analytics', 'аналити',
    'платформ', 'platform', 'saas', 'cloud', 'облачн',
    'генераци', 'generation', 'автоматиз', 'automation',
    'алгоритм', 'algorithm', 'модел', 'model',
    'predict', 'предсказ', 'robot', 'робот', 'кибер', 'cyber',
    'блокчейн', 'blockchain', 'crypto', 'крипто',
  ],
  mono: [
    'минимал', 'minimal', 'консол', 'console', 'cli',
    'терминал', 'terminal', 'devops', 'инфраструктур',
    'infrastructure', 'server', 'сервер', 'deploy', 'депло',
    'docker', 'container', 'контейнер', 'kubernetes', 'k8s',
    'ci/cd', 'pipeline', 'пайплайн', 'мониторинг', 'monitoring',
    'лог', 'log', 'ssh', 'vpn', 'proxy', 'прокси',
  ],
  outline: [
    'дизайн', 'design', 'креатив', 'creative', 'арт',
    'art', 'иллюстрац', 'illustration', 'график', 'graphic',
    'ui/ux', 'интерфейс', 'interface', 'макет', 'mockup',
    'прототип', 'prototype', 'figma', 'sketch', 'стиль',
    'style', 'бренд', 'brand', 'айдентика', 'identity',
    'типограф', 'typography', 'верстк', 'layout',
  ],
  inverted: [
    'безопасн', 'security', 'защит', 'protect',
    'firewall', 'файрвол', 'антивирус', 'antivirus',
    'шифрован', 'encrypt', 'аудит', 'audit', 'compliance',
    'соответств', 'приватн', 'privacy', 'gdpr',
    'vulnerability', 'уязвим', 'pentest', 'пенетрац',
    'инцидент', 'incident', 'threat', 'угроз', 'forensic',
  ],
};

// ──────────────────────────────────────────────
// 2. Dark UI triggers
// ──────────────────────────────────────────────

const darkUIKeys: string[] = [
  'тёмн', 'темн', 'dark',
  'ночь', 'night', 'ночн',
  'чёрн', 'черн', 'black',
  'shadow', 'тень',
  'mode', 'режим',
  'oled', 'amoled',
  'obsidian', 'onyx',
];

// ──────────────────────────────────────────────
// 3. Direct adaptation: light theme → dark variant (when UI is dark)
// ──────────────────────────────────────────────

const darkAdapt: Record<string, string> = {
  light: 'dark',
  mono: 'mono-dark',
  outline: 'outline-dark',
};

// ──────────────────────────────────────────────
// 4. Reverse adaptation: dark theme → light variant (when UI is light)
// ──────────────────────────────────────────────

const lightAdapt: Record<string, string> = {
  dark: 'light',
  'mono-dark': 'mono',
  'outline-dark': 'outline',
};

// ──────────────────────────────────────────────
// 5. Detect content theme from description
// ──────────────────────────────────────────────

function detectContent(desc: string): string {
  const lower = desc.toLowerCase();
  const rules: Record<string, string[]> = {
    light: contentRules.light,
    dark: contentRules.dark,
    mono: contentRules.mono,
    outline: contentRules.outline,
    inverted: contentRules.inverted,
  };

  let best = { theme: 'light', score: 0 };

  for (const name of Object.keys(rules)) {
    const score = rules[name].reduce((s, kw) => {
      return s + (lower.indexOf(kw.toLowerCase()) !== -1 ? 1 : 0);
    }, 0);
    if (score > best.score) {
      best = { theme: name, score };
    }
  }

  return best.theme;
}

// ──────────────────────────────────────────────
// 6. Detect dark UI from description
// ──────────────────────────────────────────────

function detectDarkUI(desc: string): boolean {
  const lower = desc.toLowerCase();
  return darkUIKeys.some((k) => lower.indexOf(k.toLowerCase()) !== -1);
}

// ──────────────────────────────────────────────
// 7. Resolve logo variant
//    content — theme from detectContent
//    darkUI  — true/false from detectDarkUI
//    mode    — 'auto' | 'dark' | 'light' (manual override)
// ──────────────────────────────────────────────

function resolve(content: string, darkUI: boolean, mode: string): string {
  // Manual override takes priority
  let isDark = darkUI;
  if (mode === 'dark') isDark = true;
  if (mode === 'light') isDark = false;

  // If UI is dark — adapt light themes
  if (isDark) {
    return darkAdapt[content] || content;
  }

  // If UI is light — adapt dark themes
  return lightAdapt[content] || content;
}

// ──────────────────────────────────────────────
// API Route Handler
// ──────────────────────────────────────────────

const DEFAULT_DESCRIPTION =
  'Z Code - AI coding platform with GLM models, MCP servers, and coding helper';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const project = searchParams.get('project') || DEFAULT_DESCRIPTION;
  const mode = searchParams.get('mode') || 'auto';

  // Validate mode
  const validModes = ['auto', 'dark', 'light'];
  const normalizedMode = validModes.includes(mode) ? mode : 'auto';

  // Detect content theme and dark UI from description
  const content = detectContent(project);
  const darkUI = detectDarkUI(project);

  // Resolve final theme
  const theme = resolve(content, darkUI, normalizedMode);
  const logoUrl = `/logos/${theme}.svg`;

  return NextResponse.json({
    project,
    content,
    darkUI,
    mode: normalizedMode,
    theme,
    logoUrl,
  });
}
