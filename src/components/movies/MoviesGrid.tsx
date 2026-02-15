import { useMemo } from 'react';
import { MovieListItemCard } from './MovieListItemCard';

import type { MovieListItem } from '@/schemas/movies-result';
import { FocusWrapper } from '@/components/focus/FocusWrapper';
import { Pagination } from '@/components/ui/Pagination';

interface MoviesGridProps {
  isLoading: boolean;
  movies: Array<MovieListItem>;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const MoviesGrid = ({
  isLoading,
  movies,
  currentPage = 1,
  totalPages = 0,
  onPageChange,
}: MoviesGridProps) => {
  const showSkeleton = isLoading;

  return (
    <div className="space-y-6">
      <FocusWrapper
        className="grid min-w-250 grid-cols-4 place-items-center gap-4 p-2 xl:gap-6"
        focusGrid
        gridColumns={4}
      >
        {movies.map((movie) => (
          <MovieListItemCard key={movie.id} movieListItem={movie} />
        ))}
        {showSkeleton && <SkeletonCards count={ITEMS_PER_PAGE} />}
      </FocusWrapper>

      <FocusWrapper>
        {onPageChange ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            isDisabled={isLoading}
          />
        ) : null}
      </FocusWrapper>
    </div>
  );
};

const SkeletonCards = ({ count }: { count: number }) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, index) => ({
        id: `skeleton-${index}`,
      })),
    [count],
  );

  return items.map(({ id }) => <MovieListItemCard.Skeleton key={id} />);
};

const ITEMS_PER_PAGE = 20;
