# Z Code — Руководство пользователя

Интерактивный справочник по платформе AI-кодинга **Z Code** — инструменты, модели GLM, MCP-серверы, тарифные планы и настройка.

## Содержание

| # | Раздел | Описание |
|---|--------|----------|
| 0 | Hero | Статистика платформы, CTA-кнопки |
| 1 | Быстрый старт | Регистрация, API-ключ, настройка за 4 шага |
| 2 | Coding Tool Helper | CLI-утилита `@z_ai/coding-helper` — 13 команд |
| 3 | Инструменты | 10 инструментов кодинга (Claude Code, Cline, Cursor и др.) |
| 4 | Установка | Настройка Anthropic API, OpenAI-совместимый конфиг |
| 5 | MCP-серверы | Vision, Web Search, Web Reader — с конфигами |
| 6 | Тарифы | Lite / Pro / Max — квоты и FAQ |
| 7 | Модели GLM | GLM-5.1, GLM-5-Turbo, GLM-4.7, GLM-4.5-Air |
| 8 | Примеры | 6 сценариев использования с подсказками |
| 9 | Решение проблем | 16 типичных ошибок с решениями |
| 10 | Источники | Ссылки на документацию Z.AI |

## Технологии

- **Next.js 16** (App Router, Turbopack)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4** + shadcn/ui
- **Framer Motion 12**
- **Lucide React** (иконки)

## Запуск

```bash
git clone https://github.com/stsgs1980/Z.Code-Guide-Coding-Tool-Helper.git
cd Z.Code-Guide-Coding-Tool-Helper
bun install
bun run dev
```

Открыть `http://localhost:3000`

## Структура

```
src/
  app/
    page.tsx              # Главная страница
    layout.tsx            # Root layout
    globals.css           # NYC тема, 60+ CSS-утилит
    api/route.ts          # API route
  components/
    guide/
      sections/           # 11 секций контента
      features/           # Sidebar, Search, ThemeToggle, ScrollToTop, ReadingProgress
      ui/                 # CodeBlock, CopyButton, SectionHeader, StatusDot, TaxiDivider
      data/               # Данные: модели, инструменты, тарифы, ошибки, MCP
      hooks/              # useTheme, useActiveSection, useSearch
public/
  robots.txt
```

## Возможности

- Поиск по разделам (Ctrl+K)
- Переключение темы (Dark/Light)
- Индикатор прогресса чтения
- Навигация по секциям с активным разделом
- Копирование кода одним кликом
- Адаптивная верстка (mobile-first)
- Сайдбар-навигация с иконками

## Лицензия

Private project. All rights reserved.
