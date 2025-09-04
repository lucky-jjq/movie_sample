import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { textColor } from "../../styles";
import { cn } from "../../utils/helper";
import { selectWatchlistCount } from "@/store/watchlistSlice";

interface HeaderProps {
  link: { title: string; path: string };
  isNotFoundPage: boolean;
  showBg: boolean;
}

const HeaderNavItem = ({ link, showBg, isNotFoundPage }: HeaderProps) => {
  const watchlistCount = useSelector(selectWatchlistCount);
  const isWatchlistLink = link.path === '/watchlist';
  
  return (
    <li>
      <NavLink
        to={link.path}
        className={({ isActive }) => {
          return cn(
            "nav-link relative",
            isActive
              ? ` active ${showBg ? textColor : `text-secColor`}`
              : ` ${
                  isNotFoundPage || showBg
                    ? "text-[#444] dark:text-gray-300 dark:hover:text-secColor hover:text-black"
                    : "text-gray-300 hover:text-secColor"
                }`
          );
        }}
        end
      >
        {link.title}
        {isWatchlistLink && watchlistCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1 animate-pulse">
            {watchlistCount > 99 ? '99+' : watchlistCount}
          </span>
        )}
      </NavLink>
    </li>
  );
};

export default HeaderNavItem;
