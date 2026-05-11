---
Task ID: 1
Agent: main
Task: Fix horizontal scrollbar position, verify width/padding, verify ExamplesSection location

Work Log:
- Checked current page.tsx — width/padding `md:pr-18 lg:pr-18` is correctly preserved, NOT changed
- Found ExamplesSection is already inside ZCodeSection (line 837), NOT on main guide page
- Fixed horizontal scrollbar: hid in-content scrollbar on `.code-scroll-content` via `scrollbar-width: none` and `::-webkit-scrollbar { display: none }`
- Rewrote CodeBlock.tsx to use always-sticky proxy scrollbar at bottom of viewport (`position: fixed; bottom: 0`)
- Updated CSS: replaced `.code-scroll-proxy-wrapper` + `.is-sticky` with simpler `.code-scroll-proxy-sticky` that is always fixed to bottom
- Verified lint passes, dev server starts without errors

Stage Summary:
- Width/padding was NOT changed — `md:pr-18 lg:pr-18` is intact
- Horizontal scrollbar now shows ONLY at the bottom edge of the viewport (fixed position), never in the middle of the page
- ExamplesSection ("Примеры и практики") is already on the ZCode Desktop page
- All changes compile and run without errors
