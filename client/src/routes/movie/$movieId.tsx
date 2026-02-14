import { createFileRoute } from '@tanstack/react-router';

import { MovieDetailsPage } from '@/components/movies/details/MovieDetailsPage';

export const Route = createFileRoute('/movie/$movieId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  return <MovieDetailsPage movieId={movieId} />;
}
