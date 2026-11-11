/**
 * Coral Trust Mobile Design System Tokens
 * Confident. Warm. Reassuring.
 */

export const PALETTE = {
  primary: '#FF6A55',
  primaryPressed: '#FA5B45',
  onPrimary: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceAlt: '#FAF9F6',
  surfaceContrast: '#1A2138',
  onSurface: '#1A2138',
  onSurfaceVariant: '#6A6F7E',
  onSurfaceMuted: '#A0A4B0',
  border: '#F0EFEA',
  warning: '#F5A623',
  illusCoralBg: '#FFF0EE',
  illusWarmYellow: '#F5C842',
  illusWarmOrange: '#E89A4A',
  illusNeutralCream: '#E8DFD3',
  illusCoolBlue: '#1E3A5F',
} as const;

export const TYPOGRAPHY = {
  displayMd: {
    fontSize: 32,
    fontWeight: '800' as const,
    lineHeight: 38,
    letterSpacing: -0.64,
    color: PALETTE.onSurface,
  },
  headlineLg: {
    fontSize: 20,
    fontWeight: '800' as const,
    lineHeight: 26,
    letterSpacing: -0.4,
    color: PALETTE.onSurface,
  },
  headlineMd: {
    fontSize: 18,
    fontWeight: '800' as const,
    lineHeight: 24,
    letterSpacing: -0.18,
    color: PALETTE.onSurface,
  },
  headlineSm: {
    fontSize: 16,
    fontWeight: '700' as const,
    lineHeight: 22,
    letterSpacing: -0.16,
    color: PALETTE.onSurface,
  },
  bodyMd: {
    fontSize: 14,
    fontWeight: '500' as const,
    lineHeight: 20,
    letterSpacing: 0,
    color: PALETTE.onSurface,
  },
  bodySm: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
    letterSpacing: 0,
    color: PALETTE.onSurfaceVariant,
  },
  labelMd: {
    fontSize: 14,
    fontWeight: '700' as const,
    lineHeight: 18,
    letterSpacing: -0.07,
    color: PALETTE.onSurface,
  },
  labelSm: {
    fontSize: 12,
    fontWeight: '700' as const,
    lineHeight: 16,
    letterSpacing: 0,
    color: PALETTE.onSurface,
  },
  labelUppercase: {
    fontSize: 11,
    fontWeight: '600' as const,
    lineHeight: 14,
    letterSpacing: 0.88,
    textTransform: 'uppercase' as const,
    color: PALETTE.onSurfaceVariant,
  },
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0,
    color: PALETTE.onSurfaceMuted,
  },
} as const;

export const RADII = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  gutter: 24,
  cardPadding: 16,
  sectionGap: 24,
} as const;

export const SHADOWS = {
  softCard: {
    shadowColor: '#1A2138',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  btn: {
    shadowColor: '#FF6A55',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.38,
    shadowRadius: 14,
    elevation: 5,
  },
  floatingNav: {
    shadowColor: '#1A2138',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.35,
    shadowRadius: 24,
    elevation: 10,
  },
} as const;

