import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteItem, FontSizeLevel } from '../types/gospel';

const STORAGE_KEYS = {
  THEME_MODE: '@evangelho:theme_mode',
  FONT_SIZE: '@evangelho:font_size',
  FAVORITES: '@evangelho:favorites',
  RESOLUTION_PREFIX: '@evangelho:resolution:',
};

export const StorageService = {
  async getThemeMode(): Promise<'dark' | 'light' | null> {
    try {
      const mode = await AsyncStorage.getItem(STORAGE_KEYS.THEME_MODE);
      return mode === 'dark' || mode === 'light' ? mode : null;
    } catch {
      return null;
    }
  },

  async setThemeMode(mode: 'dark' | 'light'): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
    } catch (e) {
      console.warn('Erro ao salvar tema:', e);
    }
  },

  async getFontSize(): Promise<FontSizeLevel> {
    try {
      const size = await AsyncStorage.getItem(STORAGE_KEYS.FONT_SIZE);
      if (size && ['small', 'medium', 'large', 'xlarge'].includes(size)) {
        return size as FontSizeLevel;
      }
      return 'medium';
    } catch {
      return 'medium';
    }
  },

  async setFontSize(size: FontSizeLevel): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FONT_SIZE, size);
    } catch (e) {
      console.warn('Erro ao salvar tamanho da fonte:', e);
    }
  },

  async getFavorites(): Promise<FavoriteItem[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (!data) return [];
      return JSON.parse(data) as FavoriteItem[];
    } catch {
      return [];
    }
  },

  async toggleFavorite(item: FavoriteItem): Promise<{ isFavorite: boolean; favorites: FavoriteItem[] }> {
    try {
      const current = await StorageService.getFavorites();
      const exists = current.some((f) => f.id === item.id || f.reference === item.reference);
      let updated: FavoriteItem[];

      if (exists) {
        updated = current.filter((f) => f.id !== item.id && f.reference !== item.reference);
      } else {
        updated = [item, ...current];
      }

      await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
      return { isFavorite: !exists, favorites: updated };
    } catch {
      return { isFavorite: false, favorites: [] };
    }
  },

  async isResolutionDone(date: string): Promise<boolean> {
    try {
      const val = await AsyncStorage.getItem(`${STORAGE_KEYS.RESOLUTION_PREFIX}${date}`);
      return val === 'true';
    } catch {
      return false;
    }
  },

  async setResolutionDone(date: string, done: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(`${STORAGE_KEYS.RESOLUTION_PREFIX}${date}`, done ? 'true' : 'false');
    } catch (e) {
      console.warn('Erro ao salvar resolução:', e);
    }
  },
};
