# MCP Tool Helper Guide

Interactive single-page guide for installing and configuring AI development tools — Coding Tool Helper, OpenCode, Stagewise, and MCP servers.

Built with **Next.js 16** + **React 19** + **Tailwind CSS 4** + **shadcn/ui** in a "Minimal Industrialism" / NYC visual theme.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.3 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | React 19 + shadcn/ui (New York style) |
| Styling | Tailwind CSS 4 + 60+ custom CSS utilities |
| Animation | Framer Motion 12 |
| Icons | Lucide React |
| Database | Prisma ORM + SQLite |
| Auth | NextAuth.js v4 (available) |
| State | Zustand + TanStack Query (available) |
| Runtime | Bun |
| Fonts | Geist Sans + Geist Mono |

---

## Project Structure

```
src/
  app/
    globals.css      # ~920 lines — NYC theme, custom utilities, syntax tokens
    layout.tsx       # Root layout (Geist fonts, dark mode, OG meta)
    page.tsx         # Entire guide UI (~3200 lines, single-page app)
    api/
      route.ts       # Placeholder API route
  components/
    ui/              # 48 shadcn/ui components
  hooks/
    use-mobile.ts
    use-toast.ts
  lib/
    db.ts            # Prisma client singleton
    utils.ts         # cn() utility
prisma/
  schema.prisma      # User + Post models (SQLite)
public/
  logo.svg           # Z.ai logo
  nyc-hero.png       # Hero background image
  robots.txt
db/
  custom.db          # SQLite database file
```

---

## Features

### Content Sections (14 total)
- **00** — Hero with animated stats and reading time
- **01** — Tool Matrix (7 AI tools with cards)
- **02** — Platform Compatibility (5 platforms, comparison table)
- **03** — Coding Tool Helper (7 CLI commands, filter search)
- **04** — Stagewise (features, browser integration)
- **05** — Installation (6 tools, copy-all button, CLI-style code blocks)
- **06** — MCP Servers (4 servers with ports)
- **07** — Prompt Templates (3 categories + 4 ready prompts)
- **08** — Cost Scenarios (4 tiers: Free to Enterprise)
- **08.5** — Interactive Plan Wizard (usage type + budget + tools)
- **09** — Troubleshooting (7 common errors)
- **09.5** — FAQ (6 accordion items)
- **10** — Architecture diagram
- **11** — Interactive Checklist (8 items, persisted to localStorage)

### Interactive Features
- **Search Dialog** — Ctrl+K, fuzzy search across all sections
- **Guide Tour** — 7-step walkthrough with keyboard navigation
- **Theme Toggle** — Dark/Light mode with localStorage persistence
- **Keyboard Navigation** — J/K for section jumping, Ctrl+K for search
- **Section Share** — Hash-based URL sharing for each section
- **Bookmark Sections** — Save favorite sections (localStorage)
- **Reading Progress** — Top progress bar + animated stats
- **Syntax Highlighting** — Regex-based tokenizer for bash/json/yaml
- **CLI-style Code Blocks** — Terminal look with prompt symbols, line numbers, cursor
- **Copy Buttons** — Individual + "Copy All Commands"
- **Sidebar Navigation** — TOC with active section indicator
- **Scroll to Top** — Animated pill button with label

### Visual Design — "Minimal Industrialism" / NYC
- **Primary**: Taxi Yellow `#FFC107`
- **Accent**: Amber, Steel `#8B9DAF`, Concrete `#B0B0B0`, Charcoal `#2D2D2D`
- **60+ custom CSS classes**: card depth, glow effects, gradient text, industrial textures, micro-interactions, atmospheric effects
- **No-Unicode Policy v2.1**: All emoji/Unicode replaced with SVG/ASCII equivalents
- **Responsive**: Mobile-first with sidebar collapse

---

## Getting Started

### Prerequisites
- **Node.js** 18+
- **Bun** runtime

### Install & Run

```bash
# Clone the repository
git clone https://github.com/Sts8987/MCP-tool-helper.git
cd MCP-tool-helper

# Install dependencies
bun install

# Start development server (port 3000)
bun run dev

# Push database schema
bun run db:push
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|------------|
| `bun run dev` | Start dev server on port 3000 (Turbopack, 3072MB heap) |
| `bun run build` | Production build (standalone output) |
| `bun run start` | Run production server |
| `bun run lint` | ESLint check |
| `bun run db:push` | Push Prisma schema to SQLite |
| `bun run db:generate` | Generate Prisma client |
| `bun run db:migrate` | Run Prisma migrations |
| `bun run db:reset` | Reset database |

---

## Theme Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--nyc-taxi` | `#FFC107` | Primary accent, CTAs, highlights |
| `--nyc-amber` | `#FF9800` | Secondary accent, hover states |
| `--nyc-subway` | `#F44336` | Error states, danger indicators |
| `--nyc-steel` | `#8B9DAF` | Secondary text, borders |
| `--nyc-concrete` | `#B0B0B0` | Body text, muted elements |
| `--nyc-charcoal` | `#2D2D2D` | Backgrounds, surfaces |

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Ctrl+K` | Open search dialog |
| `J` | Next section |
| `K` | Previous section |
| `Escape` | Close dialog/tour |
| `Arrow keys` | Navigate within search/tour |
| `Enter` | Select search result / Next tour step |

---

## Environment Variables

| Variable | Description | Default |
|----------|------------|---------|
| `DATABASE_URL` | SQLite database path | `file:/home/z/my-project/db/custom.db` |

---

## Deployment

The project uses Next.js **standalone output** mode, optimized for Docker and serverless deployments.

```bash
# Build
bun run build

# Run production
bun run start
```

A **Caddyfile** is included for reverse proxy setup (port 81 -> 3000) with dynamic port routing via `XTransformPort` query parameter.

---

## Known Issues & Limitations

- Tailwind CSS v4 `@theme inline` takes precedence over custom `:root` CSS variables — dark mode requires inline style workaround on `<body>`
- All UI is in a single `page.tsx` (~3200 lines) — could benefit from component extraction
- Several declared dependencies are not actively used (next-auth, next-intl, zustand, recharts, @dnd-kit)
- Light mode could use more refined card/text color overrides
- No i18n implementation despite `next-intl` being installed

---

## License

Private project. All rights reserved.

---

## Credits

- **Z.AI Team** — Coding Tool Helper, OpenCode, MCP Servers
- **shadcn/ui** — Component library
- **21st.dev** — Magic MCP
- **Stagewise** — AI Browser for web development
- **Stitch MCP** — Full-page design generation
