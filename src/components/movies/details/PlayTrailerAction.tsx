import { Play } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import type { MovieDetail } from '@/schemas/movie-detail';
import { Button } from '@/components/ui/Button';

interface PlayTrailerActionProps {
  movieId: number;
  trailerVideos: MovieDetail['videos'];
}

const PlayTrailerAction = ({
  movieId,
  trailerVideos,
}: PlayTrailerActionProps) => {
  const navigate = useNavigate();
  const hasTrailer = trailerVideos.some(
    (video) => video.site === 'YouTube' && video.type === 'Trailer',
  );

  return (
    hasTrailer && (
      <Button
        color="primary"
        onClick={() =>
          navigate({
            to: '/movie/$movieId/trailer',
            params: { movieId: String(movieId) },
          })
        }
      >
        <Play className="h-4 w-4" aria-hidden="true" />
        Play trailer
      </Button>
    )
  );
};

export { PlayTrailerAction };
