/**
 * TOKENS LAYER
 * Colors, spacing, typography - no React, no logic
 * 
 * Golden Ratio (phi ≈ 1.618) and Fibonacci scale
 * Part of anti-monolith architecture
 */

// ============================================
// FIBONACCI SPACING SCALE
// ============================================
export const fib = {
  0: 0,
  1: 8,       // 8px
  2: 16,      // 16px
  3: 24,      // 24px = 1.5rem
  5: 40,      // 40px = 2.5rem
  8: 64,      // 64px = 4rem
  13: 104,    // 104px = 6.5rem
  21: 168,    // 168px = 10.5rem
  34: 272,    // 272px = 17rem
} as const;

// Rem values for CSS
export const fibRem = {
  3: '1.5rem',
  5: '2.5rem',
  8: '4rem',
  13: '6.5rem',
} as const;

// ============================================
// GOLDEN RATIO
// ============================================
export const phi = 1.618;
export const phiInverse = 0.618;

// Grid proportions (fr values)
export const gridProportions = {
  // Dashboard Golden (Pattern 12) - RECOMMENDED for documentation
  dashboard: {
    columns: '3fr 5fr 2fr' as const,
    rows: 'auto 1fr 1.618fr' as const,
  },
  // Zeitgeist (Pattern 15)
  zeitgeist: {
    columns: '1fr 1.618fr 1fr' as const,
  },
  // Golden Split (Pattern 01)
  goldenSplit: {
    columns: '1fr 1.618fr' as const,
  },
} as const;

// ============================================
// TYPOGRAPHY SCALE (Fibonacci-based)
// ============================================
export const fontSize = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
  '6xl': '3.75rem',   // 60px
  '7xl': '4.5rem',    // 72px
} as const;

// ============================================
// COLOR PALETTE (NYC Theme)
// ============================================
export const colors = {
  // Primary accent
  taxi: '#f9a825',
  amber: '#ffb300',
  
  // Dark theme
  dark: {
    bg: '#0a0a0a',
    surface: '#141414',
    border: '#262626',
    muted: '#525252',
    text: '#fafafa',
    textMuted: '#a3a3a3',
  },
  
  // Light theme
  light: {
    bg: '#fafafa',
    surface: '#ffffff',
    border: '#e5e5e5',
    muted: '#a3a3a3',
    text: '#0a0a0a',
    textMuted: '#525252',
  },
  
  // Semantic
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

// ============================================
// ANIMATION TIMING (Fibonacci-based)
// ============================================
export const duration = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 800,
  dramatic: 1300,
} as const;

// ============================================
// BREAKPOINTS
// ============================================
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
} as const;

// ============================================
// LAYOUT CONSTANTS
// ============================================
export const layout = {
  sidebarWidth: '3.5rem',      // 56px - icon sidebar
  tocWidth: '16rem',           // 256px - table of contents
  headerHeight: '3.5rem',      // 56px - mobile header
  maxWidth: '90rem',           // 1440px - max content width
} as const;
