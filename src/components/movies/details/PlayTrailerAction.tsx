import { Play } from 'lucide-react';
import { useRef, useState } from 'react';
import { MovieTrailer } from './MovieTrailer';
import type { MovieDetail } from '@/schemas/movie-detail';
import { Button } from '@/components/ui/Button';

interface PlayTrailerActionProps {
  trailerVideos: MovieDetail['videos'];
  trailerTitle: string;
}

const PlayTrailerAction = ({
  trailerVideos,
  trailerTitle,
}: PlayTrailerActionProps) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const playTrailerButtonRef = useRef<HTMLButtonElement | null>(null);
  const hasTrailer = trailerVideos.some(
    (video) => video.site === 'YouTube' && video.type === 'Trailer',
  );

  const handleClick = () => {
    setIsTrailerOpen(true);
  };
  return (
    hasTrailer && (
      <>
        <Button
          onClick={handleClick}
          ref={playTrailerButtonRef}
          color="primary"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          Play trailer
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
      </>
    )
  );
};

export { PlayTrailerAction };
