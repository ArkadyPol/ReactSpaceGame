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
  SAGA_SAVE_GAME,
  SAGA_LOAD_GAME,
  SAGA_RUN_FPS_TIMER,
  SAGA_STOP_FPS_TIMER,
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
  SagaSaveGameAction,
  SagaLoadGameAction,
  LoadGameAction,
  ClearFPSAction,
} from './actions';
import api from '../api';
import { getGame } from './selectors';
import { Game } from '../types';

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

function* saveGameSaga({ saveName }: SagaSaveGameAction): SaveGameSaga {
  const game: Game = yield select(getGame);
  const save = { saveName, game };
  yield call(api.saveGame.bind(api), save);
  yield fork(getSavesSaga);
  yield* toggleEscapeSaga({ key: false } as SagaToggleEscapeAction);
}
function* watchSaveGame(): WatcherSaga {
  yield takeEvery(SAGA_SAVE_GAME, saveGameSaga);
}

type LoadGameSaga = Generator<
  CallEffect<Game> | PutEffect<LoadGameAction> | PutEffect<ToggleDisplayAction>,
  void,
  Game
>;

function* loadGameSaga({ saveName }: SagaLoadGameAction): LoadGameSaga {
  const game: Game = yield call(api.loadGame.bind(api), saveName);
  yield put(loadGame(game));
  yield put(toggleDisplay(false));
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
  while (yield take(SAGA_RUN_FPS_TIMER)) {
    const fpsTask: Task = yield fork(fpsTick);
    yield take(SAGA_STOP_FPS_TIMER);
    yield cancel(fpsTask);
  }
}
type RootSaga = Generator<AllEffect<FpsTimer>, void, unknown>;

export default function* rootSaga(): RootSaga {
  yield all([
    watchGetSaves(),
    watchToggleEscape(),
    watchSaveGame(),
    watchLoadGame(),
    fpsTimer(),
  ]);
}
