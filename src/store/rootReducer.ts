import { combineReducers } from 'redux';

import { favoritesReducer } from './favorites/reducer';
import { moviesReducer } from './movies/reducer';
import { searchReducer } from './search/reducer';

export const rootReducer = combineReducers({
  favorites: favoritesReducer,
  movies: moviesReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
