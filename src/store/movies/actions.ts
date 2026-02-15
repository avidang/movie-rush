import type { MovieDetail } from '@/schemas/movie-detail';
import type { MoviesResult } from '@/schemas/movies-result';

export const FETCH_POPULAR_REQUESTED = 'movies/fetchPopularRequested';
export const FETCH_POPULAR_SUCCEEDED = 'movies/fetchPopularSucceeded';
export const FETCH_POPULAR_FAILED = 'movies/fetchPopularFailed';

export const FETCH_HOME_REQUESTED = 'movies/fetchHomeRequested';
export const FETCH_HOME_SUCCEEDED = 'movies/fetchHomeSucceeded';
export const FETCH_HOME_FAILED = 'movies/fetchHomeFailed';

export const FETCH_AIRING_NOW_REQUESTED = 'movies/fetchAiringNowRequested';
export const FETCH_AIRING_NOW_SUCCEEDED = 'movies/fetchAiringNowSucceeded';
export const FETCH_AIRING_NOW_FAILED = 'movies/fetchAiringNowFailed';

export const FETCH_MOVIE_DETAILS_REQUESTED =
  'movies/fetchMovieDetailsRequested';
export const FETCH_MOVIE_DETAILS_SUCCEEDED =
  'movies/fetchMovieDetailsSucceeded';
export const FETCH_MOVIE_DETAILS_FAILED = 'movies/fetchMovieDetailsFailed';

export type FetchPopularRequestedAction = {
  type: typeof FETCH_POPULAR_REQUESTED;
  payload: { page: number };
};

export type FetchPopularSucceededAction = {
  type: typeof FETCH_POPULAR_SUCCEEDED;
  payload: MoviesResult;
};

export type FetchPopularFailedAction = {
  type: typeof FETCH_POPULAR_FAILED;
  payload: { message: string };
};

export type FetchHomeRequestedAction = {
  type: typeof FETCH_HOME_REQUESTED;
  payload: { page: number };
};

export type FetchHomeSucceededAction = {
  type: typeof FETCH_HOME_SUCCEEDED;
  payload: MoviesResult;
};

export type FetchHomeFailedAction = {
  type: typeof FETCH_HOME_FAILED;
  payload: { message: string };
};

export type FetchAiringNowRequestedAction = {
  type: typeof FETCH_AIRING_NOW_REQUESTED;
  payload: { page: number };
};

export type FetchAiringNowSucceededAction = {
  type: typeof FETCH_AIRING_NOW_SUCCEEDED;
  payload: MoviesResult;
};

export type FetchAiringNowFailedAction = {
  type: typeof FETCH_AIRING_NOW_FAILED;
  payload: { message: string };
};

export type FetchMovieDetailsRequestedAction = {
  type: typeof FETCH_MOVIE_DETAILS_REQUESTED;
  payload: { id: number };
};

export type FetchMovieDetailsSucceededAction = {
  type: typeof FETCH_MOVIE_DETAILS_SUCCEEDED;
  payload: MovieDetail;
};

export type FetchMovieDetailsFailedAction = {
  type: typeof FETCH_MOVIE_DETAILS_FAILED;
  payload: { message: string };
};

export type MoviesAction =
  | FetchPopularRequestedAction
  | FetchPopularSucceededAction
  | FetchPopularFailedAction
  | FetchHomeRequestedAction
  | FetchHomeSucceededAction
  | FetchHomeFailedAction
  | FetchAiringNowRequestedAction
  | FetchAiringNowSucceededAction
  | FetchAiringNowFailedAction
  | FetchMovieDetailsRequestedAction
  | FetchMovieDetailsSucceededAction
  | FetchMovieDetailsFailedAction;

export const fetchPopularRequested = (
  page: number,
): FetchPopularRequestedAction => ({
  type: FETCH_POPULAR_REQUESTED,
  payload: { page },
});

export const fetchPopularSucceeded = (
  payload: MoviesResult,
): FetchPopularSucceededAction => ({
  type: FETCH_POPULAR_SUCCEEDED,
  payload,
});

export const fetchPopularFailed = (
  message: string,
): FetchPopularFailedAction => ({
  type: FETCH_POPULAR_FAILED,
  payload: { message },
});

export const fetchHomeRequested = (page: number): FetchHomeRequestedAction => ({
  type: FETCH_HOME_REQUESTED,
  payload: { page },
});

export const fetchHomeSucceeded = (
  payload: MoviesResult,
): FetchHomeSucceededAction => ({
  type: FETCH_HOME_SUCCEEDED,
  payload,
});

export const fetchHomeFailed = (message: string): FetchHomeFailedAction => ({
  type: FETCH_HOME_FAILED,
  payload: { message },
});

export const fetchAiringNowRequested = (
  page: number,
): FetchAiringNowRequestedAction => ({
  type: FETCH_AIRING_NOW_REQUESTED,
  payload: { page },
});

export const fetchAiringNowSucceeded = (
  payload: MoviesResult,
): FetchAiringNowSucceededAction => ({
  type: FETCH_AIRING_NOW_SUCCEEDED,
  payload,
});

export const fetchAiringNowFailed = (
  message: string,
): FetchAiringNowFailedAction => ({
  type: FETCH_AIRING_NOW_FAILED,
  payload: { message },
});

export const fetchMovieDetailsRequested = (
  id: number,
): FetchMovieDetailsRequestedAction => ({
  type: FETCH_MOVIE_DETAILS_REQUESTED,
  payload: { id },
});

export const fetchMovieDetailsSucceeded = (
  payload: MovieDetail,
): FetchMovieDetailsSucceededAction => ({
  type: FETCH_MOVIE_DETAILS_SUCCEEDED,
  payload,
});

export const fetchMovieDetailsFailed = (
  message: string,
): FetchMovieDetailsFailedAction => ({
  type: FETCH_MOVIE_DETAILS_FAILED,
  payload: { message },
});
