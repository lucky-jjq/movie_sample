import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  addToWatchlist, 
  removeFromWatchlist, 
  loadWatchlist,
  selectWatchlist,
  selectWatchlistCount,
  WatchlistItem 
} from '@/store/watchlistSlice';
import { watchlistStorage } from '@/services/watchlistStorage';

export const useWatchlist = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector(selectWatchlist);
  const count = useSelector(selectWatchlistCount);

  useEffect(() => {
    const storedWatchlist = watchlistStorage.load();
    dispatch(loadWatchlist(storedWatchlist));
  }, [dispatch]);

  useEffect(() => {
    watchlistStorage.save(watchlist);
  }, [watchlist]);

  const addItem = (item: Omit<WatchlistItem, 'dateAdded'>) => {
    dispatch(addToWatchlist(item));
  };

  const removeItem = (id: number, type: 'movie' | 'tv') => {
    dispatch(removeFromWatchlist({ id, type }));
  };

  const toggleWatchlist = (item: Omit<WatchlistItem, 'dateAdded'>) => {
    const inWatchlist = watchlist.some(w => w.id === item.id && w.type === item.type);
    if (inWatchlist) {
      removeItem(item.id, item.type);
    } else {
      addItem(item);
    }
  };

  return {
    watchlist,
    count,
    addItem,
    removeItem,
    toggleWatchlist
  };
};