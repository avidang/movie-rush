import type { MoviesAction } from './actions';
import {
  FETCH_AIRING_NOW_FAILED,
  FETCH_AIRING_NOW_REQUESTED,
  FETCH_AIRING_NOW_SUCCEEDED,
  FETCH_HOME_FAILED,
  FETCH_HOME_REQUESTED,
  FETCH_HOME_SUCCEEDED,
  FETCH_MOVIE_DETAILS_FAILED,
  FETCH_MOVIE_DETAILS_REQUESTED,
  FETCH_MOVIE_DETAILS_SUCCEEDED,
  FETCH_POPULAR_FAILED,
  FETCH_POPULAR_REQUESTED,
  FETCH_POPULAR_SUCCEEDED,
} from './actions';
import type { MoviesState } from './types';

const createListState = () => ({
  items: [],
  page: 1,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: null,
});

const initialState: MoviesState = {
  home: createListState(),
  popular: createListState(),
  airingNow: createListState(),
  details: {
    item: null,
    id: null,
    isLoading: false,
    error: null,
  },
};

export const moviesReducer = (
  state: MoviesState = initialState,
  action: MoviesAction,
): MoviesState => {
  switch (action.type) {
    case FETCH_POPULAR_REQUESTED:
      return {
        ...state,
        popular: {
          ...state.popular,
          page: action.payload.page,
          isLoading: true,
          error: null,
        },
      };
    case FETCH_POPULAR_SUCCEEDED:
      return {
        ...state,
        popular: {
          ...state.popular,
          items: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          totalResults: action.payload.totalResults,
          isLoading: false,
          error: null,
        },
      };
    case FETCH_POPULAR_FAILED:
      return {
        ...state,
        popular: {
          ...state.popular,
          isLoading: false,
          error: action.payload.message,
        },
      };
    case FETCH_HOME_REQUESTED:
      return {
        ...state,
        home: {
          ...state.home,
          page: action.payload.page,
          isLoading: true,
          error: null,
        },
      };
    case FETCH_HOME_SUCCEEDED:
      return {
        ...state,
        home: {
          ...state.home,
          items: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          totalResults: action.payload.totalResults,
          isLoading: false,
          error: null,
        },
      };
    case FETCH_HOME_FAILED:
      return {
        ...state,
        home: {
          ...state.home,
          isLoading: false,
          error: action.payload.message,
        },
      };
    case FETCH_AIRING_NOW_REQUESTED:
      return {
        ...state,
        airingNow: {
          ...state.airingNow,
          page: action.payload.page,
          isLoading: true,
          error: null,
        },
      };
    case FETCH_AIRING_NOW_SUCCEEDED:
      return {
        ...state,
        airingNow: {
          ...state.airingNow,
          items: action.payload.results,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          totalResults: action.payload.totalResults,
          isLoading: false,
          error: null,
        },
      };
    case FETCH_AIRING_NOW_FAILED:
      return {
        ...state,
        airingNow: {
          ...state.airingNow,
          isLoading: false,
          error: action.payload.message,
        },
      };
    case FETCH_MOVIE_DETAILS_REQUESTED:
      return {
        ...state,
        details: {
          item: null,
          id: action.payload.id,
          isLoading: true,
          error: null,
        },
      };
    case FETCH_MOVIE_DETAILS_SUCCEEDED:
      return {
        ...state,
        details: {
          item: action.payload,
          id: action.payload.id,
          isLoading: false,
          error: null,
        },
      };
    case FETCH_MOVIE_DETAILS_FAILED:
      return {
        ...state,
        details: {
          item: null,
          id: state.details.id,
          isLoading: false,
          error: action.payload.message,
        },
      };
    default:
      return state;
  }
};
