import { Play, Star } from 'lucide-react';
import { useRef, useState } from 'react';

import { MovieTrailer } from './MovieTrailer';
import type { MovieDetail } from '@/schemas/movie-detail';
import { FocusWrapper } from '@/components/focus/FocusWrapper';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface DetailsActionsProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  compact?: boolean;
  className?: string;
  trailerTitle: string;
  trailerVideos: MovieDetail['videos'];
}

export const DetailsActions = ({
  isFavorite,
  onToggleFavorite,
  className,
  trailerTitle,
  trailerVideos,
}: DetailsActionsProps) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const playTrailerButtonRef = useRef<HTMLButtonElement | null>(null);
  const hasTrailer = trailerVideos.some(
    (video) => video.site === 'YouTube' && video.type === 'Trailer',
  );

  return (
    <FocusWrapper className={className ?? 'flex flex-wrap items-center gap-3'}>
      {hasTrailer ? (
        <Button
          onClick={() => setIsTrailerOpen(true)}
          ref={playTrailerButtonRef}
          color="primary"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          Play trailer
        </Button>
      ) : null}
      <Button onClick={onToggleFavorite} color="primary">
        <Star
          className={cn('h-4 w-4', isFavorite && 'fill-primary-text')}
          aria-hidden="true"
        />
        {isFavorite ? 'In Favorites' : 'Add to Favorites'}
      </Button>
      <MovieTrailer
        title={trailerTitle}
        videos={trailerVideos}
        isOpen={isTrailerOpen}
        onClose={() => {
          setIsTrailerOpen(false);
          requestAnimationFrame(() => playTrailerButtonRef.current?.focus());
        }}
      />
    </FocusWrapper>
  );
};
