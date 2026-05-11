'use client'

import React from 'react'
import { Terminal, Key, Wrench } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SectionHeader } from '@/components/guide/SectionHeader'
import { CodeBlock } from '@/components/guide/CodeBlock'
import { CopyAllButton } from '@/components/guide/CopyAllButton'
import { InstallScriptGenerator } from '@/components/guide/InstallScriptGenerator'
import { INSTALL_TOOLS } from '@/data/guide-data'

interface InstallSectionProps {
  installSelections: Record<string, boolean>
  setInstallSelections: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  theme: 'dark' | 'light'
}

export function InstallSection({ installSelections, setInstallSelections, theme }: InstallSectionProps) {
  return (
    <section id="install" className="py-16 lg:py-24 nyc-section-hover-border">
      <SectionHeader number="05" title="Установка и настройка" subtitle="step_by_step_guide" readingTime={3} />

      {/* API Keys */}
      <div className="mb-8">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Key className="w-4 h-4 text-[var(--nyc-taxi)]" />
          API ключи
        </h3>
        <div className="space-y-2">
          {[
            { key: 'Z.AI API Key', source: 'z.ai', purpose: 'GLM Coding Plan', store: 'coding-helper auth' },
            { key: 'Magic API Key', source: '21st.dev/magic console', purpose: 'Magic MCP', store: 'mcpServers.magic.env' },
            { key: 'Google OAuth', source: 'Auto via stitch-mcp init', purpose: 'Stitch авторизация', store: 'Автоматически' },
            { key: 'Anthropic Key', source: 'console.anthropic.com', purpose: 'Claude модели', store: 'config provider' },
            { key: 'OpenAI Key', source: 'platform.openai.com', purpose: 'GPT модели', store: 'config provider' },
          ].map(k => (
            <div key={k.key} className="p-3 border border-[var(--nyc-border-faint)] rounded-lg bg-[var(--nyc-bg-secondary)] flex flex-col sm:flex-row sm:items-center gap-2 text-xs hover:border-[var(--nyc-taxi)]/10 transition-colors">
              <span className="font-bold text-[var(--nyc-taxi)] min-w-[130px] flex items-center gap-2">
                <Key className="w-3 h-3" />
                {k.key}
              </span>
              <span className="text-[var(--nyc-concrete)] flex-1">{k.purpose}</span>
              <span className={`text-[var(--nyc-text-icon)] font-mono text-[10px]`}>{k.source}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Install Commands */}
      <div className="space-y-6 mb-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[var(--nyc-taxi)]" />
            Команды установки
          </h3>
          <CopyAllButton />
        </div>

        {[
          { num: '01', title: 'OpenCode', code: 'curl -fsSL https://opencode.ai/install | bash\nopencode --version' },
          { num: '02', title: 'Coding Tool Helper', code: 'npx @z_ai/coding-helper\n# Follow wizard: language -> plan -> API key -> tools -> MCP' },
          { num: '03', title: 'Stitch MCP', code: 'npx @_davideast/stitch-mcp init' },
          { num: '04', title: 'UI UX Pro Max Skill', code: 'npx skills add nextlevelbuilder/ui-ux-pro-max-skill --global' },
        ].map((step) => (
          <div key={step.num}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-[var(--nyc-taxi)] font-bold">{step.num}</span>
              <span className="text-sm font-semibold tracking-tight">{step.title}</span>
            </div>
            <CodeBlock code={step.code} theme={theme} />
          </div>
        ))}

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-[var(--nyc-taxi)] font-bold">05</span>
            <span className="text-sm font-semibold tracking-tight">Cline (VS Code)</span>
          </div>
          <div className="p-4 border border-[var(--nyc-border-faint)] rounded-lg bg-[var(--nyc-bg-hover)] text-xs space-y-1.5 text-[var(--nyc-concrete)]">
            <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">1.</span> Open VS Code</p>
            <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">2.</span> Ctrl+Shift+X → Search &quot;Cline&quot; → Install</p>
            <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">3.</span> Restart VS Code</p>
            <p className="flex items-start gap-2"><span className="text-[var(--nyc-taxi)]">4.</span> Open Cline panel → Settings → Configure MCP</p>
          </div>
        </div>
      </div>

      {/* Config Templates */}
      <div className="mb-6">
        <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-[var(--nyc-taxi)]" />
          Шаблоны конфигурации
        </h3>

        <Tabs defaultValue="opencode" className="w-full">
          <TabsList className="bg-[var(--nyc-bg-interactive-hover)] border border-[var(--nyc-border-faint)] mb-3 h-9">
            <TabsTrigger value="opencode" className="text-xs data-[state=active]:bg-[var(--nyc-taxi)] data-[state=active]:text-black data-[state=active]:font-bold h-7 px-3">
              OpenCode
            </TabsTrigger>
            <TabsTrigger value="cline" className="text-xs data-[state=active]:bg-[var(--nyc-taxi)] data-[state=active]:text-black data-[state=active]:font-bold h-7 px-3">
              Cline/VS Code
            </TabsTrigger>
          </TabsList>
          <TabsContent value="opencode">
            <CodeBlock
              code={`// ~/.config/opencode/config.json
{
  "provider": "anthropic",
  "model": "claude-sonnet-4-20250514",
  "mcpServers": {
    "magic": {
      "command": "npx",
      "args": ["-y", "21st-dev/magic-mcp"],
      "env": { "MAGIC_API_KEY": "your-key-here" }
    },
    "stitch": {
      "command": "npx",
      "args": ["@_davideast/stitch-mcp", "proxy"]
    }
  },
  "rules": [
    "Use shadcn/ui components when available",
    "Use Tailwind CSS for styling",
    "Generate TypeScript with proper types"
  ]
}`}
              lang="json"
              theme={theme}
            />
          </TabsContent>
          <TabsContent value="cline">
            <CodeBlock
              code={`// ~/.cline/data/settings/cline_mcp_settings.json
{
  "mcpServers": {
    "magic": {
      "command": "npx",
      "args": ["-y", "21st-dev/magic-mcp"],
      "env": { "MAGIC_API_KEY": "your-key-here" }
    },
    "stitch": {
      "command": "npx",
      "args": ["@_davideast/stitch-mcp", "proxy"]
    }
  }
}`}
              lang="json"
              theme={theme}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Install Script Generator */}
      <InstallScriptGenerator installSelections={installSelections} setInstallSelections={setInstallSelections} theme={theme} />
    </section>
  )
}
