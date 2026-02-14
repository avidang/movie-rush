import { cn } from '@/utils/cn';

interface DetailsBackdropProps {
  backdropPath: string;
}

export const DetailsBackdrop = ({ backdropPath }: DetailsBackdropProps) => {
  if (!backdropPath) return null;

  return (
    <div className="absolute inset-0">
      <img
        src={getBackdropUrl(backdropPath)}
        alt="Movie backdrop"
        className="size-full object-cover"
        loading="lazy"
      />
      <div
        className={cn(
          'from-background absolute inset-0 bg-linear-to-r from-20% to-transparent',
          'after:from-background after:absolute after:inset-0 after:bg-linear-to-t after:to-transparent after:to-25%',
        )}
      />
    </div>
  );
};

const getBackdropUrl = (backdropPath: string) => {
  const url = new URL(BACKDROP_BASE_URL);
  url.pathname += backdropPath;
  return url.toString();
};

const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
