# Task 3: useLocalStorage Refactor with useSyncExternalStore

## Summary
Replaced the localStorage hydration anti-pattern (`useState` + `useEffect` with `eslint-disable`) with a proper React 19 pattern using `useSyncExternalStore`.

## Changes Made
1. **Added `useSyncExternalStore` import** from React
2. **Created `useLocalStorage<T>` hook** with:
   - `subscribe`: listens for `storage` events (cross-tab) + custom `local-storage-{key}` events (same-tab)
   - `getSnapshot`: reads localStorage, uses cache for referential stability
   - `getServerSnapshot`: returns defaultValue for SSR
   - `setValue`: accepts direct values or updater functions, persists to localStorage, dispatches custom event
3. **Replaced 6 `useState` declarations** with `useLocalStorage` calls
4. **Removed** hydration useEffect (with eslint-disable) and 6 persistence useEffects
5. **Added** `setBookmarks`/`setTheme` to useCallback deps (React Compiler requirement)

## Lint Result
✅ `bun run lint` — 0 errors, 0 warnings

## Files Modified
- `src/app/page.tsx`
