"use client";

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
  zcodeVersions,
} from "../data/zcodeDesktop";
import {
  Monitor, Download, Shield, Brain, Cpu, Terminal,
  Globe, Smartphone, GitCompare, Keyboard, HelpCircle,
  Lightbulb, ChevronRight, Zap, Eye, Lock, MessageSquare,
} from "lucide-react";

const featureIcons: Record<string, typeof Brain> = {
  brain: Brain,
  review: Eye,
  integration: Globe,
  remote: Smartphone,
  "multi-agent": Cpu,
  safety: Lock,
};

export function ZCodeSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="zcode-desktop" className="py-10 md:py-14">
      <SectionHeader
        num="03"
        title="ZCode Desktop"
        subtitle="Agentic Development Environment — полноценная среда AI-разработки"
      />

      {/* What is ZCode */}
      <div className={`${th('nyc-card-highlight-enhanced', 'rounded-xl border border-oklch(0.78 0.16 85 / 25%) bg-oklch(0.99 0 0) shadow-sm')} p-6 mb-6`}>
        <div className="flex items-start gap-3">
          <Monitor className="h-5 w-5 text-nyc-taxi flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-base mb-2">Что такое ZCode?</h3>
            <p className={`text-sm leading-relaxed ${th('text-white/70', 'text-oklch(0.30 0 0)')}`}>
              ZCode — это <strong>Agentic Development Environment (ADE)</strong>, среда разработки,
              в которой AI-агенты находятся в центре рабочего процесса. Это больше, чем чат-интерфейс —
              ZCode глубоко интегрирует мощные AI-возможности с основными инструментами разработки:
              терминалом, браузером, diff-просмотром и удалённым доступом.
            </p>
            <div className={`text-xs mt-3 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
              Статус: Private Beta · Версия: v2.0.0 · Платформы: macOS, Windows, Linux
            </div>
          </div>
        </div>
      </div>

      <TaxiDivider />

      {/* Core Features */}
      <h3 className="text-lg font-semibold mb-4 mt-6">Ключевые возможности</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
        {zcodeCoreFeatures.map((feat, i) => {
          const Icon = featureIcons[feat.icon] || Brain;
          return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon className="h-4 w-4 text-nyc-taxi" />
                <span className="text-sm font-semibold">{feat.title}</span>
              </div>
              <p className={`text-xs ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{feat.description}</p>
            </motion.div>
          );
        })}
      </div>

      <TaxiDivider />

      {/* Download & Install */}
      <h3 className="text-lg font-semibold mb-4 mt-6 flex items-center gap-2">
        <Download className="h-5 w-5 text-nyc-taxi" />
        Загрузка и установка
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        Скачайте ZCode для вашей платформы и установите. После запуска войдите с аккаунтом Z.AI или настройте API-ключ вручную.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
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
            className={`${th('nyc-card-enhanced hover:border-nyc-taxi/30', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm hover:border-oklch(0.78 0.16 85 / 40%)')} p-4 flex items-center gap-3 transition-colors group`}
          >
            <Download className="h-4 w-4 text-nyc-taxi flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-sm font-semibold group-hover:text-nyc-taxi transition-colors">{dl.platform}</div>
              <div className={`text-[10px] ${th('text-white/30', 'text-oklch(0.60 0 0)')}`}>{dl.ext}</div>
            </div>
          </motion.a>
        ))}
      </div>

      <TaxiDivider />

      {/* API Key Setup in ZCode */}
      <h3 className="text-lg font-semibold mb-4 mt-6 flex items-center gap-2">
        <Zap className="h-5 w-5 text-nyc-taxi" />
        Настройка API-ключа в ZCode
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        Есть два способа подключить AI-сервисы к ZCode:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}>
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-nyc-taxi text-black text-[10px]">Способ 1</Badge>
            <span className="text-sm font-semibold">Quick Connect</span>
          </div>
          <p className={`text-xs ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
            Войдите с аккаунтом Z.AI через кнопку «Connect». API-ключ настроится автоматически.
            Самый быстрый способ для подписчиков GLM Coding Plan.
          </p>
        </div>
        <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`text-[10px] ${th('border-white/10 text-white/60', 'border-oklch(0.78 0.16 85 / 30%) text-oklch(0.40 0 0)')}`}>Способ 2</Badge>
            <span className="text-sm font-semibold">Ручная настройка</span>
          </div>
          <p className={`text-xs ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
            Model Selector → Manage Models → Agents Settings/Models. Введите API-ключ и настройте провайдера.
            Поддерживаются: Zhipu GLM, Anthropic, OpenRouter, Moonshot и кастомные провайдеры.
          </p>
        </div>
      </div>

      <div className={`${th('bg-white/[0.03] border-l-2 border-nyc-taxi/30', 'bg-oklch(0.96 0 0) border-l-2 border-oklch(0.78 0.16 85 / 30%)')} p-3 rounded-r-lg mb-6`}>
        <p className={`text-xs ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>
          <Lightbulb className="h-3 w-3 inline mr-1 text-nyc-taxi" />
          Примечание: настройки GLM-терминала не синхронизируются с ZCode автоматически — настройте ключ отдельно в приложении.
        </p>
      </div>

      <TaxiDivider />

      {/* Permission Modes */}
      <h3 className="text-lg font-semibold mb-4 mt-6 flex items-center gap-2">
        <Shield className="h-5 w-5 text-nyc-taxi" />
        Режимы разрешений Agent
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        Управляйте балансом между автоматизацией и безопасностью. Выбирайте режим в зависимости от задачи.
      </p>
      <div className="space-y-2 mb-6">
        {permissionModes.map((mode, i) => (
          <motion.div
            key={mode.id}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-2`}
          >
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                mode.id === 'auto'
                  ? 'bg-nyc-taxi/10 text-nyc-taxi'
                  : mode.id === 'skip'
                    ? th('bg-red-500/10 text-red-400', 'bg-red-500/10 text-red-600')
                    : th('bg-white/5 text-white/50', 'bg-oklch(0.93 0 0) text-oklch(0.45 0 0)')
              }`}>
                {i + 1}
              </div>
              <span className="text-sm font-semibold min-w-[160px]">{mode.name}</span>
            </div>
            <p className={`text-xs flex-1 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{mode.description}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded ${th('bg-white/5 text-nyc-taxi', 'bg-oklch(0.93 0 0) text-oklch(0.78 0.16 85)')}`}>
              {mode.bestFor}
            </span>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Multi-Agent Framework */}
      <h3 className="text-lg font-semibold mb-4 mt-6 flex items-center gap-2">
        <Cpu className="h-5 w-5 text-nyc-taxi" />
        Мультиагентный фреймворк
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        ZCode интегрирует несколько AI-агентов в одном продукте. Переключайтесь между агентами прямо в диалоге —
        не нужно создавать новую задачу.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {agentFrameworks.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm">{agent.name}</span>
              <Badge variant="outline" className={`text-[10px] ${th('border-white/10 text-white/40', 'border-oklch(0.82 0 0) text-oklch(0.50 0 0)')}`}>
                {agent.provider}
              </Badge>
            </div>
            <p className={`text-xs mb-2 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{agent.coreStrength}</p>
            <div className={`text-[10px] ${th('text-white/30', 'text-oklch(0.55 0 0)')}`}>
              Модели: <span className="text-nyc-taxi font-mono">{agent.recommendedModels}</span>
            </div>
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
            className={`flex items-center gap-2 p-2.5 rounded-lg ${th('bg-white/[0.02]', 'bg-oklch(0.97 0 0)')}`}
          >
            <ChevronRight className="h-3 w-3 text-nyc-taxi flex-shrink-0" />
            <span className={`text-xs ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
              <strong className={th('text-white/70', 'text-oklch(0.30 0 0)')}>{ws.task}</strong> → <span className="text-nyc-taxi">{ws.agent}</span> — {ws.reason}
            </span>
          </div>
        ))}
      </div>

      <TaxiDivider />

      {/* ADE Tools */}
      <h3 className="text-lg font-semibold mb-4 mt-6 flex items-center gap-2">
        <Terminal className="h-5 w-5 text-nyc-taxi" />
        Инструменты ADE
      </h3>
      <div className="space-y-3 mb-6">
        {adeTools.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-sm">{tool.name}</span>
              {tool.shortcut && (
                <kbd className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${th('bg-white/5 text-white/40 border border-white/10', 'bg-oklch(0.93 0 0) text-oklch(0.40 0 0) border border-oklch(0.85 0 0)')}`}>
                  {tool.shortcut}
                </kbd>
              )}
            </div>
            <p className={`text-xs mb-2 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{tool.description}</p>
            <ul className="space-y-1">
              {tool.details.map((detail) => (
                <li key={detail} className={`text-[11px] flex items-center gap-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                  <span className="nyc-status-dot nyc-status-active" />
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* Safety Confirmation */}
      <h3 className="text-lg font-semibold mb-4 mt-6 flex items-center gap-2">
        <Lock className="h-5 w-5 text-nyc-taxi" />
        Подтверждение безопасности
      </h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        Все критические действия Agent требуют ручного подтверждения — это основная стратегия безопасности ZCode.
        Для каждого действия вы можете выбрать: <strong>Разрешить</strong>, <strong>Всегда разрешять</strong> или <strong>Отклонить</strong>.
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-xs">
          <thead>
            <tr className={th('border-b border-white/5', 'border-b border-oklch(0.88 0 0)')}>
              <th className={`text-left py-2 px-3 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>Действие</th>
              <th className={`text-left py-2 px-3 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>Риск</th>
              <th className={`text-left py-2 px-3 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>Подтверждение</th>
            </tr>
          </thead>
          <tbody>
            {safetyScenarios.map((sc) => (
              <tr key={sc.action} className={th('border-b border-white/[0.02]', 'border-b border-oklch(0.94 0 0)')}>
                <td className="py-2 px-3 font-medium">{sc.action}</td>
                <td className={`py-2 px-3 ${th('text-amber-400/70', 'text-amber-600')}`}>{sc.risk}</td>
                <td className={`py-2 px-3 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>{sc.confirmation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <TaxiDivider />

      {/* Keyboard Shortcuts */}
      <h3 className="text-lg font-semibold mb-4 mt-6 flex items-center gap-2">
        <Keyboard className="h-5 w-5 text-nyc-taxi" />
        Горячие клавиши
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
        {keyboardShortcuts.map((sc) => (
          <div
            key={sc.action}
            className={`flex items-center justify-between p-2.5 rounded-lg ${th('bg-white/[0.02]', 'bg-oklch(0.97 0 0)')}`}
          >
            <span className={`text-xs ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>{sc.action}</span>
            <div className="flex items-center gap-1">
              <kbd className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${th('bg-white/5 text-white/40 border border-white/10', 'bg-oklch(0.93 0 0) text-oklch(0.40 0 0) border border-oklch(0.85 0 0)')}`}>
                {sc.mac}
              </kbd>
              <span className={`text-[10px] ${th('text-white/20', 'text-oklch(0.70 0 0)')}`}>/</span>
              <kbd className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${th('bg-white/5 text-white/40 border border-white/10', 'bg-oklch(0.93 0 0) text-oklch(0.40 0 0) border border-oklch(0.85 0 0)')}`}>
                {sc.windows}
              </kbd>
            </div>
          </div>
        ))}
      </div>

      <TaxiDivider />

      {/* Skills and Plugins */}
      <h3 className="text-lg font-semibold mb-4 mt-6 flex items-center gap-2">
        <Zap className="h-5 w-5 text-nyc-taxi" />
        Skills и Plugins
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-nyc-taxi" />
            Plugins
          </h4>
          <p className={`text-xs mb-2 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
            <strong>«Что система может делать»</strong> — добавляют команды, сервисы и инструменты.
          </p>
          <ul className="space-y-1">
            {["Обзор и установка из маркетплейса", "Управление установленными плагинами", "Добавление/удаление источников маркетплейса"].map((item) => (
              <li key={item} className={`text-[11px] flex items-center gap-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                <span className="nyc-status-dot nyc-status-active" />{item}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}>
          <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
            <Brain className="h-4 w-4 text-nyc-taxi" />
            Skills
          </h4>
          <p className={`text-xs mb-2 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
            <strong>«Как Agent должен это делать»</strong> — направляют поведение агента.
          </p>
          <ul className="space-y-1">
            {["Вызов через $skill-name в чате", "Workspace Skills — для конкретного проекта", "User Skills — кросс-проектные", "Поиск, фильтрация, вкл/выкл"].map((item) => (
              <li key={item} className={`text-[11px] flex items-center gap-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                <span className="nyc-status-dot nyc-status-active" />{item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <TaxiDivider />

      {/* Version History */}
      <h3 className="text-lg font-semibold mb-4 mt-6 flex items-center gap-2">
        <Globe className="h-5 w-5 text-nyc-taxi" />
        История версий
      </h3>
      <div className="space-y-4 mb-6">
        {zcodeVersions.map((ver, i) => (
          <motion.div
            key={ver.version}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex items-center gap-2 mb-3">
              <Badge className={`text-[10px] ${i === 0 ? 'bg-nyc-taxi text-black' : th('bg-white/10 text-white/60', 'bg-oklch(0.90 0 0) text-oklch(0.35 0 0)')}`}>
                {ver.version}
              </Badge>
              <span className={`text-xs ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>{ver.date}</span>
            </div>
            {ver.features.length > 0 && (
              <div className="mb-2">
                <div className={`text-[11px] font-medium mb-1 ${th('text-green-400/70', 'text-green-600')}`}>Новые возможности:</div>
                <ul className="space-y-0.5">
                  {ver.features.map((f) => (
                    <li key={f} className={`text-[11px] flex items-start gap-2 ${th('text-white/50', 'text-oklch(0.45 0 0)')}`}>
                      <span className="nyc-status-dot nyc-status-active mt-1.5 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {ver.fixes.length > 0 && (
              <div>
                <div className={`text-[11px] font-medium mb-1 ${th('text-amber-400/70', 'text-amber-600')}`}>Исправления:</div>
                <ul className="space-y-0.5">
                  {ver.fixes.map((f) => (
                    <li key={f} className={`text-[11px] flex items-start gap-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                      <span className={`nyc-status-dot ${th('bg-amber-400/50', 'bg-amber-500/50')} mt-1.5 flex-shrink-0`}/>{f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <TaxiDivider />

      {/* ZCode FAQ */}
      <h3 className="text-lg font-semibold mb-4 mt-6 flex items-center gap-2">
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
            <AccordionTrigger className={`text-sm text-left font-bold ${th('text-white/90 hover:text-nyc-taxi', 'text-oklch(0.15 0 0) hover:text-oklch(0.78 0.16 85)')} ${th('[&>svg]:text-white/30', '[&>svg]:text-oklch(0.50 0 0)')}`}>
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className={`text-sm whitespace-pre-line ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
