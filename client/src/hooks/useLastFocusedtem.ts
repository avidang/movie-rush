import { useCallback, useEffect } from 'react';

import { useRestoreActiveFocus } from './useRestoreActiveFocus';

interface LastFocusedMovie {
  pathname: string;
  movieId: number;
}

export const useLastFocusedMovie = (pathname: string, movieId: number) => {
  const lastFocusedItem = getLastFocusedItem();
  const shouldRestoreFocus =
    lastFocusedItem?.pathname === pathname &&
    lastFocusedItem.movieId === movieId;

  const cardRef = useRestoreActiveFocus<HTMLAnchorElement>(
    pathname,
    shouldRestoreFocus ? pathname : '',
  );

  useEffect(() => {
    if (!shouldRestoreFocus) return;
    clearLastFocusedItem();
  }, [shouldRestoreFocus]);

  const handleNavigateToItem = useCallback(() => {
    setLastFocusedItem({ pathname, movieId });
  }, [movieId, pathname]);

  return {
    cardRef,
    handleNavigateToItem,
  };
};

const getLastFocusedItem = (): LastFocusedMovie | null => {
  try {
    const rawValue = localStorage.getItem(LAST_FOCUSED_MOVIE_STORAGE_KEY);
    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue) as LastFocusedMovie;
    if (!parsed.pathname || typeof parsed.movieId !== 'number') return null;

    return parsed;
  } catch {
    return null;
  }
};

const setLastFocusedItem = (value: LastFocusedMovie) => {
  localStorage.setItem(LAST_FOCUSED_MOVIE_STORAGE_KEY, JSON.stringify(value));
};

const clearLastFocusedItem = () => {
  localStorage.removeItem(LAST_FOCUSED_MOVIE_STORAGE_KEY);
};

const LAST_FOCUSED_MOVIE_STORAGE_KEY = 'movie-rush:last-focused-movie';
