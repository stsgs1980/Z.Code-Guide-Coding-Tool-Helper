"use client";

import { Fragment } from "react";
import { SectionHeader, TaxiDivider, CodeBlock, CopyButton } from "../ui";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import {
  permissionModes,
  agentFrameworks,
  workflowSuggestions,
  adeTools,
  keyboardShortcuts,
  zcodeFaqs,
  zcodeDownloadLinks,
  zcodeCoreFeatures,
  safetyScenarios,
  safetyDecisions,
  zcodeVersions,
  apiProviders,
  editHistoryUseCases,
  feedbackInfo,
} from "../data/zcodeDesktop";
import {
  Monitor, Download, Shield, Brain, Cpu, Terminal,
  Globe, Smartphone, GitCompare, Keyboard, HelpCircle,
  Lightbulb, ChevronRight, Zap, Eye, Lock, MessageSquare,
  Pencil, FileText, MessageCircle, ExternalLink, ListChecks,
  ArrowLeft,
} from "lucide-react";

const featureIcons: Record<string, typeof Brain> = {
  brain: Brain,
  review: Eye,
  integration: Globe,
  remote: Smartphone,
  "multi-agent": Cpu,
  safety: Lock,
};

const pipelineConfig = [
  { step: 1, label: "Plan & Manage", toolId: "task-manager", Icon: ListChecks },
  { step: 2, label: "Code & Build", toolId: "terminal", Icon: Terminal },
  { step: 3, label: "Review Changes", toolId: "diff-preview", Icon: GitCompare },
  { step: 4, label: "Live Preview", toolId: "browser", Icon: Globe },
  { step: 5, label: "Connect Anywhere", toolId: "remote-dev", Icon: Smartphone },
];

interface ZCodeSectionProps {
  onBack?: () => void;
}

export function ZCodeSection({ onBack }: ZCodeSectionProps) {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="zcode-desktop" className="py-10 md:py-14">
      {/* Sticky page header with back button */}
      {onBack && (
        <div className={`sticky top-0 z-30 -mx-4 sm:-mx-6 -mt-10 md:-mt-14 mb-6 px-4 sm:px-6 py-3 flex items-center gap-3 backdrop-blur-md border-b ${th('bg-background/80 border-white/5', 'bg-background/80 border-oklch(0.88 0 0)')}`}>
          <button
            onClick={onBack}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${th('text-white/60 hover:text-nyc-taxi', 'text-oklch(0.35 0 0) hover:text-oklch(0.78 0.16 85)')} group`}
            aria-label="Назад к руководству"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Назад</span>
          </button>
          <div className={`h-4 w-px ${th('bg-white/10', 'bg-oklch(0.82 0 0)')}`} />
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4 text-nyc-taxi" />
            <span className="text-sm font-semibold nyc-gradient-text">ZCode Desktop</span>
          </div>
        </div>
      )}

      <SectionHeader
        num="03"
        title="ZCode Desktop"
        subtitle="Agentic Development Environment — полноценная среда AI-разработки"
      />

      {/* What is ZCode */}
      <div className={`${th('nyc-card-highlight-enhanced', 'rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm')} p-6 mb-6`}>
        <div className="flex items-start gap-4">
          <Monitor className="h-6 w-6 text-nyc-taxi flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Что такое ZCode?</h3>
            <p className={`text-sm leading-relaxed mb-3 ${th('text-white/70', 'text-oklch(0.30 0 0)')}`}>
              ZCode — это <strong>Agentic Development Environment (ADE)</strong>, среда разработки,
              в которой AI-агенты находятся в центре рабочего процесса. Это больше, чем чат-интерфейс —
              через естественный язык вы напрямую управляете Agent для полного цикла задач: от кодинга и
              отладки до предпросмотра проекта.
            </p>
            <div className={`text-sm mb-2 ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>
              <strong>Видение продукта:</strong>
            </div>
            <ul className="space-y-1.5 mb-3">
              <li className={`text-sm flex items-start gap-2 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
                <span className="nyc-status-dot nyc-status-active mt-1.5 flex-shrink-0" />
                <span><strong>Расширение возможностей разработчиков</strong> — описывайте намерения на естественном языке</span>
              </li>
              <li className={`text-sm flex items-start gap-2 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
                <span className="nyc-status-dot nyc-status-active mt-1.5 flex-shrink-0" />
                <span><strong>Полный контекст</strong> — Agent понимает структуру проекта, содержимое файлов и визуальные элементы UI</span>
              </li>
              <li className={`text-sm flex items-start gap-2 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
                <span className="nyc-status-dot nyc-status-active mt-1.5 flex-shrink-0" />
                <span><strong>Безопасность и контроль</strong> — все критические действия требуют явного подтверждения</span>
              </li>
            </ul>
            <div className={`text-sm ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
              Статус: Private Beta · Версия: v2.0.0 · Платформы: macOS, Windows, Linux
            </div>
          </div>
        </div>
      </div>

      <TaxiDivider />

      {/* Core Features */}
      <h3 className="text-xl font-semibold mb-4 mt-6">Ключевые возможности</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {zcodeCoreFeatures.map((feat, i) => {
          const Icon = featureIcons[feat.icon] || Brain;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-5`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-5 w-5 text-nyc-taxi" />
                <span className="text-sm font-semibold">{feat.title}</span>
              </div>
              <p className={`text-sm ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{feat.description}</p>
            </motion.div>
          );
        })}
      </div>

      <TaxiDivider />

      {/* Download & Install */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Download className="h-5 w-5 text-nyc-taxi" />
        Загрузка и установка
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        Скачайте ZCode для вашей платформы. После запуска войдите через «Continue with Z.AI» или настройте API-ключ вручную.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {zcodeDownloadLinks.map((dl, i) => (
          <motion.a
            key={dl.platform}
            href={dl.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced hover:border-nyc-taxi/30', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm hover:border-oklch(0.78 0.16 85 / 40%)')} p-4 flex flex-col gap-2 transition-colors group`}
          >
            <div className="flex items-center gap-3">
              <Download className="h-5 w-5 text-nyc-taxi flex-shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-sm font-semibold group-hover:text-nyc-taxi transition-colors">{dl.platform}</div>
                <div className={`text-xs ${th('text-white/30', 'text-oklch(0.60 0 0)')}`}>{dl.ext}</div>
              </div>
            </div>
            <p className={`text-xs ${th('text-white/30', 'text-oklch(0.55 0 0)')}`}>{dl.installNote}</p>
          </motion.a>
        ))}
      </div>

      <TaxiDivider />

      {/* API Key Setup in ZCode — 3-column layout */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Zap className="h-5 w-5 text-nyc-taxi" />
        Настройка API-провайдеров
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        ZCode поддерживает несколько способов доступа к AI-сервисам. Настройка через <strong>Agents Settings / Models</strong>.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-5`}>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-nyc-taxi text-black text-xs">Способ 1</Badge>
            <span className="text-sm font-semibold">Quick Connect</span>
          </div>
          <p className={`text-sm ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
            Нажмите «Continue with Z.AI» при запуске. Если у аккаунта есть активный план, подключение произойдёт автоматически.
            Можно нажать «Skip for now» и настроить ключ позже.
          </p>
        </div>
        <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-5`}>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`text-xs ${th('border-white/10 text-white/60', 'border-oklch(0.78 0.16 85 / 30%) text-oklch(0.40 0 0)')}`}>Способ 2</Badge>
            <span className="text-sm font-semibold">Model Selector</span>
          </div>
          <p className={`text-sm ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
            Нажмите имя модели в чате → «Manage Models» → Agents Settings/Models.
            Добавьте провайдера, введите Base URL и API Key. Модели определяются автоматически.
          </p>
        </div>
        <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-5`}>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`text-xs ${th('border-white/10 text-white/60', 'border-oklch(0.78 0.16 85 / 30%) text-oklch(0.40 0 0)')}`}>Способ 3</Badge>
            <span className="text-sm font-semibold">Custom Provider</span>
          </div>
          <p className={`text-sm ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
            Для OpenRouter, Moonshot и других — нажмите «Add Provider», введите Base URL и API Key.
            Модели определяются автоматически после подтверждения эндпоинта.
          </p>
        </div>
      </div>

      <div className={`${th('bg-white/[0.03] border-l-2 border-nyc-taxi/30', 'bg-oklch(0.96 0 0) border-l-2 border-oklch(0.78 0.16 85 / 30%)')} p-3 rounded-r-lg mb-4`}>
        <p className={`text-sm ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>
          <Lightbulb className="h-4 w-4 inline mr-1 text-nyc-taxi" />
          Настройки GLM-терминала не синхронизируются с ZCode автоматически — настройте ключ отдельно в приложении.
        </p>
      </div>

      {/* Provider cards */}
      <div className="space-y-3 mb-6">
        {apiProviders.map((provider, i) => (
          <motion.div
            key={provider.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4 sm:p-5`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">{provider.name}</span>
                  {provider.baseUrl && (
                    <code className={`text-xs px-1.5 py-0.5 rounded ${th('bg-white/5 text-nyc-taxi', 'bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)')}`}>
                      {provider.baseUrl}
                    </code>
                  )}
                </div>
                <p className={`text-sm ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{provider.description}</p>
                {provider.models && (
                  <div className={`text-xs mt-1 ${th('text-white/30', 'text-oklch(0.55 0 0)')}`}>
                    Модели: <span className="text-nyc-taxi font-mono">{provider.models}</span>
                  </div>
                )}
              </div>
              <div className={`text-xs space-y-0.5 sm:w-72 flex-shrink-0 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                {provider.steps.map((step, si) => (
                  <div key={si} className="flex gap-1.5">
                    <span className="text-nyc-taxi font-mono flex-shrink-0">{si + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Permission Modes */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Shield className="h-5 w-5 text-nyc-taxi" />
        Режимы разрешений Agent
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        Управляйте балансом между автоматизацией и безопасностью. Для критических файлов, внешних команд и сетевой активности используйте более консервативный режим.
      </p>
      <div className="space-y-2 mb-6">
        {permissionModes.map((mode, i) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4 flex flex-col sm:flex-row sm:items-center gap-3`}
          >
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold ${
                mode.id === 'auto'
                  ? 'bg-nyc-taxi/10 text-nyc-taxi'
                  : mode.id === 'skip'
                    ? th('bg-red-500/10 text-red-400', 'bg-red-500/10 text-red-600')
                    : th('bg-white/5 text-white/50', 'bg-oklch(0.93 0 0) text-oklch(0.45 0 0)')
              }`}>
                {i + 1}
              </div>
              <span className="text-sm font-semibold min-w-[200px]">{mode.name}</span>
            </div>
            <p className={`text-sm flex-1 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{mode.description}</p>
            <span className={`text-xs px-2.5 py-1 rounded ${th('bg-white/5 text-nyc-taxi', 'bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)')}`}>
              {mode.bestFor}
            </span>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Edit History */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Pencil className="h-5 w-5 text-nyc-taxi" />
        Редактирование отправленных сообщений
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        Наведите курсор на своё сообщение и нажмите иконку <strong>карандаша</strong> для редактирования.
        После сохранения Agent регенерирует цепочку ответов, сохраняя общую структуру диалога.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {editHistoryUseCases.map((uc, i) => (
          <motion.div
            key={uc.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Pencil className="h-4 w-4 text-nyc-taxi" />
              <span className="text-sm font-semibold">{uc.title}</span>
            </div>
            <p className={`text-sm ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{uc.desc}</p>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* /Commands */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Terminal className="h-5 w-5 text-nyc-taxi" />
        Команды (/Commands)
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        Команды — это переиспользуемые ярлыки. Сохраняйте сложные или частые промпты как команды для быстрого вызова.
        Введите <code className="text-nyc-taxi">/</code> в чате, чтобы открыть список команд, затем выберите или введите имя команды.
      </p>

      <TaxiDivider />

      {/* Multi-Agent Framework */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Cpu className="h-5 w-5 text-nyc-taxi" />
        Мультиагентный фреймворк
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        ZCode интегрирует несколько AI-агентов в одном продукте. Переключайтесь между агентами из верхнего меню прямо в диалоге —
        не нужно создавать новую задачу.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {agentFrameworks.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-5`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm">{agent.name}</span>
              <Badge variant="outline" className={`text-xs ${th('border-white/10 text-white/40', 'border-oklch(0.82 0 0) text-oklch(0.50 0 0)')}`}>
                {agent.provider}
              </Badge>
            </div>
            <p className={`text-sm mb-1 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{agent.coreStrength}</p>
            <div className={`text-xs ${th('text-white/30', 'text-oklch(0.55 0 0)')}`}>
              Модели: <span className="text-nyc-taxi font-mono">{agent.recommendedModels}</span>
            </div>
            {agent.bestUseCases && (
              <div className={`text-xs mt-1 ${th('text-white/30', 'text-oklch(0.55 0 0)')}`}>
                Лучше для: <span className={th('text-white/50', 'text-oklch(0.40 0 0)')}>{agent.bestUseCases}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Workflow suggestions */}
      <h4 className={`text-sm font-semibold mb-3 ${th('text-white/70', 'text-oklch(0.30 0 0)')}`}>
        Рекомендации по выбору агента:
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {workflowSuggestions.map((ws) => (
          <div
            key={ws.task}
            className={`flex items-center gap-2 p-3 rounded-lg ${th('bg-white/[0.02]', 'bg-oklch(0.97 0 0)')}`}
          >
            <ChevronRight className="h-4 w-4 text-nyc-taxi flex-shrink-0" />
            <span className={`text-sm ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
              <strong className={th('text-white/70', 'text-oklch(0.30 0 0)')}>{ws.task}</strong> → <span className="text-nyc-taxi">{ws.agent}</span> — {ws.reason}
            </span>
          </div>
        ))}
      </div>

      <TaxiDivider />

      {/* ADE Tools — Workflow Pipeline */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Terminal className="h-5 w-5 text-nyc-taxi" />
        Инструменты ADE — рабочий процесс
      </h3>
      <p className={`text-sm mb-5 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        От планирования до деплоя — каждый инструмент встроен в рабочий процесс разработки.
      </p>
      {/* Desktop: horizontal pipeline */}
      <div className="hidden lg:flex items-stretch mb-6 gap-0">
        {pipelineConfig.map((item, i, arr) => {
          const tool = adeTools.find(t => t.id === item.toolId);
          if (!tool) return null;
          return (
            <Fragment key={item.toolId}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4 flex-1 min-w-0 flex flex-col`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                    i === 0
                      ? 'bg-nyc-taxi text-black'
                      : th('bg-white/5 text-white/40', 'bg-oklch(0.93 0 0) text-oklch(0.45 0 0)')
                  }`}>
                    {item.step}
                  </div>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <item.Icon className="h-4 w-4 text-nyc-taxi flex-shrink-0" />
                  <span className="text-sm font-semibold">{tool.name}</span>
                  {tool.shortcut && (
                    <kbd className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${th('bg-white/5 text-white/40 border border-white/10', 'bg-oklch(0.93 0 0) text-oklch(0.40 0 0) border border-oklch(0.85 0 0)')}`}>
                      {tool.shortcut}
                    </kbd>
                  )}
                </div>
                <p className={`text-xs mb-2 ${th('text-white/40', 'text-oklch(0.55 0 0)')}`}>{tool.description}</p>
                <ul className="space-y-1 mt-auto">
                  {tool.details.slice(0, 3).map((detail) => (
                    <li key={detail} className={`text-xs flex items-start gap-1.5 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
                      <span className="nyc-status-dot nyc-status-active mt-1 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              {i < arr.length - 1 && (
                <div className="flex items-center px-1.5 flex-shrink-0">
                  <ChevronRight className={`h-5 w-5 ${th('text-nyc-taxi/40', 'text-oklch(0.78 0.16 85 / 30%)')}`} />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
      {/* Mobile: vertical timeline */}
      <div className="lg:hidden relative mb-6">
        <div className={`absolute left-[15px] top-0 bottom-0 w-0.5 ${th('bg-gradient-to-b from-nyc-taxi/40 via-nyc-taxi/15 to-transparent', 'bg-gradient-to-b from-oklch(0.78 0.16 85 / 30%) via-oklch(0.78 0.16 85 / 10%) to-transparent')}`} />
        <div className="space-y-4">
          {pipelineConfig.map((item, i) => {
            const tool = adeTools.find(t => t.id === item.toolId);
            if (!tool) return null;
            return (
              <motion.div
                key={item.toolId}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-3 relative"
              >
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-bold ${
                    i === 0
                      ? 'bg-nyc-taxi text-black'
                      : th('bg-oklch(0.18 0 0) border border-white/10 text-white/50', 'bg-oklch(0.96 0 0) border border-oklch(0.82 0 0) text-oklch(0.45 0 0)')
                  }`}>
                    {item.step}
                  </div>
                </div>
                <div className={`flex-1 ${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <item.Icon className="h-4 w-4 text-nyc-taxi flex-shrink-0" />
                    <span className="text-sm font-semibold">{tool.name}</span>
                    <span className={`text-xs ${th('text-white/30', 'text-oklch(0.60 0 0)')}`}>{item.label}</span>
                    {tool.shortcut && (
                      <kbd className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${th('bg-white/5 text-white/40 border border-white/10', 'bg-oklch(0.93 0 0) text-oklch(0.40 0 0) border border-oklch(0.85 0 0)')}`}>
                        {tool.shortcut}
                      </kbd>
                    )}
                  </div>
                  <p className={`text-xs mb-2 ${th('text-white/40', 'text-oklch(0.55 0 0)')}`}>{tool.description}</p>
                  <ul className="space-y-1">
                    {tool.details.slice(0, 3).map((detail) => (
                      <li key={detail} className={`text-xs flex items-start gap-1.5 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
                        <span className="nyc-status-dot nyc-status-active mt-1 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <TaxiDivider />

      {/* Safety Confirmation */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Lock className="h-5 w-5 text-nyc-taxi" />
        Подтверждение безопасности
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        Когда Agent пытается выполнить потенциально рискованное действие, выполнение приостанавливается автоматически.
        Панель подтверждения показывает текущее состояние, подготовленную команду и связанные предупреждения о рисках.
        Используйте <code className="text-nyc-taxi text-sm">Tab</code> или стрелки для переключения, <code className="text-nyc-taxi text-sm">Enter</code> для подтверждения.
      </p>

      {/* Decision options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {safetyDecisions.map((dec) => (
          <div
            key={dec.option}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge className={`text-xs ${
                dec.option === 'Allow' ? 'bg-green-500/10 text-green-400'
                : dec.option === 'Always Allow' ? 'bg-amber-500/10 text-amber-400'
                : 'bg-red-500/10 text-red-400'
              }`}>
                {dec.option}
              </Badge>
            </div>
            <p className={`text-sm mb-1 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{dec.description}</p>
            <p className={`text-xs ${th('text-white/30', 'text-oklch(0.55 0 0)')}`}>{dec.recommendedScenario}</p>
          </div>
        ))}
      </div>

      {/* Typical scenarios */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className={th('border-b border-white/5', 'border-b border-oklch(0.88 0 0)')}>
              <th className={`text-left py-3 px-4 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>Действие</th>
              <th className={`text-left py-3 px-4 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>Риск</th>
            </tr>
          </thead>
          <tbody>
            {safetyScenarios.map((sc) => (
              <tr key={sc.action} className={th('border-b border-white/[0.02]', 'border-b border-oklch(0.94 0 0)')}>
                <td className="py-3 px-4 font-medium text-sm">{sc.action}</td>
                <td className={`py-3 px-4 text-sm ${th('text-amber-400/70', 'text-amber-600')}`}>{sc.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TaxiDivider />

      {/* Keyboard Shortcuts */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Keyboard className="h-5 w-5 text-nyc-taxi" />
        Горячие клавиши
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
        {keyboardShortcuts.map((sc) => (
          <div
            key={sc.action}
            className={`flex items-center justify-between p-3 rounded-lg ${th('bg-white/[0.02]', 'bg-oklch(0.97 0 0)')}`}
          >
            <span className={`text-sm ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>{sc.action}</span>
            <div className="flex items-center gap-1">
              <kbd className={`text-xs px-2 py-0.5 rounded font-mono ${th('bg-white/5 text-white/40 border border-white/10', 'bg-oklch(0.93 0 0) text-oklch(0.40 0 0) border border-oklch(0.85 0 0)')}`}>
                {sc.mac}
              </kbd>
              <span className={`text-xs ${th('text-white/20', 'text-oklch(0.70 0 0)')}`}>/</span>
              <kbd className={`text-xs px-2 py-0.5 rounded font-mono ${th('bg-white/5 text-white/40 border border-white/10', 'bg-oklch(0.93 0 0) text-oklch(0.40 0 0) border border-oklch(0.85 0 0)')}`}>
                {sc.windows}
              </kbd>
            </div>
          </div>
        ))}
      </div>

      <TaxiDivider />

      {/* Skills and Plugins */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Zap className="h-5 w-5 text-nyc-taxi" />
        Skills и Plugins
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-5`}>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-nyc-taxi" />
            Plugins
          </h4>
          <p className={`text-sm mb-2 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
            <strong>«Что система может делать»</strong> — добавляют команды, сервисы и инструменты.
          </p>
          <ul className="space-y-1.5">
            {["Discover — обзор и установка из маркетплейса", "Installed — управление установленными (вкл/выкл/удаление)", "Marketplace — добавление/обновление/удаление источников"].map((item) => (
              <li key={item} className={`text-sm flex items-center gap-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                <span className="nyc-status-dot nyc-status-active" />{item}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-5`}>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Brain className="h-5 w-5 text-nyc-taxi" />
            Skills
          </h4>
          <p className={`text-sm mb-2 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
            <strong>«Как Agent должен это делать»</strong> — направляют поведение агента.
          </p>
          <ul className="space-y-1.5">
            {["Вызов через $skill-name в чате", "Workspace Skills — для конкретного проекта", "User Skills — кросс-проектные, личные", "Поиск, фильтрация по источнику, вкл/выкл", "New Skill — создание кастомного навыка"].map((item) => (
              <li key={item} className={`text-sm flex items-center gap-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                <span className="nyc-status-dot nyc-status-active" />{item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <TaxiDivider />

      {/* Version History — Release Cards with Version Strip */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <Globe className="h-5 w-5 text-nyc-taxi" />
        История версий
      </h3>
      {/* Version strip */}
      <div className="flex items-center gap-2.5 mb-5 overflow-x-auto pb-1">
        {zcodeVersions.map((ver, i) => (
          <div
            key={ver.version}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 transition-colors ${
              i === 0
                ? 'bg-nyc-taxi text-black font-semibold'
                : th('bg-white/5 text-white/50 border border-white/5', 'bg-oklch(0.93 0 0) text-oklch(0.45 0 0) border border-oklch(0.88 0 0)')
            }`}
          >
            <span className="text-sm font-mono">{ver.version}</span>
            {i === 0 && <span className="text-xs font-medium">● Текущая</span>}
          </div>
        ))}
      </div>
      {/* Featured card (latest version) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={`relative mb-4 rounded-xl overflow-hidden ${th(
          'border border-nyc-taxi/30 shadow-lg shadow-nyc-taxi/5',
          'border-2 border-oklch(0.78 0.16 85 / 30%) shadow-lg shadow-oklch(0.78 0.16 85 / 10%)'
        )}`}
      >
        <div className={`absolute inset-0 rounded-xl pointer-events-none ${th('bg-gradient-to-r from-nyc-taxi/5 via-transparent to-nyc-taxi/5', 'bg-gradient-to-r from-oklch(0.78 0.16 85 / 5%) via-transparent to-oklch(0.78 0.16 85 / 5%)')}`} />
        <div className="relative p-5 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-nyc-taxi text-black text-xs font-bold">{zcodeVersions[0].version}</Badge>
            <span className={`text-sm ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{zcodeVersions[0].date}</span>
            <Badge className="text-xs bg-green-500/10 text-green-400">Текущая</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {zcodeVersions[0].features.length > 0 && (
              <div>
                <div className={`text-sm font-medium mb-2 flex items-center gap-1.5 ${th('text-green-400/70', 'text-green-600')}`}>
                  <span className={`w-2 h-2 rounded-full ${th('bg-green-400/70', 'bg-green-600')}`} />
                  Новые возможности
                </div>
                <ul className="space-y-1.5">
                  {zcodeVersions[0].features.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
                      <span className="nyc-status-dot nyc-status-active mt-1.5 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {zcodeVersions[0].fixes.length > 0 && (
              <div>
                <div className={`text-sm font-medium mb-2 flex items-center gap-1.5 ${th('text-amber-400/70', 'text-amber-600')}`}>
                  <span className={`w-2 h-2 rounded-full ${th('bg-amber-400/70', 'bg-amber-600')}`} />
                  Исправления
                </div>
                <ul className="space-y-1.5">
                  {zcodeVersions[0].fixes.map((f) => (
                    <li key={f} className={`text-sm flex items-start gap-2 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
                      <span className={`nyc-status-dot ${th('bg-amber-400/50', 'bg-amber-500/50')} mt-1.5 flex-shrink-0`}/>{f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      {/* Compact cards (older versions) */}
      <div className="space-y-3 mb-6">
        {zcodeVersions.slice(1).map((ver, i) => (
          <motion.div
            key={ver.version}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4 sm:p-5`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Badge className={`text-xs ${th('bg-white/10 text-white/60', 'bg-oklch(0.90 0 0) text-oklch(0.35 0 0)')}`}>
                {ver.version}
              </Badge>
              <span className={`text-sm ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>{ver.date}</span>
            </div>
            <div className="space-y-3">
              {ver.features.length > 0 && (
                <div>
                  <div className={`text-xs font-medium mb-1.5 flex items-center gap-1.5 ${th('text-green-400/60', 'text-green-600')}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${th('bg-green-400/60', 'bg-green-600')}`} />
                    Новые возможности
                  </div>
                  <ul className="space-y-1">
                    {ver.features.map((f) => (
                      <li key={f} className={`text-sm flex items-start gap-2 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
                        <span className="nyc-status-dot nyc-status-active mt-1.5 flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {ver.fixes.length > 0 && (
                <div>
                  <div className={`text-xs font-medium mb-1.5 flex items-center gap-1.5 ${th('text-amber-400/60', 'text-amber-600')}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${th('bg-amber-400/60', 'bg-amber-600')}`} />
                    Исправления
                  </div>
                  <ul className="space-y-1">
                    {ver.fixes.map((f) => (
                      <li key={f} className={`text-sm flex items-start gap-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                        <span className={`nyc-status-dot ${th('bg-amber-400/50', 'bg-amber-500/50')} mt-1.5 flex-shrink-0`}/>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Feedback & Support */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-nyc-taxi" />
        Обратная связь и поддержка
      </h3>
      <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-5 mb-6`}>
        <p className={`text-sm mb-3 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
          Для отправки обратной связи включите контекст использования, шаги для воспроизведения и соответствующие логи.
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4 text-nyc-taxi" />
            <a
              href={feedbackInfo.formUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-nyc-taxi hover:underline"
            >
              Форма обратной связи
            </a>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-nyc-taxi" />
            <span className={`text-sm ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
              В приложении: Меню → Feedback
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-nyc-taxi" />
            <span className={`text-sm ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
              Экспорт логов: Меню → Export Logs
            </span>
          </div>
        </div>
        <div className={`mt-3 p-3 rounded-lg ${th('bg-white/[0.03]', 'bg-oklch(0.96 0 0)')}`}>
          <div className={`text-sm font-medium mb-1 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
            Пути к логам (если Export Logs не работает):
          </div>
          <div className={`text-sm font-mono ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
            <div>macOS: <code className="text-nyc-taxi">{feedbackInfo.logPaths.macos}</code></div>
            <div>Windows: <code className="text-nyc-taxi">{feedbackInfo.logPaths.windows}</code></div>
          </div>
        </div>
      </div>

      <TaxiDivider />

      {/* ZCode FAQ */}
      <h3 className="text-xl font-semibold mb-4 mt-6 flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-nyc-taxi" />
        Часто задаваемые вопросы
      </h3>
      <Accordion type="single" collapsible className="w-full mb-6">
        {zcodeFaqs.map((faq, i) => (
          <AccordionItem
            key={`zcode-faq-${i}`}
            value={`zcode-faq-${i}`}
            className={th('border-white/5', 'border-oklch(0.88 0 0)')}
          >
            <AccordionTrigger className={`text-sm text-left font-bold ${th('text-white/90 hover:text-nyc-taxi', 'text-oklch(0.15 0 0) hover:text-oklch(0.78 0.16 85)')} hover:no-underline ${th('[&>svg]:text-white/30', '[&>svg]:text-oklch(0.50 0 0)')}`}>
              <span className={`${th('border-l-2 border-nyc-taxi/40 pl-3', 'border-l-2 border-oklch(0.78 0.16 85 / 40%) pl-3')}`}>{faq.q}</span>
            </AccordionTrigger>
            <AccordionContent className={`text-sm whitespace-pre-line ${th('text-white/50 pl-5', 'text-oklch(0.40 0 0) pl-5')}`}>
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
