import type { FavoriteMovieItem } from '@/schemas/movies-result';

export interface FavoritesState {
  items: Array<FavoriteMovieItem>;
  isLoading: boolean;
  isLoaded: boolean;
  error: string | null;
}
