import { all, fork } from 'redux-saga/effects';

import { moviesSaga } from './movies/sagas';
import { searchSaga } from './search/sagas';

export function* rootSaga() {
  yield all([fork(moviesSaga), fork(searchSaga)]);
}
