"use client";

import { motion } from "framer-motion";
import { Server, Eye, Globe, BookOpen, Plus, Settings2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../hooks/useTheme";
import { SectionHeader } from "@/ui/SectionHeader";
import { TaxiDivider } from "@/ui/TaxiDivider";
import { CodeBlock } from "@/ui/CodeBlock";

const mcpServices = [
  {
    name: "Vision MCP",
    id: "zai-mcp-server",
    icon: Eye,
    desc: "Понимание изображений — анализ скриншотов, диаграмм и визуального контента.",
    env: `Z_AI_API_KEY=your_api_key\nZ_AI_MODE=ZHIPU`,
  },
  {
    name: "Web Search MCP",
    id: "web-search-prime",
    icon: Globe,
    desc: "Поиск в интернете в реальном времени — актуальные данные и новости.",
    env: `AUTHORIZATION=Bearer your_api_key`,
  },
  {
    name: "Web Reader MCP",
    id: "web-reader",
    icon: BookOpen,
    desc: "Глубокий анализ веб-страниц — извлечение текста, метаданных и структуры.",
    env: `X_API_KEY=your_api_key`,
  },
];

export function ZCodeMcpServices() {
  const { theme } = useTheme();
  const th = (d: string, l: string) => (theme === "light" ? l : d);
  const card = th(
    "nyc-card-enhanced",
    "rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm"
  );
  const hlCard = th(
    "nyc-card-highlight-enhanced",
    "rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm"
  );

  return (
    <section id="zcode-mcp-services">
      <SectionHeader
        num="10"
        title="MCP-сервисы"
        subtitle="Model Context Protocol — внешние возможности для Agent"
      />

      <p className={`text-sm leading-relaxed mb-4 ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
        MCP-сервисы расширяют возможности Agent, предоставляя доступ к внешним инструментам:
        зрение, поиск, чтение веб-страниц и другие функции.
      </p>

      {/* Entry point */}
      <div className={`${hlCard} p-5 mb-6`}>
        <div className="flex items-center gap-2 mb-2">
          <Settings2 className="h-5 w-5 text-nyc-taxi" />
          <span className="text-lg font-semibold">Точка входа</span>
        </div>
        <p className={`text-sm leading-relaxed ${th("text-white/60", "text-oklch(0.35 0 0)")}`}>
          Откройте <strong>Settings → MCP Servers</strong> для добавления и настройки сервисов.
        </p>
      </div>

      {/* Service cards */}
      <div className="space-y-4 mb-6">
        {mcpServices.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`${card} p-5`}
          >
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="h-4 w-4 text-nyc-taxi" />
              <span className="text-lg font-semibold">{s.name}</span>
              <Badge className={`font-mono text-xs ${th("bg-white/10 text-white/60", "bg-oklch(0.92 0 0) text-oklch(0.45 0 0)")}`}>{s.id}</Badge>
            </div>
            <p className={`text-sm leading-relaxed mb-3 ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>{s.desc}</p>
            <CodeBlock code={s.env} lang="bash" title=".env" />
          </motion.div>
        ))}
      </div>

      {/* Add/Edit instructions */}
      <div className={`${card} p-5 mb-6`}>
        <div className="flex items-center gap-2 mb-2">
          <Plus className="h-4 w-4 text-nyc-taxi" />
          <span className="text-lg font-semibold">Добавление / редактирование MCP-сервера</span>
        </div>
        <p className={`text-sm leading-relaxed ${th("text-white/50", "text-oklch(0.45 0 0)")}`}>
          Перейдите в <strong>Settings → MCP Servers</strong>, нажмите <strong>Add Server</strong>,
          укажите имя, команду запуска и переменные окружения. Для изменения — выберите сервер в списке и отредактируйте параметры.
        </p>
      </div>

      {/* Screenshots — MCP workflow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <img
          src="/images/zcode/mcp-entry.png"
          alt="Вход в MCP настройки"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
        <img
          src="/images/zcode/mcp-list.png"
          alt="Список MCP серверов"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
        <img
          src="/images/zcode/mcp-domains.png"
          alt="Домены MCP сервисов"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
        <img
          src="/images/zcode/mcp-create.png"
          alt="Создание MCP сервера"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
        <img
          src="/images/zcode/mcp-edit.png"
          alt="Редактирование MCP сервера"
          className={`w-full rounded-xl border ${th("border-white/5", "border-oklch(0.88 0 0)")}`}
        />
      </div>

      <TaxiDivider />
    </section>
  );
}
