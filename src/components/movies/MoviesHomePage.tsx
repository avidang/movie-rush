import { useEffect, useMemo } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';

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
  const navigate = useNavigate();
  const homeState = useAppSelector(selectHomeMovies);
  const hasSearched = useAppSelector((state) => state.search.hasSearched);
  const routePage = useRouterState({
    select: (state) => parsePageFromSearch(state.location.search),
  });
  const hasPageParam = useRouterState({
    select: (state) => hasPageInSearch(state.location.search),
  });
  const homeMoviesToRender = useMemo(
    () => (homeState.isLoading ? [] : homeState.items),
    [homeState.isLoading, homeState.items],
  );

  useEffect(() => {
    if (!hasPageParam) {
      navigate({
        to: '.',
        search: (previous) => ({
          ...previous,
          page: 1,
        }),
        replace: true,
      });
      return;
    }

    if (homeState.isLoading) return;
    if (homeState.error && homeState.page === routePage) return;
    if (homeState.page === routePage && homeState.items.length) return;

    dispatch(fetchHomeRequested(routePage));
  }, [
    dispatch,
    homeState.error,
    homeState.isLoading,
    homeState.items.length,
    homeState.page,
    hasPageParam,
    navigate,
    routePage,
  ]);

  const handlePageChange = (page: number) => {
    if (homeState.isLoading || page === routePage) return;
    navigate({
      to: '.',
      search: (previous) => ({
        ...previous,
        page,
      }),
    });
  };

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
        {homeState.error ? (
          <div className="rounded-2xl bg-error/10 p-4 text-error">
            Error: {homeState.error}
          </div>
        ) : null}
        <MoviesSearchSection />
        {!hasSearched && (
          <MoviesGrid
            isLoading={homeState.isLoading}
            movies={homeMoviesToRender}
            currentPage={routePage}
            totalPages={homeState.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

const parsePageFromSearch = (search: unknown) => {
  if (!search || typeof search !== 'object') return 1;
  const rawPage = (search as Record<string, unknown>).page;
  const parsed = Number(rawPage);
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
};

const hasPageInSearch = (search: unknown) => {
  if (!search || typeof search !== 'object') return false;
  const rawPage = (search as Record<string, unknown>).page;
  return rawPage !== undefined;
};
