# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server (Vite) on http://localhost:5173/
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run preview` - Preview production build locally

### Environment Setup
- Create `.env` file in root directory with:
  ```
  VITE_API_KEY=<tmdb-api-key>
  VITE_TMDB_API_BASE_URL=https://api.themoviedb.org/3
  ```
- TMDB API key required from https://www.themoviedb.org/settings/api

## Architecture Overview

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router v6 with lazy-loaded page components
- **State Management**: RTK Query for API calls, React Context for global UI state
- **Styling**: Tailwind CSS with custom responsive breakpoints
- **Animations**: Framer Motion (LazyMotion with domAnimation features)
- **Icons**: React Icons library

### Application Structure

#### Provider Hierarchy (src/main.tsx)
```
BrowserRouter
  └── ApiProvider (RTK Query - tmdbApi)
    └── ThemeProvider (Dark/Light theme management)
      └── GlobalContextProvider (Modal + sidebar state)
        └── LazyMotion (Framer Motion optimization)
          └── App
```

#### Context Management
- **GlobalContext**: Video modal state, sidebar visibility, trailer fetching
- **ThemeContext**: Theme switching (Dark/Light/System), localStorage persistence
- **TMDB API**: Centralized via RTK Query with endpoints for movies/TV shows

#### Routing Structure
- `/` - Home page with hero carousel and content sections
- `/:category` - Catalog pages (movie/tv) with search and filtering
- `/:category/:id` - Detail pages with cast, crew, videos, and similar content
- `*` - 404 Not Found page

#### Data Flow
1. **API Layer**: `src/services/TMDB.ts` - RTK Query endpoints for TMDB API
2. **Component Layer**: Pages consume API via hooks (useGetShowsQuery, useGetShowQuery)
3. **UI State**: Global context for modals/sidebar, theme context for appearance

### Key Components & Patterns

#### Common Components (`src/common/`)
- **Header/Footer**: Navigation with responsive design
- **SideBar**: Mobile navigation with theme switcher
- **VideoModal**: YouTube trailer player with global state management
- **MovieCard**: Reusable card component with lazy-loaded images
- **Section**: Content sections with horizontal scrolling (Swiper.js integration)

#### Page Components (`src/pages/`)
- **Home**: Hero section + multiple content sections using constants configuration
- **Catalog**: Search functionality + filtered movie/TV listings
- **Detail**: Comprehensive movie/TV details with cast, videos, similar content

#### Styling Approach
- Tailwind CSS with custom responsive breakpoints (xs, sm, md, lg)
- `src/styles/index.ts` contains reusable style constants (maxWidth, etc.)
- `cn()` utility function combines clsx and tailwind-merge for conditional classes
- Dark/light theme support via Tailwind's dark mode classes

#### Performance Optimizations
- Lazy loading for all page components
- React.lazy() + Suspense with loading states
- LazyMotion for reduced Framer Motion bundle size
- Lazy-loaded images via react-lazy-load-image-component
- Throttled scroll/resize events (150ms delay constant)

### Configuration & Constants

#### API Configuration (`src/utils/config.ts`)
- Environment variables handling for TMDB API
- Google Analytics and AdSense configuration
- Throttle delay constants

#### App Constants (`src/constants/index.ts`)
- Navigation links with icons and paths
- Theme options configuration
- Homepage sections configuration (defines what content appears on home)
- Footer links

### Development Notes

#### State Management Philosophy
- RTK Query for server state (API data fetching/caching)
- React Context for client state (UI interactions, theme)
- No Redux store needed beyond RTK Query api slice

#### Component Architecture
- Functional components with hooks throughout
- Custom hooks for common functionality (useMotion, useOnClickOutside, useOnKeyPress)
- Consistent import aliasing with `@/` prefix for src directory

#### Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Consistent spacing scale using Tailwind classes
- Custom responsive grid layouts for movie cards

#### Type Safety
- TypeScript throughout with proper type definitions in `src/types.d.ts`
- Typed API responses and component props
- Environment variable types in `src/vite-env.d.ts`

### Adding New Features
- Use existing patterns: RTK Query for data, Context for UI state
- Follow responsive design patterns established in existing components
- Leverage common components and utilities where possible
- Maintain consistent styling with Tailwind classes and design system