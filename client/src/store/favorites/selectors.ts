import type { RootState } from '@/store/rootReducer';

export const selectFavoritesState = (state: RootState) => state.favorites;

export const selectFavoriteItems = (state: RootState) => state.favorites.items;

export const selectIsFavoriteById = (state: RootState, id: number) =>
  state.favorites.items.some((item) => item.id === id);
