import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_AIRING_NOW_REQUESTED,
  FETCH_HOME_REQUESTED,
  FETCH_MOVIE_DETAILS_REQUESTED,
  FETCH_POPULAR_REQUESTED,
  fetchAiringNowFailed,
  fetchAiringNowSucceeded,
  fetchHomeFailed,
  fetchHomeSucceeded,
  fetchMovieDetailsFailed,
  fetchMovieDetailsSucceeded,
  fetchPopularFailed,
  fetchPopularSucceeded,
} from './actions';
import type {
  FetchAiringNowRequestedAction,
  FetchHomeRequestedAction,
  FetchMovieDetailsRequestedAction,
  FetchPopularRequestedAction,
} from './actions';
import type { SagaIterator } from 'redux-saga';

import { getAiringNowMovies } from '@/api/movies/airing-now';
import { getMovieDetails } from '@/api/movies/details';
import { getPopularMovies } from '@/api/movies/popular';

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Unknown error';

function* fetchPopularSaga(action: FetchPopularRequestedAction): SagaIterator {
  try {
    const data = yield call(getPopularMovies, action.payload.page);
    yield put(fetchPopularSucceeded(data));
  } catch (error) {
    yield put(fetchPopularFailed(getErrorMessage(error)));
  }
}

function* fetchHomeSaga(action: FetchHomeRequestedAction): SagaIterator {
  try {
    const data = yield call(getPopularMovies, action.payload.page);
    yield put(fetchHomeSucceeded(data));
  } catch (error) {
    yield put(fetchHomeFailed(getErrorMessage(error)));
  }
}

function* fetchAiringNowSaga(
  action: FetchAiringNowRequestedAction,
): SagaIterator {
  try {
    const data = yield call(getAiringNowMovies, action.payload.page);
    yield put(fetchAiringNowSucceeded(data));
  } catch (error) {
    yield put(fetchAiringNowFailed(getErrorMessage(error)));
  }
}

function* fetchMovieDetailsSaga(
  action: FetchMovieDetailsRequestedAction,
): SagaIterator {
  try {
    const data = yield call(getMovieDetails, action.payload.id);
    yield put(fetchMovieDetailsSucceeded(data));
  } catch (error) {
    yield put(fetchMovieDetailsFailed(getErrorMessage(error)));
  }
}

export function* moviesSaga(): SagaIterator {
  yield takeLatest(FETCH_POPULAR_REQUESTED, fetchPopularSaga);
  yield takeLatest(FETCH_HOME_REQUESTED, fetchHomeSaga);
  yield takeLatest(FETCH_AIRING_NOW_REQUESTED, fetchAiringNowSaga);
  yield takeLatest(FETCH_MOVIE_DETAILS_REQUESTED, fetchMovieDetailsSaga);
}
