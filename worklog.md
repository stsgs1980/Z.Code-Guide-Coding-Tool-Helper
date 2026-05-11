# Z Code — Руководство пользователя: Worklog

---
Task ID: 2
Agent: Main Agent
Task: Full-width content, timeline wizard, layout fixes

Work Log:
- Removed max-w-7xl constraint from main and Hero — content fills available width
- Unified responsive padding: px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14
- Section spacing standardized to py-10 md:py-14
- Grid gaps aligned: gap-3 sm:gap-4
- Timeline layout for wizard steps with vertical gradient line, animated nodes, hover effects
- SectionHeader margin: mb-6 md:mb-8
- Sidebar explicit w-14 matching md:ml-14 offset
- Footer mt-auto for sticky behavior

Stage Summary:
- Content fills full available width (no more max-w constraint)
- Timeline wizard implemented
- Consistent spacing across all sections

---
Task ID: 3
Agent: Main Agent
Task: Copyable commands, FAQ visual fix, fact-checking against official docs

Work Log:
- Added CopyButton to every command in Справочник команд (HelperSection)
- FAQ group headers: bold uppercase with border-left taxi accent + bg highlight
- FAQ triggers: font-semibold for distinction from answers
- Fact-check against docs.z.ai, zcode.z.ai revealed CRITICAL errors:
  - OpenAI Base URL WRONG: api/paas/v4 → api/coding/paas/v4
  - ANTHROPIC_DEFAULT_OPUS_MODEL default WRONG: glm-5.1 → glm-4.7
  - Vision MCP env vars WRONG: ZAI_API_KEY → Z_AI_API_KEY + Z_AI_MODE=ZAI
  - Vision MCP config key: zai-vision → zai-mcp-server
  - MCP source URLs 404: /devpack/extension/ → /devpack/mcp/
  - MCP error fix had wrong package name
- Added missing content:
  - Zread MCP Server (4th MCP server)
  - 5 new tools: TRAE, Qoder, Eigent, Hermes Agent, SillyTavern
  - Peak hours definition (14:00-18:00 UTC+8)
  - Vision quota clarification (shared prompt pool, not separate monthly)
  - Zread quota sharing detail
  - GLM-5 model added (separate from GLM-5-Turbo)
  - type: streamableHttp for Cline MCP configs
  - Coding vs General API endpoint distinction in openaiCompatConfig
- Tool notes for general-purpose agents (amber warning)
- Lint clean, server 200

Stage Summary:
- All critical fact-check errors fixed
- All 4 MCP servers documented
- 15 tools now listed (was 10)
- FAQ visually distinct with border-left accent headers
- Copy buttons on commands
- 3 commits ready, need PAT token for push

---
Previous entries:

- Task 1: Layout audit — max-width, timeline, spacing
- Task 13: Fix allowedDevOrigins and Hero layout
- Server instability: Next.js dev process dies after ~20s in sandbox; cron restarts
