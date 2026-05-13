# Task 4 — Restore lost pages and implement 4-page navigation

## Summary
Recovered all lost pages from git force-push and implemented full 4-page navigation (guide, zcode, helper, skills).

## Files Created
- `/src/components/guide/hooks/usePageState.ts` — 4-page state hook (guide|zcode|helper|skills)
- `/src/components/guide/features/GuideLayout.tsx` — Main layout with 4-page rendering
- `/src/components/guide/features/MobileHeader.tsx` — Mobile header with back button
- `/src/components/guide/features/MobileMenu.tsx` — Mobile slide-out menu
- `/src/components/guide/features/ZCodePromoCard.tsx` — Promo card for ZCode Desktop
- `/src/components/guide/features/CodingHelperPromoCard.tsx` — Promo card for Coding Helper
- `/src/components/guide/features/Footer.tsx` — Shared footer
- `/src/components/guide/sections/CodingHelperSection.tsx` — Coding Helper full page
- `/src/components/guide/data/skills.ts` — Skills data extracted from monolith
- `/src/components/guide/sections/SkillsGuideSection.tsx` — Skills main (tab switcher)
- `/src/components/guide/features/skills/SkillsWhatIs.tsx` — Tab 1
- `/src/components/guide/features/skills/SkillsBuiltIn.tsx` — Tab 2
- `/src/components/guide/features/skills/SkillsCreate.tsx` — Tab 3
- `/src/components/guide/features/skills/SkillsInstall.tsx` — Tab 4
- `/src/components/guide/features/skills/SkillsInvoke.tsx` — Tab 5
- `/src/components/guide/features/skills/index.ts` — Barrel

## Files Updated
- `/src/components/guide/features/SidebarNav.tsx` — Added onGoToGuide, 4-page active state
- `/src/components/guide/data/toc.ts` — Added coding-helper, skills-guide as pages
- `/src/components/guide/data/zcode/commands.ts` — Added codingHelperCommands
- `/src/app/page.tsx` — Simplified to ThemeProvider + GuideLayout
- `/src/components/guide/index.ts` — Added CodingHelperSection, SkillsGuideSection exports
- `/src/components/guide/sections/index.ts` — Added new sections
- `/src/components/guide/features/index.ts` — Added new features
- `/src/components/guide/hooks/index.ts` — Added usePageState
- `/src/components/guide/data/index.ts` — Added skills exports

## Verification
- `bun run lint` — passes cleanly
- `next build` — compiles successfully
- Width/padding `md:ml-14 md:pr-18 lg:pr-18` preserved
