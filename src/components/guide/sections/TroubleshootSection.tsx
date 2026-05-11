"use client";

import { SectionHeader, CodeBlock } from "../ui";
import { errors } from "../data/errors";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../hooks/useTheme";

const categoryLabels: Record<string, { text: string; color: string }> = {
  auth: { text: "Авторизация", color: "bg-red-500/10 text-red-400 border-red-500/20" },
  config: { text: "Конфигурация", color: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  network: { text: "Сеть", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  quota: { text: "Лимиты", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  tool: { text: "Инструмент", color: "bg-green-500/10 text-green-400 border-green-500/20" },
};

const helperErrors = [
  {
    title: "Network error, please check your connection",
    cause: "Ошибка сети при сохранении/проверке API-ключа",
    fix: `# Проверьте подключение к интернету
ping api.z.ai

# Если используете прокси, настройте переменные окружения:
export HTTP_PROXY=http://your.proxy.server:port
export HTTPS_PROXY=http://your.proxy.server:port

# Node.js не использует системный прокси автоматически`,
    category: "network" as const,
  },
  {
    title: "Network timeout",
    cause: "Таймаут при установке или запуске инструментов",
    fix: `# Проверьте сетевое подключение
# Настройте прокси при необходимости
# Увеличьте таймаут npm:
npm config set fetch-timeout 120000`,
    category: "network" as const,
  },
  {
    title: "EACCES: permission denied",
    cause: "Недостаточно прав для глобальной установки npm",
    fix: `# Способ 1: Используйте sudo (macOS/Linux)
sudo npm install -g @z_ai/coding-helper

# Способ 2: Запустите терминал от имени администратора (Windows)

# Способ 3: Используйте npx (без глобальной установки)
npx @z_ai/coding-helper

# Способ 4: Используйте nvm для управления версиями Node.js
nvm install --lts`,
    category: "config" as const,
  },
  {
    title: "Некорректный статус плагина в Claude Code Marketplace",
    cause: "Плагин отображается как «не установлен», хотя уже установлен",
    fix: `# Обновите Claude Code до версии 2.0.70 или новее
claude update

# Затем перезапустите Claude Code`,
    category: "tool" as const,
  },
  {
    title: "API Key invalid",
    cause: "API-ключ отклонён сервером",
    fix: `# 1. Убедитесь, что ключ скопирован полностью без пробелов
# 2. Проверьте, что у аккаунта достаточно средств
# 3. Пересоздайте ключ на z.ai/manage-apikey/apikey-list
coding-helper auth  # Настройте ключ заново`,
    category: "auth" as const,
  },
  {
    title: "Connection timeout (сервер)",
    cause: "Сервер не отвечает в течение таймаута",
    fix: `# 1. Проверьте сетевое подключение
# 2. Проверьте настройки файрвола
# 3. Убедитесь, что Node.js и сетевая среда работают корректно
coding-helper doctor  # Диагностика системы`,
    category: "network" as const,
  },
];

export function TroubleshootSection() {
  const { theme } = useTheme();
  const th = (dark: string, light: string) => theme === "light" ? light : dark;

  return (
    <section id="troubleshoot" className="py-10 md:py-14">
      <SectionHeader
        num="10"
        title="Решение проблем"
        subtitle="Частые ошибки и способы их устранения"
      />

      {/* General errors */}
      <h3 className="text-lg font-semibold mb-3">Общие ошибки API и конфигурации</h3>
      <div className="space-y-3 mb-8">
        {errors.map((err, i) => (
          <motion.div
            key={err.error}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <code className="text-sm font-mono text-red-400">{err.error}</code>
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${categoryLabels[err.category].color}`}
                  >
                    {categoryLabels[err.category].text}
                  </Badge>
                </div>
                <p className={`text-xs mb-1 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
                  <span className={th('text-white/60', 'text-oklch(0.35 0 0)')}>Причина:</span> {err.cause}
                </p>
                <p className={`text-xs ${th('text-white/50', 'text-oklch(0.40 0 0)')}`}>
                  <span className="text-nyc-taxi">Решение:</span> {err.fix}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coding Tool Helper specific errors */}
      <h3 className="text-lg font-semibold mb-3">Ошибки Coding Tool Helper</h3>
      <p className={`text-sm mb-4 ${th('text-white/60', 'text-oklch(0.35 0 0)')}`}>
        Если возникли проблемы, сначала запустите <code className="text-nyc-taxi">coding-helper doctor</code> для диагностики.
      </p>
      <div className="space-y-3">
        {helperErrors.map((err, i) => (
          <motion.div
            key={err.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className={`${th('nyc-card-enhanced', 'rounded-xl border border-oklch(0.85 0 0) bg-oklch(0.98 0 0) shadow-sm')} p-4`}
          >
            <div className="flex items-center gap-2 mb-2">
              <code className="text-sm font-mono text-red-400">{err.title}</code>
              <Badge
                variant="outline"
                className={`text-[10px] ${categoryLabels[err.category].color}`}
              >
                {categoryLabels[err.category].text}
              </Badge>
            </div>
            <p className={`text-xs mb-2 ${th('text-white/40', 'text-oklch(0.50 0 0)')}`}>
              <span className={th('text-white/60', 'text-oklch(0.35 0 0)')}>Причина:</span> {err.cause}
            </p>
            <CodeBlock lang="bash" code={err.fix} className="text-xs" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
