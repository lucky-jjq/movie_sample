import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WatchlistItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  dateAdded: number;
  type: 'movie' | 'tv';
}

interface WatchlistState {
  items: WatchlistItem[];
}

const initialState: WatchlistState = {
  items: []
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addToWatchlist: (state, action: PayloadAction<Omit<WatchlistItem, 'dateAdded'>>) => {
      const item = { ...action.payload, dateAdded: Date.now() };
      const exists = state.items.some(existingItem => 
        existingItem.id === item.id && existingItem.type === item.type
      );
      if (!exists) {
        state.items.push(item);
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<{ id: number; type: 'movie' | 'tv' }>) => {
      state.items = state.items.filter(item => 
        !(item.id === action.payload.id && item.type === action.payload.type)
      );
    },
    loadWatchlist: (state, action: PayloadAction<WatchlistItem[]>) => {
      state.items = action.payload;
    },
    clearWatchlist: (state) => {
      state.items = [];
    }
  }
});

export const { addToWatchlist, removeFromWatchlist, loadWatchlist, clearWatchlist } = watchlistSlice.actions;

export const selectWatchlist = (state: { watchlist: WatchlistState }) => state.watchlist.items;
export const selectIsInWatchlist = (id: number, type: 'movie' | 'tv') => 
  (state: { watchlist: WatchlistState }) => 
    state.watchlist.items.some(item => item.id === id && item.type === type);
export const selectWatchlistCount = (state: { watchlist: WatchlistState }) => state.watchlist.items.length;

export default watchlistSlice.reducer;