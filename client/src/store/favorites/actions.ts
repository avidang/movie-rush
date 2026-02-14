import type { MovieDetail } from '@/schemas/movie-detail';
import type { FavoriteMovieItem, MovieListItem } from '@/schemas/movies-result';

export const FAVORITES_ADDED = 'favorites/added';
export const FAVORITES_REMOVED = 'favorites/removed';

export type FavoritesAddedAction = {
  type: typeof FAVORITES_ADDED;
  payload: FavoriteMovieItem;
};

export type FavoritesRemovedAction = {
  type: typeof FAVORITES_REMOVED;
  payload: { id: number };
};

export type FavoritesAction = FavoritesAddedAction | FavoritesRemovedAction;

const toFavoriteItem = (
  item: MovieDetail | MovieListItem | FavoriteMovieItem,
): FavoriteMovieItem => ({
  id: item.id,
  title: item.title,
  posterPath: item.posterPath ?? '',
  overview: item.overview ?? null,
  releaseDate: item.releaseDate ?? null,
});

export const favoritesAdded = (
  item: MovieDetail | MovieListItem | FavoriteMovieItem,
): FavoritesAddedAction => ({
  type: FAVORITES_ADDED,
  payload: toFavoriteItem(item),
});

export const favoritesRemoved = (id: number): FavoritesRemovedAction => ({
  type: FAVORITES_REMOVED,
  payload: { id },
});
