export interface ITheme {
  title: string;
  icon: IconType;
}

export interface INavLink extends ITheme {
  path: string;
}

export interface IMovie {
  id: number;
  poster_path: string;
  original_title: string;
  name: string;
  overview: string;
  backdrop_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
}

