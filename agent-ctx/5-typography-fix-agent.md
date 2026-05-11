# Task 5 — Typography Fix Agent

## Summary
Fixed typography issues across 9 section files in `/home/z/my-project/src/components/guide/sections/`, following all 5 rules strictly. ZCodeSection.tsx was intentionally left untouched.

## Changes Made

### Rule 2: Standardize h3 headings → `text-lg font-semibold`
| File | Before | After |
|------|--------|-------|
| ToolsSection.tsx | `font-semibold text-sm` | `text-lg font-semibold` |
| McpSection.tsx | `font-semibold text-base` | `text-lg font-semibold` |
| SourcesSection.tsx | `text-sm font-semibold` | `text-lg font-semibold` |
| PlanSection.tsx | `text-xl font-bold` | `text-lg font-semibold` |

### Rule 3: Upgrade body `text-xs` → `text-sm`
Applied across all 8 affected files (QuickStart, Helper, Tools, Examples, Troubleshoot, Mcp, Models, Sources). Kept `text-xs` for badges, kbd, URLs/paths, version numbers, context labels, code blocks.

### Rule 4: Add `leading-relaxed` to multi-line body text
Added to all upgraded `text-sm` paragraphs and existing `text-sm` paragraphs that are multi-line.

### Rule 5: Normalize font-weight
- PlanSection.tsx: h4 `font-bold` → `font-semibold`

## Lint
`bun run lint` passes clean.
