/* -----------------------------------------------------------------------
   @zai/token-command-center -- Types
   
   All public types for the CommandCenter component.
   Zero business logic, zero data -- pure structure.
   ----------------------------------------------------------------------- */

import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

/* --- Item in a section sidebar --- */
export interface ItemConfig {
  /** Unique id across all sections */
  id: string
  /** Display label */
  label: string
  /** Lucide icon component */
  icon: LucideIcon
  /** Content to render when this item is active */
  content: ReactNode
  /** Optional badge count (e.g. "3 new items") */
  badge?: number
  /** Optional keyboard shortcut hint displayed in sidebar */
  shortcut?: string
  /** Optional: disable this item */
  disabled?: boolean
  /** Optional: mark as user favorite (shows star indicator) */
  isFavorite?: boolean
  /** Optional: last used timestamp (for recently-used indicator) */
  lastUsed?: number
}

/* --- Section in the sidebar --- */
export interface SectionConfig {
  /** Unique section id */
  id: string
  /** Display label (shown as section header in sidebar) */
  label: string
  /** Lucide icon for section header */
  icon: LucideIcon
  /** Accent color for this section (active states, borders, highlights) */
  accent: string
  /** Items within this section */
  items: ItemConfig[]
}

/* --- Theme configuration --- */
export interface CommandCenterTheme {
  /** Panel background (default: #0c0c14) */
  bg?: string
  /** Sidebar background (default: rgba(255,255,255,0.015)) */
  sidebarBg?: string
  /** Default text color (default: #c3cee3) */
  text?: string
  /** Muted text color (default: #565575) */
  muted?: string
  /** Default accent when no section is active (default: #c792ea) */
  accent?: string
  /** Border color (default: rgba(199,146,234,0.15)) */
  border?: string
  /** Font family (default: Geist Mono) */
  font?: string
  /** Overlay background (default: rgba(0,0,0,0.65)) */
  overlayBg?: string
}

/* --- Animation variant --- */
export type AnimationVariant = 'slide-up' | 'slide-right' | 'fade-scale' | 'none'

/* --- Trigger button config --- */
export interface TriggerConfig {
  /** Lucide icon for the floating button (default: Terminal) */
  icon?: LucideIcon
  /** Button position (default: bottom-right) */
  position?: 'left' | 'center' | 'right'
  /** Button size in px (default: 48) */
  size?: number
  /** Button accent color (default: theme.accent) */
  accent?: string
  /** Custom aria-label */
  ariaLabel?: string
}

/* --- CommandCenter Props --- */
export interface CommandCenterProps {
  /** Sections with items to display in the sidebar */
  sections: SectionConfig[]
  
  /** ---- State ---- */
  /** Default active item id (first item if omitted) */
  defaultItemId?: string
  /** Increment to externally trigger open */
  triggerOpen?: number
  /** Item id to activate when triggerOpen fires */
  openTab?: string
  /** Controlled open state (if provided, component becomes controlled) */
  isOpen?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  
  /** ---- Theme ---- */
  /** Theme overrides (all optional, sensible defaults) */
  theme?: CommandCenterTheme
  
  /** ---- Animation ---- */
  /** Panel entrance animation (default: slide-up) */
  animation?: AnimationVariant
  
  /** ---- Trigger Button ---- */
  /** Floating trigger button configuration */
  trigger?: TriggerConfig
  /** Hide the default floating trigger button (use your own) */
  hideTrigger?: boolean
  
  /** ---- Features ---- */
  /** Show search bar to filter across all items (default: true) */
  searchable?: boolean
  /** Show keyboard shortcut hints in sidebar (default: true) */
  showShortcuts?: boolean
  /** Persist last active item to localStorage (default: false) */
  persistState?: string
  /** Max width of the panel (default: 1024px) */
  maxWidth?: string
  /** Show footer with ESC hint (default: true) */
  showFooter?: boolean
  
  /** ---- Slots ---- */
  /** Custom content rendered in the footer area */
  footerSlot?: ReactNode
  /** Custom content rendered above the sidebar */
  sidebarHeaderSlot?: ReactNode
}
