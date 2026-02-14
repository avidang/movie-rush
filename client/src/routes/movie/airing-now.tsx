import { createFileRoute } from '@tanstack/react-router';

import { MoviesListPage } from '@/components/movies/MoviesListPage';
import { fetchAiringNowRequested, selectAiringNowMovies } from '@/store';

export const Route = createFileRoute('/movie/airing-now')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MoviesListPage
      title="Airing Now"
      selectList={selectAiringNowMovies}
      fetchAction={fetchAiringNowRequested}
    />
  );
}
