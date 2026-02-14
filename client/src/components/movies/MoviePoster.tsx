import { cn } from '@/utils/cn';

interface MoviePosterProps {
  posterPath: string | null;
  title: string;
  className?: string;
}

export const MoviePoster = ({
  posterPath,
  title,
  className,
}: MoviePosterProps) => (
  <img
    className={cn('size-full object-cover', className)}
    src={getPosterUrl(posterPath)}
    alt={title}
    onError={(e) => {
      e.currentTarget.src = PLACEHOLDER_IMAGE_URL;
    }}
  />
);

const getPosterUrl = (posterPath: string | null) => {
  if (!posterPath) return PLACEHOLDER_IMAGE_URL;

  const url = new URL(IMAGE_BASE_URL);
  url.pathname += posterPath;

  return url.toString();
};

const PLACEHOLDER_IMAGE_URL = '/movie-poster-placeholder.svg';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
