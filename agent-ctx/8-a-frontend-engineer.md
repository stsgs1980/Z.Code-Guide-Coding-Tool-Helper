# Task 8-a: Frontend Engineer

## Task: Fix Guide Tour overlay and add syntax highlighting to CodeBlock

### Work Completed

1. **Guide Tour Overlay Fix**
   - Replaced the unsupported `path()` CSS background property with a simple solid overlay
   - Single overlay: `rgba(0,0,0,0.75)` with `backdropFilter: blur(4px)`
   - Z-index layering: overlay (199) < highlight border (200) < tooltip card (202)

2. **Syntax Highlighting**
   - Added `highlightLine(line, lang)` function in page.tsx
   - Supports bash, json, yaml languages
   - Uses existing CSS token classes from globals.css
   - Integrated into CodeBlock component

### Files Modified
- `src/app/page.tsx` — overlay fix, highlightLine function, CodeBlock rendering
- `worklog.md` — appended task log

### QA
- `bun run lint` — clean
- Dev server compiles successfully
