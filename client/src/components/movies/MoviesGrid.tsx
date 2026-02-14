import InfiniteScroll from 'react-infinite-scroll-component';

import { useMemo } from 'react';
import { MovieListItemCard } from './MovieListItemCard';

import type { MovieListItem } from '@/schemas/movies-result';
import { FocusWrapper } from '@/components/focus/FocusWrapper';

interface MoviesGridProps {
  isLoading: boolean;
  movies: Array<MovieListItem>;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
}

export const MoviesGrid = ({
  isLoading,
  movies,
  hasMore = false,
  isLoadingMore = false,
  onLoadMore,
}: MoviesGridProps) => {
  const showSkeleton = isLoading || isLoadingMore;
  const handleNext = () => onLoadMore?.();

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={handleNext}
      hasMore={hasMore}
      loader={null}
    >
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
    </InfiniteScroll>
  );
};

const SkeletonCards = ({ count }: { count: number }) => {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((index) => ({
        id: `skeleton-${index}`,
      })),
    [count],
  );

  return items.map(({ id }) => <MovieListItemCard.Skeleton key={id} />);
};

const ITEMS_PER_PAGE = 20;
