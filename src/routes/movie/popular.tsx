import { createFileRoute } from '@tanstack/react-router';

import { MoviesListPage } from '@/components/movies/MoviesListPage';
import { fetchPopularRequested, selectPopularMovies } from '@/store';

export const Route = createFileRoute('/movie/popular')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MoviesListPage
      title="Popular Movies"
      selectList={selectPopularMovies}
      fetchAction={fetchPopularRequested}
    />
  );
}
