import { WatchlistItem } from '@/store/watchlistSlice';

const STORAGE_KEY = 'tmovies_watchlist';

export const watchlistStorage = {
  load: (): WatchlistItem[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Failed to load watchlist from localStorage:', error);
      return [];
    }
  },

  save: (items: WatchlistItem[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save watchlist to localStorage:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear watchlist from localStorage:', error);
    }
  }
};