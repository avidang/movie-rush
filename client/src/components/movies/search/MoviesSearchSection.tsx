import { MoviesSearchBar } from './MoviesSearchBar';
import { MoviesSearchResults } from './MoviesSearchResults';

export const MoviesSearchSection = () => {
  return (
    <>
      <MoviesSearchBar inputId="movie-search" />
      <MoviesSearchResults />
    </>
  );
};
