import {
  takeEvery,
  put,
  call,
  all,
  select,
  fork,
  take,
  cancel,
  delay,
  CallEffect,
  PutEffect,
  ForkEffect,
  SelectEffect,
  TakeEffect,
  CancelEffect,
  AllEffect,
} from 'redux-saga/effects';
import { Task } from 'redux-saga';
import {
  SAGA_GET_SAVES,
  SAGA_TOGGLE_ESCAPE,
  SAVE_GAME,
  SAGA_LOAD_GAME,
  RUN_FPS_TIMER,
  STOP_FPS_TIMER,
  UPDATE_GAME,
} from './actions-types';
import {
  toggleDisplay,
  clearFPS,
  getSaves,
  toggleEscape,
  loadGame,
  GetSaveAction,
  ToggleEscapeAction,
  ToggleDisplayAction,
  SagaToggleEscapeAction,
  SaveGameAction,
  SagaLoadGameAction,
  LoadGameAction,
  ClearFPSAction,
  reset,
  ResetAction,
  destroyShot,
  destroyAsteroid,
  addAsteroid,
  addBox,
  DestroyAsteroidAction,
  DestroyShotAction,
  AddAsteroidAction,
  AddBoxdAction,
} from './actions';
import api from '../api';
import { getGame, getAsteroids, getShots } from './selectors';
import { Game, Asteroid, Shot } from '../types';
import { collisionCircles } from '../collisions';

type GetSavesSaga = Generator<
  CallEffect<string[]> | PutEffect<GetSaveAction>,
  void,
  string[]
>;

function* getSavesSaga(): GetSavesSaga {
  const saves: string[] = yield call(api.getSaves.bind(api));
  yield put(getSaves(saves));
}

type WatcherSaga = Generator<ForkEffect<never>, void, unknown>;

function* watchGetSaves(): WatcherSaga {
  yield takeEvery(SAGA_GET_SAVES, getSavesSaga);
}

type ToggleEscapeEffects =
  | PutEffect<ToggleEscapeAction>
  | PutEffect<ToggleDisplayAction>;

type ToggleEscapeSaga = Generator<ToggleEscapeEffects, void, unknown>;

function* toggleEscapeSaga({ key }: SagaToggleEscapeAction): ToggleEscapeSaga {
  yield put(toggleEscape(key));
  yield put(toggleDisplay(false));
}
function* watchToggleEscape(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_TOGGLE_ESCAPE, toggleEscapeSaga);
}

type SaveGameSaga = Generator<
  ForkEffect<void> | SelectEffect | CallEffect<void> | ToggleEscapeEffects,
  void,
  Game
>;

function* saveGameSaga({ saveName }: SaveGameAction): SaveGameSaga {
  const game: Game = yield select(getGame);
  const save = { saveName, game };
  yield call(api.saveGame.bind(api), save);
  yield fork(getSavesSaga);
  yield* toggleEscapeSaga({ key: false } as SagaToggleEscapeAction);
}
function* watchSaveGame(): WatcherSaga {
  yield takeEvery(SAVE_GAME, saveGameSaga);
}

type LoadGameSaga = Generator<
  CallEffect<Game> | PutEffect<LoadGameAction> | PutEffect<ResetAction>,
  void,
  Game
>;

function* loadGameSaga({ saveName }: SagaLoadGameAction): LoadGameSaga {
  const game: Game = yield call(api.loadGame.bind(api), saveName);
  yield put(reset());
  yield put(loadGame(game));
}
function* watchLoadGame(): WatcherSaga {
  yield takeEvery(SAGA_LOAD_GAME, loadGameSaga);
}

type FpsTick = Generator<
  CallEffect<true> | PutEffect<ClearFPSAction>,
  void,
  unknown
>;

function* fpsTick(): FpsTick {
  while (true) {
    yield delay(5000);
    yield put(clearFPS());
  }
}

type FpsTimer = Generator<
  ForkEffect<void> | TakeEffect | CancelEffect,
  void,
  Task
>;

function* fpsTimer(): FpsTimer {
  while (yield take(RUN_FPS_TIMER)) {
    const fpsTask: Task = yield fork(fpsTick);
    yield take(STOP_FPS_TIMER);
    yield cancel(fpsTask);
  }
}

type FindCollisionsWithShots = Generator<
  | SelectEffect
  | PutEffect<DestroyAsteroidAction>
  | PutEffect<DestroyShotAction>
  | PutEffect<AddAsteroidAction>
  | PutEffect<AddBoxdAction>,
  void,
  readonly Asteroid[] & readonly Shot[]
>;

function* findCollisionsWithShots(): FindCollisionsWithShots {
  const asteroids: readonly Asteroid[] = yield select(getAsteroids);
  const shots: readonly Shot[] = yield select(getShots);
  for (let i = 0; i < asteroids.length; i++) {
    const { x, y, size, vY } = asteroids[i];
    for (let j = 0; j < shots.length; j++) {
      if (collisionCircles([x, y, size], [shots[j][0], shots[j][1], 5])) {
        yield put(destroyShot(j));
        yield put(destroyAsteroid(i));
        if (size >= 10) {
          const newSize = Math.floor(size / 2);
          const newVY = 0.9 * vY;
          yield put(
            addAsteroid({
              x,
              y,
              size: newSize,
              vX: newVY,
              vY: newVY,
            })
          );
          yield put(
            addAsteroid({
              x,
              y,
              size: newSize,
              vX: -newVY,
              vY: newVY,
            })
          );
          yield put(addBox({ x, y, color: 'red' }));
        }
      }
    }
  }
}

function* updateGameSaga() {
  yield fork(findCollisionsWithShots);
}

function* watchUpdateGame(): WatcherSaga {
  yield takeEvery(UPDATE_GAME, updateGameSaga);
}

type RootSaga = Generator<AllEffect<FpsTimer>, void, unknown>;

export default function* rootSaga(): RootSaga {
  yield all([
    watchGetSaves(),
    watchToggleEscape(),
    watchSaveGame(),
    watchLoadGame(),
    fpsTimer(),
    watchUpdateGame(),
  ]);
}
