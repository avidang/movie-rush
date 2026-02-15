import { MoviesGrid } from '../MoviesGrid';

import { searchRequested } from '@/store';
import { useAppDispatch } from '@/store/hooks';
import { useAppSelector } from '@/store/hooks';
import { selectSearch } from '@/store/search/selectors';

export const MoviesSearchResults = () => {
  const dispatch = useAppDispatch();
  const searchState = useAppSelector(selectSearch);

  const isSearchActive = searchState.query.trim().length >= 2;
  const shouldShowSearchResults =
    isSearchActive && (searchState.isLoading || searchState.hasSearched);

  if (!shouldShowSearchResults) return null;

  if (searchState.error && !searchState.items.length) {
    return (
      <div className="rounded-2xl bg-slate-100 p-6 text-slate-700">
        Error: {searchState.error}
      </div>
    );
  }

  if (searchState.items.length) {
    const handlePageChange = (page: number) => {
      if (searchState.isLoading || page === searchState.page) return;
      dispatch(searchRequested(searchState.query, page));
    };

    return (
      <MoviesGrid
        isLoading={searchState.isLoading}
        movies={searchState.items}
        currentPage={searchState.page}
        totalPages={searchState.totalPages}
        onPageChange={handlePageChange}
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
