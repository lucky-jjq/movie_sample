import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiOutlineArrowRight } from 'react-icons/ai';
import { useMotion } from '@/hooks/useMotion';

const EmptyWatchlist = () => {
  const { fadeUp } = useMotion();

  return (
    <motion.div
      variants={fadeUp}
      className="text-center py-16 px-4"
    >
      <div className="max-w-md mx-auto">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-gray-800/50 flex items-center justify-center">
            <AiOutlineHeart className="text-4xl text-gray-400" />
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-white mb-3">
          Your watchlist is empty
        </h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Start building your personal collection by adding movies and TV shows you want to watch later.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Browse Movies & TV Shows
            <AiOutlineArrowRight />
          </Link>
          
          <div className="text-sm text-gray-500">
            Look for the <AiOutlineHeart className="inline text-red-400" /> icon to add items to your watchlist
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyWatchlist;