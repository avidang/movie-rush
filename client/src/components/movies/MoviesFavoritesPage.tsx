import { MoviesGrid } from './MoviesGrid';
import { MoviesFilterBar } from './MoviesFilterBar';

import { selectFavoritesState, useAppSelector } from '@/store';

export const MoviesFavoritesPage = () => {
  const favoritesState = useAppSelector(selectFavoritesState);

  if (favoritesState.error) {
    return <div>Error: {favoritesState.error}</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <MoviesFilterBar title="My Favorites" />
      {favoritesState.items.length ? (
        <MoviesGrid
          isLoading={favoritesState.isLoading}
          movies={favoritesState.items}
        />
      ) : (
        <div className="bg-primary text-primary-text rounded-2xl p-6">
          {favoritesState.isLoading ? (
            <div className="flex items-center gap-3">
              <span className="border-primary border-t-primary-text h-4 w-4 animate-spin rounded-full border-2" />
              Loading favorites...
            </div>
          ) : (
            'No favorites yet. Add a movie to see it here.'
          )}
        </div>
      )}
    </div>
  );
};
