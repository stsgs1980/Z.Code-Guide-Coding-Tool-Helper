# Project Configuration

> Project-specific settings for the current project.
> This file is NOT part of the toolkit standards -- it is created per project.
>
> Toolkit version: v1.5.0

---

## Stack Signature

```
Built with: Next.js 16.1.3 + TypeScript 5 + Tailwind CSS 4 + shadcn/ui + Prisma + Framer Motion + NEURO Brand Identity
```

> Format defined by: `MARKDOWN_STANDARD v2.1`

---

## Dev Server

| Setting | Value |
|---------|-------|
| Command | `bun run dev` |
| Port | 3000 |
| Health check | `curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000` |
| Host | `127.0.0.1` (NOT `localhost`) |
| Startup wait | 6 seconds (Turbopack compile time) |
| Lint | `bun run lint` |

### Error Handling

| Response | Action |
|----------|--------|
| 200 | Server running, proceed |
| 000 | Server down, restart with `dev-watchdog` skill |
| 500 | Server error, check logs, fix error, then restart |

---

## Project Paths

| Path | Purpose |
|------|---------|
| `src/app/page.tsx` | Main page (single-page app, all UI in one file) |
| `src/app/globals.css` | Global styles and NYC industrial theme |
| `src/components/ui/` | shadcn/ui components |
| `public/nyc-hero.png` | Hero background image |
| `instructions/` | Agent behavioral instructions |
| `skills/` | Automated agent skills |
| `standards/` | Governance documents (Group B) |
| `templates/` | Operational templates (Group A) |
| `worklog.md` | Agent work journal |

---

## Theme System

- **Dark/Light toggle**: state stored in `localStorage` key `nyc-theme`
- **CSS class**: `nyc-light-mode` on `<html>`
- **Pattern**: `theme === 'light' ? 'light-class' : 'dark-class'` throughout components

---

## Component Library

- Use **shadcn/ui** components, do not build from scratch
- TypeScript throughout with strict typing
- Framer Motion for animations
- Lucide React for icons

---

## Environment Variables

All environment variables must be documented in `.env.example`
per `REPRODUCIBILITY-STANDARD`.

---

## Notes

- This file is the single source of truth for project-specific configuration
- When switching to a different stack, update only this file
- AGENT_RULES.md references this file for all project-dependent settings
- Cron tasks disabled by user request -- only on explicit request
