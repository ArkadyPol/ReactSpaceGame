import { takeEvery, fork } from 'redux-saga/effects';
import { UPDATE_GAME } from '../../actions-types';
import { WatcherSaga } from '../../../types';
import findCollisionsWithShots from './collisions';

function* updateGameSaga() {
  yield fork(findCollisionsWithShots);
}
export default function* watchUpdateGame(): WatcherSaga {
  yield takeEvery(UPDATE_GAME, updateGameSaga);
}
