export const theme = {
  colors: {
    background: '#f8f7f4',
    surface: '#ffffff',
    text: '#1a1a1a',
    textMuted: '#5c5c5c',
    primary: '#2d6a4f',
    primaryHover: '#1b4332',
    border: '#e2e0da',
    accent: '#40916c',
    danger: '#c1121f',
    selected: '#d8f3dc',
  },
  shadows: {
    card: '0 2px 12px rgba(0, 0, 0, 0.08)',
    bar: '0 -2px 16px rgba(0, 0, 0, 0.1)',
  },
  radius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
  },
  spacing: {
    page: '1.25rem',
    section: '2rem',
  },
} as const;

export type AppTheme = typeof theme;
