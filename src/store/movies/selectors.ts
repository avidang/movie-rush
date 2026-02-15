import type { RootState } from '@/store/rootReducer';

export const selectPopularMovies = (state: RootState) => state.movies.popular;

export const selectHomeMovies = (state: RootState) => state.movies.home;

export const selectAiringNowMovies = (state: RootState) =>
  state.movies.airingNow;

export const selectMovieDetails = (state: RootState) => state.movies.details;
