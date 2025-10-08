/**
 * MindMentor AI Design System
 * 
 * Comprehensive design tokens, components, and utilities for consistent
 * professional UI across the entire application.
 */

// =============================================================================
// DESIGN TOKENS
// =============================================================================

/**
 * Color System
 * Professional color palette with semantic naming
 */
export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6', // Main primary
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Secondary Colors
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87',
  },
  
  // Success Colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  
  // Warning Colors
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },
  
  // Error Colors
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  
  // Neutral Colors
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  
  // Glass Morphism Colors
  glass: {
    white: 'rgba(255, 255, 255, 0.7)',
    light: 'rgba(255, 255, 255, 0.1)',
    dark: 'rgba(0, 0, 0, 0.1)',
    primary: 'rgba(59, 130, 246, 0.1)',
    secondary: 'rgba(168, 85, 247, 0.1)',
  }
} as const

/**
 * Typography System
 * Consistent typography scale and weights
 */
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },
  
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const

/**
 * Spacing System
 * Consistent spacing scale based on 0.25rem (4px) units
 */
export const spacing = {
  0: '0px',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
} as const

/**
 * Shadow System
 * Professional shadow hierarchy for depth and elevation
 */
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: '0 0 #0000',
  
  // Glass morphism shadows
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  glassHover: '0 8px 32px 0 rgba(31, 38, 135, 0.5)',
} as const

/**
 * Border Radius System
 * Consistent rounded corners
 */
export const borderRadius = {
  none: '0px',
  sm: '0.125rem',  // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
} as const

/**
 * Animation System
 * Consistent timing and easing functions
 */
export const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
  },
  
  easing: {
    linear: 'linear',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const

// =============================================================================
// COMPONENT VARIANTS
// =============================================================================

/**
 * Button Variants
 * Professional button styles and states
 */
export const buttonVariants = {
  primary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
  secondary: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
  success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
  warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
  error: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
  outline: 'border-2 border-gray-300 hover:border-gray-400 bg-transparent hover:bg-gray-50 text-gray-700 transition-all duration-300',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 transition-all duration-300',
  glass: 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white transition-all duration-300',
} as const

/**
 * Card Variants
 * Professional card styles for different contexts
 */
export const cardVariants = {
  default: 'bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300',
  elevated: 'bg-white shadow-lg hover:shadow-xl transition-shadow duration-300',
  glass: 'bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl',
  gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-lg',
  interactive: 'bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer',
} as const

/**
 * Input Variants
 * Professional form input styles
 */
export const inputVariants = {
  default: 'border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200',
  glass: 'bg-white/80 backdrop-blur-sm border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200',
  error: 'border border-red-300 bg-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-200',
} as const

// =============================================================================
// UTILITY CLASSES
// =============================================================================

/**
 * Glass Morphism Utilities
 * Ready-to-use glass effect classes
 */
export const glassEffects = {
  light: 'bg-white/70 backdrop-blur-xl border border-white/20',
  medium: 'bg-white/50 backdrop-blur-lg border border-white/30',
  dark: 'bg-black/10 backdrop-blur-sm border border-white/10',
  colored: 'bg-blue-500/10 backdrop-blur-lg border border-blue-500/20',
} as const

/**
 * Gradient Utilities
 * Professional gradient combinations
 */
export const gradients = {
  primary: 'bg-gradient-to-r from-blue-500 to-blue-600',
  secondary: 'bg-gradient-to-r from-purple-500 to-purple-600',
  success: 'bg-gradient-to-r from-green-500 to-green-600',
  warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
  error: 'bg-gradient-to-r from-red-500 to-red-600',
  hero: 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700',
  subtle: 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50',
} as const

/**
 * Text Utilities
 * Professional text styling combinations
 */
export const textStyles = {
  heading1: 'text-4xl md:text-5xl font-bold tracking-tight text-gray-900',
  heading2: 'text-3xl md:text-4xl font-bold tracking-tight text-gray-900',
  heading3: 'text-2xl md:text-3xl font-semibold text-gray-900',
  heading4: 'text-xl md:text-2xl font-semibold text-gray-900',
  subtitle: 'text-lg text-gray-600 leading-relaxed',
  body: 'text-base text-gray-700 leading-relaxed',
  caption: 'text-sm text-gray-500',
  overline: 'text-xs font-semibold uppercase tracking-wider text-gray-500',
} as const

// =============================================================================
// BREAKPOINTS
// =============================================================================

/**
 * Responsive Breakpoints
 * Mobile-first responsive design breakpoints
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// =============================================================================
// COMPONENT SPECIFICATIONS
// =============================================================================

/**
 * Component Height Standards
 * Consistent component sizing
 */
export const componentSizes = {
  button: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
    xl: 'h-14 px-8 text-lg',
  },
  
  input: {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-3 text-sm',
    lg: 'h-12 px-4 text-base',
    xl: 'h-14 px-4 text-lg',
  },
  
  avatar: {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
    '2xl': 'h-20 w-20',
  },
} as const

/**
 * Layout Standards
 * Consistent spacing and layout patterns
 */
export const layouts = {
  container: {
    sm: 'max-w-2xl mx-auto px-4',
    md: 'max-w-4xl mx-auto px-6',
    lg: 'max-w-6xl mx-auto px-8',
    xl: 'max-w-7xl mx-auto px-8',
    full: 'w-full px-4 sm:px-6 lg:px-8',
  },
  
  section: {
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-16 md:py-20',
    xl: 'py-20 md:py-24',
  },
  
  grid: {
    cols1: 'grid grid-cols-1',
    cols2: 'grid grid-cols-1 md:grid-cols-2',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    responsive: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  },
} as const

// =============================================================================
// DESIGN SYSTEM USAGE GUIDE
// =============================================================================

/**
 * Usage Examples and Best Practices
 * 
 * Colors:
 * - Use primary colors for main actions and branding
 * - Use secondary colors for supporting actions
 * - Use neutral grays for backgrounds and text
 * - Use semantic colors (success, warning, error) for status
 * 
 * Typography:
 * - Use consistent font sizes from the scale
 * - Maintain proper line height ratios
 * - Use appropriate font weights for hierarchy
 * 
 * Spacing:
 * - Use consistent spacing units (4px base)
 * - Follow the spacing scale for margins and padding
 * - Maintain consistent rhythm between elements
 * 
 * Shadows:
 * - Use subtle shadows for cards and modals
 * - Use glass shadows for glass morphism effects
 * - Avoid excessive shadow depth
 * 
 * Animations:
 * - Use consistent timing and easing functions
 * - Keep animations subtle and purposeful
 * - Provide reduced motion alternatives
 * 
 * Components:
 * - Use variant classes for consistent styling
 * - Combine utilities for custom designs
 * - Maintain accessibility standards
 */

export default {
  colors,
  typography,
  spacing,
  shadows,
  borderRadius,
  animation,
  buttonVariants,
  cardVariants,
  inputVariants,
  glassEffects,
  gradients,
  textStyles,
  breakpoints,
  componentSizes,
  layouts,
}