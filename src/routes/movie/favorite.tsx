import { createFileRoute } from '@tanstack/react-router';

import { MoviesFavoritesPage } from '@/components/movies/MoviesFavoritesPage';

export const Route = createFileRoute('/movie/favorite')({
  component: RouteComponent,
});

function RouteComponent() {
  return <MoviesFavoritesPage />;
}
