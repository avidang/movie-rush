import { useEffect } from 'react';

import { DetailsActions } from './DetailsActions';
import { DetailsBackdrop } from './DetailsBackdrop';
import { DetailsCompanies } from './DetailsCompanies';
import { DetailsGenres } from './DetailsGenres';
import { DetailsHeader } from './DetailsHeader';
import { DetailsOverview } from './DetailsOverview';
import { DetailsStats } from './DetailsStats';

import {
  fetchMovieDetailsRequested,
  selectMovieDetails,
  useAppDispatch,
  useAppSelector,
} from '@/store';

interface MovieDetailsPageProps {
  movieId: string;
}

export const MovieDetailsPage = ({ movieId }: MovieDetailsPageProps) => {
  const dispatch = useAppDispatch();
  const detailsState = useAppSelector(selectMovieDetails);

  const parsedId = Number(movieId);

  useEffect(() => {
    if (!Number.isNaN(parsedId)) {
      dispatch(fetchMovieDetailsRequested(parsedId));
    }
  }, [dispatch, parsedId]);

  const movie = detailsState.item;

  if (detailsState.isLoading) {
    return <Skeleton />;
  }

  if (detailsState.error) {
    return <div className="text-error p-6">Error: {detailsState.error}</div>;
  }

  if (!movie) {
    return <div className="text-error p-6">Movie not found.</div>;
  }

  return (
    <div className="min-h-screen w-full">
      <div className="relative w-full">
        <DetailsBackdrop backdropPath={movie.backdropPath} />

        <div className="relative w-full p-4">
          <div className="space-y-6">
            <DetailsHeader
              title={movie.title}
              tagline={movie.tagline}
              statusLabel={movie.status || 'Status N/A'}
              languageLabel={movie.originalLanguage.toUpperCase() || 'N/A'}
              releaseYearLabel={
                movie.releaseDate
                  ? movie.releaseDate.getFullYear().toString()
                  : 'Release N/A'
              }
              runtimeLabel={formatRuntime(movie.runtime)}
              ratingLabel={
                movie.rating ? `${movie.rating.toFixed(1)} / 10` : 'NR'
              }
              votesLabel={
                movie.votes ? `${movie.votes.toLocaleString()} votes` : ''
              }
            />
            <DetailsGenres genres={movie.genres} />
            <DetailsOverview overview={movie.overview} />
            <DetailsActions
              movie={movie}
              className="flex flex-wrap items-center gap-3"
              trailerVideos={movie.videos}
            />
            <DetailsStats
              budgetLabel={formatCurrency(movie.budget)}
              revenueLabel={formatCurrency(movie.revenue)}
              languageLabel={movie.spokenLanguages[0] || 'N/A'}
              homepage={movie.homepage}
            />
            <DetailsCompanies companies={movie.productionCompanies} />
          </div>
        </div>
      </div>

    </div>
  );
};

const Skeleton = () => (
  <div className="animate-pulse space-y-6 p-4">
    <div className="bg-skeleton h-64 w-full rounded-lg" />
    <div className="space-y-3">
      <div className="bg-skeleton h-6 w-1/3 rounded" />
      <div className="bg-skeleton h-4 w-1/2 rounded" />
      <div className="bg-skeleton h-4 w-1/4 rounded" />
    </div>
    <div className="bg-skeleton h-4 w-full rounded" />
    <div className="bg-skeleton h-4 w-full rounded" />
    <div className="bg-skeleton h-4 w-full rounded" />
  </div>
);

const formatRuntime = (minutes: number | null) => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return hours ? `${hours}h ${remaining}m` : `${remaining}m`;
};

const formatCurrency = (value: number | null) => {
  if (!value) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
};
