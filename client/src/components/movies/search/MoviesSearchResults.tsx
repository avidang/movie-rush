import { MoviesGrid } from '../MoviesGrid';

import type { ReactNode } from 'react';

import type { SearchState } from '@/store/search/types';

interface MoviesSearchResultsProps {
  searchState: SearchState;
  isSearchActive: boolean;
  fallback?: ReactNode;
}

export const MoviesSearchResults = ({
  searchState,
  isSearchActive,
  fallback,
}: MoviesSearchResultsProps) => {
  const shouldShowSearchResults =
    isSearchActive && (searchState.isLoading || searchState.hasSearched);

  if (!shouldShowSearchResults) {
    return <>{fallback ?? null}</>;
  }

  if (searchState.error && !searchState.items.length) {
    return (
      <div className="rounded-2xl bg-slate-100 p-6 text-slate-700">
        Error: {searchState.error}
      </div>
    );
  }

  if (searchState.items.length) {
    return (
      <MoviesGrid
        isLoading={searchState.isLoading}
        movies={searchState.items}
      />
    );
  }

  if (searchState.isLoading) {
    return <MoviesGrid isLoading movies={[]} />;
  }

  if (searchState.hasSearched) {
    return (
      <div className="rounded-2xl bg-slate-100 p-6 text-slate-700">
        No results found. Try a different search.
      </div>
    );
  }

  return null;
};
