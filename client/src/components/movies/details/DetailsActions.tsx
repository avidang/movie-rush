import { FavoriteAction } from './FavoriteAction';
import { PlayTrailerAction } from './PlayTrailerAction';
import type { MovieDetail } from '@/schemas/movie-detail';
import { FocusWrapper } from '@/components/focus/FocusWrapper';

interface DetailsActionsProps {
  movie: MovieDetail;
  compact?: boolean;
  className?: string;
  trailerTitle: string;
  trailerVideos: MovieDetail['videos'];
}

export const DetailsActions = ({
  movie,
  className,
  trailerTitle,
  trailerVideos,
}: DetailsActionsProps) => (
  <FocusWrapper className={className ?? 'flex flex-wrap items-center gap-3'}>
    <PlayTrailerAction
      trailerVideos={trailerVideos}
      trailerTitle={trailerTitle}
    />
    <FavoriteAction movie={movie} />
  </FocusWrapper>
);
