import type { MovieDetail } from '@/schemas/movie-detail';
import type { MovieListItem } from '@/schemas/movies-result';

export interface MoviesListState {
  items: Array<MovieListItem>;
  page: number;
  totalPages: number;
  totalResults: number;
  isLoading: boolean;
  error: string | null;
}

export interface MoviesState {
  home: MoviesListState;
  popular: MoviesListState;
  airingNow: MoviesListState;
  details: MovieDetailsState;
}

export interface MovieDetailsState {
  item: MovieDetail | null;
  id: number | null;
  isLoading: boolean;
  error: string | null;
}
