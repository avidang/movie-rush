import { MoviesSearchBar } from './MoviesSearchBar';
import { MoviesSearchResults } from './MoviesSearchResults';

import type { ReactNode } from 'react';

import {
  searchQueryChanged,
  selectSearch,
  useAppDispatch,
  useAppSelector,
} from '@/store';

interface MoviesSearchSectionProps {
  fallback?: ReactNode;
}

export const MoviesSearchSection = ({ fallback }: MoviesSearchSectionProps) => {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector(selectSearch);

  const isSearchActive = searchState.query.trim().length >= 2;

  return (
    <div className="space-y-6">
      <MoviesSearchBar
        value={searchState.query}
        onChange={(value) => dispatch(searchQueryChanged(value))}
        inputId="movie-search"
      />
      <MoviesSearchResults
        searchState={searchState}
        isSearchActive={isSearchActive}
        fallback={fallback}
      />
    </div>
  );
};
