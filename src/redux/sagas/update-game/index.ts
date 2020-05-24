import { takeEvery, fork } from 'redux-saga/effects';
import { UPDATE_GAME } from '../../actions-types';
import { WatcherSaga } from '../../../types';
import {
  findCollisionsWithShots,
  findCollisionsWithRocket,
} from './collisions';

function* updateGameSaga() {
  yield fork(findCollisionsWithShots);
  yield fork(findCollisionsWithRocket);
}
export default function* watchUpdateGame(): WatcherSaga {
  yield takeEvery(UPDATE_GAME, updateGameSaga);
}
