import {
  takeEvery,
  cancel,
  select,
  put,
  SelectEffect,
  PutEffect,
  CancelEffect,
  call,
  CallEffect,
} from 'redux-saga/effects';
import { navigate } from '@reach/router';
import { SAGA_UPDATE_GAME } from '../../actions-types';
import { WatcherSaga } from '../../../types';
import {
  findCollisionsWithShots,
  findCollisionsWithRocket,
} from './collisions';
import {
  getPassedPath,
  getHealth,
  getShotMagazine,
  getReadyToShoot,
  getRocketX,
  getArrowLeft,
  getArrowRight,
  getSpace,
} from '../../selectors';
import {
  readyShoot,
  generateNewStars,
  addShot,
  generateAsteroid,
  updateGame,
  ReadyShootAction,
  GenerateNewStarsAction,
  AddShotAction,
  GenerateAsteroidAction,
  UpdateGameAction,
} from '../../actions';

type UpdateGameSaga = Generator<
  | SelectEffect
  | PutEffect<ReadyShootAction>
  | PutEffect<GenerateNewStarsAction>
  | PutEffect<AddShotAction>
  | PutEffect<GenerateAsteroidAction>
  | PutEffect<UpdateGameAction>
  | CallEffect<void>
  | CancelEffect,
  void,
  number & boolean
>;

function* updateGameSaga(): UpdateGameSaga {
  const passedPath: number = yield select(getPassedPath);
  const health: number = yield select(getHealth);
  const shotMagazine: number = yield select(getShotMagazine);
  const readyToShoot: boolean = yield select(getReadyToShoot);
  const rocketX: number = yield select(getRocketX);
  const arrowLeft: boolean = yield select(getArrowLeft);
  const arrowRight: boolean = yield select(getArrowRight);
  const space: boolean = yield select(getSpace);

  if (health <= 0) {
    void navigate('/');
    yield cancel();
  }
  if (passedPath % 6 === 0 && !readyToShoot) yield put(readyShoot());
  if (passedPath % 30 === 0) yield put(generateNewStars());
  if (passedPath % 80 === 0 && shotMagazine < 15) {
    yield put(addShot());
  }
  if (passedPath % 100 === 0) {
    yield put(generateAsteroid());
  }
  yield call(findCollisionsWithShots);
  yield call(findCollisionsWithRocket);
  yield put(updateGame({ arrowLeft, arrowRight, rocketX, space }));
}
export default function* watchUpdateGame(): WatcherSaga {
  yield takeEvery(SAGA_UPDATE_GAME, updateGameSaga);
}
