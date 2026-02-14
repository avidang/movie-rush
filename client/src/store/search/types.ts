import type { MovieListItem } from '@/schemas/movies-result';

export interface SearchState {
  query: string;
  items: Array<MovieListItem>;
  page: number;
  totalPages: number;
  totalResults: number;
  isLoading: boolean;
  hasSearched: boolean;
  error: string | null;
}
