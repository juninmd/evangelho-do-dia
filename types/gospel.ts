export type LiturgicalColor = 'verde' | 'branco' | 'roxo' | 'vermelho' | 'rosa';

export interface Gospel {
  id: string;
  date: string; // YYYY-MM-DD
  formattedDate: string; // "Quinta-feira, 3 de Setembro de 2026"
  liturgicalSeason: string; // "22ª Semana do Tempo Comum"
  liturgicalColor: LiturgicalColor;
  liturgicalColorLabel: string; // "Tempo Comum - Esperança"
  cycle: string; // "Ano Par / Ano B"
  title: string;
  reference: string;
  keyVerse: string;
  text: string;
  reflection: string;
  prayer: string;
  dailyResolution: string;
  source: string;
  readingTimeMinutes: number;
}

export interface FavoriteItem {
  id: string;
  date: string;
  formattedDate: string;
  title: string;
  reference: string;
  keyVerse: string;
  snippet: string;
  savedAt: string;
}

export type TabType = 'gospel' | 'reflection' | 'prayer' | 'favorites';

export type FontSizeLevel = 'small' | 'medium' | 'large' | 'xlarge';
