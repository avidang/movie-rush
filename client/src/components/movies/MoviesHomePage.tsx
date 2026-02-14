import { useEffect } from 'react';

import { MoviesGrid } from './MoviesGrid';
import { MoviesFilterBar } from './MoviesFilterBar';
import { MoviesSearchSection } from './search/MoviesSearchSection';

import {
  fetchHomeRequested,
  selectHomeMovies,
  selectSearch,
  useAppDispatch,
  useAppSelector,
} from '@/store';

export const MoviesHomePage = () => {
  const dispatch = useAppDispatch();
  const homeState = useAppSelector(selectHomeMovies);
  const searchState = useAppSelector(selectSearch);

  const isSearchActive = searchState.query.trim().length >= 2;

  useEffect(() => {
    if (homeState.items.length || isSearchActive) return;

    dispatch(fetchHomeRequested(1));
  }, [dispatch, isSearchActive, homeState.items.length]);

  if (!isSearchActive && homeState.error) {
    return <div>Error: {homeState.error}</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-3">
        <h2 className="text-primary-text text-2xl font-bold">
          Welcome to Movie Rush
        </h2>
        <p className="text-secondary-text max-w-2xl text-lg">
          Discover the latest and greatest movies with Movie Rush! Browse
          popular movies, get detailed information, and find your next favorite
          film.
        </p>
      </div>
      <MoviesFilterBar title="Explore Movies" />
      <MoviesSearchSection
        fallback={
          <MoviesGrid
            isLoading={homeState.isLoading}
            movies={homeState.items}
          />
        }
      />
    </div>
  );
};
