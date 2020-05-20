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
} from "redux-saga/effects";
import { Task } from "redux-saga";
import {
  SAGA_GET_SAVES,
  SAGA_TOGGLE_ESCAPE,
  SAGA_SAVE_GAME,
  SAGA_LOAD_GAME,
  SAGA_RUN_FPS_TIMER,
  SAGA_STOP_FPS_TIMER,
} from "./actions-types";
import {
  toggleDisplay,
  clearFPS,
  getSaves,
  toggleEscape,
  loadGame,
  GetSaveActionType,
  ToggleEscapeActionType,
  ToggleDisplayActionType,
  SagaToggleEscapeActionType,
  SagaSaveGameActionType,
  SagaLoadGameActionType,
  LoadGameActionType,
  ClearFPSActionType,
} from "./actions";
import api from "../api";
import { getGame } from "./selectors";
import { GameType } from "../types";

type GetSavesSagaType = Generator<
  CallEffect<string[]> | PutEffect<GetSaveActionType>,
  void,
  string[]
>;

function* getSavesSaga(): GetSavesSagaType {
  const saves: string[] = yield call(api.getSaves.bind(api));
  yield put(getSaves(saves));
}

type WatcherSagaType = Generator<ForkEffect<never>, void, unknown>;

function* watchGetSaves(): WatcherSagaType {
  yield takeEvery(SAGA_GET_SAVES, getSavesSaga);
}

type ToggleEscapeEffectsType =
  | PutEffect<ToggleEscapeActionType>
  | PutEffect<ToggleDisplayActionType>;

type ToggleEscapeSagaType = Generator<ToggleEscapeEffectsType, void, unknown>;

function* toggleEscapeSaga({
  key,
}: SagaToggleEscapeActionType): ToggleEscapeSagaType {
  yield put(toggleEscape(key));
  yield put(toggleDisplay(false));
}
function* watchToggleEscape(): Generator<ForkEffect<never>, void, unknown> {
  yield takeEvery(SAGA_TOGGLE_ESCAPE, toggleEscapeSaga);
}

type SaveGameSagaType = Generator<
  ForkEffect<void> | SelectEffect | CallEffect<void> | ToggleEscapeEffectsType,
  void,
  GameType
>;

function* saveGameSaga({ saveName }: SagaSaveGameActionType): SaveGameSagaType {
  const game: GameType = yield select(getGame);
  const save = { saveName, game };
  yield call(api.saveGame.bind(api), save);
  yield fork(getSavesSaga);
  yield* toggleEscapeSaga({ key: false } as SagaToggleEscapeActionType);
}
function* watchSaveGame(): WatcherSagaType {
  yield takeEvery(SAGA_SAVE_GAME, saveGameSaga);
}

type LoadGameSagaType = Generator<
  | CallEffect<GameType>
  | PutEffect<LoadGameActionType>
  | PutEffect<ToggleDisplayActionType>,
  void,
  GameType
>;

function* loadGameSaga({ saveName }: SagaLoadGameActionType): LoadGameSagaType {
  const game: GameType = yield call(api.loadGame.bind(api), saveName);
  yield put(loadGame(game));
  yield put(toggleDisplay(false));
}
function* watchLoadGame(): WatcherSagaType {
  yield takeEvery(SAGA_LOAD_GAME, loadGameSaga);
}

type FpsTickType = Generator<
  CallEffect<true> | PutEffect<ClearFPSActionType>,
  void,
  unknown
>;

function* fpsTick(): FpsTickType {
  while (true) {
    yield delay(5000);
    yield put(clearFPS());
  }
}

type FpsTimerType = Generator<
  ForkEffect<void> | TakeEffect | CancelEffect,
  void,
  Task
>;

function* fpsTimer(): FpsTimerType {
  while (yield take(SAGA_RUN_FPS_TIMER)) {
    const fpsTask: Task = yield fork(fpsTick);
    yield take(SAGA_STOP_FPS_TIMER);
    yield cancel(fpsTask);
  }
}
type RootSageType = Generator<AllEffect<FpsTimerType>, void, unknown>;

export default function* rootSaga(): RootSageType {
  yield all([
    watchGetSaves(),
    watchToggleEscape(),
    watchSaveGame(),
    watchLoadGame(),
    fpsTimer(),
  ]);
}
