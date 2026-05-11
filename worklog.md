---
Task ID: 1
Agent: Main Agent
Task: Add ZCode Desktop (zcode.z.ai) content, fix FAQ styling, fact-check commands, add missing models, add best practices

Work Log:
- Fetched all content from https://zcode.z.ai/, https://docs.z.ai/, https://docs.z.ai/devpack/extension/coding-tool-helper
- Identified major gap: ZCode Desktop ADE content was completely missing from the guide
- Created /home/z/my-project/src/components/guide/data/zcodeDesktop.ts with comprehensive data:
  - Permission modes (6 modes: Auto, Default, Auto Accept Edits, Plan, Quiet, Skip Permission Checks)
  - Agent frameworks (Claude Code, Gemini CLI, Codex, OpenCode) with workflow suggestions
  - ADE tools (Task Manager, Remote Dev, Terminal, Browser, Diff Preview)
  - Keyboard shortcuts (9 shortcuts with Mac/Windows keys)
  - ZCode FAQ (7 questions)
  - Download links (4 platforms)
  - Core features (6 features)
  - Safety scenarios (4 scenarios)
  - Version history (3 versions with features and fixes)
- Created /home/z/my-project/src/components/guide/sections/ZCodeSection.tsx - major new section component
- Updated TOC (toc.ts) - added ZCode Desktop at position 03, renumbered all subsequent sections
- Updated section index and main index exports
- Updated page.tsx - added ZCodeSection import and rendering, added zcode.z.ai to footer
- Fixed FAQ question header styling in PlanSection.tsx:
  - Changed from font-semibold to font-bold
  - Added border-l-2 accent line (nyc-taxi in dark, oklch accent in light)
  - Added pl-3 for visual offset
  - Changed text color to white/90 (dark) / oklch(0.15 0 0) (light) for stronger contrast
  - Added hover:no-underline
- Fact-checked and fixed command format: coding-helper lang set en → en_US, ru → ru_RU
- Added missing model categories from docs.z.ai:
  - Vision models: GLM-5V-Turbo, GLM-4.6V, GLM-OCR, GLM-4.5V
  - Image generation: GLM-Image, CogView-4
  - Video generation: CogVideoX-3, Vidu Q1, Vidu 2
  - Audio: GLM-ASR-2512
  - Agents: Slide/Poster, Translation, Video Effect Template
  - Free/additional text models: GLM-4.7-FlashX, GLM-4.5-Flash, GLM-4-32B-0414-128K
- Updated ModelsSection.tsx with all new model categories, icons, and badges
- Added best practices from docs.z.ai/devpack/resources/best-practice (5 principles)
- Added memory mechanism from docs.z.ai/devpack/resources/memory-mechanism (5 types)
- Updated ExamplesSection.tsx to include Best Practices and Memory Mechanism
- Updated Hero stats to reflect 15+ tools, 12+ models, 4 MCP servers
- Updated sources.ts with new links: ZCode changelog, ZCode docs, Best Practices, Memory Mechanism, Scenario Examples, GLM Coding Plan overview
- Updated all section numbers (03→04 for Tools, etc.)
- Fixed ESLint warning: Image → ImageIcon from lucide-react
- All lint checks pass clean

Stage Summary:
- ZCode Desktop ADE section fully implemented with comprehensive content from zcode.z.ai
- FAQ headers now visually distinct with bold text, accent border, stronger colors
- Command format fact-checked and corrected
- Full model lineup from docs.z.ai now reflected (coding, vision, image gen, video gen, audio, agents)
- Best practices and memory mechanism added from docs.z.ai
- Server running on port 3000, all pages compile successfully

---
Task ID: 2
Agent: Main Agent
Task: Enrich ZCode Desktop section with full official docs from zcode.z.ai/en/newdocs/

Work Log:
- Fetched all 15 pages from https://zcode.z.ai/en/newdocs/ (welcome, install, configuration, agents, edit-history, commands, plugin, mcp-services, skill, agent-framework, safety-confirm, ADE-tools, keyboard-shortcuts, qa, feedback)
- Updated zcodeDesktop.ts with new data:
  - Permission modes: enriched descriptions from official docs
  - Agent frameworks: added bestUseCases field (e.g., "Рефакторинг архитектуры, миграция legacy")
  - ADE Tools: expanded Task Manager with archive/pin/copy paths details, expanded Browser Panel with DevTools info, expanded Diff Preview with line counts
  - Safety decisions: new data with 3 options (Allow, Always Allow, Reject) + recommended scenarios
  - API providers: NEW — 6 providers (BigModel, Z.AI, Anthropic, OpenRouter, Moonshot, Custom) with step-by-step setup instructions, Base URLs, model lists
  - Edit history use cases: NEW — 3 cards (fix mistakes, add detail, experiment)
  - Feedback info: NEW — form URL, log paths (macOS ~/.zcode, Windows %USERPROFILE%\.zcode), in-app feedback
  - ZCode FAQ: enriched answers with more details (ADE positioning, Vibe Coding direction, supported provider list)
  - Download links: added installNote field (e.g., "Откройте DMG, перетащите Z Code.app в Applications")
- Updated ZCodeSection.tsx with new sections:
  - "Редактирование отправленных сообщений" — Edit History with 3 use case cards
  - "Команды (/Commands)" — /Commands feature description
  - "Настройка API-провайдеров" — expanded from 2 methods to full provider list with step-by-step instructions
  - "Подтверждение безопасности" — now has decision options cards (Allow/Always Allow/Reject) + scenario table
  - "Обратная связь и поддержка" — NEW section with form URL, in-app feedback, log paths
  - FAQ questions now use same enhanced styling (border-l-2 accent, font-bold, pl-3/pl-5)
- All lint checks pass clean, server running on port 3000

Stage Summary:
- ZCode Desktop section now comprehensively covers ALL content from zcode.z.ai/en/newdocs/
- 6 API providers documented with step-by-step setup instructions
- Edit History, /Commands, Safety Decisions, and Feedback sections added
- ADE Tools descriptions enriched with official docs details
- FAQ answers enriched with ADE positioning, Vibe Coding direction, provider list
- Total coverage: welcome, install, config, agents, edit-history, commands, plugin, mcp, skill, agent-framework, safety, ADE-tools, shortcuts, FAQ, feedback
