export const theme = {
  colors: {
    primary: '#FFD700', // Gold
    secondary: '#DC2626', // Deep Red
    accent: '#3B82F6', // Electric Blue
    background: '#0A0A0B',
    surface: '#1A1A1B',
    surfaceLight: '#2A2A2B',
    text: '#FFFFFF',
    textSecondary: '#A1A1AA',
    textMuted: '#71717A',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    border: '#27272A',
    glass: 'rgba(255, 255, 255, 0.1)',
    glassStrong: 'rgba(255, 255, 255, 0.15)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  shadows: {
    sm: {
      boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
      elevation: 2,
    },
    md: {
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
      elevation: 4,
    },
    lg: {
      boxShadow: '0 8px 16px rgba(0,0,0,0.35)',
      elevation: 8,
    },
  },
};