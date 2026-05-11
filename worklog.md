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
