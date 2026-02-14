import { Link } from '@tanstack/react-router';

import { MoviePoster } from './MoviePoster';

import type { MovieListItem } from '@/schemas/movies-result';

interface MovieListItemCardProps {
  movieListItem: MovieListItem;
}

export const MovieListItemCard = ({
  movieListItem,
}: MovieListItemCardProps) => (
  <Link
    to="/movie/$movieId"
    params={{ movieId: String(movieListItem.id) }}
    className="group relative aspect-2/3 w-full overflow-hidden rounded-4xl"
  >
    <div className="absolute z-1 flex size-full items-end justify-start bg-linear-to-t from-[rgba(0,0,0,.90)] to-transparent to-33%">
      <h1 className="mb-4 w-full text-center text-lg font-semibold text-neutral-text lg:text-lg xl:text-xl 2xl:text-2xl">
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

const MovieListItemCardSkeleton = () => (
  <div className="aspect-2/3 size-full rounded-4xl bg-skeleton"></div>
);

MovieListItemCard.Skeleton = MovieListItemCardSkeleton;

const formatMovieTitle = ({ title, releaseDate }: MovieListItem) => {
  const year = releaseDate?.getFullYear() ?? 'N/A';
  return `${title} (${year})`;
};
