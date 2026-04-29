import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { X, Terminal, Search, ChevronRight, Star, Clock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CommandCenterProps, SectionConfig, ItemConfig, AnimationVariant, CommandCenterTheme, TriggerConfig } from './command-center-types'

/* --- Re-export all public types for consumers --- */
export type { CommandCenterProps, SectionConfig, ItemConfig, AnimationVariant, CommandCenterTheme, TriggerConfig }

/* -----------------------------------------------------------------------
   @zai/token-command-center -- Shell Component
   
   Pure UI shell. Zero business logic. Zero hardcoded data.
   Accepts sections through props and renders sidebar + content.
   
   Features:
   - Sidebar with section grouping + accent colors
   - Search across all item labels and section labels
   - Keyboard navigation (Arrow keys, Enter, ESC)
   - Focus trap when open (WCAG 2.1)
   - 4 animation variants (slide-up, slide-right, fade-scale, none)
   - Theme customization via props
   - Persistent state (localStorage key)
   - Mobile responsive (collapsible sidebar)
   - Badge counts on items
   - Shortcut hints in sidebar
   - External trigger via triggerOpen prop
   - Controlled / uncontrolled open state
   - Custom footer / sidebar header slots
   ----------------------------------------------------------------------- */

/* --- Default theme values --- */
const DEFAULT_THEME = {
  bg: '#0c0c14',
  sidebarBg: 'rgba(255,255,255,0.015)',
  text: '#c3cee3',
  muted: '#565575',
  accent: '#c792ea',
  border: 'rgba(199,146,234,0.15)',
  font: "'Geist Mono', ui-monospace, SFMono-Regular, monospace",
  overlayBg: 'rgba(0,0,0,0.65)',
}

/* --- Animation keyframe names (scoped with cc- prefix) --- */
const ANIMATION_MAP: Record<AnimationVariant, string> = {
  'slide-up': 'ccSlideUp',
  'slide-right': 'ccSlideRight',
  'fade-scale': 'ccFadeScale',
  'none': '',
}

/* --- Validate CSS width value for maxWidth prop --- */
function sanitizeMaxWidth(value: string): string {
  if (/^(\d+(\.\d+)?)(px|rem|em|vh|vw|%|ch|ex|cm|mm|in|pt|pc|vmin|vmax)$/.test(value)) return value
  if (/^calc\(.+\)$/.test(value)) return value
  return '1024px'
}

/* --- Flat item with section reference --- */
interface FlatItem {
  item: ItemConfig
  section: SectionConfig
  sectionIndex: number
  itemIndex: number
}

/* --- SSR-safe localStorage helpers --- */
function safeGetItem(key: string): string | null {
  if (typeof window === 'undefined') return null
  try { return localStorage.getItem(key) } catch { return null }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(key, value) } catch { /* quota exceeded, ignore */ }
}

function safeGetJSON<T>(key: string): T | null {
  const raw = safeGetItem(key)
  if (!raw) return null
  try { return JSON.parse(raw) as T } catch { return null }
}

/* --- Focus trap handler --- */
function createFocusTrap(container: HTMLElement) {
  const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'

  function getFocusableElements(): HTMLElement[] {
    return Array.from(container.querySelectorAll(FOCUSABLE))
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return

    const focusable = getFocusableElements()
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown)
  return () => container.removeEventListener('keydown', handleKeyDown)
}

/* --- Style injection (idempotent via DOM check) --- */
function injectStyles() {
  if (typeof document === 'undefined') return
  if (document.getElementById('cc-keyframes')) return

  const style = document.createElement('style')
  style.id = 'cc-keyframes'
  style.textContent = `
    @keyframes ccSlideUp {
      from { opacity: 0; transform: translateY(40px) scale(0.97); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes ccSlideRight {
      from { opacity: 0; transform: translateX(40px) scale(0.97); }
      to { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes ccFadeScale {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes ccContentFade {
      from { opacity: 0; transform: translateX(8px); }
      to { opacity: 1; transform: translateX(0); }
    }
  `
  document.head.appendChild(style)
}

export default function CommandCenter({
  sections,
  defaultItemId,
  triggerOpen,
  openTab,
  isOpen: controlledIsOpen,
  onOpenChange,
  theme: themeProp,
  animation = 'slide-up',
  trigger: triggerProp,
  hideTrigger = false,
  searchable = true,
  showShortcuts = true,
  persistState,
  maxWidth = '1024px',
  showFooter = true,
  footerSlot,
  sidebarHeaderSlot,
}: CommandCenterProps) {
  /* --- Theme merge --- */
  const t = useMemo(() => ({ ...DEFAULT_THEME, ...themeProp }), [themeProp])
  const mono = useMemo(() => ({ fontFamily: t.font }), [t.font])

  /* --- Sanitize maxWidth --- */
  const safeMaxWidth = useMemo(() => sanitizeMaxWidth(maxWidth), [maxWidth])

  /* --- Open state (controlled / uncontrolled) --- */
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen
  const setIsOpen = useCallback((value: boolean) => {
    if (controlledIsOpen === undefined) setInternalIsOpen(value)
    onOpenChange?.(value)
  }, [controlledIsOpen, onOpenChange])

  /* --- Active item (using Map for O(1) lookup) --- */
  const allItems = useMemo(() => {
    const flat: FlatItem[] = []
    sections.forEach((section, si) => {
      section.items.forEach((item, ii) => {
        flat.push({ item, section, sectionIndex: si, itemIndex: ii })
      })
    })
    return flat
  }, [sections])

  const allItemsMap = useMemo(() => {
    const map = new Map<string, FlatItem>()
    allItems.forEach((f) => map.set(f.item.id, f))
    return map
  }, [allItems])

  const firstItemId = allItems[0]?.item.id ?? ''

  /* --- Persist state --- */
  const storageKey = persistState ? `zai-cc-${persistState}` : null
  const getInitialItemId = useCallback(() => {
    if (storageKey) {
      const saved = safeGetItem(storageKey)
      if (saved && allItemsMap.has(saved)) return saved
    }
    return defaultItemId || firstItemId
  }, [storageKey, defaultItemId, firstItemId, allItemsMap])

  const [activeItemId, setActiveItemId] = useState(getInitialItemId)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [mobileShowSidebar, setMobileShowSidebar] = useState(true)
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const recentStorageKey = persistState ? `zai-cc-${persistState}-recent` : 'zai-cc-recent'

  const [recentItems, setRecentItems] = useState<string[]>(() => {
    return safeGetJSON<string[]>(recentStorageKey) ?? []
  })

  /* --- Recent items as Set for O(1) lookup --- */
  const recentItemsSet = useMemo(() => new Set(recentItems), [recentItems])

  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  /* --- Keep filteredItems + focusedIndex in refs for keyboard handler --- */
  const filteredItemsRef = useRef<FlatItem[]>([])
  const focusedIndexRef = useRef(-1)

  // Sync ref when focusedIndex changes
  useEffect(() => { focusedIndexRef.current = focusedIndex }, [focusedIndex])

  /* --- Body overflow lock with cleanup (S1 fix) --- */
  const previousOverflowRef = useRef<string>('')

  useEffect(() => {
    if (isOpen) {
      previousOverflowRef.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousOverflowRef.current
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = previousOverflowRef.current
    }
  }, [isOpen])

  /* --- Inject styles once --- */
  useEffect(() => { injectStyles() }, [])

  /* --- Persist on change --- */
  useEffect(() => {
    if (storageKey) safeSetItem(storageKey, activeItemId)
  }, [activeItemId, storageKey])

  /* --- Track recently used items --- */
  const trackRecent = useCallback((id: string) => {
    setRecentItems((prev) => {
      const next = [id, ...prev.filter((rId) => rId !== id)].slice(0, 5)
      safeSetItem(recentStorageKey, JSON.stringify(next))
      return next
    })
  }, [recentStorageKey])

  /* --- External trigger (CustomEvent) --- */
  useEffect(() => {
    const handleOpen = (e: Event) => {
      setIsOpen(true)
      const tab = (e as CustomEvent).detail?.tab
      if (tab) setActiveItemId(tab)
    }
    window.addEventListener('zai-open-command-center', handleOpen)
    return () => window.removeEventListener('zai-open-command-center', handleOpen)
  }, [setIsOpen])

  useEffect(() => {
    if (triggerOpen && triggerOpen > 0) {
      window.dispatchEvent(new CustomEvent('zai-open-command-center', { detail: { tab: openTab } }))
    }
  }, [triggerOpen, openTab])

  /* --- Responsive check --- */
  useEffect(() => {
    function check() { setIsMobile(window.innerWidth < 768) }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* --- Focus trap --- */
  useEffect(() => {
    if (!isOpen || !panelRef.current) return
    const cleanup = createFocusTrap(panelRef.current)
    return cleanup
  }, [isOpen])

  /* --- Keyboard nav (R1-R2 fix: stable handler via refs) --- */
  useEffect(() => {
    if (!isOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        setIsOpen(false)
        return
      }
      /* Focus search on / key */
      if (e.key === '/' && searchRef.current && !(e.target instanceof HTMLInputElement)) {
        e.preventDefault()
        searchRef.current.focus()
        return
      }
      /* Arrow navigation in sidebar */
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const items = filteredItemsRef.current
        if (items.length === 0) return
        setFocusedIndex((prev) => {
          if (e.key === 'ArrowDown') return Math.min(prev + 1, items.length - 1)
          return Math.max(prev - 1, 0)
        })
        return
      }
      /* Enter to select focused item */
      if (e.key === 'Enter' && focusedIndexRef.current >= 0) {
        e.preventDefault()
        const items = filteredItemsRef.current
        if (items[focusedIndexRef.current]) {
          setActiveItemId(items[focusedIndexRef.current].item.id)
          if (isMobile) setMobileShowSidebar(false)
        }
        return
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, isMobile, setIsOpen]) // Removed focusedIndex, searchQuery, allItems from deps

  /* --- Click outside --- */
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) setIsOpen(false)
  }, [setIsOpen])

  /* --- Search filter --- */
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allItems
    const q = searchQuery.toLowerCase()
    return allItems.filter((f) =>
      f.item.label.toLowerCase().includes(q) ||
      f.section.label.toLowerCase().includes(q) ||
      (f.item.shortcut && f.item.shortcut.toLowerCase().includes(q))
    )
  }, [allItems, searchQuery])

  /* --- Sync filteredItems to ref for keyboard handler --- */
  useEffect(() => {
    filteredItemsRef.current = filteredItems
  }, [filteredItems])

  /* --- filteredItems index map for O(1) lookup (R5 fix) --- */
  const filteredItemsIndexMap = useMemo(() => {
    const map = new Map<string, number>()
    filteredItems.forEach((f, i) => map.set(f.item.id, i))
    return map
  }, [filteredItems])

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections
    const filteredIds = new Set(filteredItems.map((f) => f.item.id))
    return sections
      .map((s) => ({
        ...s,
        items: s.items.filter((item) => filteredIds.has(item.id)),
      }))
      .filter((s) => s.items.length > 0)
  }, [sections, searchQuery, filteredItems])

  /* --- Active item data (R4 fix: O(1) Map lookup) --- */
  const activeFlat = allItemsMap.get(activeItemId)
  const activeItem = activeFlat?.item ?? allItems[0]?.item
  const activeSection = activeFlat?.section ?? sections[0]

  /* --- Content transition key --- */
  const contentTransitionKey = activeItemId

  /* --- Trigger config --- */
  const TriggerIcon: LucideIcon = triggerProp?.icon ?? Terminal
  const triggerPosition: Record<string, React.CSSProperties> = {
    left: { bottom: '24px', left: '24px' },
    center: { bottom: '24px', left: '50%', transform: 'translateX(-50%)' },
    right: { bottom: '24px', right: '24px' },
  }
  const triggerSize = triggerProp?.size ?? 48
  const triggerAccent = triggerProp?.accent ?? t.accent

  /* --- No items case --- */
  if (sections.length === 0 || allItems.length === 0) return null

  return (
    <>
      {/* --- Floating Trigger Button --- */}
      {!hideTrigger && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            ...triggerPosition[triggerProp?.position ?? 'right'],
            width: `${triggerSize}px`,
            height: `${triggerSize}px`,
            background: 'rgba(12,12,20,0.92)',
            border: `1px solid ${triggerAccent}40`,
            boxShadow: `0 0 20px ${triggerAccent}25, 0 4px 16px rgba(0,0,0,0.4)`,
            color: triggerAccent,
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            opacity: isOpen ? 0 : 1,
            pointerEvents: isOpen ? 'none' : 'auto',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          aria-label={triggerProp?.ariaLabel ?? 'Open Command Center'}
          title={triggerProp?.ariaLabel ?? 'Command Center'}
        >
          <TriggerIcon size={triggerSize * 0.42} />
        </button>
      )}

      {/* --- Overlay --- */}
      {isOpen && (
        <div
          ref={overlayRef}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 60,
            display: 'flex',
            alignItems: isMobile ? 'flex-end' : 'center',
            justifyContent: 'center',
            background: t.overlayBg,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          }}
          onClick={handleOverlayClick}
        >
          <div
            ref={panelRef}
            style={{
              width: '100%',
              maxWidth: safeMaxWidth,
              maxHeight: '92vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: isMobile ? '12px 12px 0 0' : '12px',
              overflow: 'hidden',
              background: t.bg,
              border: `1px solid ${t.border}`,
              boxShadow: `0 0 60px ${t.accent}10, 0 32px 64px rgba(0,0,0,0.5)`,
              animation: animation !== 'none' ? `${ANIMATION_MAP[animation]} 0.35s cubic-bezier(0.16, 1, 0.3, 1)` : undefined,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Command Center"
          >
            {/* --- Header --- */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingLeft: '20px',
                paddingRight: '20px',
                paddingTop: '14px',
                paddingBottom: '14px',
                flexShrink: 0,
                borderBottom: `1px solid ${t.border}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TriggerIcon size={16} style={{ color: t.accent }} />
                <span style={{
                  ...mono,
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  color: t.accent,
                  letterSpacing: '0.08em',
                }}>
                  COMMAND CENTER
                </span>
                <span
                  style={{
                    ...mono,
                    fontSize: '0.5rem',
                    color: t.muted,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    letterSpacing: '0.08em',
                    marginLeft: '8px',
                    paddingLeft: '6px',
                    paddingRight: '6px',
                    paddingTop: '2px',
                    paddingBottom: '2px',
                    borderRadius: '4px',
                  }}
                >
                  {allItems.length} TOOLS
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {searchable && !isMobile && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '8px', paddingRight: '8px', paddingTop: '4px', paddingBottom: '4px', borderRadius: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <Search size={10} style={{ color: t.muted }} />
                    <span style={{ ...mono, fontSize: '0.5rem', color: t.muted, letterSpacing: '0.06em' }}>/</span>
                  </div>
                )}
                {isMobile && (
                  <button
                    onClick={() => setMobileShowSidebar((p) => !p)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '6px',
                      width: '32px',
                      height: '32px',
                      background: `${t.accent}0d`,
                      border: `1px solid ${t.accent}20`,
                      color: t.accent,
                      cursor: 'pointer',
                    }}
                    aria-label="Toggle sidebar"
                  >
                    <ChevronRight size={14} style={{ transform: mobileShowSidebar ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }} />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                    width: '32px',
                    height: '32px',
                    background: `${t.accent}0d`,
                    border: `1px solid ${t.accent}20`,
                    color: t.accent,
                    cursor: 'pointer',
                  }}
                  aria-label="Close Command Center"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* --- Body: Sidebar + Content --- */}
            <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
              {/* --- Sidebar --- */}
              {(!isMobile || mobileShowSidebar) && (
                <div
                  ref={sidebarRef}
                  role="listbox"
                  aria-label="Command Center sections"
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    width: isMobile ? '180px' : '200px',
                    background: t.sidebarBg,
                    borderRight: `1px solid ${t.border}`,
                  }}
                >
                  {/* Sidebar header slot */}
                  {sidebarHeaderSlot}

                  {/* Search */}
                  {searchable && (
                    <div style={{ paddingLeft: '12px', paddingRight: '12px', paddingTop: '10px', paddingBottom: '10px', flexShrink: 0, borderBottom: `1px solid ${t.border}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '10px', paddingRight: '10px', paddingTop: '6px', paddingBottom: '6px', borderRadius: '6px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <Search size={12} style={{ color: t.muted, flexShrink: 0 }} />
                        <input
                          ref={searchRef}
                          value={searchQuery}
                          onChange={(e) => { setSearchQuery(e.target.value); setFocusedIndex(-1) }}
                          placeholder="Filter..."
                          style={{ ...mono, fontSize: '0.6875rem', color: t.text, caretColor: t.accent, flex: 1, background: 'transparent', outline: 'none' }}
                          spellCheck={false}
                          aria-label="Filter tools"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => { setSearchQuery(''); setFocusedIndex(-1) }}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.muted, fontSize: '0.75rem', lineHeight: 1 }}
                            aria-label="Clear search"
                          >
                            x
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Section list */}
                  <div
                    style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: `${t.accent}20 transparent` }}
                  >
                    {filteredSections.map((section, si) => {
                      const SectionIcon = section.icon
                      const isSectionActive = section.id === activeSection.id
                      return (
                        <div key={section.id} role="group" aria-label={section.label}>
                          {/* Section header */}
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              paddingLeft: '16px',
                              paddingRight: '16px',
                              paddingTop: '10px',
                              paddingBottom: '10px',
                              borderBottom: '1px solid rgba(255,255,255,0.03)',
                              ...(si === 0 ? { paddingTop: '12px' } : {}),
                            }}
                          >
                            <SectionIcon size={11} style={{ color: section.accent, opacity: isSectionActive ? 1 : 0.5 }} />
                            <span style={{
                              ...mono,
                              fontSize: '0.5625rem',
                              fontWeight: 700,
                              letterSpacing: '0.14em',
                              color: isSectionActive ? section.accent : t.muted,
                              transition: 'color 0.15s',
                            }}>
                              {section.label}
                            </span>
                          </div>

                          {/* Section items */}
                          {section.items.map((item) => {
                            const ItemIcon = item.icon
                            const isActive = item.id === activeItemId
                            const isHovered = item.id === hoveredItemId
                            const flatIdx = filteredItemsIndexMap.get(item.id) ?? -1
                            const isFocused = flatIdx === focusedIndex
                            return (
                              <button
                                key={item.id}
                                role="option"
                                aria-selected={isActive}
                                onClick={() => {
                                  if (item.disabled) return
                                  setActiveItemId(item.id)
                                  trackRecent(item.id)
                                  if (isMobile) setMobileShowSidebar(false)
                                }}
                                onMouseEnter={() => setHoveredItemId(item.id)}
                                onMouseLeave={() => setHoveredItemId(null)}
                                style={{
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '10px',
                                  paddingLeft: '16px',
                                  paddingRight: '16px',
                                  paddingTop: '8px',
                                  paddingBottom: '8px',
                                  textAlign: 'left',
                                  transition: 'all 0.15s',
                                  background: isActive
                                    ? `${section.accent}12`
                                    : isFocused
                                    ? `${section.accent}08`
                                    : isHovered
                                    ? 'rgba(255,255,255,0.025)'
                                    : 'transparent',
                                  borderLeft: isActive
                                    ? `2px solid ${section.accent}`
                                    : isFocused
                                    ? `2px solid ${section.accent}50`
                                    : '2px solid transparent',
                                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                                  opacity: item.disabled ? 0.4 : 1,
                                }}
                              >
                                <ItemIcon
                                  size={13}
                                  style={{ color: isActive ? section.accent : t.muted, transition: 'color 0.15s', flexShrink: 0 }}
                                />
                                <span style={{
                                  ...mono,
                                  fontSize: '0.6875rem',
                                  fontWeight: isActive ? 600 : 400,
                                  letterSpacing: '0.03em',
                                  color: isActive ? section.accent : (isHovered || isFocused ? t.text : '#8b8b9e'),
                                  transition: 'color 0.15s',
                                  flex: 1,
                                  minWidth: 0,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}>
                                  {item.label}
                                </span>
                                {/* Recently used indicator (R6 fix: Set lookup) */}
                                {!isActive && recentItemsSet.has(item.id) && !item.isFavorite && (
                                  <Clock
                                    size={9}
                                    style={{ color: t.muted, opacity: 0.5, flexShrink: 0 }}
                                  />
                                )}
                                {/* Favorite indicator */}
                                {item.isFavorite && (
                                  <Star
                                    size={9}
                                    style={{ color: '#f9e2af', fill: '#f9e2af', flexShrink: 0, opacity: isActive ? 1 : 0.6 }}
                                  />
                                )}
                                {/* Badge */}
                                {item.badge !== undefined && item.badge > 0 && (
                                  <span
                                    style={{
                                      ...mono,
                                      fontSize: '0.4375rem',
                                      fontWeight: 700,
                                      color: t.bg,
                                      background: section.accent,
                                      minWidth: '16px',
                                      height: '16px',
                                      padding: '0 4px',
                                      flexShrink: 0,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: '9999px',
                                    }}
                                  >
                                    {item.badge > 99 ? '99+' : item.badge}
                                  </span>
                                )}
                                {/* Shortcut hint */}
                                {showShortcuts && item.shortcut && !isActive && (
                                  <span
                                    style={{
                                      ...mono,
                                      fontSize: '0.5rem',
                                      fontWeight: 600,
                                      color: t.muted,
                                      background: 'rgba(255,255,255,0.04)',
                                      border: '1px solid rgba(255,255,255,0.06)',
                                      borderRadius: '2px',
                                      padding: '0 4px',
                                      lineHeight: '1.6',
                                      flexShrink: 0,
                                    }}
                                  >
                                    {item.shortcut}
                                  </span>
                                )}
                                {isActive && (
                                  <ChevronRight size={10} style={{ color: section.accent, marginLeft: 'auto', opacity: 0.6, flexShrink: 0 }} />
                                )}
                              </button>
                            )
                          })}
                        </div>
                      )
                    })}

                    {filteredSections.length === 0 && (
                      <div style={{ ...mono, fontSize: '0.6875rem', color: t.muted, paddingLeft: '16px', paddingRight: '16px', paddingTop: '32px', paddingBottom: '32px', textAlign: 'center' }}>
                        No matching tools
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* --- Content Area --- */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                {/* Content breadcrumb */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    flexShrink: 0,
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <span
                    style={{
                      ...mono,
                      fontSize: '0.5rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: activeSection.accent,
                      background: `${activeSection.accent}12`,
                      border: `1px solid ${activeSection.accent}20`,
                      borderRadius: '3px',
                      padding: '1px 6px',
                    }}
                  >
                    {activeSection.label}
                  </span>
                  <ChevronRight size={8} style={{ color: t.muted }} />
                  <span style={{
                    ...mono,
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    color: t.text,
                    letterSpacing: '0.03em',
                  }}>
                    {activeItem.label}
                  </span>
                </div>

                {/* Content body -- with transition */}
                <div
                  key={contentTransitionKey}
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    animation: 'ccContentFade 0.25s ease-out',
                    scrollbarWidth: 'thin',
                    scrollbarColor: `${t.accent}20 transparent`,
                  }}
                >
                  {activeItem.content}
                </div>
              </div>
            </div>

            {/* --- Footer --- */}
            {showFooter && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  flexShrink: 0,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ ...mono, fontSize: '0.5rem', letterSpacing: '0.1em', color: '#3b3f54' }}>
                    ESC to close
                  </span>
                  <span style={{ color: '#2a2d3e', fontSize: '0.375rem' }}>|</span>
                  <span style={{ ...mono, fontSize: '0.5rem', letterSpacing: '0.1em', color: '#3b3f54' }}>
                    Click outside to dismiss
                  </span>
                  {searchable && (
                    <>
                      <span style={{ color: '#2a2d3e', fontSize: '0.375rem' }}>|</span>
                      <span style={{ ...mono, fontSize: '0.5rem', letterSpacing: '0.1em', color: '#3b3f54' }}>
                        / to search
                      </span>
                    </>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {sections.map((section) => {
                    const SectionIcon = section.icon
                    const isActive = section.id === activeSection.id
                    return (
                      <div
                        key={section.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '4px',
                          width: '18px',
                          height: '18px',
                          background: isActive ? `${section.accent}15` : 'rgba(255,255,255,0.03)',
                          border: isActive ? `1px solid ${section.accent}30` : '1px solid rgba(255,255,255,0.04)',
                          transition: 'all 0.15s',
                        }}
                      >
                        <SectionIcon size={8} style={{ color: isActive ? section.accent : '#3b3f54' }} />
                      </div>
                    )
                  })}
                </div>
                {footerSlot}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
