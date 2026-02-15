import { useEffect, useMemo } from 'react';

import { MoviesGrid } from './MoviesGrid';
import { MoviesFilterBar } from './MoviesFilterBar';
import { MoviesSearchSection } from './search/MoviesSearchSection';

import {
  fetchHomeRequested,
  selectHomeMovies,
  useAppDispatch,
  useAppSelector,
} from '@/store';

export const MoviesHomePage = () => {
  const dispatch = useAppDispatch();
  const homeState = useAppSelector(selectHomeMovies);
  const hasSearched = useAppSelector((state) => state.search.hasSearched);
  const homeMoviesToRender = useMemo(
    () => (homeState.isLoading ? [] : homeState.items),
    [homeState.isLoading, homeState.items],
  );

  useEffect(() => {
    if (homeState.items.length || homeState.isLoading) return;

    dispatch(fetchHomeRequested(1));
  }, [dispatch, homeState.isLoading, homeState.items.length]);

  const handlePageChange = (page: number) => {
    if (homeState.isLoading || page === homeState.page) return;
    dispatch(fetchHomeRequested(page));
  };

  if (homeState.error && !homeState.items.length) {
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
      <div className="space-y-6">
        <MoviesFilterBar title="Explore Movies" />
        <MoviesSearchSection />
        {!hasSearched && (
          <MoviesGrid
            isLoading={homeState.isLoading}
            movies={homeMoviesToRender}
            currentPage={homeState.page}
            totalPages={homeState.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};
