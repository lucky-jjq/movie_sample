import { useSelector } from 'react-redux';
import { maxWidth, mainHeading } from '@/styles';
import { cn } from '@/utils/helper';

const Watchlist = () => {
  console.log('Watchlist component with Redux...');
  
  try {
    // Test if Redux store exists
    const watchlist = useSelector((state: any) => state.watchlist?.items || []);
    const count = watchlist.length;
    
    console.log('Redux works! Count:', count);
    
    return (
      <div className={cn(maxWidth, "lg:pt-32 md:pt-28 sm:pt-24 pt-20 lg:pb-16 pb-12")}>
        <h1 className={cn(mainHeading, "mb-2 text-white")}>
          My Watchlist
        </h1>
        <p className="text-gray-400 text-lg">
          {count === 0 
            ? "No items in your watchlist yet. Try adding some movies using the heart buttons!" 
            : `You have ${count} ${count === 1 ? 'item' : 'items'} in your watchlist`
          }
        </p>
        
        {count > 0 && (
          <div className="mt-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Your Items:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {watchlist.map((item: any) => (
                <div key={`${item.type}-${item.id}`} className="group">
                  <a
                    href={`/${item.type}/${item.id}`}
                    className="block relative rounded-lg overflow-hidden bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
                  >
                    <div className="aspect-[2/3] relative">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                        alt={item.title || item.name || ''}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      
                      {/* Rating badge */}
                      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <span className="text-yellow-400 text-sm">⭐</span>
                        <span className="text-white text-sm font-medium">
                          {item.vote_average.toFixed(1)}
                        </span>
                      </div>

                      {/* Type badge */}
                      <div className="absolute bottom-2 right-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                          item.type === 'movie' 
                            ? "bg-blue-500/80 text-white" 
                            : "bg-purple-500/80 text-white"
                        }`}>
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Title */}
                  <h3 className="mt-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 line-clamp-2">
                    {item.title || item.name}
                  </h3>

                  {/* Release year */}
                  <p className="text-xs text-gray-500 mt-1">
                    {item.release_date 
                      ? new Date(item.release_date).getFullYear()
                      : item.first_air_date 
                      ? new Date(item.first_air_date).getFullYear()
                      : 'N/A'
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Redux error:', error);
    return (
      <div className={cn(maxWidth, "lg:pt-32 md:pt-28 sm:pt-24 pt-20 lg:pb-16 pb-12")}>
        <h1 className="text-white text-2xl">Redux Error</h1>
        <p className="text-red-400">Error: {String(error)}</p>
      </div>
    );
  }
};

export default Watchlist;