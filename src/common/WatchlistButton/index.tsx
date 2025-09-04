import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useWatchlist } from '@/hooks/useWatchlist';
import { selectIsInWatchlist } from '@/store/watchlistSlice';
import { RootState } from '@/store';
import { cn } from '@/utils/helper';

interface WatchlistButtonProps {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  type: 'movie' | 'tv';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const WatchlistButton = ({
  id,
  title,
  name,
  poster_path,
  release_date,
  first_air_date,
  vote_average,
  type,
  className = '',
  size = 'md'
}: WatchlistButtonProps) => {
  const { toggleWatchlist } = useWatchlist();
  const isInWatchlist = useSelector((state: RootState) => 
    selectIsInWatchlist(id, type)(state)
  );

  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl'
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const itemTitle = title || name || 'Item';
    
    if (isInWatchlist) {
      toggleWatchlist({
        id,
        title,
        name,
        poster_path,
        release_date,
        first_air_date,
        vote_average,
        type
      });
      toast.success(`Removed "${itemTitle}" from watchlist`, {
        icon: '💔',
      });
    } else {
      toggleWatchlist({
        id,
        title,
        name,
        poster_path,
        release_date,
        first_air_date,
        vote_average,
        type
      });
      toast.success(`Added "${itemTitle}" to watchlist`, {
        icon: '❤️',
      });
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        'flex items-center justify-center rounded-full',
        'bg-black/20 backdrop-blur-sm border border-white/20',
        'hover:bg-black/40 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-white/50',
        sizeClasses[size],
        className
      )}
      aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isInWatchlist ? 1 : 0.8,
          color: isInWatchlist ? '#ef4444' : '#ffffff'
        }}
        transition={{ duration: 0.2 }}
      >
        {isInWatchlist ? <AiFillHeart /> : <AiOutlineHeart />}
      </motion.div>
    </motion.button>
  );
};

export default WatchlistButton;