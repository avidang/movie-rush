import type { MoviesResult } from '@/schemas/movies-result';

export const SEARCH_QUERY_CHANGED = 'search/queryChanged';
export const SEARCH_REQUESTED = 'search/searchRequested';
export const SEARCH_SUCCEEDED = 'search/searchSucceeded';
export const SEARCH_FAILED = 'search/searchFailed';
export const SEARCH_CLEARED = 'search/searchCleared';

export type SearchQueryChangedAction = {
  type: typeof SEARCH_QUERY_CHANGED;
  payload: { query: string };
};

export type SearchRequestedAction = {
  type: typeof SEARCH_REQUESTED;
  payload: { query: string; page: number };
};

export type SearchSucceededAction = {
  type: typeof SEARCH_SUCCEEDED;
  payload: {
    query: string;
    items: MoviesResult['results'];
    page: number;
    totalPages: number;
    totalResults: number;
  };
};

export type SearchFailedAction = {
  type: typeof SEARCH_FAILED;
  payload: { query: string; message: string };
};

export type SearchClearedAction = {
  type: typeof SEARCH_CLEARED;
};

export type SearchAction =
  | SearchQueryChangedAction
  | SearchRequestedAction
  | SearchSucceededAction
  | SearchFailedAction
  | SearchClearedAction;

export const searchQueryChanged = (
  query: string,
): SearchQueryChangedAction => ({
  type: SEARCH_QUERY_CHANGED,
  payload: { query },
});

export const searchRequested = (
  query: string,
  page: number,
): SearchRequestedAction => ({
  type: SEARCH_REQUESTED,
  payload: { query, page },
});

export const searchSucceeded = (
  query: string,
  payload: MoviesResult,
): SearchSucceededAction => ({
  type: SEARCH_SUCCEEDED,
  payload: {
    query,
    items: payload.results,
    page: payload.page,
    totalPages: payload.totalPages,
    totalResults: payload.totalResults,
  },
});

export const searchFailed = (
  query: string,
  message: string,
): SearchFailedAction => ({
  type: SEARCH_FAILED,
  payload: { query, message },
});

export const searchCleared = (): SearchClearedAction => ({
  type: SEARCH_CLEARED,
});
