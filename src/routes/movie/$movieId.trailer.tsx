import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { MovieTrailer } from '@/components/movies/details/MovieTrailer';
import { selectMovieDetails, useAppSelector } from '@/store';

export const Route = createFileRoute('/movie/$movieId/trailer')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { movieId } = Route.useParams();
  const detailsState = useAppSelector(selectMovieDetails);
  const movie = detailsState.item;
  const parsedMovieId = Number(movieId);

  if (!movie || movie.id !== parsedMovieId) return null;

  return (
    <MovieTrailer
      title={movie.title}
      videos={movie.videos}
      onClose={() =>
        navigate({
          to: '/movie/$movieId',
          params: { movieId },
        })
      }
    />
  );
}
