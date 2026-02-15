import { FAVORITES_ADDED, FAVORITES_REMOVED } from './actions';
import type { FavoritesAction } from './actions';
import type { FavoritesState } from './types';

import { favoritesStorageSchema } from '@/schemas/movies-result';

export const FAVORITES_STORAGE_KEY = 'movie-rush/favorites';

const loadFavoritesFromStorage = (): {
  items: FavoritesState['items'];
  error: string | null;
  isLoaded: boolean;
} => {
  if (typeof window === 'undefined') {
    return { items: [], error: null, isLoaded: false };
  }

  const serialized = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
  if (!serialized) {
    return { items: [], error: null, isLoaded: true };
  }

  try {
    const parsed = JSON.parse(serialized);
    const result = favoritesStorageSchema.safeParse(parsed);
    if (!result.success) {
      return {
        items: [],
        error: 'Failed to read favorites from local storage.',
        isLoaded: true,
      };
    }
    return { items: result.data, error: null, isLoaded: true };
  } catch (_error) {
    return {
      items: [],
      error: 'Failed to read favorites from local storage.',
      isLoaded: true,
    };
  }
};

const storageState = loadFavoritesFromStorage();

const initialState: FavoritesState = {
  items: storageState.items,
  isLoading: false,
  isLoaded: storageState.isLoaded,
  error: storageState.error,
};

export const favoritesReducer = (
  state: FavoritesState = initialState,
  action: FavoritesAction,
): FavoritesState => {
  switch (action.type) {
    case FAVORITES_ADDED: {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (exists) return state;
      return {
        ...state,
        items: [action.payload, ...state.items],
        isLoading: false,
        isLoaded: true,
        error: null,
      };
    }
    case FAVORITES_REMOVED:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        isLoading: false,
        isLoaded: true,
        error: null,
      };
    default:
      return state;
  }
};
