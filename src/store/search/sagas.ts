import {
  actionChannel,
  all,
  call,
  delay,
  fork,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';

import {
  SEARCH_QUERY_CHANGED,
  SEARCH_REQUESTED,
  searchCleared,
  searchFailed,
  searchRequested,
  searchSucceeded,
} from './actions';
import type {
  SearchQueryChangedAction,
  SearchRequestedAction,
} from './actions';
import type { SagaIterator } from 'redux-saga';

import { searchMovies } from '@/api/movies/serach';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unknown error';

function* handleQueryChange(action: SearchQueryChangedAction): SagaIterator {
  const query = action.payload.query.trim();

  if (query.length < 2) {
    yield put(searchCleared());
    return;
  }

  yield put(searchRequested(query, 1));
}

function* debouncedQuerySaga(action: SearchQueryChangedAction): SagaIterator {
  yield delay(500);
  yield call(handleQueryChange, action);
}

function* searchWatcher(): SagaIterator {
  yield takeLatest(SEARCH_QUERY_CHANGED, debouncedQuerySaga);
}

function* rateLimitedSearchSaga(): SagaIterator {
  const channel = yield actionChannel(SEARCH_REQUESTED);
  const windowMs = 10000;
  const maxRequests = 5;
  const timestamps: Array<number> = [];

  for (;;) {
    const action: SearchRequestedAction = yield take(channel);
    const now = Date.now();

    while (timestamps.length && now - timestamps[0] >= windowMs) {
      timestamps.shift();
    }

    if (timestamps.length >= maxRequests) {
      const waitMs = windowMs - (now - timestamps[0]);
      if (waitMs > 0) {
        yield delay(waitMs);
      }
    }

    timestamps.push(Date.now());

    try {
      const data = yield call(
        searchMovies,
        action.payload.query,
        action.payload.page,
      );
      yield put(searchSucceeded(action.payload.query, data));
    } catch (error) {
      yield put(searchFailed(action.payload.query, getErrorMessage(error)));
    }
  }
}

export function* searchSaga(): SagaIterator {
  yield all([fork(searchWatcher), fork(rateLimitedSearchSaga)]);
}
