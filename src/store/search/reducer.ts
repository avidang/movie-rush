import {
  SEARCH_CLEARED,
  SEARCH_FAILED,
  SEARCH_QUERY_CHANGED,
  SEARCH_REQUESTED,
  SEARCH_SUCCEEDED,
} from './actions';
import type { SearchAction } from './actions';
import type { SearchState } from './types';

const initialState: SearchState = {
  query: '',
  items: [],
  page: 1,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  hasSearched: false,
  error: null,
};

export const searchReducer = (
  state: SearchState = initialState,
  action: SearchAction,
): SearchState => {
  switch (action.type) {
    case SEARCH_QUERY_CHANGED:
      return {
        ...state,
        query: action.payload.query,
        error: null,
      };
    case SEARCH_REQUESTED:
      return {
        ...state,
        isLoading: true,
        hasSearched: true,
        error: null,
        page: action.payload.page,
      };
    case SEARCH_SUCCEEDED:
      if (action.payload.query !== state.query) return state;
      return {
        ...state,
        items: action.payload.items,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
        totalResults: action.payload.totalResults,
        isLoading: false,
        hasSearched: true,
        error: null,
      };
    case SEARCH_FAILED:
      if (action.payload.query !== state.query) return state;
      return {
        ...state,
        isLoading: false,
        hasSearched: true,
        error: action.payload.message,
      };
    case SEARCH_CLEARED:
      return {
        ...state,
        items: [],
        page: 1,
        totalPages: 0,
        totalResults: 0,
        isLoading: false,
        hasSearched: false,
        error: null,
      };
    default:
      return state;
  }
};
