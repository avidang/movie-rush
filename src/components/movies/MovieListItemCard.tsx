import { Link, useRouterState } from '@tanstack/react-router';

import { MoviePoster } from './MoviePoster';

import type { MovieListItem } from '@/schemas/movies-result';
import { useLastFocusedMovie } from '@/hooks/useLastFocusedtem';

interface MovieListItemCardProps {
  movieListItem: MovieListItem;
}

export const MovieListItemCard = ({
  movieListItem,
}: MovieListItemCardProps) => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const { cardRef, handleNavigateToItem } = useLastFocusedMovie(
    pathname,
    movieListItem.id,
  );

  return (
    <Link
      to="/movie/$movieId"
      params={{ movieId: String(movieListItem.id) }}
      className="group relative aspect-2/3 w-full overflow-hidden rounded-4xl"
      ref={cardRef}
      onClick={handleNavigateToItem}
    >
      <div className="absolute z-1 flex size-full items-end justify-start bg-linear-to-t from-[rgba(0,0,0,.90)] to-transparent to-33%">
        <h1 className="text-neutral-text mb-4 w-full text-center text-lg font-semibold lg:text-lg xl:text-xl 2xl:text-2xl">
          {formatMovieTitle(movieListItem)}
        </h1>
      </div>

      <MoviePoster
        posterPath={movieListItem.posterPath}
        title={movieListItem.title}
        className="absolute z-0 aspect-2/3 transition-transform duration-500 group-focus:scale-102"
      />
    </Link>
  );
};

const MovieListItemCardSkeleton = () => (
  <div className="bg-skeleton aspect-2/3 size-full rounded-4xl"></div>
);

MovieListItemCard.Skeleton = MovieListItemCardSkeleton;

const formatMovieTitle = ({ title, releaseDate }: MovieListItem) => {
  const year = releaseDate?.getFullYear() ?? 'N/A';
  return `${title} (${year})`;
};
