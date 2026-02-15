import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { FAVORITES_STORAGE_KEY } from './favorites/reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

if (typeof window !== 'undefined') {
  let lastSerialized = '';

  store.subscribe(() => {
    const { favorites } = store.getState();

    if (!favorites.isLoaded || favorites.isLoading || favorites.error) {
      return;
    }

    const serialized = JSON.stringify(favorites.items);
    if (serialized === lastSerialized) return;

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, serialized);
    lastSerialized = serialized;
  });
}

export type AppDispatch = typeof store.dispatch;
