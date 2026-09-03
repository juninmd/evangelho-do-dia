import { LiturgicalColor } from '../types/gospel';

export interface ThemeColors {
  isDark: boolean;
  background: string;
  backgroundElevated: string;
  surface: string;
  surfaceVariant: string;
  surfaceElevated: string;
  surfaceBorder: string;
  surfaceGlow: string;
  
  primary: string;
  primaryLight: string;
  primaryDark: string;
  
  gold: string;
  goldLight: string;
  goldDark: string;
  goldGradient: [string, string, string];
  cardGradient: [string, string];
  
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textGold: string;
  
  accentSoft: string;
  quoteBackground: string;
  quoteBorder: string;
  
  success: string;
  error: string;
  errorBackground: string;
  
  liturgical: Record<LiturgicalColor, {
    primary: string;
    background: string;
    border: string;
    text: string;
    glow: string;
  }>;
}

export const lightTheme: ThemeColors = {
  isDark: false,
  background: '#F9F6F0', // Pergaminho nobre suave
  backgroundElevated: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceVariant: '#F3EFE6',
  surfaceElevated: '#FFFFFF',
  surfaceBorder: '#E8DFD0',
  surfaceGlow: 'rgba(212, 175, 55, 0.15)',

  primary: '#7E181E', // Vinho Sacro Cardeal
  primaryLight: '#A32930',
  primaryDark: '#540F13',

  gold: '#B8860B', // Ouro divino
  goldLight: '#F5E6BE',
  goldDark: '#8C6504',
  goldGradient: ['#E6C268', '#C59A27', '#996F12'],
  cardGradient: ['#FFFFFF', '#FAF7F2'],

  textPrimary: '#1E1916',
  textSecondary: '#5C544E',
  textMuted: '#938981',
  textGold: '#946B12',

  accentSoft: '#F6EFE2',
  quoteBackground: '#F7F3EB',
  quoteBorder: '#D9C8A9',

  success: '#2E7D32',
  error: '#C62828',
  errorBackground: '#FDEDEC',

  liturgical: {
    verde: {
      primary: '#1E7E48',
      background: '#E8F5ED',
      border: '#A3D9B8',
      text: '#11532E',
      glow: 'rgba(30, 126, 72, 0.2)',
    },
    branco: {
      primary: '#9E7418',
      background: '#FCF8ED',
      border: '#E8D49E',
      text: '#6A4D0B',
      glow: 'rgba(212, 175, 55, 0.2)',
    },
    roxo: {
      primary: '#6B2D82',
      background: '#F5EBF8',
      border: '#D0A8DE',
      text: '#4A185C',
      glow: 'rgba(107, 45, 130, 0.2)',
    },
    vermelho: {
      primary: '#AC1F24',
      background: '#FCECEC',
      border: '#EBA5A8',
      text: '#740E12',
      glow: 'rgba(172, 31, 36, 0.2)',
    },
    rosa: {
      primary: '#B83280',
      background: '#FDF0F7',
      border: '#F3B1D8',
      text: '#7A1C53',
      glow: 'rgba(184, 50, 128, 0.2)',
    },
  },
};

export const darkTheme: ThemeColors = {
  isDark: true,
  background: '#0B0F17', // Noite Celestial Profunda
  backgroundElevated: '#121722',
  surface: '#131924',
  surfaceVariant: '#1A2230',
  surfaceElevated: '#20293A',
  surfaceBorder: '#273244',
  surfaceGlow: 'rgba(240, 198, 92, 0.2)',

  primary: '#F0C65C', // Ouro Luminoso Cósmico
  primaryLight: '#FDE49E',
  primaryDark: '#B8860B',

  gold: '#E5C07B',
  goldLight: '#FFF2CE',
  goldDark: '#C99E47',
  goldGradient: ['#F7D788', '#DEAE43', '#A87A18'],
  cardGradient: ['#171F2C', '#111722'],

  textPrimary: '#F6F4F0',
  textSecondary: '#BCB5A8',
  textMuted: '#7F786C',
  textGold: '#F3CF7A',

  accentSoft: '#231F17',
  quoteBackground: '#171E2B',
  quoteBorder: '#3D382B',

  success: '#4CAF50',
  error: '#EF5350',
  errorBackground: '#2C1517',

  liturgical: {
    verde: {
      primary: '#48BB78',
      background: '#102A1C',
      border: '#1E5836',
      text: '#9AE6B4',
      glow: 'rgba(72, 187, 120, 0.25)',
    },
    branco: {
      primary: '#F6E05E',
      background: '#2D2714',
      border: '#685923',
      text: '#FAF089',
      glow: 'rgba(246, 224, 94, 0.25)',
    },
    roxo: {
      primary: '#B794F4',
      background: '#2B1A38',
      border: '#573374',
      text: '#E9D8FD',
      glow: 'rgba(183, 148, 244, 0.25)',
    },
    vermelho: {
      primary: '#FC8181',
      background: '#341517',
      border: '#72262B',
      text: '#FED7D7',
      glow: 'rgba(252, 129, 129, 0.25)',
    },
    rosa: {
      primary: '#F687B3',
      background: '#331725',
      border: '#702449',
      text: '#FED7E2',
      glow: 'rgba(246, 135, 179, 0.25)',
    },
  },
};
