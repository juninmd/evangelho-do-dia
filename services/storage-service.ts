import AsyncStorage from '@react-native-async-storage/async-storage';
import { FavoriteItem, FontSizeLevel } from '../types/gospel';

const STORAGE_KEYS = {
  THEME_MODE: '@evangelho:theme_mode',
  FONT_SIZE: '@evangelho:font_size',
  FAVORITES: '@evangelho:favorites',
  RESOLUTION_PREFIX: '@evangelho:resolution:',
};

export interface ToggleResult {
  isFavorite: boolean;
  favorites: FavoriteItem[];
  /** false when the new list could not be persisted; `favorites` is then the unchanged list. */
  ok: boolean;
}

let favoritesQueue: Promise<unknown> = Promise.resolve();

async function toggleFavoriteNow(item: FavoriteItem): Promise<ToggleResult> {
  const current = await StorageService.getFavorites();
  const exists = current.some((f) => f.id === item.id || f.reference === item.reference);
  const updated = exists
    ? current.filter((f) => f.id !== item.id && f.reference !== item.reference)
    : [item, ...current];

  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return { isFavorite: !exists, favorites: updated, ok: true };
  } catch (e) {
    console.warn('Erro ao salvar favoritos:', e);
    // Keep what the user already had instead of reporting an empty list.
    return { isFavorite: exists, favorites: current, ok: false };
  }
}

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
      const parsed: unknown = JSON.parse(data);
      // Corrupted or hand-edited storage must not break callers that expect an array of items.
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (f): f is FavoriteItem => !!f && typeof f === 'object' && typeof (f as FavoriteItem).id === 'string'
      );
    } catch {
      return [];
    }
  },

  // Serializes read-modify-write so two quick taps cannot overwrite each other's change.
  toggleFavorite(item: FavoriteItem): Promise<ToggleResult> {
    const run = favoritesQueue.then(() => toggleFavoriteNow(item));
    favoritesQueue = run.catch(() => undefined);
    return run;
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
